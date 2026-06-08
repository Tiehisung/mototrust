import { useState } from "react";
import {
  useGetPendingListingsQuery,
  useApproveListingMutation,
  useRejectListingMutation,
} from "@/services/adminApi";
import { toast } from "sonner";
import {
  
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineMapPin,
  HiOutlineUser,
 
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const AdminListingsPage = () => {
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data, isLoading, refetch } = useGetPendingListingsQuery({
    limit: 50,
  });
  const [approveListing, { isLoading: isApproving }] =
    useApproveListingMutation();
  const [rejectListing, { isLoading: isRejecting }] =
    useRejectListingMutation();

  const listings = data?.data || [];

  const handleApprove = async (id: string) => {
    try {
      await approveListing(id).unwrap();
      toast.success("Listing approved");
      refetch();
    } catch (err: any) {
      toast.error("Failed to approve", { description: err?.data?.message });
    }
  };

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }
    try {
      await rejectListing({ id, reason: rejectReason }).unwrap();
      toast.success("Listing rejected");
      setRejectId(null);
      setRejectReason("");
      refetch();
    } catch (err: any) {
      toast.error("Failed to reject", { description: err?.data?.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-foreground">
            Pending Listings
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {listings.length} listings awaiting approval
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-5 space-y-3"
            >
              <div className="h-5 w-1/2 _shimmer rounded-lg" />
              <div className="h-4 w-3/4 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20 bg-surface-elevated border border-border rounded-3xl">
          <HiOutlineCheck className="w-16 h-16 text-success/30 mx-auto mb-4" />
          <h3 className="font-semibold text-surface-foreground">
            All caught up!
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            No pending listings to review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing: any) => (
            <div
              key={listing._id}
              className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-4"
            >
              {/* Listing Header */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 bg-surface-muted rounded-xl overflow-hidden shrink-0">
                  {listing.images?.[0] ? (
                    <img
                      src={listing.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaMotorcycle className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-surface-foreground">
                        {listing.brand} {listing.model}{" "}
                        {listing.year && `(${listing.year})`}
                      </h3>
                      <p className="text-brand font-bold mt-0.5">
                        GHS {listing.price?.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`_badge text-xs ${
                        listing.paymentStatus === "paid"
                          ? "_badgeVerified"
                          : "_badgePending"
                      }`}
                    >
                      {listing.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HiOutlineMapPin className="w-3 h-3" />
                      {listing.location}
                    </span>
                    <span className="capitalize">{listing.condition}</span>
                    <span className="capitalize">{listing.listingType}</span>
                  </div>

                  {/* Seller Info */}
                  {listing.seller && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs">
                      <HiOutlineUser className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {listing.seller.fullName}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">
                        {listing.seller.phoneNumber}
                      </span>
                      {listing.seller.isVerified ? (
                        <span className="text-success text-xs">(Verified)</span>
                      ) : (
                        <span className="text-warning text-xs">
                          (Not verified)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {listing.description && (
                <p className="text-sm text-muted-foreground bg-surface-muted rounded-xl p-3">
                  {listing.description}
                </p>
              )}

              {/* Documents */}
              {listing.hasDocuments && (
                <div className="text-xs text-muted-foreground">
                  📄 Documents: {listing.documentType || "Yes"}
                  {listing.chassisNumber &&
                    ` · Chassis: ${listing.chassisNumber}`}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <button
                  onClick={() => handleApprove(listing._id)}
                  disabled={isApproving || listing.paymentStatus !== "paid"}
                  className="flex items-center gap-1.5 px-4 py-2 bg-success text-success-foreground rounded-xl text-sm font-medium
                    hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <HiOutlineCheck className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setRejectId(listing._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium
                    hover:opacity-90 transition-opacity"
                >
                  <HiOutlineXMark className="w-4 h-4" />
                  Reject
                </button>
                {listing.paymentStatus !== "paid" && (
                  <span className="text-xs text-warning">
                    ⚠️ Seller hasn't paid listing fee yet
                  </span>
                )}
              </div>

              {/* Reject Modal */}
              {rejectId === listing._id && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 space-y-3">
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">
                    Rejection reason (will be shown to seller):
                  </p>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="e.g., Photos are unclear, Price seems unrealistic..."
                    rows={3}
                    className="w-full px-3 py-2 bg-white dark:bg-surface-elevated border border-red-200 dark:border-red-800 rounded-xl text-sm
                      focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(listing._id)}
                      disabled={isRejecting || !rejectReason.trim()}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium
                        hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      {isRejecting ? "Rejecting..." : "Confirm Reject"}
                    </button>
                    <button
                      onClick={() => {
                        setRejectId(null);
                        setRejectReason("");
                      }}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-surface-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminListingsPage;
