import React from 'react'

function Card(props) {
   
    const{description,name,color} = props.data
  return (
    <div className='card w-64 bg-slate-500 px-3 py-2 rounded-md '>
        <h1 className='text-white text-2xl font-serif'>{name}</h1>
        <h1 className='text-white text-2xl font-serif'>{description}</h1>
        <h1 className='text-white text-2xl font-serif'>{color}</h1>

    </div>
  )
}

export default Card