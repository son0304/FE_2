import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

  const [input, setInput] = useState<{ name?: string; price?: number; description?: string; image?: string }>({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setInput(data)); // Cập nhật state với sản phẩm hiện tại
  }, [id]);


  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    // console.log({ name, value });

  }

  const onUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }).then(() => navigate("/admin/product"))
  }
  return (
    <div className="container">
      <h1>Update Product</h1>

      <div className="card-body">
        <form className="form" onSubmit={onUpdate}>
          <div className="row">
            <div className="col-6 mt-2">
              <label htmlFor="">Name</label>
              <input type="text" name="name" className="form-control" onInput={inputData} value={input.name} />
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="">Price</label>
              <input type="number" name="price" className="form-control" onInput={inputData} value={input.price} />
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="">Description</label>
              <input type="text" name="description" className="form-control" onInput={inputData} value={input.description} />
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="">Image</label>
              <input type="text" name="image" className="form-control" onInput={inputData} value={input.image} />
            </div>
          </div>
          <div className="col-12 mt-2 text-center">
            <button className='btn btn-primary m-2' type='submit'>Update</button>
          </div>
        </form>
      </div>

    </div>

  )
}

export default UpdateProduct