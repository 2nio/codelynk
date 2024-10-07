export const registerCode = `import React from 'react'
import './CSS/Register.css'
import { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import { IoMailSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <div className='Reg_div_main' >
            <h3>Sign up</h3>
            <div className='Reg_div_form'>
                <div className='Reg_div_input'>
                    <FaUser size={'1rem'} className='Reg_inputIcon' />
                    <input onChange={(e) => setUsername(e.target.value.toLowerCase())}
                        type='text' placeholder='Username' />
                </div>
                <div className='Reg_div_input'>
                    <IoMailSharp size={'1.1rem'} className='Reg_inputIcon' />
                    <input onChange={(e) => setEmail(e.target.value)}
                        type='email' placeholder='Email' />
                </div>
                <div className='Reg_div_input'>
                    <HiLockClosed size={'1.2rem'} className='Reg_inputIcon' />
                    <input onChange={(e) => setPassword(e.target.value)}
                        type='password' placeholder='Password' />
                </div>
                <button onClick={authAccount} type='submit'>Create account</button>
                <Link to={'/login'} className='Reg_div_alrHaveAcc'>
                    Already have an account
                </Link>
            </div>
        </div >
    )
}

export default Register`