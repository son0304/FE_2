import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm, message } from "antd";
import { IProduct } from "../../interface/IProduct";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const onDelete = (id: string) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((item) => item.id !== id));
      message.success("Xóa sản phẩm thành công!");
    });
  };

  const columns = [

    {
      title: "Id",//Tên cột
      dataIndex: "id",//tên biến
      key: "id",//Value
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="product" width={50} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (record: IProduct) => (
        <>
          <Link to={`/admin/product/detail/${record.id}`}>
            <Button type="primary" size="small" className="mx-1">
              Chi tiết
            </Button>
          </Link>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger size="small" className="mx-1">
              Xóa
            </Button>
          </Popconfirm>

          <Link to={`/admin/product/update/${record.id}`}>
            <Button type="dashed" size="small" className="mx-1">
              Cập nhật
            </Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "2000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Danh Sách Sản Phẩm</h1>

      <Link to={"/admin/product/create"}>
        <Button type="primary" style={{ marginBottom: "10px" }}>
          Thêm Sản Phẩm
        </Button>
      </Link>

      <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductList;
