/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutationSignUp } from "@/app/api/auth";
import { routerConstants } from "@/app/constants/router";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type FieldType = {
  username: string;
  password: string;
};
const SignUpPage = () => {
  const router = useRouter();
  const mutationSignUp = useMutationSignUp();
  const [form] = Form.useForm();
  const onFinish = (values: FieldType) => {
    mutationSignUp.mutate(values, {
      onSuccess: () => {
        toast.success("Register successfully");
        router.push(routerConstants.login);
      },
      onError: (error: any) => {
        toast.error(error.response.data.detail);
      },
    });
  };
  return (
    <div className="w-full xl:w-[50%]">
      <span className="font-semibold text-[40px] leading-[56px] flex items-center justify-center gap-2">
        <span className="text-primary">Register</span>
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
            Register
            {/* {loginMutation.isPending ? <Loading /> : "Login"} */}
          </Button>
        </Form>
        <Link href={routerConstants.login} className="ml-auto">
          <span className="text-primary text-lg font-normal text-left underline">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
