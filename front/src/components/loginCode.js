export const loginCode = `import React from 'react'
import './CSS/Register.css'
import { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    return (
        <div className='Reg_div_main'>
            <h3>Log in</h3>
            <div className='Reg_div_form'>
                <div className='Reg_div_input'>
                    <FaUser size={'1rem'} className='Reg_inputIcon' />
                    <input onChange={(e) => setUsername(e.target.value)}
                        type='text' placeholder='Username' />
                </div>
                <div className='Reg_div_input'>
                    <HiLockClosed size={'1.2rem'} className='Reg_inputIcon' />
                    <input onChange={(e) => setPassword(e.target.value)}
                        type='password' placeholder='Password' />
                </div>
                <button onClick={authAccount}>Log in</button>
                <Link to={'/register'} className='Reg_div_alrHaveAcc'>
                    Don't have an account
                </Link>
            </div>
        </div>
    )
}

export default Login`