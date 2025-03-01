import axios from 'axios'
import React, { useRef, useState } from 'react'


export default function Assistant(code,darkmode) {
  const isInitialHintGiven= useRef(false);
  const type = useRef(0)
  const [hints, setHints] = useState([]);
  const sendPrompt = async (content) =>{
    if(!isInitialHintGiven.current){
      type.current = 0;
    }
    else{
      type.current = type.current + 1;
    }
    await axios.post('http://localhost:8000/',{
      hintType : type.current,
      hintContent : content
    })
    .then((response) => {
      isInitialHintGiven.current = true
      setHints((val)=>([...val,response.data]))
    })
  }
  return (
    <div className='shadow-2xl font-mono'>
      <span className='flex border-b-4 items-center justify-center'>
        Assistant
        <button onClick={()=>{
          sendPrompt(code)
        }} className='absolute right-4 rounded-md  bg-blue-300 px-4 '>Help</button>
      </span>
      {hints.map((hint, index) => (
        <div key={index} className='p-2'>
          {hint}
        </div>
      ))}
    </div>
  )
}


