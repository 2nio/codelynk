import React, { useState, useEffect, useRef } from 'react'
import './CSS/Auth.css'
import axios from 'axios';
import { useSignout } from '../hooks/useSignout';
import { FaRegUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LuHeart } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { useFetch } from '../hooks/useFetch';
import { IoIosArrowDown } from "react-icons/io";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Authentification() {

  const [dropmenu, setDropMenu] = useState(false)
  const [showDiv, setShowDiv] = useState(false)
  const dropmenuRef = useRef()
  const { data: user, loading: loadingUser, fetchData: fetchUser } = useFetch('user')
  const signout = useSignout('signout')
  sleep(200).then(() => { setShowDiv(true) });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropmenuRef.current.contains(e.target)) {
        setDropMenu(false)
      }
    }
    if (user && dropmenu) document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })


  if (!user && !loadingUser && showDiv) return (
    < div className='div_notauth'>
      <button className='button_login' type='button' onClick={e => window.location.href = 'http://localhost:3000/login'}>Log in</button>
      <button className='button_signup' type='button' onClick={e => window.location.href = 'http://localhost:3000/register'}>Sign up</button>
    </div >
  )

  else if (showDiv) return (
    <div ref={dropmenuRef}>
      <div className='div_profile' onClick={e => setDropMenu(!dropmenu)}>
        <div className='div_auth'><FaRegUser size={'0.8rem'} /></div>
        <p>@{user?.username}</p>
        <IoIosArrowDown size={'0.8rem'} style={{ marginRight: '8px' }} />
      </div>
      {
        <div className={`div_dropdown ${dropmenu && 'active'}`}>
          <a>Profile<FaRegUser size={'0.8rem'} /></a>
          <a href='/create' >Create<GoPlus size={'1.2rem'} /></a>
          <a href='/liked' >Liked<LuHeart size={'0.9rem'} /></a>
          <a style={{ border: 'none' }} onClick={signout}>Sign out<PiSignOut size={'1rem'} /></a>
        </div>
      }
    </div>
  )
}

export default Authentification