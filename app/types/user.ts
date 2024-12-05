type Comment = {
  title: string;
  time: string;
  status_id: number;
};

export type CustomerData = {
  status: number;
  source: number;
  social_media: number;
  service: [number, number];
  full_name: string;
  gender: "Nam" | "Nữ" | "Khác";
  date_of_birth: string;
  phone_number: string;
  follow_up_date: string;
  follow_down_date: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  detailed_info: string;
  notes: string;
  comments: Comment[];
};
