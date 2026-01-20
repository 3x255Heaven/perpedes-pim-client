import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/button";
import { useRef, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateUserMutation } from "@/hooks/useUsers";
import { Label } from "@/shared/label";
import { Input } from "@/shared/input";
import { ClientsSearchSelect } from "@/components/SearchSelect/SearchSelect";

export const ManageUser = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [client, setClient] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const createUserMutation = useCreateUserMutation();

  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const parsedData = {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        clientId: data.clientId,
        clientBusinessId: data.clientBusinessId,
      };

      createUserMutation.mutate(
        {
          newUser: parsedData as any,
        },
        {
          onSuccess: async (data) => {
            toast("User is successfully created!");
            navigate(`/users/${data.id}`);
          },
          onError: () => {
            toast("Something went wrong, please try again later.");
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10 pt-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl my-10">Create New User</h1>

          <div className="flex gap-4">
            <Button
              className="bg-[#9bc79b] text-white cursor-pointer"
              onClick={handleSubmit}
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? <LoaderIcon /> : "Create"}
            </Button>
          </div>
        </div>

        <div className="flex justify-start items-center w-full">
          <div className="flex justify-center items-center w-full">
            <form
              ref={formRef}
              className="flex justify-center items-center w-full"
            >
              <div className="rounded-xl bg-muted/50 p-10 w-full">
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
                    />
                  </div>

                  <div className="grid w-full items-center gap-1 mt-4">
                    <Label htmlFor="password" className="text-[#9bc79b]">
                      Password
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      name="password"
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
                      name="lastName"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="grid w-full items-center gap-1">
                    <Label htmlFor="role" className="text-[#9bc79b]">
                      Role
                    </Label>
                    <Input
                      type="text"
                      id="role"
                      placeholder="Role"
                      name="role"
                    />
                  </div>

                  <div className="grid w-full items-center gap-1">
                    <Label htmlFor="clientId" className="text-[#9bc79b]">
                      Client
                    </Label>

                    <ClientsSearchSelect value={client} onChange={setClient} />

                    <input
                      type="hidden"
                      name="clientId"
                      value={client?.id ?? ""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
