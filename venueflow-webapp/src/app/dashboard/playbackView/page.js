"use client"

import { socket } from "@/socket";
import formatTimestamp from "@/utils/timeformat";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function PlaybackView(){
    const [playbackEnabled , setPlaybackEnabled] = useState(false)
    const [timeReading, setTimeReading] = useState(180)
    const [curTime, setCurTime] = useState(Date.now())

    useEffect( () => {
        socket.connect()
    } , [] )

    useEffect( () => {
        socket.emit("Playback_State", (playbackEnabled ? "Playback" : "Current"))
        setCurTime(Date.now())
    } , [playbackEnabled] )

    useEffect( () => {
        if(playbackEnabled)
        {
            socket.emit( "Playback_Time" , curTime - ((180-timeReading)*1000) )
        }
    } , [timeReading] )

    return <div className="flex flex-col content-start w-full h-full p-4">
    <p className="mt-auto text-3xl font-bold"></p>
    <h2 className="flex gap-2 text-6xl w-full font-bold">
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Playback</div> <div className="text-white"> Viewer</div>
    </h2>
    
    <p className="text-l mt-4">
    Using the playback viewer, you can retrace the readings received from the postprocessor. This can be used to better understand the flow of people in retrospect
    to improve upon future experiences.
    </p>
    
    <p className="text-l mt-2">
    Just enable PlaybackView below and adjust the slider to view historical data upto 1 hour ago.</p>

          <div 
          onClick={ () => { setPlaybackEnabled(!playbackEnabled) } }
            className={clsx("mb-4 mt-4 mx-0 p-1 rounded-xl transition-all duration-500 bg-gradient-to-r",
            { "from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-200 hover:via-purple-200 hover:to-cyan-200" : playbackEnabled },
            { "from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-200 hover:via-orange-200 hover:to-red-200" : !playbackEnabled })
            }>
                <div className="bg-black/85 m-0 p-4 rounded-xl">
                { playbackEnabled ? "Disable Playback!" : "Enable Playback" }
                </div>
            </div>

        <label htmlFor="minmax-range" className="block mb-2 font-bold text-gray-900 dark:text-white text-xl">Time : {formatTimestamp( curTime - ((180-timeReading)*1000) )}</label>
        <input onInput={ (e) => { setTimeReading(parseInt(e.target.value)) } } id="minmax-range" type="range" min="0" max="180" value={timeReading} className="w-full h-3 mb-5 bg-gray-200 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-pink-800 via-purple-800 to-cyan-800" />

</div>
}