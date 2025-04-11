import React from 'react'
import "./signup.css"
import HeadingComp from './HeadingComp'
const Signin = () => {
  return (
    <div>
        <div className='signup'>
        <div className="container">
          < div className='row'>
           <div className = "col-lg-8 column d-flex justify-content-center align-items-center ">
              <div className='d-flex flex-column w-100 p-5'>
                <input type = "text" placeholder='Enter your username' className='p-2 my-3 input-signup' name='username'  />
                <input type = "password" placeholder='Enter your password' className='p-2 my-3 input-signup' name='password'  />
                <button className='btn-signup  btn p-2 my-3 ' >Sign In</button>
              </div>
              </div>
            <div className='  column col-left col-lg-4  d-flex justify-content-center align-items-center '>
             <HeadingComp first = "Sign" second="In"/>
            </div>
        
          </div>    
            
        </div>
    </div>
    </div>
  )
}

export default Signin