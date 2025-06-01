import { useEffect, useState } from "react";
import { ProductsTable } from "@/pages/products/Products/partials/ProductsTable";
import { Spinner } from "@/shared/spinner";

import productsMock from "@/mocks/productsMock.json";

export const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-[92vh] p-16 flex flex-col justify-center items-center gap-8">
      {isLoading ? <Spinner /> : <ProductsTable data={productsMock} />}
    </div>
  );
};
