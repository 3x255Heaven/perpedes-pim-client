import { ImportHistory } from "@/pages/products/partials/ImportHistory";
import data from "@/mocks/data.json";
import { UploadIcon } from "lucide-react";
import { Button } from "@/components/shared/button";

export const AddProducts = () => {
  return (
    <div className="w-full p-16 flex flex-col justify-center gap-8">
      <div className="flex flex-col justify-center w-full">
        <span className="font-bold text-3xl mb-4">Import Products</span>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 transition-[2s] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800"
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
      <div className="w-full h-full flex flex-col">
        <span className="font-bold text-3xl mb-4">Import History</span>
        <ImportHistory data={data} />
      </div>
    </div>
  );
};
