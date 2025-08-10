import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useProductSearchQuery, useProductsQuery } from "@/hooks/useProducts";

import { Spinner } from "@/shared/spinner";
import { Input } from "@/shared/input";

import { ProductCard } from "@/components/ProductCard/ProductCard";

const PAGE_SIZE = 1000;

interface Stock {
  id: number;
  stockQuantity: number;
  blockedStockQuantity: number;
  batch: string;
  stockId: string;
}

interface Price {
  id: number;
  price: number;
  priceList: string;
  currency: string;
  unit: string;
}

interface ProductType {
  id: number;
  size: string;
  width: string;
  unit: string;
  productId: number;
  stocks: Stock[];
  prices: Price[];
}

export type Product = {
  id: number;
  name: string;
  description: string;
  hmvNumber: string;
  modelId: string;
  factory: string;
  color: string;
  picture: string;
  widthSystem: string;
  shoeType: string;
  closureSystem: string;
  upperMaterial: string;
  innerLining: string;
  soleType: string;
  soleColor: string;
  function: string;
  smf: string;
  variations: ProductType[];
};

export const Products = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const productsQuery = useProductsQuery(pageIndex, PAGE_SIZE);
  const searchQuery = useProductSearchQuery(
    debouncedSearchTerm,
    pageIndex,
    PAGE_SIZE
  );

  const isSearching = debouncedSearchTerm.length > 0;
  const activeQuery = isSearching ? searchQuery : productsQuery;

  const data = activeQuery.data;

  return (
    <div className="w-full p-16 flex flex-col justify-center items-center gap-8">
      {activeQuery.isPending ? (
        <div className="h-[80vh] p-16 flex flex-col justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPageIndex(0);
                }}
                className="sm:w-[250px]"
              />
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.products?.length > 0 ? (
              data.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
