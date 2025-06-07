import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useLogsQuery(page: number, size: number) {
  return useQuery({
    queryKey: ["product-import", "status", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/product-import/status?page=${page}&size=${size}`
      );
      return response.data;
    },
  });
}
