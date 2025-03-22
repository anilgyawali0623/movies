import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NowShowingMovie from './pages/NowShowingMovie'
import MainLayout from './pages/MainLayout'

function App() {
  return (
    <div className="bg-[url('../public/asset2.jpeg')] bg-cover bg-center min-h-screen">
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="now-showing-movie/:id" element={<NowShowingMovie />} />
          </Route>
          <Route path="/now-showing" element={<h1 className="text-white">Now Showing</h1>} />
          <Route path="/upcoming" element={<h1 className="text-white">Upcoming</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
