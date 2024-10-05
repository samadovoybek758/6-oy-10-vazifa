import React, { useRef } from 'react'
import http from '../../axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
  
      function Validate() {
        if (!validateEmail(emailRef.current.value)) {
          alert('email yaroqsiz');
          emailRef.current.focus()
          emailRef.current.style.outlineColor = 'red'
          return false
        }

        return true
      }
  
    function reg_btn(event) {
        event.preventDefault()

        const isValid = Validate()
        if (!isValid) {
           return 
        }

        const user ={
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
        }
        
        http.post('/api/auth/login',user,{
            headers :{
                'Content-type' : 'application/json'
            }
        })
        .then(data => {
           console.log(data.message);
            if (data.message === "success") {
                localStorage.setItem('token', data.token)
                navigate('/')
            }else(
                alert(data.message)
            )
        })
        .catch(err =>{
            console.log(err);
        })
    }

  return (
    <div>
        <form className='w-96 flex flex-col border border-solid border-blue-600 rounded-md p-4 mx-auto my-32 gap-3'>
            < input ref={emailRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="text" placeholder='Enter email...' />
            < input ref={passwordRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="password" placeholder='Enter password...' />
            <button onClick={reg_btn} className='py-2 px-3 border-none bg-slate-400 rounded-md text-white'>Login</button>

        </form>
    </div>
  )
}

export default Login