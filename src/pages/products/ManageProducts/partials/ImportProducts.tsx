import { Button } from "@/shared/button";
import { UploadIcon } from "lucide-react";

export const ImportProducts = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <span className="font-bold text-3xl mb-4">Import Products</span>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 transition-[2s] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-sidebar hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-sidebar/10"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon />
          <p className="mb-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supported format: CSV
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
      <Button className="bg-[#9bc79b] text-white mt-4 hover:bg-[#afe1af] transition-2 uppercase">
        Upload
      </Button>
    </div>
  );
};
