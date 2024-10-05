import React, { useRef, useState } from 'react'
import http from '../../axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const emailRef = useRef()
    const fnameRef = useRef()
    const lnameRef = useRef()
    const passwordRef = useRef()
    const repasswordRef = useRef()

    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
  
      function Validate() {
        if (fnameRef.current.value.length <3) {
          alert("username yaroqsiz")
          fnameRef.current.focus()
          fnameRef.current.style.outlineColor = 'red'
          
        }
        if (lnameRef.current.value.length <3) {
            alert("username yaroqsiz")
            lnameRef.current.focus()
            lnameRef.current.style.outlineColor = 'red'
            return false
          }
        if (!validateEmail(emailRef.current.value)) {
          alert('email yaroqsiz');
          emailRef.current.focus()
          emailRef.current.style.outlineColor = 'red'
          return false
        }
  
        if (passwordRef.current.value != repasswordRef.current.value) {
          alert('parolda muammo bor')
          repasswordRef.current.focus()
          repasswordRef.current.style.outlineColor = 'red'
          return false
        }
        return true
      }
  
    function reg_btn(event) {
        event.preventDefault()
        setloading(true)

        const isValid = Validate()
        if (!isValid) {
           return 
        }

        const user ={
            "email": emailRef.current.value,
            'firstName': fnameRef.current.value,
            "lastName": lnameRef.current.value,
            "password": passwordRef.current.value,
            "confirmPassword": repasswordRef.current.value
        }
        
        http.post('/api/auth/register',user,{
            headers :{
                'Content-type' : 'application/json'
            }
        })
        .then(data => {
            navigate('/login')
            if (data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi") {
                navigate('/login')
            }else{
                alert(data.message)
            }
        })
        .catch(err =>{
            console.log(err);
        })
        .finally(function () {
          setloading(false)
        }
        )
    }

  return (
    <div>
        <form className='w-96 flex flex-col border border-solid border-blue-600 rounded-md p-4 mx-auto my-32 gap-3'>
            < input ref={emailRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="text" placeholder='Enter email...' />
            < input ref={fnameRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="text" placeholder='Enter firstname...' />
            < input ref={lnameRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="text" placeholder='Enter lastname...' />
            < input ref={passwordRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="password" placeholder='Enter password...' />
            < input ref={repasswordRef} className='py-2 px-3 rounded-md border border-solid border-blue-400' type="password" placeholder='Enter replay password...' />
            <button disabled= {loading} onClick={reg_btn} className='py-2 px-3 border-none bg-slate-400 rounded-md text-white'>{loading ? "LOADING" : "Register"}</button>

        </form>
    </div>
  )
}

export default Register