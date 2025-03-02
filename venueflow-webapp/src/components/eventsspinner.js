"use client"

export default function EventSpinner(){
    return <div  className="mb-4 p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl">
        <div className="flex flex-row px-4 py-2 rounded-xl bg-black align-items-center">
        <h1 className="mr-auto place-self-center">Listening for Events...</h1>
        <div className="flex items-center justify-center">
        <svg className="animate-spin border-pink-600" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <g id="Group 1000003698">
            <circle id="Ellipse 713" cx="19.9997" cy="19.9277" r="15" stroke="black" strokeWidth="2" />
            <path id="Ellipse 714" d="M26.3311 33.528C29.9376 31.8488 32.7294 28.8058 34.0923 25.0683C35.4552 21.3308 35.2775 17.2049 33.5984 13.5984C31.9193 9.99189 28.8762 7.20011 25.1387 5.83723C21.4012 4.47434 17.2754 4.652 13.6689 6.33112" stroke="url(#paint0_linear_13416_7408)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
            <linearGradient id="paint0_linear_13416_7408" x1="0.0704424" y1="12.6622" x2="12.7327" y2="39.8591" gradientUnits="userSpaceOnUse">
                <stop stopColor="black" />
                <stop offset="1" stopColor="cyan" />
            </linearGradient>
            </defs>
        </svg>
        </div>
    </div>
    </div>
}