import { ImportClients } from "./partials/ImportClients";
import { ImportClientsHistory } from "./partials/ImportClientsHistory";

export const ManageClients = () => {
  return (
    <div className="w-full p-16 flex flex-col justify-center gap-8">
      <ImportClients />
      <ImportClientsHistory />
    </div>
  );
};
