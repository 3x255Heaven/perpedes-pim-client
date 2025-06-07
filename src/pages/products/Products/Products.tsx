import { ProductsTable } from "@/pages/products/Products/partials/ProductsTable";
import { Spinner } from "@/shared/spinner";

import { useProductsQuery } from "@/hooks/useProducts";
import { useState } from "react";

export const Products = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const productsQuery = useProductsQuery(pageIndex, pageSize);

  return (
    <div className="w-full h-[92vh] p-16 flex flex-col justify-center items-center gap-8">
      {productsQuery.isPending ? (
        <Spinner />
      ) : (
        <ProductsTable
          data={productsQuery.data.products}
          total={productsQuery.data?.totalElements || 0}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={setPageIndex}
          onPageSizeChange={(size: number) => {
            setPageSize(size);
            setPageIndex(0);
          }}
        />
      )}
    </div>
  );
};
