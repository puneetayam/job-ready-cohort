import React from 'react'
import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import About from './components/About';


function App() {
  return (
    <div className='App'>
      <h2>App</h2>
      <Routes>
        <Route path='/' element={<Nav />} />
        <Route path='/about' element={<About />} />
      </Routes>

    </div>

  )
}

export default App