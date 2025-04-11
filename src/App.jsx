import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChannelList from './pages/ChannelList'
import Message from './pages/Message'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ChannelList />} />
        <Route path='/message/:id' element={<Message />}/>
      </Routes>
    </>
  )
}

export default App
