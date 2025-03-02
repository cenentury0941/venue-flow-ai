"use client";

import { logout } from '@/utils/apis/login';
import { base_url } from '@/utils/urls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Tabs from './tabs';

const Toolbar = () => {
  const [ loggedOutState , setLoggedOutState ] = useState("START")
  const router = useRouter()

    useEffect( () => {
        if(loggedOutState == "SUCCESS")
        {
            router.push(base_url)
        }
    } , [loggedOutState] )

  return (
    <header className='flex justify-spaced align-center h-fit w-full py-2 px-4'>
      <nav className='w-full bg-gray-500 p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-lg shadow-blue-800/50'>
        <ul className='flex justify-between w-full bg-black/80 py-2 px-6 rounded-full'>
        <li>
            <h2 className="flex gap-2 text-3xl w-full font-bold justify-center">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">VenueFlow</div> <div className="text-white">AI</div>
            </h2>
          </li>

          <li>
            <Tabs router={router}/>
          </li>

          <li>
          <button
            onClick={ () => { logout(setLoggedOutState) } }
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm text-white font-semibold rounded-full group bg-gradient-to-br from-violet-600 to-pink-500 group-hover:from-green-500 group-hover:to-green-300 hover:text-white">
            <span
            className="relative py-2 px-5 transition-all ease-in duration-75 bg-black rounded-full group-hover:bg-opacity-0">
            Log Out
            </span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Toolbar;
