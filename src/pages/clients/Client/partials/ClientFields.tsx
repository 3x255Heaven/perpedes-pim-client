import { Input } from "@/shared/input";
import { Label } from "@/shared/label";

export const ClientFields = ({ client, ref }: { client: any; ref: any }) => {
  return (
    <form ref={ref} className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 w-full">
      <div className="rounded-xl bg-muted/50 p-4">
        <span className="font-bold text-2xl">General Information</span>

        <div className="flex gap-4 mt-4 items-baseline">
          <div className="grid w-full items-center gap-1 mt-4">
            <Label htmlFor="name" className="text-[#9bc79b]">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              defaultValue={client?.name1 ?? ""}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="addressNumber" className="text-[#9bc79b]">
              Address Number
            </Label>
            <Input
              type="text"
              id="addressNumber"
              placeholder="Address Number"
              defaultValue={client?.addressNumber ?? ""}
              name="addressNumber"
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="country" className="text-[#9bc79b]">
              Country
            </Label>
            <Input
              type="text"
              id="country"
              placeholder="Country"
              defaultValue={client?.country ?? ""}
              name="country"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="telefon1" className="text-[#9bc79b]">
              Primary Phone
            </Label>
            <Input
              type="text"
              id="telefon1"
              placeholder="Phone"
              defaultValue={client?.telefon1 ?? ""}
              name="telefon1"
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="telefon2" className="text-[#9bc79b]">
              Secondary Phone
            </Label>
            <Input
              type="text"
              id="telefon2"
              placeholder="Secondary Phone"
              defaultValue={client?.telefon2 ?? ""}
              name="telefon2"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="currency" className="text-[#9bc79b]">
              Currency
            </Label>
            <Input
              type="text"
              id="currency"
              placeholder="Currency"
              defaultValue={client?.currency ?? ""}
              name="currency"
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="paymentCode" className="text-[#9bc79b]">
              Payment Code
            </Label>
            <Input
              type="text"
              id="paymentCode"
              placeholder="Payment Code"
              defaultValue={client?.paymentCode ?? ""}
              name="paymentCode"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="representative" className="text-[#9bc79b]">
              Representative
            </Label>
            <Input
              type="text"
              id="representative"
              placeholder="Representative"
              defaultValue={client?.representative ?? ""}
              name="representative"
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="vat" className="text-[#9bc79b]">
              VAT
            </Label>
            <Input
              type="text"
              id="vat"
              placeholder="VAT"
              defaultValue={client?.vat ?? ""}
              name="vat"
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-muted/50 p-4">
        <span className="font-bold text-2xl">Location information</span>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="area" className="text-[#9bc79b]">
              Area
            </Label>
            <Input
              type="text"
              id="area"
              placeholder="Area"
              defaultValue={client?.area ?? ""}
              name="area"
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="zipCode" className="text-[#9bc79b]">
              ZIP Code
            </Label>
            <Input
              type="text"
              id="zipCode"
              placeholder="ZIP Code"
              defaultValue={client?.zipCode ?? ""}
              name="zipCode"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="street1" className="text-[#9bc79b]">
              Primary Street
            </Label>
            <Input
              type="text"
              id="street1"
              placeholder="Primary Street"
              defaultValue={client?.street1 ?? ""}
              name="street1"
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="street2" className="text-[#9bc79b]">
              Secondary Street
            </Label>
            <Input
              type="text"
              id="street2"
              placeholder="Secondary Street"
              defaultValue={client?.street1 ?? ""}
              name="street2"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="mailbox" className="text-[#9bc79b]">
              Mailbox
            </Label>
            <Input
              type="text"
              id="mailbox"
              placeholder="Mailbox"
              defaultValue={client?.mailbox ?? ""}
              name="mailbox"
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="division" className="text-[#9bc79b]">
              Division
            </Label>
            <Input
              type="text"
              id="division"
              placeholder="Division"
              defaultValue={client?.division ?? ""}
              name="division"
            />
          </div>
        </div>

        <div className="grid w-full items-center gap-1 mt-4">
          <Label htmlFor="place" className="text-[#9bc79b]">
            Place
          </Label>
          <Input
            type="text"
            id="place"
            placeholder="Place"
            defaultValue={client?.place ?? ""}
            name="place"
          />
        </div>
      </div>
    </form>
  );
};
