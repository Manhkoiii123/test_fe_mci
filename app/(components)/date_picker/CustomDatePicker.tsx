/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { FormInstance, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const CustomTimePicker = ({
  form,
  field_start,
  field_end,
  defaultValueStart,
  defaultValueEnd,
}: {
  form: FormInstance<any>;
  field_start: string;
  field_end: string;
  defaultValueEnd?: string;
  defaultValueStart?: string;
}) => {
  const currentTime = dayjs();
  const defaultStartTime = currentTime.format("HH:mm");
  const defualtValue =
    defaultValueStart && defaultValueEnd
      ? [
          dayjs(defaultValueStart).format("HH:mm"),
          dayjs(defaultValueEnd).format("HH:mm"),
        ].map((time) => dayjs(time, "HH:mm"))
      : [dayjs(defaultStartTime, "HH:mm"), dayjs(defaultStartTime, "HH:mm")];

  useEffect(() => {
    form.setFieldsValue({
      [field_start]: dayjs(defaultStartTime, "HH:mm"),
      [field_end]: dayjs(defaultStartTime, "HH:mm"),
    });
  }, []);
  useEffect(() => {
    if (defaultValueStart && defaultValueEnd) {
      form.setFieldsValue({
        [field_start]: defaultValueStart,
        [field_end]: defaultValueEnd,
      });
    }
  }, [defaultValueEnd, defaultValueStart]);
  const handleChange = (value: [Dayjs | null, Dayjs | null] | null) => {
    if (value && value[0] && value[1]) {
      const [start, end] = value;
      const formattedStartTime = start.format("YYYY-MM-DDTHH:mm:ss");
      const formattedEndTime = end.format("YYYY-MM-DDTHH:mm:ss");
      form.setFieldsValue({
        [field_start]: formattedStartTime,
      });
      form.setFieldsValue({
        [field_end]: formattedEndTime,
      });
    }
  };

  return (
    <TimePicker.RangePicker
      defaultValue={defualtValue as [Dayjs, Dayjs]}
      format="HH:mm"
      allowClear={false}
      suffixIcon={<span className="anticon">📅</span>}
      onChange={handleChange}
    />
  );
};

export default CustomTimePicker;
