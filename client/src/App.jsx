import React from 'react';
import { BrowserRouter , Route, Link, Routes } from 'react-router-dom'
import {logo} from './assets';
import {mylogo} from "./assets"
import {Home, CreatePost,Userin} from './pages';
// import './styles.css'
const App = () => {
  return (
    <BrowserRouter>
    <div className='bg-gradient-to-r from-pink-400 to-blue-400'>
    
    <header className='w-full flex justify-between items-center  sm:px-8 px-4 py-4'>
    <Link to='/'>
    <img src={mylogo} alt="mylogo" className='w-72 object-contain'/>
    
    </Link>
    
    </header>
    

    <main className='sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/userin/create-post' element={<CreatePost/>} />
      <Route path="/userin" element={<Userin/>}/>
    </Routes>
    </main>
    </div>
    </BrowserRouter>
  )
}

export default App