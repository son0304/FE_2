import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const DetailProduct = () => {

  const [input, setInput] = useState<{ name?: string; price?: number; description?: string; image?: string }>({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setInput(data)); // Cập nhật state với sản phẩm hiện tại
  }, [id]);
  return (
    <>
      <h1>Detail Product</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{input.name}</td>
            <td>{input.price}</td>
            <td>{input.description}</td>
            <td><img src={input.image} alt="" /></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default DetailProduct