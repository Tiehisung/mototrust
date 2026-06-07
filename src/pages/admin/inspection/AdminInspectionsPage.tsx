import { useState } from "react";
import {
  useGetPendingInspectionsQuery,
  useCompleteInspectionMutation,
} from "@/services/adminApi";
import { toast } from "sonner";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineCheck,
  
  HiOutlineUser,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const AdminInspectionsPage = () => {
  const { data, isLoading, refetch } = useGetPendingInspectionsQuery();
  const [completeInspection, { isLoading: isCompleting }] =
    useCompleteInspectionMutation();
  const [activeInspection, setActiveInspection] = useState<string | null>(null);
  const [findings, setFindings] = useState({
    engineStarts: true,
    engineCondition: "",
    engineSoundNormal: true,
    chassisNumberVisible: true,
    chassisMatchesDocuments: true,
    engineNumberVisible: true,
    engineMatchesDocuments: true,
    visibleDamage: "",
    tireCondition: "",
    brakesFunctional: true,
    lightsFunctional: true,
    testRideCompleted: true,
    testRideNotes: "",
    overallRating: 4,
    notes: "",
  });

  const inspections = data?.data || [];

  const handleComplete = async (id: string) => {
    try {
      await completeInspection({ id, ...findings }).unwrap();
      toast.success("Inspection completed!");
      setActiveInspection(null);
      resetFindings();
      refetch();
    } catch (err: any) {
      toast.error("Failed to complete", { description: err?.data?.message });
    }
  };

  const resetFindings = () => {
    setFindings({
      engineStarts: true,
      engineCondition: "",
      engineSoundNormal: true,
      chassisNumberVisible: true,
      chassisMatchesDocuments: true,
      engineNumberVisible: true,
      engineMatchesDocuments: true,
      visibleDamage: "",
      tireCondition: "",
      brakesFunctional: true,
      lightsFunctional: true,
      testRideCompleted: true,
      testRideNotes: "",
      overallRating: 4,
      notes: "",
    });
  };

  const toggleFinding = (key: keyof typeof findings) => {
    setFindings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-foreground">
          Inspections
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {inspections.length} inspections pending
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-5 space-y-3"
            >
              <div className="h-5 w-1/3 _shimmer rounded-lg" />
              <div className="h-4 w-3/4 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : inspections.length === 0 ? (
        <div className="text-center py-20 bg-surface-elevated border border-border rounded-3xl">
          <HiOutlineCheck className="w-16 h-16 text-success/30 mx-auto mb-4" />
          <h3 className="font-semibold text-surface-foreground">
            No pending inspections
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            All inspections are up to date.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inspections.map((inspection: any) => (
            <div
              key={inspection._id}
              className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-warning" />
                    <h3 className="font-semibold text-surface-foreground">
                      Inspection Request
                    </h3>
                  </div>
                  {inspection.listing && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <FaMotorcycle className="w-4 h-4" />
                      {inspection.listing.brand} {inspection.listing.model}
                      <span className="mx-1">·</span>
                      GHS {inspection.listing.price?.toLocaleString()}
                    </div>
                  )}
                </div>
                <span className="_badge _badgePending text-xs">Scheduled</span>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HiOutlineUser className="w-4 h-4" />
                  {inspection.seller?.fullName}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <HiOutlineMapPin className="w-4 h-4" />
                  {inspection.inspectionLocation ||
                    inspection.listing?.location ||
                    "TBD"}
                </div>
                {inspection.scheduledDate && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    {new Date(inspection.scheduledDate).toLocaleDateString(
                      "en-GH",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      },
                    )}
                  </div>
                )}
              </div>

              {/* Complete Inspection Form */}
              {activeInspection === inspection._id ? (
                <div className="space-y-4 border-t border-border pt-4">
                  <h4 className="text-sm font-semibold text-surface-foreground">
                    Inspection Findings
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "engineStarts", label: "Engine Starts" },
                      {
                        key: "engineSoundNormal",
                        label: "Engine Sound Normal",
                      },
                      { key: "chassisNumberVisible", label: "Chassis Visible" },
                      {
                        key: "chassisMatchesDocuments",
                        label: "Chassis Matches Docs",
                      },
                      { key: "engineNumberVisible", label: "Engine # Visible" },
                      {
                        key: "engineMatchesDocuments",
                        label: "Engine # Matches Docs",
                      },
                      { key: "brakesFunctional", label: "Brakes Work" },
                      { key: "lightsFunctional", label: "Lights Work" },
                      { key: "testRideCompleted", label: "Test Ride Done" },
                    ].map(({ key, label }) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 cursor-pointer"
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
                        placeholder="e.g., Runs smoothly"
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
                        placeholder="e.g., 70% tread left"
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
                        setFindings({
                          ...findings,
                          visibleDamage: e.target.value,
                        })
                      }
                      placeholder="e.g., Scratch on left fairing"
                      className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
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
                            {"⭐".repeat(r)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1">
                        Test Ride Notes
                      </label>
                      <input
                        type="text"
                        value={findings.testRideNotes}
                        onChange={(e) =>
                          setFindings({
                            ...findings,
                            testRideNotes: e.target.value,
                          })
                        }
                        placeholder="Notes from test ride"
                        className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">
                      General Notes
                    </label>
                    <textarea
                      value={findings.notes}
                      onChange={(e) =>
                        setFindings({ ...findings, notes: e.target.value })
                      }
                      placeholder="Any additional notes..."
                      rows={3}
                      className="w-full px-3 py-2 bg-surface-muted border border-border rounded-xl text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleComplete(inspection._id)}
                      disabled={isCompleting}
                      className="flex items-center gap-1.5 px-4 py-2 bg-success text-success-foreground rounded-xl text-sm font-medium
                        hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      <HiOutlineCheck className="w-4 h-4" />
                      Complete Inspection
                    </button>
                    <button
                      onClick={() => {
                        setActiveInspection(null);
                        resetFindings();
                      }}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-surface-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setActiveInspection(inspection._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium
                    hover:opacity-90 transition-opacity"
                >
                  <HiOutlineClipboardDocumentCheck className="w-4 h-4" />
                  Start Inspection
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInspectionsPage;
