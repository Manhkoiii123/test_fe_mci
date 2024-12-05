/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from "antd";
import { LabeledValue } from "antd/es/select";
import { useEffect, useState } from "react";

const CustomSelect = ({
  form,
  field,
  options = [],
  handleAddOption,
  mode,
  defaultValue,
}: {
  form: any;
  field: string;
  options?: any;
  handleAddOption?: any;
  mode?: "multiple" | "tags" | undefined;
  defaultValue?:
    | string
    | string[]
    | number
    | number[]
    | LabeledValue
    | LabeledValue[]
    | any;
}) => {
  const [valueInput, setValueInput] = useState("");
  const handleChange = (value: string) => {
    form.setFieldsValue({
      [field]: value,
    });
  };
  const handleChangeInput = (e: any) => {
    setValueInput(e.target.value);
  };
  useEffect(() => {
    form.setFieldsValue({
      [field]: defaultValue,
    });
  }, [defaultValue]);
  return (
    <Select
      defaultValue={defaultValue}
      mode={mode}
      onChange={handleChange}
      options={options}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <div className="flex items-center p-2 border-t border-gray-200">
            <Input
              type="text"
              onChange={handleChangeInput}
              placeholder="Nhập dữ liệu"
              className="flex-1 px-2 py-1 w-[50%] text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => {
                setValueInput("");
                handleAddOption(valueInput);
              }}
              className="ml-2 px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              + Thêm
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default CustomSelect;
