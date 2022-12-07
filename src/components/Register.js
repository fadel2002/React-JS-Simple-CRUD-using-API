import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Register = () => {
  let history = useHistory();

  const success = () => {
    message.success("Registration Success!");
  };

  const onSubmit = (values) => {
    console.log("Success:", values.username, values.email, values.password);
    axios.post(`https://backendexample.sanbersy.com/api/register`, { name: values.username, email: values.email, password: values.password }).then(() => {
      success();
      history.push("/login");
    });
  };

  const onSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wrap-paper login-page">
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initiaSlValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onSubmitFailed} autoComplete="off">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email is not a valid email!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
