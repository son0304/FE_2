import { useEffect } from "react";
import { IUser } from "../../../interface/IUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Row, Col, Card } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePutResource, useResourceById } from "../../../Hooks/useResource";

const UpdateUser = () => {
  const { id } = useParams() as { id: string };
  const { mutate: putUser } = usePutResource("users");
  const { data, isLoading } = useResourceById("users", id);
  const query = useQueryClient();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const onSubmit = (values: IUser) => {
    putUser(
      { id, values },
      {
        onSuccess: () => {
          form.resetFields();
          navigate("/admin/user");
        },
      }
    );
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card title="Update User" className="shadow-lg p-4">
          <Form form={form} onFinish={onSubmit} layout="vertical">
            <Row gutter={16}>
              {/* Username */}
              <Col span={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please enter a username" }]}
                >
                  <Input placeholder="Enter username" />
                </Form.Item>
              </Col>

              {/* Password */}
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter a password" }]}
                >
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              {/* Name */}
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input placeholder="Enter name" />
                </Form.Item>
              </Col>

              {/* Phone */}
              <Col span={12}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: "Please enter a phone number" }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>

            {/* Address */}
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter an address" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>

            {/* Role */}
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                placeholder="Select a role"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
              />
            </Form.Item>

            {/* Buttons */}
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" className="me-2">
                Update User
              </Button>
              <Link to="/admin/user">
                <Button type="default">Back</Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateUser;
