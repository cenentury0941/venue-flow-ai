"use client"

import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import Image from 'next/image';
import { socket } from "../socket";
import clsx from 'clsx';
import { local_devices_url } from '@/utils/urls';

export default memo(({data, isConnectable}) => {
    const [currentReading, setCurrentReading] = useState(0) 
    const [warningThreshold, setWarningThreshold] = useState(0) 
    const [alertThreshold, setAlertThreshold] = useState(0)
    const thumbnail_base_url = `${local_devices_url}${data.deviceId}/image?timestampMs=-1&rotation=-1` 
    const [imageUrl, setImageUrl] = useState(thumbnail_base_url) 
    const [playbackReading, setPlaybackReading] = useState(0)
    const [hist, setHistory] = useState([])
    const [mode, setMode] = useState("Current")
    const [requestedTime , setRequestedTime] = useState(0)

    useEffect( () => {
        var inst = hist.find( (v) => {return requestedTime < v.ts} )
        console.log( inst )
        if(inst)
        {
            setPlaybackReading(inst.reading)
        }
    } , [requestedTime] )

    useEffect( () => {
        setInterval( () => {
            setImageUrl( `${thumbnail_base_url}&retrigger=` + Math.random() )
        } , 1500 )
    
        socket.on( "People_Count" ,(count, warningThreshold, alertThreshold, cameraName, ts) => {
            if( cameraName === data.cameraId)
            {
                setCurrentReading(parseInt(count))
                setWarningThreshold(parseInt(warningThreshold))
                setAlertThreshold(parseInt(alertThreshold))
                setHistory( hist => [ ...hist , { reading : parseInt(count) , ts : parseInt(ts) } ] )
                
            }
        } )
            
        socket.on( "Update_Mode" ,(mode) => {
            setMode(mode)
        } )

            
        socket.on( "Update_Time" ,(ts) => {
            try{
                setRequestedTime(ts)
            }
            catch (e){
                console.log("History error" , e , hist)
            }
        } )
        socket.connect()
    } , [] )

    return <div className={clsx('flex min-w-64 h-80 bg-gradient-to-br rounded-xl p-0.5 shadow-lg shadow-blue-500/70',
        { "from-yellow-500 to-orange-500 shadow-yellow-500/70" : (currentReading >= warningThreshold && currentReading < alertThreshold) },
        { "from-red-500 to-red-500 shadow-red-500/70" : currentReading >= alertThreshold },
        { "from-pink-500 via-purple-500 to-cyan-500" : currentReading < warningThreshold }
    )}>
            
            <Handle
                type="source"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />             
            <Handle
                type="target"
                position={Position.Right}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />            
            <Handle
                type="target"
                position={Position.Bottom}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <div className={clsx('flex flex-col w-full rounded-xl p-2',
                { "bg-black/80" : (currentReading >= warningThreshold && currentReading < alertThreshold) },
                { "bg-black/50" : currentReading >= alertThreshold },
                { "bg-black/90" : currentReading < warningThreshold }
            )}>
            <p className='text-xs text-gray-400'>Camera : {data.cameraId}</p>
            <div className='my-2 bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 w-full h-36 rounded-lg p-0.5'>
            <div className='bg-black/80 w-full h-full mt-auto rounded-lg overflow-hidden'>
                { mode !== "Current"  && <Image src="/camera.png" height="736" width="736" className='h-full w-full' style={{objectFit: 'cover'}} alt="Camera"/> }
                { mode === "Current"  && <img src={imageUrl} height="736" width="736" className='h-full w-full' style={{objectFit: 'cover'}} alt="Camera"/> }
            </div>
            <div className='text-gray-300 text-sm text-center mt-2'>{mode}</div>
            <div className='px-4 place-self-center font-bold text-gray-300 text-5xl text-center'>{(mode === "Current") ? currentReading : playbackReading}</div>            
            <div className='grid grid-cols-2 grid-rows-2 place-items-center text-s mt-2'>
                <div className='py-0 justify-self-center text-yellow-500 text-sm'>Warning</div>
                <div className='py-0 justify-self-center text-red-500 text-sm'>Alert</div>
                <div className='py-0 px-4 justify-self-center text-yellow-500 text-sm'>{warningThreshold}</div>
                <div className='py-0 px-4 justify-self-center text-red-500 text-sm'>{alertThreshold}</div>
            </div>
            </div>
            </div>
        </div>
})