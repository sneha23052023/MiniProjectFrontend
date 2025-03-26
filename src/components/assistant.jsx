import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/authcontext';
import { getAssistantChat,updateAssistantChat } from '../context/dbcontext';

export default function Assistant({ code, darkmode, addHintToEditor }) {
  const isInitialHintGiven = useRef(false);
  const {user} = useContext(AuthContext)
  const type = useRef(0)
  const [hints, setHints] = useState([]);
  useEffect(()=>{
    getAssistantChat(user).then((res) => setHints(res))
    
  },[])
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
        console.log(hints)
        updateAssistantChat(user,[...hints,response.data])
        // addHintToEditor(response.data)
      })
  }
  return (
    <div className={`shadow-2xl font-mono h-[95vh] ${darkmode ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'}`}>
      <span className='flex border-b-4 items-center justify-center'>
        Assistant
        <button onClick={() => {
          sendPrompt(code);
        }} className='absolute right-4 rounded-md  bg-blue-300 px-4 '>Help</button>
        <button onClick={() => {
          updateAssistantChat(user,[]).then(()=>setHints([]))
        }} className='absolute right-24 rounded-md  bg-blue-300 px-4 '>Clear</button>
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


