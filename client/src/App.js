import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './common/Layout';
import Todos from './todos/Todos';
import Posts from './posts/Posts';
import Photos from './photos/Photos';
import Users from './users/Users';
import AddTodo from './todos/AddTodo';
import AddPost from './posts/AddPost';
import AddUser from './users/Adduser';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element = {<h1>home Page!!!!!!</h1>}/>
            <Route path='/Todos' element={<Todos />}/>
            <Route path='/AddTodo' element={<AddTodo />}/>
            <Route path='/posts' element={<Posts />}/>
            <Route path='/AddPost' element={<AddPost />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/AddUser' element={<AddUser />}/>
            <Route path='/photos' element={<Photos />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
