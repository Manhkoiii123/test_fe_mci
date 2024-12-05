"use client";
import CreateEditModal from "@/app/(components)/modals/CreateEditModal";
import { getProfileFromLS } from "@/app/utils/auth";
import { Button, Input } from "antd";
import Image from "next/image";
import React, { useMemo, useState } from "react";

const Header = () => {
  const user = useMemo(() => {
    return getProfileFromLS();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-4 flex items-center justify-between gap-4">
      <div className="flex flex-1 flex-col gap-2">
        <div>Quản lí khách hàng</div>
        <div className="w-[400px]">
          <Input placeholder="Search..." />
        </div>
      </div>
      <div className=" ml-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <span>{user?.username}</span>
          </div>
          <div>
            <Image
              alt="profile"
              src={
                user?.user_profile?.image ||
                "https://th.bing.com/th/id/OIP.OYbzbbyzogwtriubL2pP0AHaHa?rs=1&pid=ImgDetMain"
              }
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
        <Button onClick={showModal}>Thêm người dùng</Button>
      </div>
      <CreateEditModal
        isOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Header;
