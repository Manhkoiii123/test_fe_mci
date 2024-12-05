/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CreateEditModal from "@/app/(components)/modals/CreateEditModal";
import { useQueryGetUsers } from "@/app/api/user";
import { Customer } from "@/app/types/customer";
import { Pagination, Table } from "antd";
import { useMemo, useState } from "react";

const TableUser = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data } = useQueryGetUsers({ page: page, limit: limit });
  const [customerSelected, setCustomerSelected] = useState<Customer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setCustomerSelected(null);
    setIsModalOpen(false);
  };
  const dataSource = useMemo(() => (data as any)?.results, [data]);

  const columns = [
    {
      title: "#",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Nguồn",
      render: (_: any, record: any) => record?.source?.title,
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Ngày tạo",
      render: (_: any, record: any) =>
        new Date(record?.created_at).toLocaleDateString("vi-VN"),
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <span
          className="cursor-pointer"
          onClick={() => {
            showModal();
            setCustomerSelected(record);
          }}
        >
          Xem
        </span>
      ),
    },
  ];
  return (
    <div className="mt-4 p-4">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <div className="flex items-center justify-between mt-4">
        <span>
          {(page - 1) * limit + 1} - {page * limit} of {(data as any)?.count}{" "}
          items
        </span>
        <Pagination
          className="mt-4 ml-auto"
          total={(data as any)?.count}
          defaultPageSize={limit}
          onChange={(page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          }}
          defaultCurrent={page}
          showSizeChanger
        />
      </div>
      <CreateEditModal
        isOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        customerSelected={customerSelected || undefined}
      />
    </div>
  );
};

export default TableUser;
