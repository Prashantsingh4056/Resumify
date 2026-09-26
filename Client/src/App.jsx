import React from 'react'
import { Outlet } from 'react-router-dom'
import Lenis from './components/LenisScroll'

function App() {
  return (
    <div>
      
      <Lenis/>
      <Outlet/>
    </div>
  )
}

export default App