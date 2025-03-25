import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../../interface/IUser";
import { Button, Table, TableProps, message } from "antd";
import { Link } from "react-router-dom";
import userApi from "../../../service/UserApi";


// Hàm gọi API lấy danh sách user
const ListUser = () => {
  const api = new userApi()
  const query = useQueryClient();


  const getUser = async () => {
    return  await api.getUser();
  };

  const deleUser = async (id: any) => {
    return await api.deleteUser(id);
  }

  const mutation = useMutation({
    mutationFn: deleUser,
    onSuccess: () => {
      message.success("Xóa thành công")
      query.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      message.error("Xóa thất bại")
    }
  })
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

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
      render: (_, user:IUser) => (
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
