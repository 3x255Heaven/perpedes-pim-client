import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export type Client = {
  id: number;
  clientId: string;
  parent: number | null;
  ag: string | null;
  re: string | null;
  rg: string | null;
  ve: string | null;
  we: string | null;
  salesOrg: string;
  distributionChannel: string;
  division: string;
  addressNumber: string;
  country: string;
  name1: string;
  name2: string;
  name3: string | null;
  name4: string | null;
  place: string | null;
  area: string | null;
  mailbox: string | null;
  zipMailbox: string | null;
  zipCode: string;
  street1: string;
  street2: string | null;
  telefon1: string;
  telefon2: string | null;
  fax: string | null;
  currency: string;
  paymentCode: string;
  representative: string;
  vat: string;
  createdAt: string;
  updatedAt: string;
};

export function useClientsQuery(
  page: number,
  size: number,
  sort: string,
  order: string,
) {
  return useQuery({
    queryKey: ["clients", page, size, sort, order],
    queryFn: async () => {
      const response = await axiosInstance.get("/clients", {
        params: {
          page,
          size,
          sort: `${sort},${order}`,
        },
      });
      return response.data;
    },
  });
}

export function useClientsSearchQuery(
  search: string,
  page: number,
  size: number,
  sort: string,
  order: string,
) {
  return useQuery({
    queryKey: ["clients", search, page, size, sort, sort, order],
    queryFn: async () => {
      const response = await axiosInstance.get("/clients/search", {
        params: {
          q: search,
          page,
          size,
          sort: `${sort},${order}`,
        },
      });

      return response.data;
    },
  });
}

export function useImportClientsMutation() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/client-data-import/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    },
  });
}

export function useImportClientsRelationshipMutation() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/client-relationship-import/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    },
  });
}

export function useClientQuery(clientId: string) {
  return useQuery({
    queryKey: ["clients", clientId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/clients/${clientId}`);
      return response.data;
    },
  });
}

export function useUpdateClientMutation() {
  return useMutation({
    mutationFn: async ({
      clientId,
      updatedClient,
    }: {
      clientId: string;
      updatedClient: any;
    }) => {
      const response = await axiosInstance.put(
        `/clients/${clientId}`,
        updatedClient,
      );

      return response.data;
    },
  });
}

export function useDeleteClientMutation() {
  return useMutation({
    mutationFn: async ({ clientId }: { clientId: string }) => {
      const response = await axiosInstance.delete(`/clients/${clientId}`);

      return response.data;
    },
  });
}
