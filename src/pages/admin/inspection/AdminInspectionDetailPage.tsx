import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import {
  HiOutlineArrowLeft,
  
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineClock,
 
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const AdminInspectionDetailPage = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);
  const [findings, setFindings] = useState({
    engineStarts: true,
    engineCondition: "Runs smoothly",
    engineSoundNormal: true,
    chassisNumberVisible: true,
    chassisMatchesDocuments: true,
    engineNumberVisible: true,
    engineMatchesDocuments: true,
    visibleDamage: "Minor scratch on left fairing",
    tireCondition: "80% tread remaining",
    brakesFunctional: true,
    lightsFunctional: true,
    testRideCompleted: true,
    testRideNotes: "Bike handles well, no unusual sounds",
    overallRating: 4,
    notes: "Overall in good condition. Recommended.",
  });

  // In production, fetch from API
  const inspection = {
    _id: inspectionId,
    listing: {
      _id: "listing123",
      brand: "Haojue",
      model: "Super 125",
      price: 4500,
      location: "Wa",
      images: [],
    },
    seller: {
      _id: "seller123",
      fullName: "Ibrahim Musah",
      phoneNumber: "024XXXXXXX",
      town: "Wa",
    },
    inspector: null,
    scheduledDate: new Date().toISOString(),
    inspectionLocation: "Shell Filling Station, Wa",
    status: "scheduled",
    findings: null,
    certificateNumber: null,
    notes: "",
    createdAt: new Date().toISOString(),
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    setTimeout(() => {
      setIsCompleting(false);
      toast.success("Inspection completed successfully!");
      navigate("/admin/inspections");
    }, 1500);
  };

  const handleCancel = async () => {
    toast.success("Inspection cancelled");
    navigate("/admin/inspections");
  };

  const toggleFinding = (key: keyof typeof findings) => {
    setFindings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const statusConfig = {
    scheduled: {
      icon: HiOutlineClock,
      color: "text-warning",
      bg: "bg-warning/5",
      label: "Scheduled",
    },
    completed: {
      icon: HiOutlineCheck,
      color: "text-success",
      bg: "bg-success/5",
      label: "Completed",
    },
    in_progress: {
      icon: HiOutlineClock,
      color: "text-info",
      bg: "bg-info/5",
      label: "In Progress",
    },
  };

  const currentStatus =
    statusConfig[inspection.status as keyof typeof statusConfig] ||
    statusConfig.scheduled;
  const StatusIcon = currentStatus.icon;

  const isPending = inspection.status === "scheduled";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-surface-foreground transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to inspections
      </button>

      {/* Status Banner */}
      <div
        className={`${currentStatus.bg} border border-border rounded-2xl p-4 flex items-center gap-3`}
      >
        <StatusIcon className={`w-5 h-5 ${currentStatus.color}`} />
        <div>
          <p className={`text-sm font-medium ${currentStatus.color}`}>
            {currentStatus.label}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isPending
              ? "This inspection needs to be completed."
              : `Certificate: ${inspection.certificateNumber || "Pending"}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Listing & Seller Info */}
          <div className="bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Inspection Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Listing</p>
                <Link
                  to={`/admin/listings/${inspection.listing?._id}`}
                  className="flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                >
                  <FaMotorcycle className="w-4 h-4" />
                  {inspection.listing?.brand} {inspection.listing?.model}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  GHS {inspection.listing?.price?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Seller</p>
                <Link
                  to={`/admin/users/${inspection.seller?._id}`}
                  className="flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                >
                  <HiOutlineUser className="w-4 h-4" />
                  {inspection.seller?.fullName}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {inspection.seller?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium text-surface-foreground flex items-center gap-1.5 mt-0.5">
                  <HiOutlineCalendarDays className="w-4 h-4" />
                  {new Date(inspection.scheduledDate).toLocaleDateString(
                    "en-GH",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-surface-foreground flex items-center gap-1.5 mt-0.5">
                  <HiOutlineMapPin className="w-4 h-4" />
                  {inspection.inspectionLocation ||
                    inspection.listing?.location}
                </p>
              </div>
            </div>
          </div>

          {/* Inspection Form (for pending inspections) */}
          {isPending && (
            <div className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Complete Inspection
              </h2>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "engineStarts", label: "Engine Starts" },
                  { key: "engineSoundNormal", label: "Engine Sound Normal" },
                  {
                    key: "chassisNumberVisible",
                    label: "Chassis Number Visible",
                  },
                  {
                    key: "chassisMatchesDocuments",
                    label: "Chassis Matches Documents",
                  },
                  {
                    key: "engineNumberVisible",
                    label: "Engine Number Visible",
                  },
                  {
                    key: "engineMatchesDocuments",
                    label: "Engine Matches Documents",
                  },
                  { key: "brakesFunctional", label: "Brakes Functional" },
                  { key: "lightsFunctional", label: "Lights Functional" },
                  { key: "testRideCompleted", label: "Test Ride Completed" },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-surface-muted"
                  >
                    <input
                      type="checkbox"
                      checked={
                        findings[key as keyof typeof findings] as boolean
                      }
                      onChange={() =>
                        toggleFinding(key as keyof typeof findings)
                      }
                      className="w-4 h-4 rounded border-border text-brand focus:ring-brand/20"
                    />
                    <span className="text-sm text-surface-foreground">
                      {label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Text inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Engine Condition
                  </label>
                  <input
                    type="text"
                    value={findings.engineCondition}
                    onChange={(e) =>
                      setFindings({
                        ...findings,
                        engineCondition: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Tire Condition
                  </label>
                  <input
                    type="text"
                    value={findings.tireCondition}
                    onChange={(e) =>
                      setFindings({
                        ...findings,
                        tireCondition: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Visible Damage
                </label>
                <input
                  type="text"
                  value={findings.visibleDamage}
                  onChange={(e) =>
                    setFindings({ ...findings, visibleDamage: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Test Ride Notes
                </label>
                <textarea
                  value={findings.testRideNotes}
                  onChange={(e) =>
                    setFindings({ ...findings, testRideNotes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">
                    Overall Rating
                  </label>
                  <select
                    value={findings.overallRating}
                    onChange={(e) =>
                      setFindings({
                        ...findings,
                        overallRating: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {"⭐".repeat(r)} ({r}/5)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">
                  Additional Notes
                </label>
                <textarea
                  value={findings.notes}
                  onChange={(e) =>
                    setFindings({ ...findings, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* Completed Findings (read-only) */}
          {!isPending && inspection.findings && (
            <div className="bg-surface-elevated border border-border rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Inspection Results
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(inspection.findings).map(([key, value]) => {
                  if (typeof value === "boolean") {
                    return (
                      <div key={key} className="flex items-center gap-2">
                        {value ? (
                          <HiOutlineCheck className="w-4 h-4 text-success" />
                        ) : (
                          <HiOutlineXMark className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-surface-foreground">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (s) => s.toUpperCase())}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {inspection.notes && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Notes</p>
                  <p className="text-sm text-surface-foreground mt-1">
                    {inspection.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right - Actions */}
        <div className="space-y-4">
          <div className="bg-surface-elevated border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Actions
            </h3>
            {isPending ? (
              <div className="space-y-2">
                <button
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="w-full py-2.5 bg-success text-success-foreground rounded-xl text-sm font-medium
                    hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <HiOutlineCheck className="w-4 h-4" />
                  {isCompleting ? "Completing..." : "Complete Inspection"}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium
                    hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <HiOutlineXMark className="w-4 h-4" />
                  Cancel Inspection
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <HiOutlineShieldCheck className="w-10 h-10 text-success mx-auto mb-2" />
                <p className="text-sm font-medium text-success">
                  Inspection Complete
                </p>
                {inspection.certificateNumber && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Certificate: {inspection.certificateNumber}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-2">
            <Link
              to={`/admin/listings/${inspection.listing?._id}`}
              className="block text-sm text-brand hover:underline"
            >
              View Listing →
            </Link>
            <Link
              to={`/admin/users/${inspection.seller?._id}`}
              className="block text-sm text-brand hover:underline"
            >
              View Seller →
            </Link>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 p-2">
            <p>Inspection ID: {inspection._id}</p>
            <p>
              Created:{" "}
              {new Date(inspection.createdAt).toLocaleDateString("en-GH", {
                dateStyle: "medium",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInspectionDetailPage;
