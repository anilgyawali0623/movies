import React from 'react'
import UpperNavbar from './UpperNavbar'
import LowerNavbar from './LowerNavbar'
import SignUpPage from './SignUp'
 import { useSelector } from 'react-redux'
import { showSignUp } from '../redux/user/userSlice'
function Header() {
   const isvisible= useSelector((state)=> state.user.isSignUpVisible);
    console.log("is visible ",isvisible)
  return (
    <div className='w-full h-32 bg-[#414042] p-5 fixed top-0 z-50'>
      
      <UpperNavbar/>
      <LowerNavbar/>
{
isvisible && 
       <SignUpPage/>
}
      
    </div>
  )
}

export default Header
