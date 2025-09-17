import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/shared/card";
import { Button } from "@/shared/button";
import { Info, Box, Eye } from "lucide-react";
import { InformationModal } from "../Modals/InformationModal";
import { StockModal } from "../Modals/StockModal";
import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [openModal, setOpenModal] = useState<"info" | "stock" | null>(null);

  return (
    <>
      <Card
        className="relative w-full overflow-hidden rounded-xl shadow-md p-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
          <img
            src={product.picture}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain opacity-0 transition-opacity duration-500"
            onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
          />

          <div
            className={`absolute top-0 right-0 h-full bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-4 transition-all duration-300 ${
              hovered ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => setOpenModal("info")}
            >
              <Info className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => setOpenModal("stock")}
            >
              <Box className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="flex items-center justify-between p-4 pt-0">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">Model ID: {product.modelId}</p>
          </div>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      <InformationModal
        isModalOpen={openModal}
        setModalOpen={setOpenModal}
        product={product}
      />
      <StockModal
        isModalOpen={openModal}
        setModalOpen={setOpenModal}
        products={product.variations}
        productModelId={product.modelId}
        productFunctions={product.functions}
      />
    </>
  );
}
