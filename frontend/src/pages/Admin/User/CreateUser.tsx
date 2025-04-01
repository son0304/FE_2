import { Form, Input, Select, Button, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { usePostResource } from "../../../Hooks/useResource";

const CreateUser = () => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const { mutate: postUser } = usePostResource("users");

  const onSubmit = (values: any) => {
    postUser(values, {
      onSuccess: () => {
        form.resetFields();
        navigator("/admin/user");
      },
    });
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card title="Create User" className="shadow-lg p-4 rounded">
          <Form form={form} onFinish={onSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please enter a username" }]}
                >
                  <Input placeholder="Enter username" />
                </Form.Item>
              </Col>
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
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input placeholder="Enter name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: "Please enter phone" }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter an address" }]}
                >
                  <Input placeholder="Enter address" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
            </Row>

            <Row>
              <Col>
                <Button type="primary" htmlType="submit" className="me-2">
                  Create User
                </Button>
                <Button type="default" onClick={() => navigator("/admin/user")}>Back</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateUser;