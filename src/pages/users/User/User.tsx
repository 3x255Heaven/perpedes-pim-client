import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/button";
import { Spinner } from "@/shared/spinner";
import { useRef } from "react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { UserFields } from "./partials/UserFields";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserQuery,
} from "@/hooks/useUsers";
import { useClientQuery } from "@/hooks/useClients";

export const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<HTMLFormElement | null>(null);

  const userQuery = useUserQuery(id as string);
  const clientQuery = useClientQuery(userQuery.data?.clientId);
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const parsedData = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        clientId: data.clientId,
        clientBusinessId: data.clientBusinessId,
      };

      updateUserMutation.mutate(
        {
          userId: id as string,
          updatedUser: parsedData as any,
        },
        {
          onSuccess: async () => {
            await userQuery.refetch();
            toast("User is successfully updated!");
          },
          onError: () => {
            toast("Something went wrong, please try again later.");
          },
        },
      );
    }
  };

  const handleDelete = async () => {
    deleteUserMutation.mutate(
      { userId: id as string },
      {
        onSuccess: () => {
          navigate("/users");
          toast("User is successfully deleted!");
        },
        onError: () => {
          toast("Something went wrong, please try again later.");
        },
      },
    );
  };

  if (userQuery.isPending || clientQuery.isPending) {
    return (
      <div className="flex h-[92vh] flex-col justify-center items-center gap-4 p-4 pt-0">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-10 pt-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl my-10">{userQuery.data.username}</h1>

          <div className="flex gap-4">
            <Button
              onClick={handleDelete}
              className="cursor-pointer"
              variant="destructive"
              disabled={userQuery.isFetching || updateUserMutation.isPending}
            >
              {userQuery.isFetching || updateUserMutation.isPending ? (
                <LoaderIcon />
              ) : (
                "Delete"
              )}
            </Button>

            <Button
              className="bg-[#9bc79b] text-white cursor-pointer"
              onClick={handleSubmit}
              disabled={userQuery.isFetching || updateUserMutation.isPending}
            >
              {userQuery.isFetching || updateUserMutation.isPending ? (
                <LoaderIcon />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <div className="flex flex-col gap-6">
            <UserFields
              user={userQuery.data}
              client={clientQuery.data}
              ref={formRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
