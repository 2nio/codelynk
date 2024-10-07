import './App.css';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Component from './components/Component';
import CreateComponent from './components/CreateComponent';
import LikedComp from './components/LikedComp';

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/component/*' element={<Component />}/>
      <Route path='/create/*' element={<CreateComponent />}/>
      <Route path='/liked' element={<LikedComp />}/>
      <Route path='/' element={<Home />}/>
    </Routes>
    </>
  );
}

export default App;
