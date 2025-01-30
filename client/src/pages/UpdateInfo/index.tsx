import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect } from "react";
import "./update_info.css";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  updateInfo,
  updateUserInfoCaptcha,
} from "../../interfaces";

export interface UserInfo {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function UpdateInfo() {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (values: UserInfo) => {
    try {
      const res = await updateInfo(values);
      if (res.status === 201 || res.status === 200) {
        message.success("用户信息更新成功");
      }
    } catch (e: any) {
      message.error(e.response?.data?.message || "系统繁忙，请稍后再试");
    }
  };

  const sendCaptcha = async function () {
    const address = form.getFieldValue("email");
    if (!address) {
      return message.error("请输入邮箱地址");
    }
    try {
      const res = await updateUserInfoCaptcha(address);
      if (res.status === 201 || res.status === 200) {
        message.success("发送成功");
      }
    } catch (e: any) {
      message.error(e.response?.data?.message || "系统繁忙，请稍后再试");
    }
  };

  useEffect(() => {
    async function query() {
      const res = await getUserInfo();

      if (res.status === 201 || res.status === 200) {
        form.setFieldValue("headPic", res.data.headPic);
        form.setFieldValue("nickName", res.data.nickName);
        form.setFieldValue("email", res.data.email);
        form.setFieldValue("username", res.data.username);
      }
    }
    query();
  }, []);

  return (
    <div id="updateInfo-container">
      <Form
        form={form}
        {...layout1}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
      >
        <Form.Item
          label="头像"
          name="headPic"
          rules={[{ required: true, message: "请输入头像!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: "请输入昵称!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入合法邮箱地址!" },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="captcha-wrapper">
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            发送验证码
          </Button>
        </div>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
