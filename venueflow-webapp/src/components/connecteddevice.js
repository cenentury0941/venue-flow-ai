export default function ConnectedDevice({deviceId, onclick}){
    return <div className="mb-6 relative bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-xl p-0.5 transition-all duration-500">
    <div className="grid grid-cols-2 grid-rows-2 bg-black/90 rounded-xl p-5">
    <h4 className="text-base font-semibold text-white mb-1 capitalize transition-all duration-500 ">Device Connected</h4>
    <button className="place-self-center row-span-2 w-48 h-10 border-red-800 border-2 shadow-sm rounded-full py-1 px-2 ml-auto transition-all duration-200 text-xs text-red-500 hover:text-white hover:bg-red-800 active:transition-none active:bg-red-500 font-semibold"
    onClick={onclick}
    >Disconnect</button>
    <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-2 overflow-hidden max-w-[27ch] truncate"> Device Id : {deviceId} </p>
    </div>
    </div>
}