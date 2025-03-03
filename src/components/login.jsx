import React, {  useState } from 'react'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/dbconfig'
function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const createUser = async () =>{
        createUserWithEmailAndPassword(auth,email,password).then((usercred) => {
            console.log(usercred)
        }).catch((Error) => {
            alert(Error)
        })
    }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
        <form className=''>
            <span>Email : <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' required/></span>
            <span>Password : <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' required/></span>
            <button type='button' onClick={createUser}> Submit </button>
        </form>
    </div>

  )
}

export default Login
