import React from 'react'
import './CSS/Register.css'
import { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IoCopyOutline, IoMailSharp } from "react-icons/io5";
import { registerCode } from './registerCode';
import CodeIDE from './CodeIDE';

function Register() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [copied, setCopied] = useState(false)

    const { error, authAccount } = useAuth('register', { username, email, password })

    function timeOut(myFunction) {
        myFunction(true)
        setTimeout(() => {
            myFunction(false)
        }, 8000);
    }

    return (
        <div className='Reg_div_parent'>
            <div className='Reg_div_code'>
                <div style={{ margin: '32px' }}>
                    <div className='Reg_div_leftTitle'>
                        <div className='Reg_div_containerLogo'>
                            <Link to={'/'} style={{
                                color: 'aliceblue', textDecoration: 'none', fontWeight: '500', fontSize: '20px', fontFamily: 'Source Code Pro', cursor: 'pointer'
                            }}>{'Byteview'}</Link>
                            <img src={require('../assets/bytelink8.png')} style={{ height: '24px', marginLeft: '2px' }} />
                        </div>
                        <p>Develop easier on the frontend. Find the designs you like along with the code.</p>
                    </div>
                    <div className='Component_div_code'>
                        <div className='Component_div_codeMenu'>
                            <p style={{ fontSize: '13px', fontWeight: '400', marginLeft: '8px' }}>Signup.jsx</p>
                            <div className='Component_div_codeMenuRight'>
                                {copied ?
                                    <p style={{ fontSize: '13px', fontWeight: '400', marginLeft: '8px' }}>Copied</p>
                                    :
                                    <IoCopyOutline
                                        className='Component_icon_copyCode'
                                        onClick={e => {
                                            navigator.clipboard.writeText(registerCode)
                                            timeOut(setCopied)
                                        }} style={{ marginRight: '8px' }} size={'1rem'} />
                                }
                            </div>
                        </div>
                        <CodeIDE code={registerCode} />
                    </div>
                </div>
            </div>
            <div className='Reg_div_main'>
                <div>
                    {error && <p style={{ color: 'rgb(181, 36, 36)' }}>{error[0]}</p>}
                </div>
                <h3>Sign up</h3>
                <div className='Reg_div_form'>
                    <div className='Reg_div_input'>
                        <FaUser size={'0.8rem'} className='Reg_inputIcon' />
                        <input onChange={(e) => setUsername(e.target.value.toLowerCase())}
                            type='text' placeholder='Username' />
                    </div>
                    <div className='Reg_div_input'>
                        <IoMailSharp size={'0.9rem'} className='Reg_inputIcon' />
                        <input onChange={(e) => setEmail(e.target.value)}
                            type='email' placeholder='Email' />
                    </div>
                    <div className='Reg_div_input'>
                        <HiLockClosed size={'1rem'} className='Reg_inputIcon' />
                        <input onChange={(e) => setPassword(e.target.value)}
                            type='password' placeholder='Password' />
                    </div>
                    <button onClick={authAccount} type='submit'>Create account</button>
                    <Link to={'/login'} className='Reg_div_alrHaveAcc'>
                        Already have an account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register