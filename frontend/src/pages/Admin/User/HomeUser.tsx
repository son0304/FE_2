import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeUser = () => {
  return (
    <div>
      <h1 className=' text-center mb-5 p-4 bg-success'> User Manager </h1>
      <Outlet />
    </div>
  )
}

export default HomeUser

