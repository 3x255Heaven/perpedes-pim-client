import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UploadIcon } from "lucide-react";

import { Spinner } from "@/shared/spinner";
import { Input } from "@/shared/input";
import { Label } from "@/shared/label";
import { Textarea } from "@/shared/textarea";
import { Button } from "@/shared/button";
import { Card, CardContent } from "@/shared/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/table";

import productsMock from "@/mocks/productsMock.json";

export const Product = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setProduct(productsMock.find((product) => product.id === Number(id)));
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[92vh] flex-col justify-center items-center gap-4 p-4 pt-0">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-10 pt-0">
      <div className="flex flex-col">
        <h1 className="text-4xl my-10">{product.name}</h1>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <span className="font-bold text-2xl">General Information</span>

            <div className="grid w-full items-center gap-1 mt-4">
              <Label htmlFor="name" className="text-[#9bc79b]">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                defaultValue={product.name}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="hmvNumber" className="text-[#9bc79b]">
                  HMV Number
                </Label>
                <Input
                  type="text"
                  id="hmvNumber"
                  placeholder="HMV Number"
                  defaultValue={product.hmvNumber}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="modelId" className="text-[#9bc79b]">
                  Model ID
                </Label>
                <Input
                  type="text"
                  id="modelId"
                  placeholder="Model ID"
                  defaultValue={product.modelId}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="soleType" className="text-[#9bc79b]">
                  Sole Type
                </Label>
                <Input
                  type="text"
                  id="soleType"
                  placeholder="Sole Type"
                  defaultValue={product.soleType}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="soleColor" className="text-[#9bc79b]">
                  Sole Color
                </Label>
                <Input
                  type="text"
                  id="soleColor"
                  placeholder="Sole Color"
                  defaultValue={product.soleColor}
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-1 mt-4">
              <Label htmlFor="description" className="text-[#9bc79b]">
                Description
              </Label>
              <Textarea
                placeholder="Description"
                id="description"
                defaultValue={product.description}
              />
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <span className="font-bold text-2xl">Types & Systems</span>

            <div className="flex gap-4 mt-4">
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="factory" className="text-[#9bc79b]">
                  Factory
                </Label>
                <Input
                  type="text"
                  id="factory"
                  placeholder="Factory"
                  defaultValue={product.factory}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="widthSystem" className="text-[#9bc79b]">
                  Width System
                </Label>
                <Input
                  type="text"
                  id="widthSystem"
                  placeholder="Width System"
                  defaultValue={product.widthSystem}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="shoeType" className="text-[#9bc79b]">
                  Shoe Type
                </Label>
                <Input
                  type="text"
                  id="shoeType"
                  placeholder="Shoe Type"
                  defaultValue={product.shoeType}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="smf" className="text-[#9bc79b]">
                  SMF
                </Label>
                <Input
                  type="text"
                  id="smf"
                  placeholder="SMF"
                  defaultValue={product.smf}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="closureSystem" className="text-[#9bc79b]">
                  Closure System
                </Label>
                <Input
                  type="text"
                  id="closureSystem"
                  placeholder="Closure System"
                  defaultValue={product.closureSystem}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="upperMaterial" className="text-[#9bc79b]">
                  Upper Material
                </Label>
                <Input
                  type="text"
                  id="upperMaterial"
                  placeholder="Upper Material"
                  defaultValue={product.upperMaterial}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="innerLining" className="text-[#9bc79b]">
                  Inner Lining
                </Label>
                <Input
                  type="text"
                  id="innerLining"
                  placeholder="Inner Lining"
                  defaultValue={product.innerLining}
                />
              </div>
              <div className="grid w-full items-center gap-1">
                <Label htmlFor="function" className="text-[#9bc79b]">
                  Function
                </Label>
                <Input
                  type="text"
                  id="function"
                  placeholder="Function"
                  defaultValue={product.function}
                />
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 p-4">
            <span className="font-bold text-2xl">Images</span>

            <div className="flex flex-col justify-center w-full mt-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 transition-[2s] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-sidebar hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-sidebar/10"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon />
                  <p className="mb-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Supported format: PNG, JPG, JPEG
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
              <Button className="bg-[#9bc79b] text-white mt-4 hover:bg-[#afe1af] transition-2 uppercase">
                Upload
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mb-6">
          <Carousel className="w-[50%] flex justify-center">
            <CarouselContent className="-ml-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-6 p-4">
          <span className="font-bold text-2xl">Variations</span>

          <Accordion
            type="single"
            collapsible
            className="w-full mt-4"
            defaultValue="item-1"
          >
            {product.variations.map((variation: any, index: number) => {
              return (
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-[#9bc79b]">
                    {variation.id} / {variation.size} / {variation.width}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <div className="bg-accent rounded p-4">
                      <span className="font-bold text-2xl">
                        General Information
                      </span>
                      <Table className="mt-4">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">ID</TableHead>
                            <TableHead className="font-bold">
                              Product ID
                            </TableHead>
                            <TableHead className="font-bold">Size</TableHead>
                            <TableHead className="font-bold">Width</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow key={variation.id}>
                            <TableCell>{variation.id}</TableCell>
                            <TableCell>{variation.productId}</TableCell>
                            <TableCell>{variation.size}</TableCell>
                            <TableCell>{variation.width}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="bg-accent rounded p-4">
                      <span className="font-bold text-2xl">
                        Stock Information
                      </span>
                      <Table className="mt-4">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">
                              Stock ID
                            </TableHead>
                            <TableHead className="font-bold">
                              Stock Quantity
                            </TableHead>
                            <TableHead className="font-bold">
                              Reserved Stock
                            </TableHead>
                            <TableHead className="font-bold">Batch</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {variation.stocks.map((stock: any) => {
                            return (
                              <TableRow key={stock.id}>
                                <TableCell>{stock.stockId}</TableCell>
                                <TableCell>{stock.stockQuantity}</TableCell>
                                <TableCell>
                                  {stock.blockedStockQuantity}
                                </TableCell>
                                <TableCell>{stock.batch}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="bg-accent rounded p-4">
                      <span className="font-bold text-2xl">
                        Price Information
                      </span>
                      <Table className="mt-4">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">Price</TableHead>
                            <TableHead className="font-bold">
                              Price List
                            </TableHead>
                            <TableHead className="font-bold">
                              Currency
                            </TableHead>
                            <TableHead className="font-bold">Unit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {variation.prices.map((price: any) => {
                            return (
                              <TableRow key={price.id}>
                                <TableCell>{price.price}</TableCell>
                                <TableCell>{price.priceList}</TableCell>
                                <TableCell>{price.currency}</TableCell>
                                <TableCell>{price.unit}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
