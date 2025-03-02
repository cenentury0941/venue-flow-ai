"use client"

import Image from "next/image";
import { socket } from "../../socket";
import { useEffect, useState } from "react";
import clsx from "clsx";
import EventSpinner from "@/components/eventsspinner";
import getOrCreateDeviceID from "@/utils/deviceId";
import withNoSSR from "@/utils/nossr";
import { ALERT, INFO, WARN } from "@/utils/events";
import EventsModel from "@/components/eventmodel";
import speak from "@/utils/speech";

export default withNoSSR(function Sentry(){
    const [connected, setConnected] = useState(false)
    const [audioEnabled, setAudioEnabled] = useState(false)
    const [filteredEvents , setFilteredEvents] = useState([])
    
    const deviceId = getOrCreateDeviceID()
    const eventList = []
    const [events , setEvents] = useState(eventList)

    useEffect( () => {
        if(filteredEvents.length > 0)
        {
            speak(filteredEvents[0].details)
        }
    } , [filteredEvents] )

    useEffect( () => {
        setFilteredEvents( events.filter( (event, index, self) => self.findIndex(e => e.ts === event.ts) === index) )
    } , [events] )

    useEffect( () => {

        const pingInterval = setInterval(() => { 
            socket.emit("ping", (sentries) => {
                const exists = sentries.some(entry => entry === deviceId);
                if(!exists)
                {
                    console.log("Updated Sentries : ", sentries, deviceId)
                    setConnected(false)
                }
                else {
                    setConnected(true)
                }
            });
        }, 3900);
        
        socket.on("connect" , ()=>{
            setConnected(true)
        })
        socket.on("disconnect" , ()=>{
            socket.emit("Sentry_Disconnected" , deviceId)
        })
        socket.on("Updated_Sentries" , (sentries)=>{
            const exists = sentries.some(entry => entry === deviceId);
            if(!exists)
            {
                console.log("Updated Sentries : ", sentries, deviceId)
                setConnected(false)
            }
        })
        
        socket.on("ALERT" , (data, ts)=>{
            if(events.some( (value) => { ts === value.ts } ))
            {
                return
            }
            setEvents( events => [ { type : ALERT , details : data , ts : ts } , ...events ] )
        })
        socket.on("WARN" , (data, ts)=>{
            if(events.some( (value) => { ts === value.ts } ))
            {
                return
            }
            setEvents( events => [ { type : WARN , details : data , ts : ts } , ...events ] )            
        })
        socket.on("INFO" , (data, ts)=>{
            if(events.some( (value) => { ts === value.ts } ))
            {
                return
            }
            setEvents( events => [ { type : INFO , details : data , ts : ts } , ...events ] )
        })

        socket.connect()

        return () => {
            socket.disconnect()
        }
    } , [] )

    useEffect( () => {
            socket.emit("Sentry_Connected" , deviceId)
    } , [deviceId] )

    return <div className="flex shrink-0 flex-col p-4 h-screen w-screen select-none overflow-scroll">
        <Image alt="logo" src="/sentry_icon.png" height="512" width="512" className="mx-auto"/>
        <h2 className="text-3xl">Welcome To</h2>
        <h1 className="w-fit text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r to-cyan-500 via-purple-500 from-pink-500 pb-2">Sentry</h1>
        <h3 className="text-m mt-4">Here, you can receive and view all transmissions from the venueflow-postprocessor!</h3>
        

        <div className={clsx("my-4 mx-0 py-1 px-1 rounded-xl transition-all duration-500 bg-gradient-to-r",
        { "from-pink-500 via-purple-500 to-cyan-500" : connected },
        { "from-yellow-500 via-orange-500 to-red-500" : !connected })
        }>
            <div className="bg-black/85 py-4 px-4 rounded-xl">
            { connected ? "Connected To The Server!" : "Not Connected To The Server" }
            </div>
        </div>

        <div 
        onClick={ () => { setAudioEnabled(true); speak("Audio Enabled") } }
        className={clsx("mb-4 mx-0 py-1 px-1 rounded-xl transition-all duration-500 bg-gradient-to-r",
        { "from-pink-500 via-purple-500 to-cyan-500" : audioEnabled },
        { "from-yellow-500 via-orange-500 to-red-500" : !audioEnabled })
        }>
            <div className="bg-black/85 py-4 px-4 rounded-xl">
            { audioEnabled ? "Audio Enabled!" : "Enable Audio" }
            </div>
        </div>

        <hr className="w-48 h-1 mx-auto my-2 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700" />
        <div className="flex flex-row">
        <h2 className="w-fit h-16 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r to-cyan-500 via-purple-500 from-pink-500 mb-4 mr-auto">Alerts</h2>
        <h3 className="text-m text-gray-400 mt-2 overflow-hidden max-w-[25ch] truncate">DeviceId : {deviceId}</h3>
        </div>
        <EventSpinner />

        {
          filteredEvents.map( (value,index) => {
            return <EventsModel eventInfo={value} key={index} />
            } )
        }

    </div>
})