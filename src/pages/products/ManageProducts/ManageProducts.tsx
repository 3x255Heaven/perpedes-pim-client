import { ImportHistory } from "@/pages/products/ManageProducts/partials/ImportHistory";
import { ImportProducts } from "./partials/ImportProducts";

export const ManageProducts = () => {
  return (
    <div className="w-full p-16 flex flex-col justify-center gap-8">
      <ImportProducts />
      <ImportHistory />
    </div>
  );
};
