import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  const onDelete = (id: number) => {
    if (confirm("Xóa?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      }).then(() => setProducts(products.filter((item) => {
        return item.id !== id;
      })))
    }
  }
  return (
    <>
      <h1>Products List</h1>
      <Link to={'/admin/product/create'}>
        <button className='btn btn-primary'>Create</button>
      </Link>
      <table className='table'>
        <thead>
          <tr >
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
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td><img src={p.image} alt="" /></td>
                <td>
                  <Link to={`/admin/product/detail/${p.id}`}>
                    <button className='btn btn-primary'>Detail</button>
                  </Link>
                  <button className='btn btn-danger mx-2' onClick={() => onDelete(p.id)}>Delete</button>
                  <Link to={`/admin/product/update/${p.id}`}>
                    <button className='btn btn-success'>Update</button>
                  </Link>
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