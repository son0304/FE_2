import { Button, Image, message, Table, TableProps } from "antd";
import { IProduct } from "../../../interface/IProduct";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

const ListProduct = () => {

    const query = useQueryClient();

    const getProduct = async () => {
        const res = await axios.get<IProduct[]>(`http://localhost:3000/products`);
        return res.data;
    };

    const deleteProduct = async (id: any) => {
        await axios.delete(`http://localhost:3000/products/${id}`);
    }

    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            message.success("Xóa thành công"),
            query.invalidateQueries({ queryKey: ['products'] });
        },
        onError: () => {
            message.error("Xóa thất bại")
        }
    })

    const {data} = useQuery({
        queryKey: ['products'],
        queryFn: getProduct,
    });

    const columns: TableProps<IProduct>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center', 
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center', 
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center', 
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center', 
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
              <Image
                width={100}
                src={image}
                alt="Product"
              />
            ),
          },
        {
            title: 'Action',
            key: 'action',
            align: 'center', 
            render: (_, product:IProduct) => (
                <>
                    <Link to={`/admin/products/update/${product.id}`}>
                        <Button type="primary">Update</Button>
                    </Link>

                    <Link to={`/admin/products/detail/${product.id}`}>
                        <Button type="default">Detail</Button>
                    </Link>

                    <Button danger onClick={() => mutation.mutate(product.id)}>Delete</Button>
                </>
            ),  
        },
    ];
    return (
        <div>
            <Link to={`/admin/products/create`}>
                <Button type="primary">Create</Button>
            </Link>
            <Table columns={columns} dataSource={data} rowKey="id"/>
        </div>
    )
}


export default ListProduct;