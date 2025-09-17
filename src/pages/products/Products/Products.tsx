import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  useProductsInfiniteQuery,
  useProductSearchInfiniteQuery,
} from "@/hooks/useProducts";

import { Spinner } from "@/shared/spinner";
import { Input } from "@/shared/input";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/select";

const PAGE_SIZE = 10;

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 300);

  const isSearching = searchTerm.length > 0;

  const productsQuery = useProductsInfiniteQuery(PAGE_SIZE, sort, order);
  const searchQuery = useProductSearchInfiniteQuery(
    searchTerm,
    PAGE_SIZE,
    sort,
    order
  );

  const activeQuery = isSearching ? searchQuery : productsQuery;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    activeQuery;

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div className="w-full p-16 flex flex-col justify-center items-center gap-8">
      <div className="p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select
              value={`${sort},${order}`}
              onValueChange={(value) => {
                const [s, o] = value.split(",");
                setSort(s);
                setOrder(o as "asc" | "desc");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name,asc">Name ↑</SelectItem>
                <SelectItem value="name,desc">Name ↓</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Search products..."
              onChange={(e) => debouncedSetSearch(e.target.value)}
              className="sm:w-[250px]"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="h-[80vh] p-16 flex flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found.
                </p>
              )}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-20">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-6 py-2 bg-[#9bc79b] text-white uppercase rounded-lg shadow hover:bg-[#afe1af] transition-colors duration-200 disabled:opacity-50"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
