import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export function useImportProductsMutation() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/product-import/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
  });
}

export function useProductsQuery(page: number, size: number) {
  return useQuery({
    queryKey: ["products", page, size],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/products?page=${page}&size=${size}`
      );
      return response.data;
    },
  });
}

export function useProductQuery(productId: string) {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    },
  });
}

export function useUpdateProductMutation() {
  return useMutation({
    mutationFn: async ({
      productId,
      updatedProduct,
    }: {
      productId: string;
      updatedProduct: any;
    }) => {
      const response = await axiosInstance.put(
        `/products/${productId}`,
        updatedProduct
      );
      return response.data;
    },
  });
}
