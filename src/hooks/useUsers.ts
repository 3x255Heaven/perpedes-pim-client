import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export type User = {
  id: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  clientId: string | null;
  clientBusinessId: string | null;
  lastLogin: string;
  lastLogout: string;
};

export function useUsersByClientQuery(
  clientId: string,
  page: number,
  size: number,
) {
  return useQuery({
    queryKey: ["user", "client", "paginated", clientId, page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/user/client/${clientId}/paginated`,
        {
          params: {
            page,
            size,
          },
        },
      );

      return response.data;
    },
  });
}

export function useUsersQuery(page: number, size: number) {
  return useQuery({
    queryKey: ["user", "all", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/all", {
        params: {
          page,
          size,
        },
      });

      return response.data;
    },
  });
}

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    },
  });
}

export function useCreateUserMutation() {
  return useMutation({
    mutationFn: async ({ newUser }: { newUser: any }) => {
      const response = await axiosInstance.post("/user", newUser);

      return response.data;
    },
  });
}

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: async ({
      userId,
      updatedUser,
    }: {
      userId: string;
      updatedUser: any;
    }) => {
      const response = await axiosInstance.put(`/user/${userId}`, updatedUser);

      return response.data;
    },
  });
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      const response = await axiosInstance.delete(`/user/${userId}`);

      return response.data;
    },
  });
}
