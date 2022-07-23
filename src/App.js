import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link} from "react-router-dom"
import Posts from './pages/Posts';
import Todos from './pages/Todos';
import Users from './pages/Users';
import OnePost from './pages/OnePost';

function App() {
  return (
    <div className="container mt-5 pt-5 ">
      <div className='text-center'>
          <Link to="/posts" className='btn btn-dark mx-2' >Posts</Link>
          <Link to="/todos" className='btn btn-dark mx-2' >Todos</Link>
          <Link to="/users" className='btn btn-dark mx-2' >Users</Link>
      </div>
         <hr></hr>
         <Routes>
         <Route path='/posts/:id' element={<OnePost/>}/>
           <Route path='/posts' element={<Posts/>}/>
           <Route path='/todos' element={<Todos/>}/>
           <Route path='/users' element={<Users/>}/>
         </Routes>
    </div>
  );
}

export default App;
