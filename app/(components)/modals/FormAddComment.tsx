/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Select, Table } from "antd";
import React, { useEffect } from "react";
import dayjs from "dayjs";
type Props = {
  comments: any;
  status_customer_options: any;
  form: any;
};

const FormAddComment = ({ form, comments, status_customer_options }: Props) => {
  const initData = comments.map((item: any) => ({
    time: dayjs(item.time.split("T")[0]),
    title: item.title,
    status_id: item.status.id,
  }));

  useEffect(() => {
    form.setFieldsValue({ comments: initData });
  }, [comments, form, initData]);
  return (
    <Form.Item className="w-full">
      <Form.List name="comments">
        {(fields, { add, remove }) => {
          const dataSource = fields.map((field) => ({
            key: field.key,
            index: field.name,
          }));

          const columns = [
            {
              width: 100,
              title: "Lần",
              dataIndex: "index",
              render: (text: any) => `${text + 1}`,
            },
            {
              width: 200,
              title: "Ngày",
              render: (_: any, record: any) => {
                return (
                  <Form.Item
                    name={[record.index, "time"]}
                    rules={[{ required: true, message: "Vui lòng nhập ngày!" }]}
                    className="mb-0"
                  >
                    <DatePicker className="w-full" format={"DD/MM/YYYY"} />
                  </Form.Item>
                );
              },
            },
            {
              width: 200,
              title: "Kết quả chăm sóc",
              render: (_: any, record: any) => (
                <Form.Item
                  name={[record.index, "title"]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập kết quả chăm sóc!",
                    },
                  ]}
                  className="mb-0"
                >
                  <Input placeholder="Nhập kết quả" />
                </Form.Item>
              ),
            },
            {
              width: 200,
              title: "Cập nhật trạng thái",
              render: (_: any, record: any) => (
                <Form.Item
                  name={[record.index, "status_id"]}
                  rules={[
                    { required: true, message: "Vui lòng nhập trạng thái!" },
                  ]}
                  className="mb-0"
                >
                  <Select
                    placeholder="Nhập trạng thái"
                    options={status_customer_options}
                  />
                </Form.Item>
              ),
            },
            {
              width: 50,
              render: (_: any, record: any) => (
                <Button
                  type="link"
                  onClick={() => remove(record.index)}
                  className="p-0 text-red-500"
                >
                  Xóa
                </Button>
              ),
            },
          ];

          return (
            <>
              <Table
                className="border-2 border-gray-200 border-b-0 rounded-t-md w-full"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  className=" text-primary rounded-b-md rounded-t-none py-2"
                >
                  Thêm
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};

export default FormAddComment;
