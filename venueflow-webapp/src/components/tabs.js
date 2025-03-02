"use client";

import { base_url, dashboard_url, events_viewer_url, mobile_connect_url, playback_view_url } from "@/utils/urls";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Tabs({router}){
    const tabs = [ { link : dashboard_url , text : "Dashboard" } , { link : events_viewer_url , text : "Events Viewer" }, { link : mobile_connect_url , text : "Mobile Connect" } , { link : playback_view_url , text : "Playback View" } ]
    const [selectedTab, setSelectedTab] = useState(0)

    useEffect( () => {
        if(selectedTab == 0)
        {
            router.push(dashboard_url)
        }
    } )

    return  <div className="tabs">
    <div className="flex ">
    <ul className="flex flex-wrap transition-all duration-300 overflow-hidden">
     {
        tabs.map( (value, index) => {
            return <li key={value.link}>
              <Link href={value.link} onClick={ () => {setSelectedTab(index)} } 
              className={clsx("inline-block py-2 px-6 text-transparent bg-white hover:bg-gradient-to-r hover:to-pink-500 hover:from-purple-500 font-bold",
                { "bg-clip-padding rounded-full group bg-gradient-to-r from-purple-700 to-pink-700 text-white" : index==selectedTab },
                { "bg-clip-text" : index != selectedTab })}>
                {value.text}
                </Link>
            </li>
        } )
     }
    </ul>
    </div>
    </div>
}