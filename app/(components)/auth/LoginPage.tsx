/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutationLogin } from "@/app/api/auth";
import { routerConstants } from "@/app/constants/router";
import { setProfileFromLS } from "@/app/utils/auth";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
type FieldType = {
  username: string;
  password: string;
};
const LoginPage = () => {
  const mutationLogin = useMutationLogin();
  const [form] = Form.useForm();
  const cookies = new Cookies();
  const router = useRouter();
  const onFinish = (values: FieldType) => {
    mutationLogin.mutate(values, {
      onSuccess: (data: any) => {
        toast.success("Login successfully");
        cookies.set("access_token", data.access_token);
        cookies.set("refresh_token", data.refresh_token);
        setProfileFromLS(data.user);
        router.push(routerConstants.home);
      },
      onError: (error: any) => {
        toast.error(error.response.data.detail);
      },
    });
  };
  return (
    <div className="w-full xl:w-[50%]">
      <span className="font-semibold text-[40px] leading-[56px] flex items-center justify-center gap-2">
        <span className="text-primary">Welcome back</span>
      </span>
      <div className=" flex flex-col gap-8">
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="username"
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button
            className="w-full mt-1 mx-auto"
            type="primary"
            htmlType="submit"
          >
            Login
            {/* {loginMutation.isPending ? <Loading /> : "Login"} */}
          </Button>
        </Form>
        <Link href={routerConstants.signUp} className="ml-auto decoration-none">
          <span className="text-primary text-lg font-normal text-left underline">
            SignUp
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
