"use client";

import { login , isLoggedIn } from "@/utils/apis/login";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { dashboard_url } from "@/utils/urls";

export default function Home() {
  const [ user , setUser ] = useState("")
  const [ password , setPassword ] = useState("")
  const [ loginState , setLoginState ] = useState({loginState : "LOADING"})
  const router = useRouter();

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect( () => {
    isLoggedIn(setLoginState)
  } , [] ) 

  useEffect( () => {
    if(loginState.loginState == "SUCCESS")
    {
      router.push(dashboard_url)
    }
  } , [loginState] )

  return (
    <div className="grid w-screen h-screen content-center justify-center"
    style={{ backgroundImage: `url(${"/venue_bg_light.jpeg"})`, backgroundSize: 'cover'}}>
      <div className="bg-transparent p-1 rounded-[32px] shadow-cyan-500/50 bg-gradient-to-br from-pink-500/80 via-purple-500/80 to-cyan-500/80">
      <div className="grid grid-cols-1 grid-rows-3 place-items-center bg-gradient-to-br from-black/90 to-gray-900/90 py-10 px-16 rounded-[32px]">
      
      <h2 className="flex gap-2 text-6xl w-full font-bold justify-center">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">VenueFlow</div> <div className="text-white">AI</div>
      </h2>
      
      <h2 className="text-white/80 flex gap-2 text-2xl text-center w-full font-light pt-5">
      Intelligent Occupancy and Crowd Traffic Monitoring <br/> with Safety Alerts
      </h2>

      { (loginState.loginState != "LOADING") &&
      <div className="flex pt-10 w-full justify-center">
      <div className="relative w-96">
      <label className="flex  items-center mb-2 text-white text-xs font-medium">User <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path></svg>
      </label>
      <input onChange = { handleUserChange } type="text" id="default-search" className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-white bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" placeholder="username" required="" />
      </div>
      </div>
      }
      
      { (loginState.loginState != "LOADING") &&
      <div className="flex pt-5 w-full justify-center">
      <div className="relative w-96">
      <label className="flex  items-center mb-2 text-white text-xs font-medium">Password <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path></svg>
      </label>
      <input onChange = { handlePasswordChange } type="password" id="default-search" className="block w-full px-4 py-2 text-sm font-normal shadow-xs text-white bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none leading-relaxed" placeholder="password" required="" />
      </div>
      </div>
      }

      <span className={clsx("text-s text-red-400 font-normal py-2 block" , { "opacity-0" : loginState.loginState != "ERROR" })}>{loginState.errorString}</span>

      { (loginState.loginState != "LOADING") &&
      <button
      onClick={ () => { login( { username : user, password : password, setCookie : true } , setLoginState ) } }
      className="mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm text-white font-semibold rounded-full group bg-gradient-to-br from-pink-500/80 via-purple-500/80 to-cyan-500/80 group-hover:bg-transparent hover:text-white">
      <span
        className="relative py-2 px-10 transition-all ease-in duration-75 bg-gray-900 rounded-full group-hover:bg-opacity-0">
        Login
      </span>
      </button>
      }
      </div>
      </div>
    </div>
  );
}
