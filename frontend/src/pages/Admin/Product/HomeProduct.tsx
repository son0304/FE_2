import { Outlet } from 'react-router-dom'

const HomeProduct = () => {
  return (
    <div>
      <h1 className='m-3'> Product Manager </h1>
        <Outlet/>
    </div>
  )
}

export default HomeProduct;