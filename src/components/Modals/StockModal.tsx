import { useState, useMemo } from "react";
import { MultiValueProperty, ProductType } from "@/hooks/useProducts";
import { Badge } from "@/shared/badge";
import { Card } from "@/shared/card";
import { Dialog, DialogContent } from "@/shared/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/select";
import { Input } from "@/shared/input";

interface StockModalProps {
  isModalOpen: "info" | "stock" | null;
  setModalOpen: (type: "info" | "stock" | null) => void;
  products: ProductType[];
  productModelId: string;
  productFunctions: MultiValueProperty[];
}

export const StockModal = ({
  isModalOpen,
  setModalOpen,
  products,
  productModelId,
  productFunctions,
}: StockModalProps) => {
  const [unitFilter, setUnitFilter] = useState<string | null>(null);
  const [widthFilter, setWidthFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string>("");

  if (!products || products.length === 0) return null;

  const stocksForTable = products.flatMap((product) =>
    product.stocks.map((stock) => {
      const eurPriceObj = product.prices.find((p) => p.currency === "EUR");
      const displayedPrice = eurPriceObj
        ? eurPriceObj.price
        : product.prices[0]?.price;

      let status: "No Stock" | "Low Stock" | "In Stock";
      if (stock.stockQuantity === 0) {
        status = "No Stock";
      } else if (stock.stockQuantity <= 2) {
        status = "Low Stock";
      } else {
        status = "In Stock";
      }

      return {
        id: stock.stockId,
        productFunction: productFunctions.map((f) => f.name).join(", "),
        modelId: productModelId,
        unit: product.unit,
        width: product.width,
        size: product.size,
        stock: stock.stockQuantity,
        price: displayedPrice,
        currency: eurPriceObj?.currency || product.prices[0]?.currency,
        status,
        batch: stock.batch,
      };
    })
  );

  const units = Array.from(new Set(stocksForTable.map((item) => item.unit)));
  const widths = Array.from(new Set(stocksForTable.map((item) => item.width)));

  const filteredStocks = useMemo(() => {
    return stocksForTable.filter((item) => {
      const unitMatch = unitFilter ? item.unit === unitFilter : true;
      const widthMatch = widthFilter ? item.width === widthFilter : true;
      const sizeMatch = sizeFilter
        ? item.size?.toLowerCase().includes(sizeFilter.toLowerCase())
        : true;

      return unitMatch && widthMatch && sizeMatch;
    });
  }, [stocksForTable, unitFilter, widthFilter, sizeFilter]);

  const isFilterApplied = unitFilter || widthFilter;
  const totalStock = filteredStocks.reduce((acc, item) => acc + item.stock, 0);

  return (
    <Dialog
      open={isModalOpen === "stock"}
      onOpenChange={() => setModalOpen(null)}
    >
      <DialogContent className="max-w-7xl w-full sm:max-w-6xl md:max-w-7xl p-0">
        <div className="flex h-[600px] bg-white dark:bg-black text-black dark:text-white">
          <div className="flex-1 p-4 overflow-auto border-r border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <div className="flex gap-4 mb-4">
                <Select
                  onValueChange={(val) => setUnitFilter(val)}
                  value={unitFilter || ""}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(val) => setWidthFilter(val)}
                  value={widthFilter || ""}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Width" />
                  </SelectTrigger>
                  <SelectContent>
                    {widths.map((width) => (
                      <SelectItem key={width} value={width}>
                        {width}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="text"
                  placeholder="Filter by Size"
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="w-[120px]"
                />
              </div>

              {isFilterApplied && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {unitFilter && (
                    <Badge
                      className="flex items-center gap-2 px-2 py-1 bg-blue-100 text-black dark:bg-blue-400 dark:text-white cursor-pointer"
                      onClick={() => setUnitFilter(null)}
                    >
                      <span className="font-bold">Unit:</span>
                      <span>{unitFilter}</span>
                    </Badge>
                  )}
                  {widthFilter && (
                    <Badge
                      className="flex items-center gap-2 px-2 py-1 bg-blue-100 text-black dark:bg-blue-400 dark:text-white cursor-pointer"
                      onClick={() => setWidthFilter(null)}
                    >
                      <span className="font-bold">Width:</span>
                      <span>{widthFilter}</span>
                    </Badge>
                  )}
                  <Badge
                    onClick={() => {
                      setUnitFilter(null);
                      setWidthFilter(null);
                    }}
                    className="flex items-center gap-2 px-2 py-1 bg-red-400 text-white cursor-pointer"
                  >
                    Clear All
                  </Badge>
                </div>
              )}
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Artikelnummer</th>
                  <th className="text-left p-2">Funktion</th>
                  <th className="text-left p-2">Modell ID</th>
                  <th className="text-left p-2">Seite</th>
                  <th className="text-left p-2">Größe</th>
                  <th className="text-left p-2">Preis</th>
                  <th className="text-left p-2">Charge</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Bestand</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((item) => (
                  <tr
                    key={`${item.id}-${item.batch}`}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.productFunction}</td>
                    <td className="p-2">
                      <Badge variant="secondary">{item.modelId}</Badge>
                    </td>
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2">{item.size}</td>
                    <td className="p-2">
                      {item.price} {item.currency}
                    </td>
                    <td className="p-2">{item.batch}</td>
                    <td className="p-2">
                      {item.status === "In Stock" && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-400 dark:text-white">
                          In Stock
                        </Badge>
                      )}
                      {item.status === "Low Stock" && (
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-orange-400 dark:text-white">
                          Low Stock
                        </Badge>
                      )}
                      {item.status === "No Stock" && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-400 dark:text-white">
                          No Stock
                        </Badge>
                      )}
                    </td>
                    <td className="p-2">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-[400px] p-4 overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Stock Summary</h2>
            <p className="text-sm text-gray-500 mb-4">
              Showing stock details for {filteredStocks.length} products
            </p>

            <Card className="p-3 text-center mb-4">
              <p className="font-bold text-lg">{totalStock}</p>
              <p className="text-xs text-gray-500">
                Total amount of variations in Stock
              </p>
            </Card>

            <h3 className="font-medium mb-2">Stock Status</h3>
            <Badge
              className={`mb-2 ${
                totalStock > 5
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {totalStock > 5 ? "In Stock" : "Low Stock"}
            </Badge>

            <h3 className="font-medium mt-6 mb-2">Products Specifications</h3>
            <ul className="text-sm text-gray-600 space-y-1 max-h-60 overflow-auto">
              {products.map((product) => (
                <li key={product.id}>
                  <strong>Product ID:</strong> {product.productId} |{" "}
                  <strong>Size:</strong> {product.size} |{" "}
                  <strong>Material:</strong> {product.width} |{" "}
                  <strong>Unit:</strong> {product.unit.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
