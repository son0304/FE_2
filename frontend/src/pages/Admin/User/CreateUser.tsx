import React from "react";
import { IUser } from "../../../interface/IUser";
import axios from "axios";
import { Form, Input, Select, Button } from "antd";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const query = useQueryClient();
  const navigator = useNavigate();
  const [form] = Form.useForm();


  
  const postUser = async (newUser: IUser) => {
    try {
      await axios.post<IUser>(`http://localhost:3000/users`, newUser, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['users'] });
      navigator('/admin/user')
    }
  });

  const onSubmit = (values: IUser) => {
    mutation.mutate(values);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="m-3 w-50 rounded shadow-lg p-5" >
        <h2>Create User</h2>
        <Form
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{
              required: true,
              message: "Please enter a username",
            }]}
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
            <Button type="primary" htmlType="submit">Create User</Button>
          </Form.Item>

          <Form.Item>
            <Link to="/admin/user"><Button type="default">Back</Button></Link>
          </Form.Item>
          

        </Form>
      </div>
    </div>
  );
};

export default CreateUser;
