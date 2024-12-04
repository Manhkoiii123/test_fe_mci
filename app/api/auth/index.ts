import apiClient from "@/app/api/apiClient";
import { useMutation } from "@tanstack/react-query";

export const authApi = {
  login(data: { username: string; password: string }) {
    const url = "/user-login/";
    return apiClient.post(url, data);
  },
  signUp(data: { username: string; password: string }) {
    const url = "/create-user-account/";
    return apiClient.post(url, data);
  },
};

export const useMutationLogin = () => {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      return authApi.login(data);
    },
  });
};
export const useMutationSignUp = () => {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      return authApi.signUp(data);
    },
  });
};
