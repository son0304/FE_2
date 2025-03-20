import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { data } from "react-router-dom";
import { IUser } from "../interface/IUser";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const fetUser = async ()=>{
    const res = await axios.get<IUser[]>(`http://localhost:3000/users`)
    return res.data;

}
const App: React.FC = () => {
const navigator = useNavigate();


  const onFinish = async (users: any) => {
    const user  = await fetUser()
    user.map((u)=>{
      const check = u.username === users.username && u.password === users.password;
      if(check){
        localStorage.setItem("token",u.token);
        localStorage.setItem("role",u.role);
        localStorage.setItem("user", JSON.stringify(u));

        if(u.role === "admin"){
          navigator("/admin");
        }else if(u.role === "user"){
          navigator("/"); 
          
        }
      }
    })    
    
        
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }} // Đặt chiều cao full màn hình
    >
      <div
        style={{
          padding: "30px",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "360px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
