import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useProductsLogsQuery(page: number, size: number) {
  return useQuery({
    queryKey: ["product-import", "status", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/product-import/status?page=${page}&size=${size}`,
      );
      return response.data;
    },
  });
}

export function useClientsLogsQuery(page: number, size: number) {
  return useQuery({
    queryKey: ["client-data-import", "status", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/client-data-import/status?page=${page}&size=${size}`,
      );
      return response.data;
    },
  });
}

export function useClientsRelationshipLogsQuery(page: number, size: number) {
  return useQuery({
    queryKey: ["client-data-import", "status", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/client-relationship-import/status?page=${page}&size=${size}`,
      );
      return response.data;
    },
  });
}
