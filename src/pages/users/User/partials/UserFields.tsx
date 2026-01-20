import { ClientsSearchSelect } from "@/components/SearchSelect/SearchSelect";
import { Input } from "@/shared/input";
import { Label } from "@/shared/label";
import { useState } from "react";

export const UserFields = ({
  user,
  client,
  ref,
}: {
  user: any;
  client: any;
  ref: any;
}) => {
  const [selectedClient, setSelectedClient] = useState<{
    id: string;
    label: string;
  } | null>({ id: client.id, label: client.name1 });

  return (
    <form ref={ref} className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 w-full">
      <div className="rounded-xl bg-muted/50 p-4">
        <span className="font-bold text-2xl">General Information</span>

        <div className="flex gap-4 mt-4 items-baseline">
          <div className="grid w-full items-center gap-1 mt-4">
            <Label htmlFor="username" className="text-[#9bc79b]">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              name="username"
              defaultValue={user?.username ?? ""}
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="role" className="text-[#9bc79b]">
              Role
            </Label>
            <Input
              type="text"
              id="role"
              placeholder="Role"
              defaultValue={user?.role ?? ""}
              name="role"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="firstName" className="text-[#9bc79b]">
              First name
            </Label>
            <Input
              type="text"
              id="firstName"
              placeholder="First name"
              defaultValue={user?.firstName ?? ""}
              name="firstName"
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="lastName" className="text-[#9bc79b]">
              Last name
            </Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Last name"
              defaultValue={user?.lastName ?? ""}
              name="lastName"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-muted/50 p-4">
        <span className="font-bold text-2xl">Client information</span>

        <div className="flex gap-4 mt-4">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="clientId" className="text-[#9bc79b]">
              Client
            </Label>

            <ClientsSearchSelect
              value={selectedClient}
              onChange={setSelectedClient}
            />

            <input
              type="hidden"
              name="clientId"
              value={selectedClient?.id ?? ""}
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="clientBusinessId" className="text-[#9bc79b]">
              Client Business ID
            </Label>
            <Input
              type="text"
              id="clientBusinessId"
              placeholder="Client Business ID"
              defaultValue={user?.clientBusinessId ?? ""}
              name="clientBusinessId"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
