import React from 'react';
import { Button, Image, Table } from 'antd';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IProduct } from '../../interface/IProduct';
import { Link } from 'react-router-dom';

const fetchProducts = async () => {
  const response = await axios.get<IProduct[]>(`http://localhost:3000/products`);
  return response.data;
};

const ListProduct = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>...Loading</p>;
  if (error) return <p>{error.message}</p>;

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
      render: (record: IProduct) => {
        return (
          <>
            <Link to={`/admin/products/${record.id}`}>
              <Button type="primary">Update</Button>
            </Link>
            <Link to={`/admin/products`}>
              <Button style={{ backgroundColor: "#ff4d4f", color: "white" }}>
                Detail
              </Button>
            </Link>
          </>
        )
      }
    },
  ];

  return (
    <div>
      <Link to={`/admin/product/create`}>
        <Button type='primary'>Create</Button>
      </Link>
      <Table dataSource={data?.map(item => ({ ...item, key: item.id })) || []} columns={columns} />
    </div>
  );
};

export default ListProduct;
