import React from 'react'

export default function Todo({item, id, setCompleted}) {
    const checkStyle={
        transform: "scale(2)",
        backgraundColor:"red"
    }
    function handleCheck(event){
  let active = event.target.checked
  setCompleted(id, active )

   }
    
  return (
     <div className='mx-5'>
        <div className='row ms-5 '>
           <div className='col-md-1 ms-5'>
             <input className='form-check-input' id={'checkbox'+item.id} style={checkStyle} type="checkbox" checked={item.completed}  onChange={handleCheck}/>
           </div>
           <div className='col-md-10'><h4><label className='form-check-label' htmlFor={'checkbox'+item.id}>{item.title}</label></h4></div>
           </div>
    </div>
  )
}

