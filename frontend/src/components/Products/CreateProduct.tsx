import React from 'react';
import { FormProps, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IProduct } from '../../interface/IProduct';
import { Button, Input, Form } from 'antd';
import FormItem from 'antd/es/form/FormItem';


const fetchProducts = async (newProduct: IProduct) => {
  const response = await axios.post<IProduct[]>(`http://localhost:3000/products/`, newProduct, {
    headers: {
      "Content-Type": "Application/json"
    },
  });
}
const onFinish = (newProduct: IProduct) => {
  fetchProducts(newProduct);
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}
const CreateProduct = () => {
  return (
    <Form 
     name='form'
     onFinish={onFinish}
     onFinishFailed={onFinishFailed}
    >
      <Form.Item<IProduct>
        name="name"
        label="Username"
        rules={[{ required: true, message: "Vui lòng nhập username" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IProduct>
        name="image"
        label="Image"
        rules={[{ required: true, message: "Vui lòng nhập username" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IProduct>
        name="price"
        label="Price"
        rules={[{ required: true, message: "Vui lòng nhập username" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IProduct>
        name="description"
        label="Description"
        rules={[{ required: true, message: "Vui lòng nhập username" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default CreateProduct