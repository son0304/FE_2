import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeUser = () => {
  return (
    <div>
      <h1 className='m-3'> User Manager </h1>
        <Outlet/>
    </div>
  )
}

export default HomeUser