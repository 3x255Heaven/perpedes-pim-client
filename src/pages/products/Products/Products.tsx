import { ProductsTable } from "@/pages/products/Products/partials/ProductsTable";
import { Spinner } from "@/shared/spinner";

import { useProductSearchQuery, useProductsQuery } from "@/hooks/useProducts";
import { useState } from "react";
import { Input } from "@/shared/input";
import { useDebounce } from "use-debounce";

export const Products = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const productsQuery = useProductsQuery(pageIndex, pageSize);
  const searchQuery = useProductSearchQuery(
    debouncedSearchTerm,
    pageIndex,
    pageSize
  );

  const isSearching = debouncedSearchTerm.length > 0;
  const activeQuery = isSearching ? searchQuery : productsQuery;

  const isLoading = activeQuery.isPending;
  const data = activeQuery.data;

  return (
    <div className="w-full h-[92vh] p-16 flex flex-col justify-center items-center gap-8">
      {isLoading && debouncedSearchTerm.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPageIndex(0);
            }}
            className="max-w-sm"
          />
          <ProductsTable
            data={data?.products || []}
            total={data?.totalElements || 0}
            pageIndex={pageIndex}
            pageSize={pageSize}
            onPageChange={setPageIndex}
            onPageSizeChange={(size: number) => {
              setPageSize(size);
              setPageIndex(0);
            }}
          />
        </>
      )}
    </div>
  );
};
