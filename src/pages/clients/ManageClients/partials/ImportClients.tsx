import { useState } from "react";
import { Button } from "@/shared/button";
import { CircleMinusIcon, UploadIcon } from "lucide-react";
import { useImportClientsMutation } from "@/hooks/useClients";
import { toast } from "sonner";

export const ImportClients = () => {
  const [file, setFile] = useState<File | null>(null);
  const mutation = useImportClientsMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      mutation.mutate(file, {
        onSuccess: () => {
          toast(
            "The import is started in the background, you can proceed to use application. Check log table for status of the import.",
          );
          setFile(null);
        },
        onError: () => {
          toast("Something went wrong, please try again later.");
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <span className="font-bold text-3xl mb-4">Import Clients</span>
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
                Supported format: CSV
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileChange}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CircleMinusIcon
              onClick={() => {
                setFile(null);
              }}
            />
            <p className="mb-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Uploaded file:</span> {file.name}
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
  );
};
