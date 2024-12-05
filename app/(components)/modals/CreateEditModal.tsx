/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomTimePicker from "@/app/(components)/date_picker/CustomDatePicker";
import FormAddComment from "@/app/(components)/modals/FormAddComment";
import CustomSelect from "@/app/(components)/select/CustomSelect";
import {
  useMutationCreateServices,
  useMutationCreateSocialMedia,
  useMutationCreateSource,
  useMutationCreateUser,
  useMutationEditUser,
  useMutationStatus,
  useQueryGetServices,
  useQueryGetSocialMedia,
  useQueryGetSources,
  useQueryGetStatus,
} from "@/app/api/user";
import CloseIcon from "@/app/icon/CloseIcon";
import { Customer } from "@/app/types/customer";
import { CustomerData } from "@/app/types/user";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useQueryGetAddress } from "@/app/api/address";

interface CreateEditModalProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  customerSelected?: Customer | null;
}
const CreateEditModal = ({
  handleCancel,
  handleOk,
  isOpen,
  customerSelected,
}: CreateEditModalProps) => {
  const [form] = Form.useForm();

  // xử lí thành phố
  const [city, setCity] = useState(customerSelected?.city);
  const [district, setDistrict] = useState(customerSelected?.district);
  const { data: addressData } = useQueryGetAddress();
  const handleChangeCity = (value: string) => {
    setCity(value);
  };
  const handleChangeDistrict = (value: string) => {
    setDistrict(value);
  };
  const city_options = addressData?.data?.map((item: any) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

  const district_options = useMemo(() => {
    const citySelect = addressData?.data?.find(
      (item: any) => item.name === city
    );
    return citySelect?.districts?.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
  }, [city]);
  const ward_options = useMemo(() => {
    const citySelect = addressData?.data?.find(
      (item: any) => item.name === city
    );
    const districtSelect = citySelect?.districts?.find(
      (item: any) => item.name === district
    );
    return districtSelect?.wards?.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
  }, [city, district]);

  // call api create
  const queryClient = useQueryClient();
  const mutationCreateUser = useMutationCreateUser();
  const mutationEditUser = useMutationEditUser();

  useEffect(() => {
    if (customerSelected) {
      const dataInit = {
        full_name: customerSelected?.full_name,
        email: customerSelected?.email,
        phone: customerSelected?.phone_number,
        date_of_birth: dayjs(customerSelected?.date_of_birth),
        gender: customerSelected?.gender,
        phone_number: customerSelected?.phone_number,
        notes: customerSelected?.notes,
        detailed_info: customerSelected?.detailed_info,
        city: customerSelected?.city,
        district: customerSelected?.district,
        ward: customerSelected?.ward,
        address: customerSelected?.address,
      };
      form.setFieldsValue(dataInit);
    }
  }, [customerSelected]);
  const onFinish = (values: CustomerData) => {
    if (!customerSelected) {
      mutationCreateUser.mutate(
        {
          ...values,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["users"],
            });
            toast.success("Tạo khách hàng thành công!");
            handleCancel();
            form.resetFields();
          },
        }
      );
    } else {
      mutationEditUser.mutate(
        {
          data: values,
          id: customerSelected.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["users"],
            });
            toast.success("Cập nhật khách hàng thành công!");
            handleCancel();
            form.resetFields();
          },
        }
      );
    }
  };

  // lấy nguồn khách hàng
  const { data: src_customer } = useQueryGetSources(isOpen);
  const src_customer_options = (src_customer as any)?.results?.map(
    (item: any) => ({
      label: item.title,
      value: item.id,
    })
  );
  const mutationCreateSource = useMutationCreateSource();
  const handleCreateSource = (title: string) => {
    mutationCreateSource.mutate(
      { title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["sources"],
          });
        },
      }
    );
  };
  // lấy trạng thái
  const { data: status_customer } = useQueryGetStatus(isOpen);
  const status_customer_options = (status_customer as any)?.map((item: any) => {
    const id_status = item.customers[0]?.status;
    return {
      label: item.status,
      value: id_status,
    };
  });
  const mutationCreateStatusCustomer = useMutationStatus();
  const handleCreateStatusCustomer = (title: string) => {
    mutationCreateStatusCustomer.mutate(
      { title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["status"],
          });
        },
      }
    );
  };
  // lấy social media
  const { data: socical_media } = useQueryGetSocialMedia(isOpen);
  const socical_media_options = (socical_media as any)?.results?.map(
    (item: any) => ({
      label: item.title,
      value: item.id,
    })
  );
  const mutationCreateSocialMedia = useMutationCreateSocialMedia();
  const handleCreateSocialMedia = (title: string) => {
    mutationCreateSocialMedia.mutate(
      { title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["social-media"],
          });
        },
      }
    );
  };
  // lấy services
  const { data: services } = useQueryGetServices(isOpen);
  const services_options = (services as any)?.results?.map((item: any) => ({
    label: item.title,
    value: item.id,
  }));
  const mutationCreateServices = useMutationCreateServices();
  const handleCreateServices = (title: string) => {
    mutationCreateServices.mutate(
      { title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["services"],
          });
        },
      }
    );
  };

  return (
    <Modal
      width={1298}
      className="p-0"
      title={
        <div className="flex items-center justify-between  bg-primary p-4">
          <span className="text-[20px] leading-[28px] font-medium text-white">
            {customerSelected?.id ? "Chi tiết khách hàng" : "Tạo khách hàng"}
          </span>
          <div
            onClick={() => {
              handleCancel();

              form.resetFields();
            }}
            className="cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
      }
      open={isOpen}
      onOk={handleOk}
      closeIcon={false}
      onCancel={handleCancel}
      footer={
        <div className="p-4 flex gap-4 justify-end">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
            className="text-primary bg-white"
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => form.submit()}
            className="text-white bg-primary"
          >
            {customerSelected?.id ? "Cập nhật" : "Tạo"}
          </Button>
        </div>
      }
    >
      <div className="p-3">
        <Form
          requiredMark={false}
          form={form}
          name="layout-multiple-horizontal"
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
        >
          <div className="grid grid-cols-3 gap-8 mb-4">
            <Form.Item
              layout="vertical"
              label={
                <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                  Họ và tên khách hàng
                  <span className="text-[#E22626]">*</span>
                </span>
              }
              name="full_name"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              layout="vertical"
              name="gender"
              label={
                <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                  Giới tính
                  <span className="text-[#E22626]">*</span>
                </span>
              }
            >
              <Radio.Group>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
                <Radio value="Khác">Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              layout="vertical"
              label={
                <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                  Ngày sinh
                  <span className="text-[#E22626]">*</span>
                </span>
              }
              name="date_of_birth"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker className="w-full" format={"DD/MM/YYYY"} />
            </Form.Item>
            <div className="flex gap-2 items-center">
              <Form.Item
                layout="vertical"
                label={
                  <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                    Nguồn khách hàng
                    <span className="text-[#E22626]">*</span>
                  </span>
                }
                name="source"
                className="w-[50%]"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CustomSelect
                  handleAddOption={handleCreateSource}
                  form={form}
                  field="source"
                  defaultValue={customerSelected?.source?.id}
                  options={src_customer_options}
                />
              </Form.Item>
              <Form.Item
                className="w-[50%]"
                layout="vertical"
                label={
                  <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                    Trạng thái khách hàng
                    <span className="text-[#E22626]">*</span>
                  </span>
                }
                name="status"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CustomSelect
                  handleAddOption={handleCreateStatusCustomer}
                  form={form}
                  field="status"
                  defaultValue={customerSelected?.status?.id}
                  options={status_customer_options}
                />
              </Form.Item>
            </div>
          </div>
          <Divider className="mt-16" />
          <div className="grid grid-cols-3 gap-8 mb-4">
            <Form.Item
              layout="vertical"
              label={
                <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                  Số điện thoại
                  <span className="text-[#E22626]">*</span>
                </span>
              }
              name="phone_number"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                showCount
                maxLength={20}
                placeholder="Nhập số điện thoại"
                onKeyPress={(e) => {
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              layout="vertical"
              label={
                <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                  Email
                  <span className="text-[#E22626]">*</span>
                </span>
              }
              name="email"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input className="w-full" placeholder="Please enter your email" />
            </Form.Item>
            <div className="flex items-center gap-2">
              <Form.Item
                layout="vertical"
                label={
                  <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                    Mạng xã hội
                    <span className="text-[#E22626]">*</span>
                  </span>
                }
                name="social_media"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-[40%]"
              >
                <CustomSelect
                  field="social_media"
                  handleAddOption={handleCreateSocialMedia}
                  form={form}
                  defaultValue={customerSelected?.social_media?.id}
                  options={socical_media_options}
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label=" "
                name="detailed_info"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-black text-[16px] leading-[20px] font-semibold">
                Thông tin chi tiết
              </span>
              <Form.Item
                layout="vertical"
                label={
                  <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                    Sản phẩm quan tâm
                    <span className="text-[#E22626]">*</span>
                  </span>
                }
                name="service"
                rules={[
                  {
                    required: true,
                    message: "Please select a service!",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CustomSelect
                  mode="tags"
                  field="service"
                  handleAddOption={handleCreateServices}
                  form={form}
                  defaultValue={customerSelected?.service?.map(
                    (item) => item.id
                  )}
                  options={services_options}
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                label={
                  <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                    Ghi chú
                  </span>
                }
                name="notes"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  className="w-full"
                  placeholder="Please enter your notes"
                />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-4">
              <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                Địa chỉ liên hệ
              </span>
              <Form.Item
                layout="vertical"
                name="city"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  showSearch
                  placeholder="Select a city"
                  options={city_options}
                  onChange={handleChangeCity}
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                name="district"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  showSearch
                  placeholder="Select a district "
                  options={district_options}
                  onChange={handleChangeDistrict}
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                name="ward"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  showSearch
                  placeholder="Select a ward "
                  options={ward_options}
                />
              </Form.Item>
              <Form.Item
                layout="vertical"
                name="address"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                layout="vertical"
                label={
                  <span>
                    <span className="leading-[16.34px] text-[12px] text-[#8F8F8F] font-normal">
                      Ghi chú
                    </span>
                    <span className="text-[#E22626]">*</span>
                  </span>
                }
                // name="time"
                rules={[{ required: true }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CustomTimePicker
                  form={form}
                  field_start="follow_up_date"
                  field_end="follow_down_date"
                  defaultValueStart={customerSelected?.follow_up_date}
                  defaultValueEnd={customerSelected?.follow_down_date}
                />
              </Form.Item>
              <Form.Item name="follow_up_date" hidden>
                <input type="hidden" />
              </Form.Item>
              <Form.Item name="follow_down_date" hidden>
                <input type="hidden" />
              </Form.Item>
            </div>
          </div>
          <Divider className="mt-8" />
          <FormAddComment
            form={form}
            comments={customerSelected?.comment || []}
            status_customer_options={status_customer_options}
          />
        </Form>
      </div>
    </Modal>
  );
};

export default CreateEditModal;
