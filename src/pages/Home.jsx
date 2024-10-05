import React, { useEffect, useRef, useState } from 'react';
import http from '../../axios';
import Card from '../components/Card';

function Home() {
    const[data,setdata] = useState([])

    const nameRef = useRef();
    const descRef = useRef();
    const formRef = useRef()

    function add_btn(e) {
        e.preventDefault()

        const board ={
            "name": nameRef.current.value,
            "description": descRef.current.value,
             "color": "green"
        }
       
         http.post('api/boards/create',board,{
            headers :{
                'Content-type' : 'application/json'
            }
         })
         .then(data => {
           
        })
        .catch(err =>{
            console.log(err);
        })

    }

    useEffect(() => {

        http.get('api/boards/my-boards')
            .then(data =>{
                
               setdata(data.boards)
            })
            .catch(err => { 
                console.log(err);
            })
    },[])
       
    
  return (
    <div>
        <div ref={formRef} className="card w-96 flex  flex-col gap-3 border border-solid px-4 rounded-md py-5 shadow-2xl my-6 mx-auto ">
            <input ref={nameRef} className='px-3 py-2 rounded-md w-full border border-solid border-gray-600 ' type="text" placeholder='Board nomi' />
            <input ref={descRef} className='px-3 py-2 rounded-md w-full border border-solid border-gray-600 ' type="text" placeholder='Description' />
            <select className=' w-full px-2 py-2 border border-solid border-gray-700 rounded-md' >
                <option value="green">green</option>
                <option value="red">red</option>
                <option value="red">red</option>
            </select>
            <button onClick={add_btn} className=' border-none w-full px-2 py-2 rounded-md bg-blue-500 text-white'>Board yaratish</button>
        </div>
        <div className='continer max-w-[880px] mx-auto shadow-lg py-6 px-6 flex gap-6 flex-wrap'>
        {
            data.length > 0 && data.map(function (data,index) {
                return <Card data={data} key={index}></Card>
            })
        }
        </div>
    </div>
  )
}

export default Home