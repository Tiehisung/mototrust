import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAdminLocationsQuery,
  useToggleLocationActiveMutation,
  useDeleteLocationMutation,
} from "@/services/locationApi";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineMapPin,
  HiOutlineFire,
} from "react-icons/hi2";
import { MODAL } from "@/components/modals/Modal";
import { LocationForm } from "./LocationForm";
import { fireEscape } from "@/hooks/Esc";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/buttons/Button";

// ============================================
// MAIN PAGE
// ============================================
const AdminLocationsPage = () => {
  const { data, isLoading } = useGetAdminLocationsQuery();

  const [toggleActive, { isLoading: isToggling }] =
    useToggleLocationActiveMutation();
  const [deleteLocation] = useDeleteLocationMutation();

  const [filterRegion, setFilterRegion] = useState("All");

  const locations = data?.data || [];
  const filtered =
    filterRegion === "All"
      ? locations
      : locations.filter((l) => l.region === filterRegion);

  const handleToggle = async (id: string) => {
    try {
      const r = await toggleActive(id).unwrap();
      toast.success(r.message);
    } catch {
      toast.error("Failed");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteLocation(id).unwrap();
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    }
  };

  const byRegion = locations.reduce((acc: any, l) => {
    acc[l.region] = (acc[l.region] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-foreground">
            Locations
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {locations.length} locations
          </p>
        </div>

        <MODAL
          title={"Add Location"}
          modalSize="md"
          showCloseButton
          closeOnOutsideClick={!isLoading}
          closeOnEscape={!isLoading}
          trigger={
            <>
              <Plus className="w-4 h-4" />
              Add Location
            </>
          }
          triggerStyles="rounded-xl"
        >
          <LocationForm onCancel={() => fireEscape()} />
        </MODAL>
      </div>

      {/* Region Stats */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterRegion("All")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filterRegion === "All" ? "bg-brand text-brand-foreground" : "bg-surface-elevated border border-border"}`}
        >
          All
        </button>
        {Object.keys(byRegion).map((region) => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filterRegion === region ? "bg-brand text-brand-foreground" : "bg-surface-elevated border border-border"}`}
          >
            {region} ({byRegion[region]})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-surface-elevated rounded-2xl _shimmer"
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface-elevated border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Region
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Order
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((loc, ) => (
                <tr
                  key={loc._id}
                  className={`border-b border-border last:border-0 ${!loc.isActive ? "opacity-50" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <HiOutlineMapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{loc.name}</span>
                      {loc.isPopular && (
                        <HiOutlineFire className="w-3.5 h-3.5 text-brand" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {loc.region}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground capitalize">
                    {loc.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {loc.displayOrder}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="xs"
                      onClick={() => handleToggle(loc._id)}
                      loading={isToggling}
                      className={`inline-flex items-center gap-1 cursor-pointer text-xs font-medium px-2 py-0.5 rounded-full ${loc.isActive ? "bg-success/10 text-success" : "bg-red-50 text-red-500"}`}
                    >
                      {loc.isActive ? (
                        <>
                          <HiOutlineEye className="w-3 h-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <HiOutlineEyeSlash className="w-3 h-3" />
                          Inactive
                        </>
                      )}
                    </Button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <MODAL
                        title={"Edit Location"}
                        modalSize="md"
                        showCloseButton
                        closeOnOutsideClick={!isLoading}
                        closeOnEscape={!isLoading}
                        trigger={
                          <HiOutlinePencil className="w-4 h-4 text-muted-foreground" />
                        }
                        triggerStyles="rounded-xl"
                        triggerSize={"sm"}
                        variant={"ghost"}
                      >
                        <LocationForm
                          existingLocation={loc}
                          onCancel={() => fireEscape()}
                        />
                      </MODAL>

                      <ConfirmDialog
                        onConfirm={() => handleDelete(loc._id)}
                        confirmText="Confirm Delete"
                        trigger={
                          <HiOutlineTrash className="w-4 h-4 text-red-400" />
                        }
                        triggerStyles="rounded-full w-7 p-1"
                        size={"sm"}
                        title={`Do you want to delete "${loc?.name}"`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </div>
  );
};

export default AdminLocationsPage;
