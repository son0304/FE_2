import React, { useEffect, useState } from 'react'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  const onDelete = (id:number) => {
    if(confirm("Xóa?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      }).then(() => setProducts(products.filter((item) => {
        return item.id !== id;
        alert('Thành công')
      })))
    }
  }
  return (
    <>

      <h1>Products List</h1>
      <button className='btn btn-primary'>Create</button>
      <table className='table'>
        <thead>
          <tr >
            <th>Id</th>
            <th>Name</th>
            <th>price</th>
            <th>description</th>
            <th>image</th>
            <th className=' col-3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => {
            return (
              <tr key={Number(p.id)}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td><img src={p.image} alt="" /></td>
                <td>
                  <button className='btn btn-primary'>Detail</button>
                  <button className='btn btn-danger mx-2' onClick={() => onDelete(p.id)}>Delete</button>
                  <button className='btn btn-success'>Update</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default ProductList