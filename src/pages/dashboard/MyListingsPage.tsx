import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetMyListingsQuery,
  useDeleteListingMutation,
  useMarkAsSoldMutation,
} from "@/services/listingsApi";
import { toast } from "sonner";
import {
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlinePencil,
  HiOutlineEye,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "approved", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
  { value: "rejected", label: "Rejected" },
];

const MyListingsPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading, refetch } = useGetMyListingsQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
    limit: 50,
  });
  const [deleteListing] = useDeleteListingMutation();
  const [markAsSold] = useMarkAsSoldMutation();

  const listings = data?.data || [];
  const stats = {
    approved: listings.filter((l) => l.status === "approved").length,
    pending: listings.filter((l) => l.status === "pending").length,
    sold: listings.filter((l) => l.status === "sold").length,
    rejected: listings.filter((l) => l.status === "rejected").length,
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteListing(id).unwrap();
      toast.success("Listing deleted");
      refetch();
    } catch (err: any) {
      toast.error("Failed to delete", { description: err?.data?.message });
    }
  };

  const handleMarkSold = async (id: string) => {
    try {
      await markAsSold(id).unwrap();
      toast.success("Marked as sold! 🎉");
      refetch();
    } catch (err: any) {
      toast.error("Failed to update", { description: err?.data?.message });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-surface-foreground">
            My Listings
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {listings.length} total listings
          </p>
        </div>
        <Link
          to="/dashboard/listings/create"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium
            hover:opacity-90 transition-opacity"
        >
          <HiOutlinePlusCircle className="w-4 h-4" />
          New Listing
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Active",
            value: stats?.approved || 0,
            color: "bg-success/10 text-success",
          },
          {
            label: "Pending",
            value: stats?.pending || 0,
            color: "bg-warning/10 text-warning",
          },
          {
            label: "Sold",
            value: stats?.sold || 0,
            color: "bg-info/10 text-info",
          },
          {
            label: "Rejected",
            value: stats?.rejected || 0,
            color: "bg-red-50 text-red-600",
          },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setStatusFilter(stat.label.toLowerCase())}
            className={`text-center p-3 rounded-2xl border transition-all ${
              statusFilter === stat.label.toLowerCase()
                ? "border-brand bg-brand-muted"
                : "border-border bg-surface-elevated hover:bg-surface-muted"
            }`}
          >
            <div className={`text-xl font-bold`}>{stat.value}</div>
            <div className="text-xs mt-0.5">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              statusFilter === tab.value
                ? "bg-brand text-brand-foreground"
                : "bg-surface-elevated text-muted-foreground border border-border hover:bg-surface-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-4 space-y-3"
            >
              <div className="h-4 w-3/4 _shimmer rounded-lg" />
              <div className="h-3 w-1/2 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16">
          <FaMotorcycle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-surface-foreground font-medium">
            No listings found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {statusFilter === "all"
              ? "Create your first listing"
              : `No ${statusFilter} listings`}
          </p>
          {statusFilter === "all" && (
            <Link
              to="/dashboard/listings/create"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium"
            >
              <HiOutlinePlusCircle className="w-4 h-4" />
              Create Listing
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-surface-elevated border border-border rounded-2xl p-4 space-y-3
                hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="w-20 h-20 bg-surface-muted rounded-xl overflow-hidden shrink-0">
                  {listing.images?.[0] ? (
                    <img
                      src={listing.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-surface-foreground truncate">
                        {listing.brand} {listing.model}{" "}
                        {listing.year && `(${listing.year})`}
                      </h3>
                      <p className="text-brand font-bold mt-0.5">
                        GHS {listing.price.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`_badge shrink-0 text-xs ${
                        listing.status === "approved"
                          ? "_badgeVerified"
                          : listing.status === "pending"
                            ? "_badgePending"
                            : listing.status === "sold"
                              ? "bg-info/10 text-info"
                              : "bg-red-50 text-red-600"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{listing.location}</span>
                    <span>·</span>
                    <span className="capitalize">{listing.condition}</span>
                    <span>·</span>
                    <span>{listing.viewCount} views</span>
                  </div>

                  {/* Rejection reason */}
                  {listing.status === "rejected" && listing.adminNotes && (
                    <p className="mt-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                      Reason: {listing.adminNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Link
                  to={`/listing/${listing._id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground
                    hover:text-surface-foreground hover:bg-surface-muted rounded-lg transition-colors"
                >
                  <HiOutlineEye className="w-3.5 h-3.5" />
                  View
                </Link>
                {listing.status !== "sold" && (
                  <>
                    <Link
                      to={`/dashboard/listings/${listing._id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-muted-foreground
                        hover:text-surface-foreground hover:bg-surface-muted rounded-lg transition-colors"
                    >
                      <HiOutlinePencil className="w-3.5 h-3.5" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleMarkSold(listing._id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-success
                        hover:bg-success/5 rounded-lg transition-colors"
                    >
                      <HiOutlineCheck className="w-3.5 h-3.5" />
                      Mark Sold
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-500
                    hover:bg-red-50 rounded-lg transition-colors ml-auto"
                >
                  <HiOutlineTrash className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
