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
  HiOutlineClock,
  HiOutlineCreditCard,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { EPaymentStatus, IListing } from "@/types/listing";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { cn } from "@/lib/utils";
import PaymentModal from "../payments/PaymentModal";

const LISTING_STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "approved", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
  { value: "rejected", label: "Rejected" },
];

const MyListingsPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading } = useGetMyListingsQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
    limit: 50,
  });

  const listings = data?.data || [];
  const stats = {
    approved: listings.filter((l) => l.status === "approved").length,
    pending: listings.filter((l) => l.status === "pending").length,
    sold: listings.filter((l) => l.status === "sold").length,
    rejected: listings.filter((l) => l.status === "rejected").length,
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
        {LISTING_STATUS_TABS.map((tab) => (
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
            <SellerListingCard listing={listing} key={listing?._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;




// ============================================
// TYPES
// ============================================
interface SellerListingCardProps {
  listing: IListing;
  onUpdate?: () => void; // Callback to refresh parent list
}

// ============================================
// STATUS CONFIG
// ============================================
const STATUS_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    className: string;
  }
> = {
  approved: {
    icon: HiOutlineShieldCheck,
    label: "Live",
    className: "bg-success/10 text-success border-success/20",
  },
  pending: {
    icon: HiOutlineClock,
    label: "Pending",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  sold: {
    icon: HiOutlineCheck,
    label: "Sold",
    className: "bg-info/10 text-info border-info/20",
  },
  rejected: {
    icon: HiOutlineXCircle,
    label: "Rejected",
    className: "bg-red-50 text-red-600 border-red-200",
  },
  expired: {
    icon: HiOutlineExclamationTriangle,
    label: "Expired",
    className: "bg-surface-muted text-muted-foreground border-border",
  },
};

// ============================================
// COMPONENT
// ============================================
const SellerListingCard = ({ listing, onUpdate }: SellerListingCardProps) => {
  const [deleteListing] = useDeleteListingMutation();
  const [markAsSold, { isLoading: isSelling }] = useMarkAsSoldMutation();

  // Payment modal state
  const [showPayment, setShowPayment] = useState(false);

  // Derived state
  const isUnpaid = listing.paymentStatus === EPaymentStatus.PENDING;
  const isPaid = listing.paymentStatus === EPaymentStatus.PAID;
  const isPendingApproval = isPaid && listing.status === "pending";
  const isLive = listing.status === "approved";
  const isSold = listing.status === "sold";
  const isRejected = listing.status === "rejected";
  const isEditable = !isSold && !isLive;
  const canMarkSold = isLive;

  const statusConfig = STATUS_CONFIG[listing.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusConfig.icon;

  // ============================================
  // HANDLERS
  // ============================================
  const handleDelete = async () => {
    try {
      await deleteListing(listing._id).unwrap();
      toast.success("Listing deleted");
      onUpdate?.();
    } catch (err: any) {
      toast.error("Failed to delete", { description: err?.data?.message });
    }
  };

  const handleMarkSold = async () => {
    try {
      await markAsSold(listing._id).unwrap();
      toast.success("Marked as sold! 🎉");
      onUpdate?.();
    } catch (err: any) {
      toast.error("Failed to update", { description: err?.data?.message });
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    toast.success("Payment successful! Listing submitted for approval.");
    onUpdate?.();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <div className="bg-surface-elevated border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
        {/* ============ UNPAID BANNER ============ */}
        {isUnpaid && (
          <div className="bg-warning/5 border-b border-warning/20 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineExclamationTriangle className="w-4 h-4 text-warning shrink-0" />
              <div>
                <p className="text-xs font-medium text-warning">
                  Payment Required
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Pay listing fee to submit for approval
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPayment(true)}
              className="shrink-0 px-3 py-1.5 bg-warning text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Pay GHS {listing.listingFee || 25}
            </button>
          </div>
        )}

        {/* ============ PENDING APPROVAL BANNER ============ */}
        {isPendingApproval && (
          <div className="bg-info/5 border-b border-info/20 px-4 py-2.5 flex items-center gap-2">
            <HiOutlineClock className="w-4 h-4 text-info shrink-0" />
            <p className="text-xs text-info">
              Paid — Awaiting admin approval. This usually takes 24-48 hours.
            </p>
          </div>
        )}

        {/* ============ REJECTED REASON ============ */}
        {isRejected && listing.adminNotes && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2.5">
            <p className="text-xs text-red-600">
              <span className="font-medium">Rejected:</span>{" "}
              {listing.adminNotes}
            </p>
          </div>
        )}

        {/* ============ MAIN CONTENT ============ */}
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-4">
            {/* Image */}
            <Link
              to={`/listing/${listing._id}`}
              className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-muted rounded-xl overflow-hidden shrink-0"
            >
              {listing.images?.[0] ? (
                <img
                  src={listing.images[0]}
                  alt={`${listing.brand} ${listing.model || ""}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaMotorcycle className="w-8 h-8 text-muted-foreground/30" />
                </div>
              )}
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    to={`/listing/${listing._id}`}
                    className="font-semibold text-surface-foreground hover:text-brand transition-colors line-clamp-2"
                  >
                    {listing.brand}
                    {listing.model && <span> {listing.model}</span>}
                    {listing.year && (
                      <span className="text-muted-foreground font-normal ml-1">
                        ({listing.year})
                      </span>
                    )}
                  </Link>
                  <p className="text-lg font-bold text-brand mt-0.5">
                    {formatPrice(listing.price)}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border shrink-0",
                    statusConfig.className,
                  )}
                >
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </span>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-xs text-muted-foreground">
                <span>{listing.location}</span>
                <span className="hidden sm:inline">·</span>
                <span className="capitalize">{listing.condition}</span>
                <span className="hidden sm:inline">·</span>
                <span>{listing.viewCount} views</span>
                {listing.listingType === "premium" && (
                  <>
                    <span className="hidden sm:inline">·</span>
                    <span className="text-brand font-medium">Premium</span>
                  </>
                )}
              </div>

              {/* Payment status indicator */}
              <div className="flex items-center gap-2 mt-1.5">
                {isUnpaid && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-warning bg-warning/5 px-1.5 py-0.5 rounded">
                    <HiOutlineCreditCard className="w-3 h-3" />
                    Unpaid
                  </span>
                )}
                {isPaid && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-success bg-success/5 px-1.5 py-0.5 rounded">
                    <HiOutlineShieldCheck className="w-3 h-3" />
                    Paid
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ============ ACTIONS ============ */}
          <div className="flex items-center gap-1 pt-2 border-t border-border">
            {/* View */}
            <Link
              to={`/listing/${listing._id}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground
                hover:text-surface-foreground hover:bg-surface-muted rounded-lg transition-colors"
              title="View listing"
            >
              <HiOutlineEye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View</span>
            </Link>

            {/* Edit (only if not sold/live) */}
            {isEditable && (
              <Link
                to={`/dashboard/listings/${listing._id}/edit`}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-muted-foreground
                  hover:text-surface-foreground hover:bg-surface-muted rounded-lg transition-colors"
                title="Edit listing"
              >
                <HiOutlinePencil className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            )}

            {/* Pay Now (if unpaid) */}
            {isUnpaid && (
              <button
                onClick={() => setShowPayment(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-warning
                  hover:bg-warning/5 rounded-lg transition-colors"
                title="Pay listing fee"
              >
                <HiOutlineCreditCard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pay Now</span>
              </button>
            )}

            {/* Mark as Sold (only if live) */}
            {canMarkSold && (
              <button
                onClick={handleMarkSold}
                disabled={isSelling}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-success
                  hover:bg-success/5 rounded-lg transition-colors disabled:opacity-50"
                title="Mark as sold"
              >
                <HiOutlineCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mark Sold</span>
              </button>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Delete */}
            <ConfirmDialog
              onConfirm={handleDelete}
              trigger={
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-400
                  hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete listing"
                >
                  <HiOutlineTrash className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </div>
              }
              title={`Delete "${listing.brand} ${listing.model || ""}"?`}
              description="This action cannot be undone. All images and data will be permanently removed."
              confirmText="Delete"
              variant="destructive"
            />
          </div>
        </div>
      </div>

      {/* ============ PAYMENT MODAL ============ */}
      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          listingId={listing._id}
          listingTitle={`${listing.brand} ${listing.model || ""}`.trim()}
          amount={
            listing.listingFee || (listing.listingType === "premium" ? 40 : 25)
          }
          onSuccess={handlePaymentSuccess}
          // onAbort={() => setShowPayment(false)}
        />
      )}
    </>
  );
};

