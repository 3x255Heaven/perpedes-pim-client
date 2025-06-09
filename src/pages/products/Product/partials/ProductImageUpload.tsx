import { useUploadProductImageMutation } from "@/hooks/useProducts";
import { Button } from "@/shared/button";
import { CircleMinusIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ProductImageUpload = ({ refetchFn }: any) => {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const mutation = useUploadProductImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await mutation.mutateAsync({ productId: Number(id), file });
      toast("Image uploaded successfully!");
      setFile(null);
      await refetchFn();
    } catch (error: any) {
      toast(error?.message || "Failed to upload image.");
    }
  };

  return (
    <div className="aspect-video rounded-xl bg-muted/50 p-4">
      <span className="font-bold text-2xl">Images</span>

      <div className="flex flex-col justify-center w-full mt-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 transition-[2s] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-sidebar hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-sidebar/10"
        >
          {!file ? (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon />
                <p className="mb-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported format: PNG, JPG, JPEG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CircleMinusIcon
                onClick={() => {
                  setFile(null);
                }}
                className="cursor-pointer"
              />
              <p className="mb-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Uploaded file:</span>{" "}
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                File size: {file.size} bytes
              </p>
            </div>
          )}
        </label>
        <Button
          className="bg-[#9bc79b] text-white mt-4 hover:bg-[#afe1af] transition-2 uppercase"
          onClick={handleUpload}
          disabled={mutation.isPending || !file}
        >
          {mutation.isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};
