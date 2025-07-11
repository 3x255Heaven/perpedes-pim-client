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
import { useRef, useState } from "react";
import { LoaderIcon, MinusCircle } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/dialog";

export const Product = () => {
  const { id } = useParams();
  const formRef = useRef(null);

  const productQuery = useProductQuery(id as string);
  const updateProductMutation = useUpdateProductMutation();
  const deleteImageMutation = useDeleteProductImageMutation();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const toNumberArray = (value: unknown) =>
        typeof value === "string"
          ? value
              .split(",")
              .map(Number)
              .filter((n) => !isNaN(n))
          : [];

      const parsedData = {
        name: data.name,
        description: data.description,
        hmv: data.hmvNumber,
        modelId: data.modelId,
        factory: data.factory,
        widthSystem: data.widthSystem,
        smf: data.smf,
        colorIds: toNumberArray(data.color),
        soleMaterialIds: toNumberArray(data.soleType),
        soleColorIds: toNumberArray(data.soleColor),
        shoeTypeIds: toNumberArray(data.shoeType),
        closureSystemIds: toNumberArray(data.closureSystem),
        upperMaterialIds: toNumberArray(data.upperMaterial),
        innerLiningIds: toNumberArray(data.innerLining),
        functionIds: toNumberArray(data.function),
      };

      updateProductMutation.mutate(
        {
          productId: id as string,
          updatedProduct: parsedData as any,
        },
        {
          onSuccess: async () => {
            await productQuery.refetch();
            toast("Product is successfully updated!");
          },
          onError: () => {
            toast("Something went wrong, please try again later.");
          },
        }
      );
    }
  };

  const handleDeleteImage = async () => {
    try {
      await deleteImageMutation.mutateAsync(id as string);
      await productQuery.refetch();
      toast("Image deleted successfully!");
    } catch {
      toast("Failed to delete image, please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
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
          <h1 className="text-4xl my-10">{productQuery.data.name}</h1>

          <div className="flex gap-4">
            <Button
              className="bg-[#9bc79b] text-white cursor-pointer"
              onClick={handleSubmit}
              disabled={
                productQuery.isFetching || updateProductMutation.isPending
              }
            >
              {productQuery.isFetching || updateProductMutation.isPending ? (
                <LoaderIcon />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <ProductFields product={productQuery.data} ref={formRef} />
            <ProductImageUpload
              refetchFn={() => {
                productQuery.refetch();
              }}
            />
          </div>

          <div className="relative w-full h-full border rounded-xl flex items-center justify-center min-h-[300px] bg-muted/20 p-4">
            {productQuery.data.picture ? (
              <>
                <img
                  src={productQuery.data.picture}
                  alt="Product"
                  className="w-full max-h-[300px] object-contain rounded-md"
                />

                <Dialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}
                >
                  <DialogTrigger asChild>
                    <MinusCircle
                      className="absolute top-2 right-2 rounded-full p-1 bg-white/80 hover:bg-white shadow-md cursor-pointer text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDeleteDialogOpen(true);
                      }}
                    />
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to delete this product image? This
                      action can't be undone.
                    </p>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => setIsDeleteDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="cursor-pointer"
                        variant="destructive"
                        disabled={
                          productQuery.isFetching ||
                          deleteImageMutation.isPending
                        }
                        onClick={handleDeleteImage}
                      >
                        {productQuery.isFetching ||
                        deleteImageMutation.isPending ? (
                          <LoaderIcon />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <p className="text-gray-500 text-center text-sm sm:text-base">
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
