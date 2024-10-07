import React, { useState } from 'react'
import Authentification from './Authentification'
import { IoSearch } from "react-icons/io5";

function TopNav({ sendSearch }) {

  const [searchField, setSearchField] = useState()

  return (
    <div className='div_top'>
      <div className='div_containerLeft'>
        <h1 onClick={e => sendSearch('')}
          style={{
            color: 'aliceblue', textDecoration: 'none', fontWeight: '500', fontSize: '20px', fontFamily: 'Source Code Pro', cursor: 'pointer'
          }}>{'Byteview'}</h1>
        <img src={require('../assets/bytelink8.png')} style={{ height: '24px', marginLeft: '2px' }} />
      </div>
      <div className='div_form'>
        <input type='text' placeholder='Search for cool code' onKeyDown={e => { if (e.key === 'Enter') sendSearch(searchField) }}
          onChange={(e) => setSearchField(e.target.value)} />
        <button type='button'><IoSearch size={'1.1rem'} /></button>
      </div>
      <div className='div_containerRight'>
        <Authentification />
      </div>
    </div>
  )
}

export default TopNav