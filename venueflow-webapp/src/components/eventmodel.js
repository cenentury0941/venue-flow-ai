import { ALERT, INFO, WARN } from "@/utils/events";
import formatTimestamp from "@/utils/timeformat";
import clsx from "clsx";

export default function EventsModel({eventInfo}){
    return <div className={clsx( "mb-3 relative bg-gradient-to-br rounded-xl p-1 hover:p-2 transition-all duration-500 select-none",
        { "from-cyan-500 to-blue-500" : eventInfo.type == INFO },
        { "from-yellow-500 to-orange-500" : eventInfo.type == WARN },
        { "from-orange-500 to-red-500" : eventInfo.type == ALERT },
     )}>
    <div className={clsx( "flex flex-col rounded-xl p-5 hover:p-4 transition-all duration-500 " ,
        { "bg-gradient-to-br from-black/90 to-black/60 hover:from-black hover:to-black" : eventInfo.type == ALERT },
        { "bg-black/90 hover:bg-black" : eventInfo.type != ALERT }
     )}>
    <h4 className={clsx("text-base font-semibold mb-1 capitalize",
        { "text-red-500" : eventInfo.type == ALERT },
        { "text-white" : eventInfo.type != ALERT })}>
        {
        eventInfo.type == INFO ? "Information" : (eventInfo.type == WARN ? "Warning!" : "ALERT")
        }
    </h4>
    <div className="flex flex-row">
    <p className={clsx("text-sm font-normal leading-5 mb-2 mr-auto",
        { "text-sky-500" : eventInfo.type == INFO },
        { "text-yellow-500" : eventInfo.type == WARN },
        { "text-white" : eventInfo.type == ALERT })
    }>{eventInfo.details}</p>
        <p className={clsx("text-sm font-normal leading-5 mb-2",
        { "text-sky-500" : eventInfo.type == INFO },
        { "text-yellow-500" : eventInfo.type == WARN },
        { "text-white" : eventInfo.type == ALERT })
    }>{formatTimestamp(parseInt(eventInfo.ts))}</p>
    </div>
    </div>
    </div>
}