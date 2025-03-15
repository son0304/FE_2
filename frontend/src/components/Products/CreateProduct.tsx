import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../interface/IProduct';

const CreateProduct = () => {

  const [products, setProducts] = useState<IProduct[]>([]);

  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    // console.log({ name, value });

  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:3000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => setProducts([...products, data]))
      .then(() => navigate("/admin/product"));

  }
  return (
    <div className="container">
      <h1>Create Product</h1>

      <div className="card-body">
        <form className="form" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-6 mt-2">
              <label htmlFor="">Name</label>
              <input type="text" name="name" className="form-control" onInput={inputData} />
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="">Price</label>
              <input type="number" name="price" className="form-control" onInput={inputData} />
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="">Description</label>
              <input type="text" name="description" className="form-control" onInput={inputData} />
            </div>
            <div className="col-6 mt-2">
              <label htmlFor="">Image</label>
              <input type="text" name="image" className="form-control" onInput={inputData} />
            </div>
          </div>
          <div className="col-12 mt-2 text-center">
            <button className='btn btn-primary m-2' type='submit'>Create</button>
          </div>
        </form>
      </div>

    </div>

  )
}

export default CreateProduct