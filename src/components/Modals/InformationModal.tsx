import { Badge } from "@/shared/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/dialog";

type MultiValueProperty = {
  id: number;
  code: string;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  hmvNumber: string;
  modelId: string;
  factory: string;
  colors: MultiValueProperty[];
  picture: string;
  widthSystem: string;
  shoeTypes: MultiValueProperty[];
  closureSystems: MultiValueProperty[];
  upperMaterials: MultiValueProperty[];
  innerLinings: MultiValueProperty[];
  soleTypes: MultiValueProperty[];
  soleColors: MultiValueProperty[];
  functions: MultiValueProperty[];
  smf: string;
};

interface InformationModalProps {
  isModalOpen: "info" | "stock" | null;
  setModalOpen: (type: "info" | "stock" | null) => void;
  product: Product | null;
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | number | null | undefined;
  mono?: boolean;
}) {
  const displayValue =
    value === null || value === undefined || value === "" ? "N/A" : value;

  return (
    <div className="p-2">
      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
        {label}:
      </h4>
      <Badge
        variant="secondary"
        className={`${
          mono ? "font-mono" : "font-normal"
        } text-gray-900 dark:text-gray-100 py-2 px-4`}
      >
        {displayValue}
      </Badge>
    </div>
  );
}

export const InformationModal = ({
  isModalOpen,
  setModalOpen,
  product,
}: InformationModalProps) => {
  if (!product) return null;

  return (
    <Dialog
      open={isModalOpen === "info"}
      onOpenChange={() => setModalOpen(null)}
    >
      <DialogContent className="max-w-6xl w-full sm:max-w-5xl md:max-w-6xl p-0 rounded-xl bg-white dark:bg-black shadow-lg overflow-auto max-h-[90vh]">
        <DialogHeader className="px-8 pt-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row h-[70vh] sm:h-[80vh]">
          <div className="w-full sm:w-1/2 bg-gray-100 flex items-center justify-center overflow-hidden rounded-none sm:rounded-bl-xl sm:rounded-tl-xl p-4">
            <img
              src={product.picture}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="w-full sm:w-1/2 overflow-y-auto p-6 flex flex-col">
            <div className="mb-8 text-gray-900 dark:text-gray-100 prose max-w-none flex-shrink-0">
              {product.description || "N/A"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 flex-grow overflow-auto">
              <DetailRow label="ID" value={product.id} mono />
              <DetailRow label="HMV Number" value={product.hmvNumber} mono />
              <DetailRow label="Model ID" value={product.modelId} mono />
              <DetailRow label="Factory" value={product.factory} />
              <DetailRow
                label="Color"
                value={product.colors
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow label="Width System" value={product.widthSystem} />
              <DetailRow
                label="Shoe Type"
                value={product.shoeTypes
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow
                label="Closure System"
                value={product.closureSystems
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow
                label="Upper Material"
                value={product.upperMaterials
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow
                label="Inner Lining"
                value={product.innerLinings
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow
                label="Sole Type"
                value={product.soleTypes
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow
                label="Sole Color"
                value={product.soleColors
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow
                label="Function"
                value={product.functions
                  .map((color) => color.name.toUpperCase())
                  .join(", ")}
              />
              <DetailRow label="SMF" value={product.smf} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
