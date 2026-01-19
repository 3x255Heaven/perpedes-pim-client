import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/button";
import {
  useClientQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from "@/hooks/useClients";
import { Spinner } from "@/shared/spinner";
import { useRef } from "react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { ClientFields } from "./partials/ClientFields";

export const Client = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<HTMLFormElement | null>(null);

  const clientQuery = useClientQuery(id as string);
  const updateClientMutation = useUpdateClientMutation();
  const deleteClientMutation = useDeleteClientMutation();

  const handleSubmit = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      const parsedData = {
        name1: data.name,
        addressNumber: data.addressNumber,
        country: data.country,
        telefon1: data.telefon1,
        telefon2: data.telefon2,
        currency: data.currency,
        paymentCode: data.paymentCode,
        representative: data.representative,
        vat: data.vat,
        area: data.area,
        zipCode: data.zipCode,
        street1: data.street1,
        street2: data.street2,
        mailbox: data.mailbox,
        division: data.division,
        place: data.place,
      };

      updateClientMutation.mutate(
        {
          clientId: id as string,
          updatedClient: parsedData as any,
        },
        {
          onSuccess: async () => {
            await clientQuery.refetch();
            toast("Client is successfully updated!");
          },
          onError: () => {
            toast("Something went wrong, please try again later.");
          },
        },
      );
    }
  };

  const handleDelete = async () => {
    deleteClientMutation.mutate(
      { clientId: id as string },
      {
        onSuccess: () => {
          navigate("/clients");
          toast("Client is successfully deleted!");
        },
        onError: () => {
          toast("Something went wrong, please try again later.");
        },
      },
    );
  };

  if (clientQuery.isPending) {
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
          <h1 className="text-4xl my-10">{clientQuery.data.name1}</h1>

          <div className="flex gap-4">
            <Button
              onClick={handleDelete}
              className="cursor-pointer"
              variant="destructive"
              disabled={
                clientQuery.isFetching || updateClientMutation.isPending
              }
            >
              {clientQuery.isFetching || updateClientMutation.isPending ? (
                <LoaderIcon />
              ) : (
                "Delete"
              )}
            </Button>

            <Button
              className="bg-[#9bc79b] text-white cursor-pointer"
              onClick={handleSubmit}
              disabled={
                clientQuery.isFetching || updateClientMutation.isPending
              }
            >
              {clientQuery.isFetching || updateClientMutation.isPending ? (
                <LoaderIcon />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          <div className="flex flex-col gap-6">
            <ClientFields client={clientQuery.data} ref={formRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
