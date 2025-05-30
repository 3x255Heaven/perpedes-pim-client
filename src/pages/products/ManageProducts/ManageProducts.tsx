import { ImportHistory } from "@/pages/products/ManageProducts/partials/ImportHistory";
import { ImportProducts } from "./partials/ImportProducts";

import data from "@/mocks/data.json";

export const ManageProducts = () => {
  return (
    <div className="w-full p-16 flex flex-col justify-center gap-8">
      <ImportProducts />
      <ImportHistory data={data} />
    </div>
  );
};
