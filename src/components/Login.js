import { Form, Input, Button, message, Checkbox } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  let history = useHistory();

  const onSubmit = (values) => {
    // console.log("Success:", values.email, values.remember);
    axios
      .post(`https://backendexample.sanbersy.com/api/user-login`, { email: values.email, password: values.password })
      .then((res) => {
        let token = res.data.token;
        let user = res.data.user;

        // console.log(token, user.name, user.email, values.remember);

        if (values.remember === true) {
          Cookies.set("token", token, { expires: 1 });
          Cookies.set("name", user.name, { expires: 1 });
          Cookies.set("email", user.email, { expires: 1 });
        } else {
          Cookies.set("token", token);
          Cookies.set("name", user.name);
          Cookies.set("email", user.email);
        }
        message.success("Login Success!");
        history.push("/");
      })
      .catch(() => {
        message.warning("Wrong Username And Password!");
      });
  };

  const onSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wrap-paper login-page">
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initiaSlValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onSubmitFailed} autoComplete="off">
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Email is not a valid email!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
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

export default Login;
