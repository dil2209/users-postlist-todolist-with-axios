import React, { useEffect, useState } from 'react'
import { DoGet, DoPost } from '../service'
import SelectUser from '../components/selectUser'
import PostModal from '../components/PostModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Posts() {
  function filter(id){
    return data.filter(item=>item.userId===parseInt(id)||!id)
  }
   
 const [posts, setPosts]=useState([])
 const [data, setData] = useState([])
 const [loading, setLoading] = useState(false)
 const [isOpen, setIsOpen] = useState(false)
 const navigate = useNavigate()

 async function getPosts(){
  const res = await DoGet('/posts')
  setPosts(res)
  setData(res)
}
async function newPost(data){
  const res = await DoPost('/posts', data)
  setData(prev=>{
   prev.unshift(res)
   setPosts([...prev])
   return prev
  })
 setLoading(false)
 
}
 
function usersPosts(userId){
 let res = filter(userId)
  setPosts(res)
}
 function openOnePost(id){
 navigate('/posts/'+id) 
}
function toggleModal(){
  setIsOpen(prevState => !prevState)
}
function addPost(event){
 event.preventDefault()
 setLoading(true)
 let postName = event.target[0].value 
 let userId = event.target[1].value 
 let postBody= event.target[2].value
 let data = {'userId':userId, "title":postName, "body":postBody}
 newPost(data)
 toggleModal()
 toast('Saving new post!!!')
}
 useEffect(()=>{
   getPosts() 
}, [])
  return (
    <div className='post-page'>
      <ToastContainer/>
      <h1 className='text-center'>Posts</h1>
      <div className='row'>
        <div className='col-md-4'>
        <SelectUser onChange={usersPosts} />
        
        </div>
        <div className='col-md-1 offset-7'>
          <button className='btn btn-dark' onClick={toggleModal}>Add</button>
        </div>
      </div>
      
      <PostModal isOpen={isOpen} loading={loading} toggle={toggleModal} save={addPost}/>
      
      <div className='row'>
      {posts.map((item, index)=>{
        return (
        <div className='col-md-3 my-4' key={index}>
          <div className='card post-card' onClick={()=>openOnePost(item.id)}>
            <div className='card-header text-center bg-dark text-white'  style={{height: "4rem"}}>{item.title}</div>
            <div className='card-body'  style={{height: "15rem"}}>{item.body}</div>
          </div>

        </div>)
      })
      }
      </div>
      </div>
  )
}
