import React, { useEffect, useState } from 'react';
import http from '../../axios';
import Card from '../components/Card';

function Home() {
    const[data,setdata] = useState([])

    useEffect(function () {
        http.get('api/boards')
            .then(data =>{
                console.log(data);
               setdata(data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])
       
    
  return (
    <div>
        <div className="card w-96 h-80 bg-slate-500 mx-auto ">
            
        </div>
        <div>
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