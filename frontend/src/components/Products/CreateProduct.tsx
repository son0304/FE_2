import { Button, Form, InputNumber, message } from 'antd';
import { IProduct } from '../../interface/IProduct';
import Input from 'antd/es/input/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

function CreateProduct() {

  const navigate = useNavigate();

  const newProduct = async(data: IProduct) =>{
    await axios.post(`http://localhost:3000/products`, data);
  }

  const {mutate} = useMutation({
    mutationFn: newProduct,
    onSuccess: () => {
      message.success("Create product successfully");
      navigate("/admin/product")
    },
    onError: () => {
      message.error("Create product failed");
    }
  })
  function onFinish(values: IProduct) {
    mutate(values);
    
  }
    return (
      <>
        <h1>Create Product</h1>
        <Form onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input your price!' }, { type: 'number', min: 0 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input your description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please input your image!' }]}>
            <Input />
          </Form.Item>
          <Button htmlType='submit'>Create</Button>
        </Form>
      </>
    )
  

}

export default CreateProduct;