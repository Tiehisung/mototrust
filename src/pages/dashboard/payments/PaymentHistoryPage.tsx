import { useGetPaymentHistoryQuery } from "@/services/paymentsApi";
import { toast } from "sonner";
import {
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
 
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const STATUS_CONFIG: Record<string, { icon: any; color: string; bg: string }> =
  {
    success: {
      icon: HiOutlineCheckCircle,
      color: "text-success",
      bg: "bg-success/5",
    },
    pending: {
      icon: HiOutlineClock,
      color: "text-warning",
      bg: "bg-warning/5",
    },
    processing: { icon: HiOutlineClock, color: "text-info", bg: "bg-info/5" },
    failed: { icon: HiOutlineXCircle, color: "text-red-500", bg: "bg-red-50" },
    refunded: {
      icon: HiOutlineXCircle,
      color: "text-muted-foreground",
      bg: "bg-surface-muted",
    },
  };

const PaymentHistoryPage = () => {
  const { data, isLoading, isError } = useGetPaymentHistoryQuery();

  const payments = data?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-surface-foreground">
          Payment History
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track all your listing fees and transactions
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-4 space-y-3"
            >
              <div className="h-4 w-1/2 _shimmer rounded-lg" />
              <div className="h-3 w-1/3 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-16">
          <HiOutlineCreditCard className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-surface-foreground font-medium">
            Could not load payments
          </p>
          <button
            onClick={() => toast.error("Please try again")}
            className="mt-2 text-sm text-brand hover:underline"
          >
            Retry
          </button>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-16 bg-surface-elevated border border-border rounded-3xl">
          <HiOutlineCreditCard className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="text-surface-foreground font-semibold">
            No payments yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            When you pay for listing fees or verification, they will appear
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {payments.map((payment: any) => {
            const statusConfig =
              STATUS_CONFIG[payment.status] || STATUS_CONFIG.pending;
            return (
              <div
                key={payment._id}
                className="bg-surface-elevated border border-border rounded-2xl p-4
                  hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusConfig.bg}`}
                    >
                      <statusConfig.icon
                        className={`w-5 h-5 ${statusConfig.color}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-foreground capitalize">
                        {payment.paymentType?.replace(/_/g, " ") || "Payment"}
                      </p>
                      {payment.listing && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <FaMotorcycle className="w-3 h-3" />
                          {payment.listing.brand} {payment.listing.model}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-GH",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-surface-foreground">
                      GHS {payment.amount?.toFixed(2)}
                    </p>
                    <span
                      className={`_badge text-xs mt-1 ${statusConfig.bg} ${statusConfig.color}`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
