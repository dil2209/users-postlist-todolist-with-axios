import React, {useState, useEffect} from 'react'
import { DoGet } from "../service"

export default function Users() {
  async function getUsers(){
    const res = await DoGet('/users')
    setUsers(res)
 }
  const [users, setUsers] =useState([])
  useEffect(()=>{
    getUsers()
  }, [])
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
        {/* <SelectUser/> */}
        </div>
      </div>
 
      <h1 className='text-center'>Users</h1>
      <table className="table">
        <thead>
          <tr>
          <th>№</th>
          <th>UserName</th>
          <th>Email</th>
          <th>Adress</th>
          <th>Company</th>
          </tr>
        </thead>
        <tbody>
      {users.map((item, index)=>{        
        return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.address.city}</td>
          <td>{item.company.name}</td>
       </tr>)
          
        })}
        </tbody>
      </table>
      
     
    </div>
  )
}
