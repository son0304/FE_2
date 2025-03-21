import { data, useNavigate } from "react-router-dom";
import { IProduct } from "../../../interface/IProduct";
import axios from "axios";
import { Button, Form, Input, InputNumber, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const CreateProduct = () => {

    const query = useQueryClient();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const newProduct = async(data: IProduct) => {
        await axios.post(`http://localhost:3000/products`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }

    const {mutate} = useMutation({
        mutationFn: newProduct,
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['products'] });
            message.success("Them thanh cong"),
            navigate("/admin/products");
        },
        onError: () => {
            message.error("Them that bai")
        }
    }) 

    function onSubmit(values: IProduct) {
        mutate(values);
    }

    return (
        <>  
            <h1>Create Product</h1>
            <Form onFinish={onSubmit} layout="vertical" form={form}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Image" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        
        </>
    )
}

export default CreateProduct;