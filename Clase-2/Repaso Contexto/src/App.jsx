import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Carrito, Detail, Error404, Home } from './Pages'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/carrito' element={<Carrito/>}/>
        <Route path='/detail/:pid' element={<Detail/>}/>
        <Route path='/*' element={<Error404/>}/>
      </Routes>
    </>
  )
}

export default App
