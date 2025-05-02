// import { useState, useEffect } from 'react';

// export default function FetchingAnimation() {
//   const [progress, setProgress] = useState(0);
  
//   // Simulate loading progress
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 150);
    
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className='flex flex-col items-center justify-center h-full min-w-full'>    <div className="flex flex-col items-center justify-center min-h-64 w-full">
//       {/* Top section with icons and text */}
//       <div className="flex items-center justify-center mb-8 relative">
//         {/* Rotating circle with dot */}
//         <div className="relative">
//           <div 
//             className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"
//             style={{ animationDuration: '1.5s' }}
//           />
//           <div className="absolute top-0 left-1/2 w-3 h-3 bg-indigo-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
//         </div>
        
//         {/* Text */}
//         <div className="ml-6">
//           <h3 className="text-xl font-bold text-gray-800">Fetching Contests</h3>
//           <p className="text-gray-600">Finding upcoming programming challenges...</p>
//         </div>
//       </div>
      
//       {/* Progress bar */}
//       <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-2">
//         <div 
//           className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
//           style={{ width: `${progress}%` }}
//         />
//       </div>
      
//       {/* Source site logos */}
//       <div className="flex items-center justify-center mt-8 space-x-6">
//         {['Codeforces', 'LeetCode', 'HackerRank', 'AtCoder'].map((site, index) => (
//           <div 
//             key={site} 
//             className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-md
//                       ${index % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}`}
//             style={{ animationDuration: `${1 + index * 0.2}s`, animationDelay: `${index * 0.1}s` }}
//           >
//             <span className="font-bold text-xs text-gray-700">{site[0]}</span>
//           </div>
//         ))}
//       </div>
      
//       {/* Animated typing dots */}
//       <div className="flex items-center mt-6">
//         <span className="text-gray-500">Connecting to servers</span>
//         <span className="inline-flex ml-2">
//           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0s' }}></span>
//           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
//           <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
//         </span>
//       </div>
//     </div></div>
//   );
// }

"use client"

import { useEffect, useState } from "react"
import { Code2, Trophy, Clock, Calendar, Server } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Loader({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6", className)}>
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-center gap-3 animate-pulse">
          <Code2 className="h-8 w-8 text-emerald-500" />
          <Trophy className="h-8 w-8 text-amber-500" />
          <Server className="h-8 w-8 text-rose-500" />
        </div>

        <h2 className="text-xl font-bold text-center">Loading Contests</h2>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse flex flex-col space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Fetching contests from Codeforces, LeetCode, Codechef, and more...
        </p>
      </div>
    </div>
  )
}
