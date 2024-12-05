type UserProfile = {
  user_type: string; // GUE, etc.
  gender: string | null;
  user_mobile_number: string; // Ex: "000"
  user_address: string | null;
  image: string | null;
  desc: string | null;
  company: string | null;
  division: string | null;
  position: string | null;
  branch: string | null;
  language: string; // Ex: "vi"
};

export type User = {
  date_joined: string; // Date in ISO string format
  last_login: string; // Date in ISO string format
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_profile: UserProfile;
};
export type UserLoginType = {
  access_token: string;
  refresh_token: string;
  user: User;
};
