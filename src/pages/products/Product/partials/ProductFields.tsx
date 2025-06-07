import {
  useClosureSystemTypesQuery,
  useColorTypesQuery,
  useFunctionTypesQuery,
  useInnerLiningTypesQuery,
  useShoeTypesQuery,
  useSoleTypesQuery,
  useUpperMaterialsTypesQuery,
} from "@/hooks/useTypes";
import { Input } from "@/shared/input";
import { Label } from "@/shared/label";
import { MultiSelect } from "@/shared/multiselect";
import { Textarea } from "@/shared/textarea";
import { useState } from "react";

export const ProductFields = ({ product, ref }: { product: any; ref: any }) => {
  const [soleType, setSoleType] = useState<string | string[]>([]);
  const [soleColor, setSoleColor] = useState<string | string[]>([]);
  const [shoeType, setShoeType] = useState<string | string[]>([]);
  const [closureSystem, setClosureSystem] = useState<string | string[]>([]);
  const [upperMaterial, setUpperMaterial] = useState<string | string[]>([]);
  const [innerLining, setInnerLining] = useState<string | string[]>([]);
  const [productFunction, setProductFunction] = useState<string | string[]>([]);

  const colorsTypesQuery = useColorTypesQuery();
  const shoeTypesQuery = useShoeTypesQuery();
  const soleTypesQuery = useSoleTypesQuery();
  const upperMaterialTypesQuery = useUpperMaterialsTypesQuery();
  const innerLiningTypesQuery = useInnerLiningTypesQuery();
  const closureSystemTypesQuery = useClosureSystemTypesQuery();
  const functionTypesQuery = useFunctionTypesQuery();

  return (
    <form ref={ref} className="flex gap-4">
      <div className="w-1/2 aspect-video rounded-xl bg-muted/50 p-4">
        <span className="font-bold text-2xl">General Information</span>

        <div className="grid w-full items-center gap-1 mt-4">
          <Label htmlFor="name" className="text-[#9bc79b]">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            defaultValue={product?.name ?? ""}
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
              defaultValue={product?.hmvNumber ?? ""}
              name="hmvNumber"
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
              defaultValue={product?.modelId ?? ""}
              name="modelId"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="soleType" className="text-[#9bc79b]">
              Sole Type
            </Label>
            <MultiSelect
              options={soleTypesQuery.data ? soleTypesQuery.data : []}
              onValueChange={(value) => {
                setSoleType(value);
              }}
              placeholder="Sole Type"
              variant="inverted"
              maxCount={1}
            />
            <input type="hidden" name="soleType" value={soleType as string[]} />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="soleColor" className="text-[#9bc79b]">
              Sole Color
            </Label>
            <MultiSelect
              options={colorsTypesQuery.data ? colorsTypesQuery.data : []}
              onValueChange={(value) => {
                setSoleColor(value);
              }}
              placeholder="Sole Color"
              variant="inverted"
              maxCount={1}
            />
            <input
              type="hidden"
              name="soleColor"
              value={soleColor as string[]}
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
            defaultValue={product?.description ?? ""}
            name="description"
          />
        </div>
      </div>
      <div className="w-1/2 aspect-video rounded-xl bg-muted/50 p-4">
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
              defaultValue={product?.factory ?? ""}
              name="factory"
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
              defaultValue={product?.widthSystem ?? ""}
              name="widthSystem"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="shoeType" className="text-[#9bc79b]">
              Shoe Type
            </Label>
            <MultiSelect
              options={shoeTypesQuery.data ? shoeTypesQuery.data : []}
              onValueChange={(value) => {
                setShoeType(value);
              }}
              placeholder="Shoe Type"
              variant="inverted"
              maxCount={1}
            />
            <input type="hidden" name="shoeType" value={shoeType as string[]} />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="smf" className="text-[#9bc79b]">
              SMF
            </Label>
            <Input
              type="text"
              id="smf"
              placeholder="SMF"
              defaultValue={product?.smf ?? ""}
              name="smf"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="closureSystem" className="text-[#9bc79b]">
              Closure System
            </Label>
            <MultiSelect
              options={
                closureSystemTypesQuery.data ? closureSystemTypesQuery.data : []
              }
              onValueChange={(value) => {
                setClosureSystem(value);
              }}
              placeholder="Closure System"
              variant="inverted"
              maxCount={1}
            />
            <input
              type="hidden"
              name="closureSystem"
              value={closureSystem as string[]}
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="upperMaterial" className="text-[#9bc79b]">
              Upper Material
            </Label>
            <MultiSelect
              options={
                upperMaterialTypesQuery.data ? upperMaterialTypesQuery.data : []
              }
              onValueChange={(value) => {
                setUpperMaterial(value);
              }}
              placeholder="Upper Material"
              variant="inverted"
              maxCount={1}
            />
            <input
              type="hidden"
              name="upperMaterial"
              value={upperMaterial as string[]}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="innerLining" className="text-[#9bc79b]">
              Inner Lining
            </Label>
            <MultiSelect
              options={
                innerLiningTypesQuery.data ? innerLiningTypesQuery.data : []
              }
              onValueChange={(value) => {
                setInnerLining(value);
              }}
              placeholder="Inner Lining"
              variant="inverted"
              maxCount={1}
            />
            <input
              type="hidden"
              name="innerLining"
              value={innerLining as string[]}
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="function" className="text-[#9bc79b]">
              Function
            </Label>
            <MultiSelect
              options={functionTypesQuery.data ? functionTypesQuery.data : []}
              onValueChange={(value) => {
                setProductFunction(value);
              }}
              placeholder="Function"
              variant="inverted"
              maxCount={1}
            />
            <input
              type="hidden"
              name="function"
              value={productFunction as string[]}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
