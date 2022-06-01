import { Form, Input, Button } from "antd";
import "./style.css";
import React, { useState } from "react";
import { useStores } from "../stores";

export const LogIn = () => {
  const { thanhVien } = useStores();
  const [userName, setUserName] = useState("");
  const [passW, setPassW] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  
  const handlePassWordChange = (e) => {
    setPassW(e.target.value);
  };

  const handleIsLoginChange = () => {
    thanhVien
      .logIn(userName, passW)
      .then(() => {
        thanhVien.refreshToken();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-fluid form_login">
      <h1>Đăng nhập</h1>
      <Form
        initialValues={{
          remember: true,
        }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input onChange={(e) => handleUserNameChange(e)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password onChange={(e) => handlePassWordChange(e)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 17 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleIsLoginChange}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
