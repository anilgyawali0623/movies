import React , {useState, useEffect}from 'react'
import {createBrowserRouter,BrowserRouter,Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NowShowingMovie from './pages/NowShowingMovie'
 
function App() {

  return (
    <div className="bg-[url('../public/asset2.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center flex-col ">
      <BrowserRouter future={{ v7_startTransition: true }}>
      
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<h1>About</h1>}/>
          <Route path='/contact' element={<h1>Contact</h1>}/>
          <Route path='/offer' element={<h1>offer</h1>}/>
          <Route path='/now-showing' element={<h1>now showing</h1>}/>
          <Route path='/upcoming' element={<h1>upcoming</h1>}/>
          <Route path='/now-showing-movie/:movieId' element={<NowShowingMovie/>}/>





          </Routes>     
      </BrowserRouter>

    </div>
  )
}

export default App
