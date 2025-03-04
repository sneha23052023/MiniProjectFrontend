import React, {  useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/dbconfig'
function Signup() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isRegister,setIsRegister] = useState(false)
    const createUser = async (e) =>{
      e.preventDefault()
        createUserWithEmailAndPassword(auth,email,password).then((usercred) => {
            alert(usercred)
        }).catch((Error) => {
            alert(Error)
        })
    }
    const loginUser = async (e) =>{
      e.preventDefault()
        signInWithEmailAndPassword(auth,email,password).then((usercred) => {
            alert(usercred)
        }).catch((Error) => {
            alert(Error)
        })
    }

  return (
    <div className="h-screen flex">
    <div className="w-full relative flex">
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-[100%] w-[100%]">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="#8ec5fc" />
            <stop offset="95%" stopColor="#e0c3fc" />
          </linearGradient>
        </defs>
        <path d="M208.09,0.00 C152.70,67.10 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z" className={`stroke-none ${isRegister ? "fill-indigo-300" : "fill-purple-300"}`} />
      </svg>
  
      <div className="absolute top-0 p-8 flex justify-between  w-full items-center">
        <h1 className="text-3xl text-indigo-900 uppercase font-bold">CodeNow!!</h1>
      <button onClick={() => setIsRegister(!isRegister)} 
        className={`border-2 ${isRegister ?"bg-indigo-300 text-indigo-900 hover:bg-purple-300 hover:text-purple-900"  : "hover:bg-indigo-300 hover:text-indigo-900 bg-purple-300 text-purple-900"} p-2 rounded transition duration-500 ease-in-out font-medium` }
          >{ isRegister? "Login" : "Signup"}
        </button>
      </div>
      <form className="absolute mezzo flex flex-col">
        <h1 className="text-5xl text-indigo-600 font-bold">
          { isRegister? "Create Your Account" : "Welcome Back"}
          </h1>
        <input className="py-2 px-4 border rounded mt-8 text-indigo-600  placeholder-indigo-600" 
          type="email" placeholder="Enter Email"
            value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className="py-2 px-4 border rounded mt-4 placeholder-indigo-600 text-indigo-600" 
        type="password" placeholder="Enter Password"
         value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className={`border-2 ${isRegister ?"bg-indigo-300 text-indigo-900 hover:bg-purple-300 hover:text-purple-900"  : "hover:bg-indigo-300 hover:text-indigo-900 bg-purple-300 text-purple-900"}  rounded transition duration-500 ease-in-out font-bold mt-2 p-2 uppercase`}
        onClick={(e) => {
          if (isRegister) {
            createUser(e)
          }else{
            loginUser(e)
          }
        }}>{ isRegister? "Signup" : "Login"}</button>
      </form>
      
    </div>
  
  </div>

  )
}

export default Signup
