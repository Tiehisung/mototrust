import { useGetMyInspectionsQuery } from "@/services/inspectionsApi";
import { FaMotorcycle } from "react-icons/fa6";
 
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
 
  HiOutlineCalendarDays,
  HiOutlineMapPin,
} from "react-icons/hi2";

const STATUS_CONFIG: Record<
  string,
  { icon: any; color: string; bg: string; label: string }
> = {
  scheduled: {
    icon: HiOutlineClock,
    color: "text-warning",
    bg: "bg-warning/5",
    label: "Scheduled",
  },
  in_progress: {
    icon: HiOutlineClock,
    color: "text-info",
    bg: "bg-info/5",
    label: "In Progress",
  },
  completed: {
    icon: HiOutlineCheckCircle,
    color: "text-success",
    bg: "bg-success/5",
    label: "Completed",
  },
  failed: {
    icon: HiOutlineXCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    label: "Failed",
  },
  cancelled: {
    icon: HiOutlineXCircle,
    color: "text-muted-foreground",
    bg: "bg-surface-muted",
    label: "Cancelled",
  },
};

const MyInspectionsPage = () => {
  const { data, isLoading } = useGetMyInspectionsQuery();

  const inspections = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-surface-foreground">
          My Inspections
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track physical verification requests for your listings
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-4 space-y-3"
            >
              <div className="h-4 w-1/2 _shimmer rounded-lg" />
              <div className="h-3 w-3/4 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : inspections.length === 0 ? (
        <div className="text-center py-16 bg-surface-elevated border border-border rounded-3xl">
          <HiOutlineClipboardDocumentCheck className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="text-surface-foreground font-semibold">
            No inspections yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            Request a physical inspection for your approved listings to get the
            "Verified" badge.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {inspections.map((inspection: any) => {
            const statusConfig =
              STATUS_CONFIG[inspection.status] || STATUS_CONFIG.scheduled;
            return (
              <div
                key={inspection._id}
                className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-4
                  hover:shadow-sm transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusConfig.bg}`}
                    >
                      <statusConfig.icon
                        className={`w-5 h-5 ${statusConfig.color}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-surface-foreground">
                          Inspection Request
                        </p>
                        <span
                          className={`_badge text-xs ${statusConfig.bg} ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      {inspection.listing && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <FaMotorcycle className="w-3 h-3" />
                          {inspection.listing.brand} {inspection.listing.model}
                          <span className="mx-1">·</span>
                          GHS {inspection.listing.price?.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  {inspection.scheduledDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HiOutlineCalendarDays className="w-4 h-4" />
                      <span>
                        {new Date(inspection.scheduledDate).toLocaleDateString(
                          "en-GH",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </span>
                    </div>
                  )}
                  {inspection.inspectionLocation && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HiOutlineMapPin className="w-4 h-4" />
                      <span>{inspection.inspectionLocation}</span>
                    </div>
                  )}
                </div>

                {/* Certificate (if completed) */}
                {inspection.status === "completed" &&
                  inspection.certificateNumber && (
                    <div className="bg-success/5 border border-success/10 rounded-xl p-3 flex items-center gap-3">
                      <HiOutlineCheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <p className="text-sm font-medium text-success">
                          Inspection Complete
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Certificate: {inspection.certificateNumber}
                        </p>
                      </div>
                    </div>
                  )}

                {/* Notes */}
                {inspection.notes && (
                  <p className="text-sm text-muted-foreground bg-surface-muted rounded-xl p-3">
                    {inspection.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyInspectionsPage;
