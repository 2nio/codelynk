import React from 'react'
import './CSS/Register.css'
import { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IoCopyOutline } from "react-icons/io5";
import { loginCode } from './loginCode'
import CodeIDE from './CodeIDE';

function Login() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [copied, setCopied] = useState(false)

    const { error, authAccount } = useAuth('login', { username, password })

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
                    <div className='Component_div_code' >
                        <div className='Component_div_codeMenu'>
                            <p style={{ fontSize: '13px', fontWeight: '400', marginLeft: '8px' }}>Login.jsx</p>
                            <div className='Component_div_codeMenuRight'>
                                {copied ?
                                    <p style={{ fontSize: '13px', fontWeight: '400', marginLeft: '8px' }}>Copied</p>
                                    :
                                    <IoCopyOutline
                                        className='Component_icon_copyCode'
                                        onClick={e => {
                                            navigator.clipboard.writeText(loginCode)
                                            timeOut(setCopied)
                                        }} style={{ marginRight: '8px' }} size={'1rem'} />
                                }
                            </div>
                        </div>
                        <CodeIDE code={loginCode} />
                    </div>
                </div>
            </div>
            <div className='Reg_div_main'>
                <div>
                    {error && <p style={{ color: 'rgb(181, 36, 36)' }}>{error[0]}</p>}
                </div>
                <h3>Log in</h3>
                <div className='Reg_div_form'>
                    <div className='Reg_div_input'>
                        <FaUser size={'0.8rem'} className='Reg_inputIcon' />
                        <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username' />
                    </div>
                    <div className='Reg_div_input'>
                        <HiLockClosed size={'1rem'} className='Reg_inputIcon' />
                        <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                    </div>
                    <button onClick={authAccount}>Log in</button>
                    <Link to={'/register'} className='Reg_div_alrHaveAcc'>
                        Don't have an account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login