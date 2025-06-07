import { useParams } from "react-router-dom";
import { Button } from "@/shared/button";
import {
  useDeleteProductImageMutation,
  useProductQuery,
  useUpdateProductMutation,
} from "@/hooks/useProducts";
import { Variations } from "./partials/Variations";
import { ProductFields } from "./partials/ProductFields";
import { Spinner } from "@/shared/spinner";
import { ProductImageUpload } from "./partials/ProductImageUpload";
import { useRef } from "react";
import { MinusCircle } from "lucide-react";

export const Product = () => {
  const { id } = useParams();
  const formRef = useRef(null);

  const productQuery = useProductQuery(id as string);
  const updateProductMutation = useUpdateProductMutation();
  const deleteImageMutation = useDeleteProductImageMutation();

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

  const handleDeleteImage = async () => {
    await deleteImageMutation.mutateAsync(id as string);
    productQuery.refetch();
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
          <h1 className="text-4xl my-10">{productQuery.data.name}</h1>

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

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ProductFields product={productQuery.data} ref={formRef} />
            <ProductImageUpload
              refetchFn={() => {
                productQuery.refetch();
              }}
            />
          </div>

          <div className="relative w-full h-full border rounded flex items-center justify-center min-h-[300px]">
            {productQuery.data.picture ? (
              <>
                <img
                  src={productQuery.data.picture}
                  alt="Product"
                  className="w-full h-auto max-h-[300px] object-contain rounded"
                />
                <MinusCircle
                  className="absolute top-2 right-2  rounded-full p-1 shadow cursor-pointer text-red-500"
                  onClick={handleDeleteImage}
                />
              </>
            ) : (
              <p className="text-gray-500">
                There is no image for this product.
              </p>
            )}
          </div>
        </div>

        <Variations variations={productQuery.data.variations} />
      </div>
    </div>
  );
};
