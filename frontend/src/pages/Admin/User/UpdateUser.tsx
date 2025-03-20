
import axios from 'axios';
import React, { useEffect } from 'react';
import { IUser } from '../../../interface/IUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const putUser = async ({ id, newUser }: { id: any; newUser: IUser }) => {
    try {
      await axios.put<IUser>(`http://localhost:3000/users/${id}`, newUser, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['users'] });
      navigate("/admin/user"); // Điều hướng về danh sách user
    },
  });

  useEffect(() => {
    if (id) {
      axios.get<IUser>(`http://localhost:3000/users/${id}`)
        .then(response => {
          form.setFieldsValue(response.data);
        })
        .catch(error => console.error("Error fetching user:", error));
    }
  }, [id, form]);

  const onSubmit = (values: IUser) => {
    mutation.mutate({ id, newUser: values });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 w-50 rounded shadow-lg p-5">
        <h2>Update User</h2>
        <Form form={form} onFinish={onSubmit} layout="vertical">
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          {/* Role */}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select a role" options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">Update User</Button>
          </Form.Item>

          <Form.Item>
            <Link to="/admin/user"><Button type="default">Back</Button></Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
