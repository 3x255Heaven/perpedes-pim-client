import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export type Stock = {
  id: number;
  stockQuantity: number;
  blockedStockQuantity: number;
  batch: string;
  stockId: string;
};

export type Price = {
  id: number;
  price: number;
  priceList: string;
  currency: string;
  unit: string;
};

export type ProductType = {
  id: number;
  size: string;
  width: string;
  unit: string;
  productId: number;
  stocks: Stock[];
  prices: Price[];
};

export type MultiValueProperty = {
  id: number;
  code: string;
  name: string;
};

export type Product = {
  variations: ProductType[];
  id: number;
  name: string;
  description: string;
  hmvNumber: string;
  modelId: string;
  factory: string;
  colors: MultiValueProperty[];
  picture: string;
  widthSystem: string;
  shoeTypes: MultiValueProperty[];
  closureSystems: MultiValueProperty[];
  upperMaterials: MultiValueProperty[];
  innerLinings: MultiValueProperty[];
  soleTypes: MultiValueProperty[];
  soleColors: MultiValueProperty[];
  functions: MultiValueProperty[];
  smf: string;
};

type ProductsResponse = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  products: Product[];
};

const getNextPageParam = (lastPage: {
  currentPage: number;
  totalPages: number;
}) => {
  return lastPage.currentPage + 1 < lastPage.totalPages
    ? lastPage.currentPage + 1
    : undefined;
};

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

export function useUploadProductImageMutation() {
  return useMutation({
    mutationFn: async ({
      productId,
      file,
    }: {
      productId: number;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        `/products/${productId}/image`,
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

export function useDeleteProductImageMutation() {
  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await axiosInstance.delete(
        `/products/${productId}/image`
      );

      return response.data;
    },
  });
}

export const useProductsInfiniteQuery = (
  size: number,
  sort: string,
  order: string
) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", size, sort, order],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get("/products", {
        params: {
          page: pageParam,
          size,
          sort: `${sort},${order}`,
        },
      });

      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam,
  });
};

export const useProductSearchInfiniteQuery = (
  search: string,
  size: number,
  sort: string,
  order: string
) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["products", "search", search, size, sort, order],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get("/products/search", {
        params: {
          searchTerm: search,
          page: pageParam,
          size,
          sort: `${sort},${order}`,
        },
      });

      return response.data;
    },
    enabled: !!search,
    initialPageParam: 0,
    getNextPageParam,
  });
};
