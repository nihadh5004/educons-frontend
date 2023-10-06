import React from 'react'
import NavBar from './NavBar'
import SignupPage from './SignupComponents/SignupPage'

const Signup = () => {
  return (
    <div>
        <NavBar/>
        <SignupPage is_consultancy = {false}/>
    </div>
  )
}

export default Signup