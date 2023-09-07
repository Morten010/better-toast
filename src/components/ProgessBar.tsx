import React, { useEffect, useState } from 'react'

export default function ProgessBar() {
    const [progress, setProgress] = useState(0)
    const w = `w-[${progress}%]`
    useEffect(() => {
      const int = setTimeout(() => {
        setProgress(progress + 5.5)
        console.log("uno");
        
      }, 100);
      () => clearInterval(int)
    }, [progress])
    
  return (
    <div 
    className={`absolute bottom-0 left-0 w-0  h-0.5 bg-white transition-all`}
    style={{width: progress + "px"}}
    ></div>
  )
}
