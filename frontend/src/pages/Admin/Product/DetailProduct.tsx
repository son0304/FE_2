import { Button, Form, Input, InputNumber } from "antd";
import { IProduct } from "../../../interface/IProduct";
import { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ProductApi } from "../../../service/ProductApi";

const DetailProduct = () => {

    const { id } = useParams();

    const [form] = Form.useForm();

    const api = new ProductApi();


    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const product = await api.getProductById(id);
                form.setFieldsValue(product);
            }
        }
        fetchProduct();
    }, [id, form]);
    return (
        <>
            <h2>Update Product</h2>
            <Form layout="vertical" form={form}>
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
                    <Link to={`/admin/products`}>
                        <Button type="default" htmlType="submit">Back</Button>
                    </Link>
                </Form.Item>
            </Form>
        </>
    )
}

export default DetailProduct;