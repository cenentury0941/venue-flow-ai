import { createServer } from "node:https";
import next from "next";
import { Server } from "socket.io";
import fs from 'fs';

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 10000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

var timerState = "STOPPED"
const timerDuration = 15000

var targetTime = null
var timeLeftOnPause = null

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

var sentry_devices = []

app.prepare().then(() => {
  const httpsServer = createServer(options, handler);

  const io = new Server(httpsServer);

  const updateAll = (data, socket) => {
    if(socket)
    {
      socket.emit("update",data)
      return
    }
    io.emit("update",data)
  }

  io.on("connection", (socket) => {
    console.log("connecting...")

    var initTime = 0

    if(timerState != "STOPPED")
    {
      if(timerState == "RUNNING"){
        initTime = targetTime - Date.now()
      }
      else if(timeLeftOnPause){
        initTime = timeLeftOnPause 
      }
      console.log(`TimeLeftOnPause : ${timeLeftOnPause}`)
    }

    setTimeout( () => {
      updateAll({
        state: timerState,
        timeDuration: initTime
      }, socket)
    } , 20 )

    socket.on("start/pause", (msg)=>{

      console.log(msg)
      var isResume = timerState == "PAUSED"
      var isStart = timerState == "STOPPED"
      var isPause = timerState == "RUNNING"
      var timeToSend = timerDuration
      const currentTime = Date.now()

      if(isStart)
      {
        targetTime = currentTime + timerDuration
      }

      if(isResume)
      {
        if(timeLeftOnPause)
        {
          timeToSend = timeLeftOnPause
          targetTime = currentTime + timeLeftOnPause
        }
        timeLeftOnPause = null
      }
      else{
        if(targetTime > currentTime)
        {
          timeLeftOnPause = targetTime - Date.now()
        }
        else{
          timeLeftOnPause = null
          targetTime = null
        }
      }

      if(isPause)
      {
        timeToSend = timeLeftOnPause
      }

      timerState = timerState == "RUNNING" ? "PAUSED" : "RUNNING"
      updateAll({
        state: timerState,
        timeDuration: timeToSend
      })
    })

    socket.on("reset", (msg)=>{
      console.log(msg)
      timerState = "STOPPED"
      targetTime = null
      updateAll({
        state: timerState,
        timeDuration: 0
      })
    })

    socket.on("ping", (callback) => {
      callback(sentry_devices);
    });

    socket.on( "Sentry_Connected" , (deviceId) => {
      var already_registered = sentry_devices.find( value => value == deviceId )
      if(!already_registered)
      {
        sentry_devices.push(deviceId)
      }
      console.log("Sentry Device Connected : " , deviceId , sentry_devices)
      io.emit( "Updated_Sentries" , sentry_devices );
    } );
  
    socket.on( "Sentry_Disconnected" , (deviceId) => {
      sentry_devices = sentry_devices.filter( id => id != deviceId )
      console.log("Sentry Device Disconnected : " , deviceId , sentry_devices)
      io.emit( "Updated_Sentries" , sentry_devices );
    } );

    socket.on( "Get_Sentries" , () => {
      io.emit("Updated_Sentries", sentry_devices);
    } )

    socket.on( "Postprocessor_Alert" , (data) => {
      console.log("Received Alert : " , data)
      io.emit( "ALERT" , data , Date.now() )
    } )

    socket.on( "Postprocessor_Warn", (data) => {
      console.log("Received Warn : " , data)
      io.emit( "WARN" , data , Date.now() )
    } )

    socket.on( "Postprocessor_Info" , (data) => {
      console.log("Received Info : " , data)
      io.emit( "INFO" , data , Date.now() )
    } )
    
    socket.on( "Postprocessor_People_Count" , (number_of_people , warning_threshold , alert_threshold , camera_name) => {
      console.log("Received Info : " , number_of_people , warning_threshold , alert_threshold , camera_name)
      io.emit( "People_Count" , number_of_people , warning_threshold , alert_threshold , camera_name , Date.now() )
    } )

    socket.on( "Playback_State" , (mode) => {
      console.log("Update Playback State : " , mode)
      io.emit( "Update_Mode" , mode )
    } )

    socket.on( "Playback_Time" , (ts) => {
      console.log("Update Playback Time : " , ts)
      io.emit( "Update_Time" , ts )
    } )


  });

  httpsServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});