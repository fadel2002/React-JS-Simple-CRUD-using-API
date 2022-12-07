import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Cookies from "js-cookie";

const ChangePass = () => {
  let history = useHistory();

  const onSubmit = (values) => {
    console.log("Success:", values.email, values.password);
    axios
      .post(
        `https://backendexample.sanbersy.com/api/change-password`,
        { current_password: values.current_password, new_password: values.new_password, new_confirm_password: values.new_confirm_password },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        // console.log(token, user.name, user.email, values.remember);
        success();
        history.push("/");
      });
  };
  const success = () => {
    message.success("Password Has Been Changed!");
  };

  const onSubmitFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="wrap-paper login-page">
      <Form name="basic" labelCol={{ span: 10 }} wrapperCol={{ span: 16 }} initiaSlValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onSubmitFailed} autoComplete="off">
        <Form.Item label="Current Password" name="current_password" rules={[{ required: true, message: "Input your current password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label="New Password" name="new_password" rules={[{ required: true, message: "Input your new password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="new_confirm_password"
          label="Confirm Password"
          dependencies={["new_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePass;
