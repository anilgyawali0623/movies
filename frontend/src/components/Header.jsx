import React from 'react'
import UpperNavbar from './UpperNavbar'
import LowerNavbar from './LowerNavbar'

function Header() {
  return (
    <div className='w-full h-32 bg-[#414042] p-5 fixed top-0 z-50'>
      
      <UpperNavbar/>
      {/* <LowerNavbar/> */}
    </div>
  )
}

export default Header
