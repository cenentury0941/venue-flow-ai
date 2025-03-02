"use client";

import { useQRCode } from 'next-qrcode';
import ConnectedDevice from "@/components/connecteddevice";
import { useEffect, useState } from "react";
import { sentry_url } from '@/utils/urls';
import { socket } from '@/socket';

export default function MobileConnect(){
    const { Canvas } = useQRCode();
    const deviceList = [ 0 , 1 , 2 , 3 ]
    const [connectedDevices , setConnectedDevices] = useState([])

    useEffect( () => {
        socket.on( "Updated_Sentries" , (sentries) => {
            setConnectedDevices(sentries)
        } )

        socket.connect()
        socket.emit("Get_Sentries")
    } , [] )

    return <div className="flex flex-col content-start h-[95vh] scroll-smooth w-full p-4 overflow-scroll">

        <h2 className="flex shrink-0 gap-2 text-5xl w-full font-bold">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mt-16">Mobile Connect</div>
        </h2>
        
        <p className="text-xl shrink-0 mt-4">
        Scan the QR code below to open the Sentry App on your phone to receive real-time updates from VenueFlow AI!
        </p>

        <div className="flex shrink-0 w-fit flex-row justify-center rounded-xl overflow-hidden mx-auto my-4 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500">
        <div className="bg-white m-2 rounded-xl">
        <Canvas
        text={sentry_url}
        options={{
            errorCorrectionLevel: 'M',
            margin: 2,
            scale: 3,
            width: 250,
            color: {
            dark: '#000',
            light: '#FFF0',
            },
        }}
        />
        </div>
        </div>

        <h2 className="flex gap-2 shrink-0 text-3xl w-full font-bold my-4">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Connected Devices</div>
        </h2>

        {
            connectedDevices.map( (value,index) => {
                return <ConnectedDevice key={index} deviceId={value} onclick={() => socket.emit("Sentry_Disconnected",value)}/>
            } )
        }

        <div className="mb-32"></div>

    </div>
}