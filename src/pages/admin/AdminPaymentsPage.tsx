import { useGetAllPaymentsQuery } from "@/services/adminApi";
import { FaMotorcycle } from "react-icons/fa6";
import {
  HiOutlineBanknotes,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineUser,
 
} from "react-icons/hi2";

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
  };

const AdminPaymentsPage = () => {
  const { data, isLoading } = useGetAllPaymentsQuery({ limit: 100 });

  const payments = data?.data || [];
  const totalRevenue = payments
    .filter((p: any) => p.status === "success")
    .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-foreground">
            Payments
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {payments.length} total transactions
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-success">
            GHS {totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-4 space-y-2"
            >
              <div className="h-4 w-1/2 _shimmer rounded-lg" />
              <div className="h-3 w-1/3 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-20 bg-surface-elevated border border-border rounded-3xl">
          <HiOutlineBanknotes className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-semibold text-surface-foreground">
            No payments yet
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Transactions will appear here.
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
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        {payment.payer && (
                          <span className="flex items-center gap-1">
                            <HiOutlineUser className="w-3 h-3" />
                            {payment.payer.fullName}
                          </span>
                        )}
                        {payment.listing && (
                          <span className="flex items-center gap-1">
                            <FaMotorcycle className="w-3 h-3" />
                            {payment.listing.brand}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-GH",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                        {payment.momoNumber && ` · ${payment.momoNumber}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
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

export default AdminPaymentsPage;
