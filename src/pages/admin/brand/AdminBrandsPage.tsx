import { toast } from "sonner";
import {
  useGetAdminBrandsQuery,
  useToggleBrandActiveMutation,
  useDeleteBrandMutation,
} from "@/services/brandApi";

import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineFire,
} from "react-icons/hi2";
import { MODAL } from "@/components/modals/Modal";
import { BrandForm } from "./BrandForm";
import { fireEscape } from "@/hooks/Esc";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { Plus } from "lucide-react";

// ============================================
// MAIN PAGE
// ============================================
const AdminBrandsPage = () => {
  const { data, isLoading } = useGetAdminBrandsQuery();

  const [toggleActive] = useToggleBrandActiveMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const brands = data?.data || [];

  const handleToggle = async (id: string) => {
    try {
      const result = await toggleActive(id).unwrap();
      toast.success(result.message);
    } catch (err: any) {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBrand(id).unwrap();
      toast.success("Brand deleted");
    } catch (err: any) {
      toast.error("Failed", { description: err?.data?.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-foreground">Brands</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {brands.length} brands · {brands.filter((b) => b.isActive).length}{" "}
            active
          </p>
        </div>

        <MODAL
          title={"Add Brand"}
          modalSize="md"
          showCloseButton
          closeOnOutsideClick={!isLoading}
          closeOnEscape={!isLoading}
          trigger={
            <>
              <Plus className="w-4 h-4" />
              Add Brand
            </>
          }
          triggerStyles="rounded-xl"
        >
          <BrandForm onCancel={() => fireEscape()} />
        </MODAL>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total", value: brands.length },
          { label: "Active", value: brands.filter((b) => b.isActive).length },
          { label: "Popular", value: brands.filter((b) => b.isPopular).length },
          {
            label: "Inactive",
            value: brands.filter((b) => !b.isActive).length,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-elevated border border-border rounded-2xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-surface-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Brands Table */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
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
                    Brand
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Tier
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
                {brands.map((brand) => (
                  <tr
                    key={brand._id}
                    className={`border-b border-border last:border-0 ${!brand.isActive ? "opacity-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-surface-foreground text-sm">
                          {brand.name}
                        </span>
                        {brand.isPopular && (
                          <HiOutlineFire
                            className="w-4 h-4 text-brand"
                            title="Popular"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize
                        ${
                          brand.tier === "high"
                            ? "bg-brand-muted text-brand"
                            : brand.tier === "mid"
                              ? "bg-info/10 text-info"
                              : "bg-surface-muted text-muted-foreground"
                        }`}
                      >
                        {brand.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {brand.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggle(brand._id)}
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full
                          ${brand.isActive ? "bg-success/10 text-success" : "bg-red-50 text-red-500"}`}
                      >
                        {brand.isActive ? (
                          <>
                            <HiOutlineEye className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <HiOutlineEyeSlash className="w-3 h-3" /> Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <MODAL
                          title={"Add Brand"}
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
                          <BrandForm
                            existingBrand={brand}
                            onCancel={() => fireEscape()}
                          />
                        </MODAL>

                        <ConfirmDialog
                          onConfirm={() => handleDelete(brand._id)}
                          confirmText="Confirm Delete"
                          trigger={
                            <HiOutlineTrash className="w-4 h-4 text-red-400" />
                          }
                          triggerStyles="rounded-full w-7 p-1"
                          size={"sm"}
                          title={`Do you want to delete "${brand?.name}"`}
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

export default AdminBrandsPage;
