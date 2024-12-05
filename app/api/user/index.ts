import apiClient from "@/app/api/apiClient";
import { CustomerData } from "@/app/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export const userApi = {
  get_status() {
    const url = "/customer-status/";
    return apiClient.get(url);
  },
  create_status(data: { title: string }) {
    const url = "/customer-status/";
    return apiClient.post(url, data);
  },
  get_services() {
    const url = "/services/";
    return apiClient.get(url);
  },
  create_services(data: { title: string }) {
    const url = "/services/";
    return apiClient.post(url, data);
  },
  get_sources() {
    const url = "/customer-source/";
    return apiClient.get(url);
  },
  create_source(data: { title: string }) {
    const url = "/customer-source/";
    return apiClient.post(url, data);
  },
  create_social_media(data: { title: string }) {
    const url = "/customer-social/";
    return apiClient.post(url, data);
  },
  get_social_media() {
    const url = "/customer-social/";
    return apiClient.get(url);
  },
  create_user(data: CustomerData) {
    const url = "/customers/";
    return apiClient.post(url, data);
  },
  get_user(data: { page: number; limit: number }) {
    const url = "/customers/";
    return apiClient.get(url, { params: data });
  },
  edit_user(data: CustomerData, id: number) {
    const url = `/customers/${id}/`;
    return apiClient.patch(url, data);
  },
};

export const useMutationCreateUser = () => {
  return useMutation({
    mutationFn: (data: CustomerData) => {
      return userApi.create_user(data);
    },
  });
};
export const useMutationEditUser = () => {
  return useMutation({
    mutationFn: (values: { data: CustomerData; id: number }) => {
      return userApi.edit_user(values.data, values.id);
    },
  });
};
export const useQueryGetUsers = (data: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ["users", data.limit, data.page],
    queryFn: () => userApi.get_user(data),
  });
};

export const useMutationStatus = () => {
  return useMutation({
    mutationFn: (data: { title: string }) => {
      return userApi.create_status(data);
    },
  });
};
export const useMutationCreateServices = () => {
  return useMutation({
    mutationFn: (data: { title: string }) => {
      return userApi.create_services(data);
    },
  });
};
export const useMutationCreateSource = () => {
  return useMutation({
    mutationFn: (data: { title: string }) => {
      return userApi.create_source(data);
    },
  });
};
export const useMutationCreateSocialMedia = () => {
  return useMutation({
    mutationFn: (data: { title: string }) => {
      return userApi.create_social_media(data);
    },
  });
};
export const useQueryGetSources = (enabled: boolean) => {
  return useQuery({
    queryKey: ["sources"],
    queryFn: userApi.get_sources,
    enabled: enabled,
  });
};
export const useQueryGetStatus = (enabled: boolean) => {
  return useQuery({
    queryKey: ["status"],
    queryFn: userApi.get_status,
    enabled: enabled,
  });
};
export const useQueryGetSocialMedia = (enabled: boolean) => {
  return useQuery({
    queryKey: ["social-media"],
    queryFn: userApi.get_social_media,
    enabled: enabled,
  });
};
export const useQueryGetServices = (enabled: boolean) => {
  return useQuery({
    queryKey: ["services"],
    queryFn: userApi.get_services,
    enabled: enabled,
  });
};
