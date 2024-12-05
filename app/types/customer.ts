type Status = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  user: number;
};

type Source = {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  user: number;
};

type SocialMedia = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  user: number;
};

type Comment = {
  id: number;
  title: string;
  time: string;
  status_id: number;
  status: Status;
};

type Service = {
  id: number;
  title: string;
  description: string | null;
  effect: string | null;
  price: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  user: number;
};

export type Customer = {
  id: number;
  status: Status;
  source: Source;
  social_media: SocialMedia;
  comment: Comment[];
  service: Service[];
  service_request: unknown[];
  medicine: unknown[];
  customer_code: string;
  status_service: number;
  status_treatment: number | null;
  full_name: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  follow_up_date: string;
  follow_down_date: string;
  address: string | null;
  city: string | null;
  district: string | null;
  ward: string | null;
  notes: string | null;
  diagnosis: string | null;
  treatment: string | null;
  appointment_time: string;
  actual_arrival_time: string;
  created_at: string;
  updated_at: string;
  sales_person: unknown | null;
  doctor_performed: unknown | null;
  user: number;
  detailed_info: string | null;
};
