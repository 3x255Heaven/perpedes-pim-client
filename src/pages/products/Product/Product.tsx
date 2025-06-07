import { useParams } from "react-router-dom";
import { Button } from "@/shared/button";
import { useProductQuery, useUpdateProductMutation } from "@/hooks/useProducts";
import { Variations } from "./partials/Variations";
import { ProductFields } from "./partials/ProductFields";
import { Spinner } from "@/shared/spinner";
import { ProductImageUpload } from "./partials/ProductImageUpload";
import { ProductImageCarousel } from "./partials/ProductImageCarousel";
import { useRef } from "react";

export const Product = () => {
  const { id } = useParams();
  const formRef = useRef(null);

  const productQuery = useProductQuery(id as string);
  const updateProductMutation = useUpdateProductMutation();

  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const parsedData = {
        ...data,
        soleType: Array.from(data.soleType as string).filter(
          (item) => item !== ","
        ),
        soleColor: Array.from(data.soleColor as string).filter(
          (item) => item !== ","
        ),
        shoeType: Array.from(data.shoeType as string).filter(
          (item) => item !== ","
        ),
        closureSystem: Array.from(data.closureSystem as string).filter(
          (item) => item !== ","
        ),
        upperMaterial: Array.from(data.upperMaterial as string).filter(
          (item) => item !== ","
        ),
        innerLining: Array.from(data.innerLining as string).filter(
          (item) => item !== ","
        ),
        function: Array.from(data.function as string).filter(
          (item) => item !== ","
        ),
      };

      updateProductMutation.mutate({
        productId: id as string,
        updatedProduct: parsedData as any,
      });
    }
  };

  if (productQuery.isPending) {
    return (
      <div className="flex h-[92vh] flex-col justify-center items-center gap-4 p-4 pt-0">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-10 pt-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl my-10">
            {productQuery.data.name} Some Random Product Name
          </h1>

          <div className="flex gap-4">
            <Button
              className="bg-[#9bc79b] text-white cursor-pointer"
              onClick={handleSubmit}
              disabled={false}
            >
              Update
            </Button>
          </div>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <ProductFields product={productQuery.data} ref={formRef} />
          </div>
          <div className="md:col-span-1">
            <ProductImageUpload />
          </div>
        </div>

        <ProductImageCarousel />
        <Variations variations={productQuery.data.variations} />
      </div>
    </div>
  );
};
