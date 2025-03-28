import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../../interface/IUser";
import { Button, Table, TableProps, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteResource, useListResources } from "../../../Hooks/useResource";


// Hàm gọi API lấy danh sách user
const ListUser = () => {
  const  navigate = useNavigate();

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
      align: "center", // ✅ Căn giữa cột
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Action",
      key: "action", // ✅ Thêm key
      align: "center",
      render: (_, user: IUser) => (
        <>
          <Link to={`/admin/user/update/${user.id}`}>
            <Button type="primary">Update</Button>
          </Link>

          <Button danger style={{ marginLeft: 10 }} onClick={() => mutation.mutate(user.id)}>
            Delete
          </Button>
        </>


      ),
    },
  ];

  return (

    <div>
      <Link to="/admin/user/create">
        <Button type="primary">Create</Button>
      </Link>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </div>
  );
};

export default ListUser;
