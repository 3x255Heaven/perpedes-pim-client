import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useColorTypesQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosInstance.get("/colors");
      return response.data;
    },
  });
}

export function useShoeTypesQuery() {
  return useQuery({
    queryKey: ["shoe-types"],
    queryFn: async () => {
      const response = await axiosInstance.get("/shoe-types");
      return response.data;
    },
  });
}

export function useSoleTypesQuery() {
  return useQuery({
    queryKey: ["sole-types"],
    queryFn: async () => {
      const response = await axiosInstance.get("/sole-types");
      return response.data;
    },
  });
}

export function useUpperMaterialsTypesQuery() {
  return useQuery({
    queryKey: ["upper-materials"],
    queryFn: async () => {
      const response = await axiosInstance.get("/upper-materials");
      return response.data;
    },
  });
}

export function useInnerLiningTypesQuery() {
  return useQuery({
    queryKey: ["inner-linings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/inner-linings");
      return response.data;
    },
  });
}

export function useClosureSystemTypesQuery() {
  return useQuery({
    queryKey: ["inner-linings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/closure-systems");
      return response.data;
    },
  });
}

export function useFunctionTypesQuery() {
  return useQuery({
    queryKey: ["functions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/functions");
      return response.data;
    },
  });
}
