import React, {useState, useEffect} from "react";
import { DoGet } from "../service";

export default function SelectUser({onChange, currentUser, setCurrentUser}) {
 
   async function getUsers(){
   const res = await DoGet('/users')
         setUsers(res)
    }
  const [users, setUsers] = useState([])
  // const [currentUser, setCurrentUser] = useState('')

 function selectUser (event){
  let id= event.target.value
  let id1 = id===''? '': parseInt(id)
  if(setCurrentUser)
  setCurrentUser(id1)
  
  if(onChange)
  onChange(id1)
 
 }
   useEffect(()=>{
      getUsers()
  },[])

  return (
    <div>
        <select className='form-select' value={currentUser} onChange={selectUser}>
            <option >Choose User</option>
            {users.map((item, index)=>(
              <option key={index} value={item.id}>{item.name}</option>
            ))}
           
        </select>
    </div>
  )
}
