"use client";

import Link from "next/link";
import { useQRCode } from 'next-qrcode';
import ConnectedDevice from "@/components/connecteddevice";
import { useEffect, useState } from "react";
import { ALERT, INFO, WARN } from "@/utils/events";
import EventsModel from "@/components/eventmodel";
import EventSpinner from "@/components/eventsspinner";
import { socket } from "../../../socket";
import speak from "@/utils/speech";

export default function EventsViewer(){
    const { Canvas } = useQRCode();
    const eventList = [ { type : INFO , details : "This is an information event" }, { type : ALERT , details : "This is an alert" }, { type : WARN , details : "This is a warning" } ]
    
    const [events , setEvents] = useState([])
    const [filteredEvents , setFilteredEvents] = useState([])

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


    return <div className="flex flex-col content-start h-[95vh] scroll-smooth w-full p-4 overflow-scroll">

        <h2 className="flex shrink-0 gap-2 text-5xl w-full font-bold">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mt-16">Events Viewer</div>
        </h2>
        
        <p className="text-xl shrink-0 mt-4">
        Monitor realtime alerts, warnings and information events received from the venueflow-postprocessor!
        </p>

        <h2 className="flex gap-2 shrink-0 text-3xl w-full font-bold my-4">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Events:</div>
        </h2>

        <EventSpinner />
        
        {
          filteredEvents.map( (value,index) => {
            return <EventsModel eventInfo={value} key={index} />
            } )
        }

        <div className="mb-32"></div>

    </div>
}