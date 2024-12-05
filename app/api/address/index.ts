import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const addressApi = {
  get() {
    const url = "https://provinces.open-api.vn/api/?depth=3";
    return axios.get(url);
  },
};

export const useQueryGetAddress = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: () => addressApi.get(),
  });
};
