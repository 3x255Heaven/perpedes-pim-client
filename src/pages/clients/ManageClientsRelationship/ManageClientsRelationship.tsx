import { ImportClientsRelationship } from "./partials/ImportClientsRelationship";
import { ImportClientsRelationshipHistory } from "./partials/ImportClientsRelationshipHistory";

export const ManageClientsRelationship = () => {
  return (
    <div className="w-full p-16 flex flex-col justify-center gap-8">
      <ImportClientsRelationship />
      <ImportClientsRelationshipHistory />
    </div>
  );
};
