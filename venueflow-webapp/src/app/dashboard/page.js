"use client";

import Link from "next/link";

export default function Dashboard(){
    const buttons = [
        {
            text : "Demo",
            link : "https://youtube.com/"
        },
        {
            text : "Installation",
            link : "https://chatgpt.com/"
        },
        {
            text : "Github",
            link : "https://github.com/"
        }
    ]

    return <div className="flex flex-col content-start w-full h-full p-4">
        <p className="mt-auto text-3xl font-bold">Welcome To</p>
        <h2 className="flex gap-2 text-7xl w-full font-bold">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">VenueFlow</div> <div className="text-white">AI</div>
        </h2>
        
        <p className="text-l mt-4">
        Managing occupancy and crowd flow in large venues is
        critical to maintaining safety, enhancing visitor
        experience, and complying with capacity regulations.
        </p>
        
        <p className="text-l mt-2">
        VenueFlow AI combines
        advanced occupancy tracking, real-time crowd traffic
        monitoring, and AI-driven safety features to provide
        actionable insights and prevent risks before they
        escalate.</p>

        <div className="flex flex-row justify-center gap-4 pb-5 pt-3">
        </div>
    </div>
}