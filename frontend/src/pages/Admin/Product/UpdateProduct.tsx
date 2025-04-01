import { Button, Form, Input, InputNumber } from "antd";
import { IProduct } from "../../../interface/IProduct";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ProductApi } from "../../../service/ProductApi";

const UpdateProduct = () => {

    const api = new ProductApi();

    const query = useQueryClient();

    const navigate = useNavigate();

    const { id } = useParams();

    const [form] = Form.useForm();


    useEffect(() => {
        const fetchProduct = async () => {
            if(id) {
                const product = await api.getProductById(id);
                form.setFieldsValue(product);
            }
        }
        fetchProduct();
    }, [id, form]);



    const putProduct = async ({ id, newProduct }: { id: any; newProduct: IProduct }) => {
        return await api.putProduct(id, newProduct);
    }

    const { mutate } = useMutation({
        mutationFn: putProduct,
        onSuccess: () => {
            
            query.invalidateQueries({ queryKey: ['products'] });
            navigate("/admin/products");
        }
    })

    const onSubmit = (values: IProduct) => {
        mutate({ id, newProduct: values });
    }
    return (
        <>
            <h2>Update Product</h2>
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

export default UpdateProduct;