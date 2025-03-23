import axios from 'axios'
import React, { useRef, useState } from 'react'


export default function Assistant({ code, darkmode, addHintToEditor }) {
  const isInitialHintGiven = useRef(false);
  const type = useRef(0)
  const [hints, setHints] = useState([]);
  const sendPrompt = async (content) => {
    if (!isInitialHintGiven.current) {
      type.current = 0;
    }
    await axios.post('http://localhost:8000/', {
      hintType: type.current,
      hintContent: content
    })
      .then((response) => {
        isInitialHintGiven.current = true
        type.current = 1;
        setHints((val) => ([...val, response.data]))
        addHintToEditor(response.data)
      })
  }
  return (
    <div className={`shadow-2xl font-mono h-[95vh] ${darkmode ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'}`}>
      <span className='flex border-b-4 items-center justify-center'>
        Assistant
        <button onClick={() => {
          sendPrompt(code)
        }} className='absolute right-4 rounded-md  bg-blue-300 px-4 '>Help</button>
      </span>
      <div className='h-[90vh] overflow-y-scroll'>
        {hints.map((hint, index) => (
          <div key={index} className='p-2'>
            {hint}
          </div>
        ))}
      </div>
    </div>
  )
}


