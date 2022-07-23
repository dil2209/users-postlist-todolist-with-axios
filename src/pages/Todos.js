import React, {useState, useEffect} from 'react'
import { DoGet } from '../service'
import Todo from '../components/Todo'
import SelectUser from '../components/selectUser'

export default function Todos() {
    const [todo, setTodo]= useState([])
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [todoList, setTodoList] = useState([])
    const [completed, setCompleted] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [btnDisable, setBtndisable]=useState(true)
    const [nextbtnDisable, setNextBtndisable]=useState(false)
 
    async function getTodos(){
     const res = await DoGet('/todos')
     setData(res)
     setTodo(res.filter((item,index) => index>=0 && index<10))
}
function filter(id, completed, page){
  let a = data.filter((item) => 
       (item.userId===parseInt(id)||!id) && 
       (item.completed===completed || completed===''))
       setTodoList(a) 
       return a.filter((item, index) => index>=((page-1)*10) && index<page*10)
  }  
function usersTodo(userId){
  setCurrentUser(userId)
  setPage(1)
  let res = filter(currentUser, completed, page)
  setTodo(res)
}
  function checkPage(){
    let a =todoList.length/10
  if(page===1){
      setBtndisable(true)
      setNextBtndisable(false)
   } else if(page>1){
    if(page===a){
      setBtndisable(false)
      setNextBtndisable(true)
    }else if(a>page){
      setBtndisable(false)
      setNextBtndisable(false)
    }else  if(a<page+1){
      setBtndisable(false)
      setNextBtndisable(true)
    }
   }
 }
 function changeCompleted(id, checked){
  let a = todo
  a[id].completed=checked
  setTodo([...a])
 }
   function handleCheck(event){
    let completed = event.target.checked
    setCompleted(completed)
    setPage(1)
    let a=filter(currentUser, completed, page)
   setTodo(a)
 }
   function reset(){
     setTodo(data)
     setCurrentUser('')
     setCompleted('')
     setPage(1)
   }
   useEffect(()=>{
     let res = filter(currentUser, completed, page)
     setTodo(res)
     checkPage()
     },[page])

    useEffect(()=>{
        getTodos()
    }, [])
  return (    
    <div className='ms-5'>
       <div className='row m-2'>
       <div className='col-md-2'>
          <button className='btn btn-danger' onClick={reset}>RESET</button>
        </div>
        <div className='col-md-6'>
        <SelectUser onChange = {usersTodo} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
        <div className='col-md-3 offset-1'>
        <label>  Completed
        <input className='mx-3' type='checkbox' style={{transform: "scale(2)"}} onChange={handleCheck} checked={completed}/>
       </label>
        </div>
        
      </div>
      {todo.map((item, index)=>{
        return(
          <Todo item={item} key={index} id ={index} setCompleted={changeCompleted}/>
       )})}
       <div className='row'>
        <div className='col-md-3 offset-1'><button className='btn btn-dark  px-3' onClick={()=>setPage(prev=>prev-1)} disabled={btnDisable}>{"<<"} PREV</button></div>
         <div className='col-md-3 '><h2>{page}</h2></div>
         <div className='col-md-3'>
         <button className='btn btn-dark  px-3' onClick={()=>setPage(prev=>prev+1)} disabled={nextbtnDisable}>NEXT {">>"}</button>
         </div>
        
         </div> 
     
    </div>
  )
}
