import { MultiValueProperty, ProductType } from "@/hooks/useProducts";
import { Badge } from "@/shared/badge";
import { Card } from "@/shared/card";
import { Dialog, DialogContent } from "@/shared/dialog";

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
  if (!products || products.length === 0) return null;

  const stocksForTable = products.flatMap((product) =>
    product.stocks.map((stock) => {
      const eurPriceObj = product.prices.find((p) => p.currency === "EUR");
      const displayedPrice = eurPriceObj
        ? eurPriceObj.price
        : product.prices[0]?.price;

      return {
        id: stock.stockId,
        productFunction: productFunctions.map((f) => f.name).join(", "),
        modelId: productModelId,
        unit: product.unit,
        size: product.size,
        stock: stock.stockQuantity,
        price: displayedPrice,
        currency: eurPriceObj?.currency || product.prices[0]?.currency,
        status: stock.stockQuantity > 5 ? "In Stock" : "Low Stock",
        batch: stock.batch,
      };
    })
  );

  const totalStock = products.reduce(
    (acc, product) =>
      acc +
      product.stocks.reduce(
        (stockAcc, stock) => stockAcc + stock.stockQuantity,
        0
      ),
    0
  );

  return (
    <Dialog
      open={isModalOpen === "stock"}
      onOpenChange={() => setModalOpen(null)}
    >
      <DialogContent className="max-w-7xl w-full sm:max-w-6xl md:max-w-7xl p-0">
        <div className="flex h-[600px] bg-black">
          <div className="flex-1 p-4 overflow-auto border-r">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Artikelnummer</th>
                  <th className="text-left p-2">Funktion</th> {/* TODO */}
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
                {stocksForTable.map((item) => (
                  <tr key={`${item.id}-${item.batch}`} className="border-b">
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
                        <Badge className="bg-green-100 text-green-700">
                          In Stock
                        </Badge>
                      )}
                      {item.status === "Low Stock" && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Low Stock
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
              Showing stock details for {products.length} products
            </p>

            <Card className="p-3 text-center mb-4">
              <p className="font-bold text-lg">{totalStock}</p>
              <p className="text-xs text-gray-500">
                Total {products[0]?.unit.toLowerCase()}s in Stock
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
