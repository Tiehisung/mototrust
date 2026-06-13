import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetListingQuery } from "@/services/listingsApi";
import {
  useApproveListingMutation,
  useRejectListingMutation,
} from "@/services/adminApi";
import { useState } from "react";
import { toast } from "sonner";
import {
  HiOutlineArrowLeft,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const AdminListingDetailPage = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetListingQuery(listingId!);
  const [approveListing, { isLoading: isApproving }] =
    useApproveListingMutation();
  const [rejectListing, { isLoading: isRejecting }] =
    useRejectListingMutation();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const listing = data?.data;
  const seller =
    listing?.seller && typeof listing.seller === "object"
      ? listing.seller
      : null;

  const handleApprove = async () => {
    if (!listing) return;
    try {
      await approveListing(listing._id).unwrap();
      toast.success("Listing approved");
      navigate("/admin/listings");
    } catch (err: any) {
      toast.error("Failed to approve", { description: err?.data?.message });
    }
  };

  const handleReject = async () => {
    if (!listing || !rejectReason.trim()) return;
    try {
      await rejectListing({ id: listing._id, reason: rejectReason }).unwrap();
      toast.success("Listing rejected");
      setShowRejectModal(false);
      navigate("/admin/listings");
    } catch (err: any) {
      toast.error("Failed to reject", { description: err?.data?.message });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="h-6 w-32 _shimmer rounded-lg" />
        <div className="aspect-video _shimmer rounded-3xl" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 _shimmer rounded-lg" />
          <div className="h-6 w-1/3 _shimmer rounded-lg" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-20">
        <HiOutlineExclamationTriangle className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-surface-foreground">
          Listing not found
        </h2>
        <Link
          to="/admin/listings"
          className="mt-4 inline-block text-brand hover:underline text-sm"
        >
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-surface-foreground transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to listings
      </button>

      {/* Status Banner */}
      {listing.status === "pending" && (
        <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4 flex items-start gap-3">
          <HiOutlineExclamationTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-warning">Pending Review</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {listing.paymentStatus === "pending"
                ? "Seller has not paid the listing fee yet."
                : "This listing needs your approval to go live."}
            </p>
          </div>
          <span className="_badge _badgePending text-xs">Pending</span>
        </div>
      )}

      {listing.status === "approved" && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 flex items-start gap-3">
          <HiOutlineCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-success">Approved</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              This listing is live on the platform.
            </p>
          </div>
        </div>
      )}

      {listing.status === "rejected" && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-start gap-3">
            <HiOutlineXMark className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Rejected
              </p>
              {listing.adminNotes && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                  Reason: {listing.adminNotes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="aspect-video md:aspect-2/1 bg-surface-muted rounded-3xl overflow-hidden">
          {listing.images?.[selectedImage] ? (
            <img
              src={listing.images[selectedImage]}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaMotorcycle className="w-20 h-20 text-muted-foreground/30" />
            </div>
          )}
        </div>
        {listing.images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {listing.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all
                  ${idx === selectedImage ? "border-brand" : "border-transparent opacity-60"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-surface-foreground">
              {listing.brand} {listing.model}{" "}
              {listing.year && `(${listing.year})`}
            </h1>
            <p className="text-3xl font-bold text-brand mt-1">
              GHS {listing.price?.toLocaleString()}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Condition", value: listing.condition },
              { label: "Location", value: listing.location },
              { label: "Year", value: listing.year || "N/A" },
              {
                label: "Mileage",
                value: listing.mileage
                  ? `${listing.mileage.toLocaleString()} km`
                  : "N/A",
              },
              {
                label: "Engine",
                value: listing.engineCapacity
                  ? `${listing.engineCapacity}cc`
                  : "N/A",
              },
              { label: "Listing Type", value: listing.listingType },
              { label: "Payment", value: listing.paymentStatus },
              { label: "Views", value: listing.viewCount },
            ].map((spec) => (
              <div key={spec.label} className="bg-surface-muted rounded-xl p-3">
                <p className="text-xs text-muted-foreground mb-0.5">
                  {spec.label}
                </p>
                <p className="text-sm font-semibold text-surface-foreground capitalize">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          {listing.description && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
            </div>
          )}

          {/* Documents Section */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Documents
            </h3>
            {listing.hasDocuments ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-surface-muted rounded-xl p-3">
                  <HiOutlineDocumentText className="w-8 h-8 text-success" />
                  <div>
                    <p className="text-sm font-medium text-surface-foreground">
                      {listing.documentType || "Documents Available"}
                    </p>
                    {listing.documentImage && (
                      <a
                        href={listing.documentImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand hover:underline"
                      >
                        View document
                      </a>
                    )}
                  </div>
                </div>
                {listing.chassisNumber && (
                  <p className="text-xs text-muted-foreground">
                    Chassis: {listing.chassisNumber}
                  </p>
                )}
                {listing.engineNumber && (
                  <p className="text-xs text-muted-foreground">
                    Engine: {listing.engineNumber}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No documents provided
              </p>
            )}
          </div>
        </div>

        {/* Right - Seller & Actions */}
        <div className="space-y-4">
          {/* Seller Card */}
          <div className="bg-surface-elevated border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Seller
            </h3>
            {seller ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-muted rounded-full flex items-center justify-center text-brand font-bold">
                    {seller.fullName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-surface-foreground text-sm">
                      {seller.fullName}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <HiOutlinePhone className="w-3 h-3" />
                      {seller.phoneNumber}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {seller.isVerified ? (
                    <span className="flex items-center gap-1 text-success">
                      <HiOutlineShieldCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-warning">
                      <HiOutlineExclamationTriangle className="w-3.5 h-3.5" />{" "}
                      Not verified
                    </span>
                  )}
                </div>
                {seller.town && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <HiOutlineMapPin className="w-3 h-3" />
                    {seller.town}
                  </p>
                )}
                <Link
                  to={`/admin/users/${seller._id}`}
                  className="block text-xs text-brand hover:underline"
                >
                  View seller profile →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Seller info not available
              </p>
            )}
          </div>

          {/* Inspection Status */}
          <div className="bg-surface-elevated border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Verification
            </h3>
            {listing.isPhysicallyVerified ? (
              <div className="flex items-center gap-2 text-success">
                <HiOutlineShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Physically Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <HiOutlineExclamationTriangle className="w-5 h-5" />
                <span className="text-sm">Not yet inspected</span>
              </div>
            )}
            {listing.inspectionId && (
              <Link
                to={`/admin/inspections/${listing.inspectionId}`}
                className="block text-xs text-brand hover:underline mt-2"
              >
                View inspection →
              </Link>
            )}
          </div>

          {/* Admin Actions */}
          {listing.status === "pending" && (
            <div className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </h3>
              <button
                onClick={handleApprove}
                disabled={isApproving || listing.paymentStatus !== "paid"}
                className="w-full py-2.5 bg-success text-success-foreground rounded-xl text-sm font-medium
                  hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                <HiOutlineCheck className="w-4 h-4" />
                Approve Listing
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium
                  hover:opacity-90 flex items-center justify-center gap-2"
              >
                <HiOutlineXMark className="w-4 h-4" />
                Reject Listing
              </button>
              {listing.paymentStatus !== "paid" && (
                <p className="text-xs text-warning text-center">
                  ⚠️ Listing fee not yet paid by seller
                </p>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              Created:{" "}
              {new Date(listing.createdAt).toLocaleDateString("en-GH", {
                dateStyle: "medium",
              })}
            </p>
            <p>
              Expires:{" "}
              {new Date(listing.expiresAt).toLocaleDateString("en-GH", {
                dateStyle: "medium",
              })}
            </p>
            <p>ID: {listing._id}</p>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-elevated rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto">
              <HiOutlineXMark className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-surface-foreground text-center">
              Reject Listing
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              This reason will be shown to the seller.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Photos are unclear, Price seems unrealistic, Duplicate listing..."
              rows={4}
              className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm resize-none
                focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                }}
                className="flex-1 py-2.5 bg-surface-muted text-surface-foreground rounded-xl text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isRejecting || !rejectReason.trim()}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium
                  hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRejecting ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListingDetailPage;
