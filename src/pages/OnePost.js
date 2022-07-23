import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { DoGet } from '../service'

export default function OnePost() {
  async function getOnepost(){
    let res = await DoGet("/posts/"+ OnePost.id)
    setOnePost(res)
     }
  const [onePost, setOnePost] = useState({})
  let OnePost = useParams()

useEffect(()=>{
   getOnepost()
}, [])

  return (
  <div>
    <div>OnePost</div>
    <div className='row'>
      <div className='col-md-4 offset-4'>
        <div className='card post-card'>
            <div className='card-header text-center bg-dark text-white'  style={{height: "4rem"}}>{onePost.title}</div>
            <div className='card-body'  style={{height: "15rem"}}>{onePost.body}</div>
        </div>
      </div>
    </div>
  </div>
  )
}
