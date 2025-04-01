import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../../interface/IUser";
import { Button, Table, TableProps, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteResource, useListResources } from "../../../Hooks/useResource";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";


// Hàm gọi API lấy danh sách user
const ListUser = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useListResources("users");
  const mutation = useDeleteResource("users");

  if (isLoading) {
    return <p>...Loading</p>;
  }

  if (error) {
    return <p>Lỗi: {(error as Error).message}</p>;
  }




  const columns: TableProps<IUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 100, // Tăng độ rộng
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
      width: 250, // Tăng độ rộng
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 250, // Tăng độ rộng
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: 250, // Tăng độ rộng
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      width: 250,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200, // Tăng kích thước cột để hiển thị rõ nút
      render: (_, user: IUser) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Link to={`/admin/user/update/${user.id}`}>
            <Button color="cyan" variant="solid">
              <EditOutlined />
            </Button>
          </Link>
          <Button color="danger" variant="solid" onClick={() => mutation.mutate(user.id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (

    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3> List User</h3>
        <Link to="/admin/user/create">
          <Button color="primary" variant="solid">
          <PlusOutlined />
          </Button>
        </Link>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }} // Giới hạn số dòng hiển thị trên 1 trang
      />
    </div>
  );

};

export default ListUser;
