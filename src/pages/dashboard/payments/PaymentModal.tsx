import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useInitiatePaymentMutation,
  useVerifyPaymentQuery,
} from "@/services/paymentsApi";
import {
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlinePhone,
} from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks/store";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  amount: number;
  onSuccess?: () => void;
}

const defaultTestPhone = "0551234987";

const NETWORKS = [
  { value: "MTN", label: "MTN Mobile Money", color: "bg-yellow-400" },
  { value: "AirtelTigo", label: "AirtelTigo Money", color: "bg-red-500" },
  { value: "Vodafone", label: "Vodafone Cash", color: "bg-red-600" },
];

const PaymentModal = ({
  isOpen,
  onClose,
  listingId,
  listingTitle,
  amount,
  onSuccess,
}: PaymentModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [step, setStep] = useState<
    "form" | "processing" | "success" | "failed"
  >("form");
  const [momoNumber, setMomoNumber] = useState(
    defaultTestPhone || user?.phoneNumber || "",
  );
  const [network, setNetwork] = useState("MTN");
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();

  // Poll for verification if in processing state
  const { data: verifyData } = useVerifyPaymentQuery(paymentRef || "", {
    skip: !paymentRef || step !== "processing",
    pollingInterval: 3000, // Poll every 3 seconds
  });

  // Watch for verification result
  useEffect(() => {
    if (verifyData?.data?.verified && step === "processing") {
      setStep("success");
      toast.success("Payment confirmed! 🎉");
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    }
  }, [verifyData, step, onSuccess, onClose]);

  const handlePay = async () => {
    if (!momoNumber || momoNumber.length < 10) {
      setError("Enter a valid phone number");
      return;
    }

    setError("");
    setStep("processing");

    try {
      const result = await initiatePayment({
        listingId,
        momoNumber,
        network: network as any,
        paymentType: "listing_fee",
      }).unwrap();

      setPaymentRef(result.data?.reference || null);

      toast.success("Check your phone", {
        description: "Enter your MoMo PIN to approve payment",
      });
    } catch (err: any) {
      setStep("failed");
      setError(err?.data?.message || "Payment failed");
      toast.error("Payment failed", {
        description: err?.data?.message,
      });
    }
  };

  const handleRetry = () => {
    setStep("form");
    setError("");
    setPaymentRef(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-elevated rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-surface-foreground">
            {step === "form" && "Pay Listing Fee"}
            {step === "processing" && "Processing Payment"}
            {step === "success" && "Payment Successful"}
            {step === "failed" && "Payment Failed"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-surface-muted rounded-lg"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Form Step */}
        {step === "form" && (
          <>
            <div className="bg-surface-muted rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Listing</p>
              <p className="font-semibold text-surface-foreground">
                {listingTitle}
              </p>
              <p className="text-2xl font-bold text-brand mt-1">GHS {amount}</p>
            </div>

            {/* Network Selection */}
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-2">
                Select Network
              </label>
              <div className="grid grid-cols-3 gap-2">
                {NETWORKS.map((net) => (
                  <button
                    key={net.value}
                    onClick={() => setNetwork(net.value)}
                    className={`p-3 rounded-xl text-center text-xs font-medium transition-all
                      ${
                        network === net.value
                          ? "border-2 border-brand bg-brand-muted text-brand"
                          : "border border-border text-muted-foreground hover:bg-surface-muted"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${net.color} mx-auto mb-1`}
                    />
                    {net.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                MoMo Number (eg. {defaultTestPhone})
              </label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  placeholder="024XXXXXXX"
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-muted border border-border rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isLoading || !momoNumber}
              className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              <HiOutlineCreditCard className="w-4 h-4" />
              Pay GHS {amount} via {network}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              <HiOutlineShieldCheck className="w-3.5 h-3.5 inline mr-1" />
              Secured by Paystack
            </p>
          </>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-brand-muted rounded-full flex items-center justify-center mx-auto">
              <span className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
            <div>
              <p className="font-semibold text-surface-foreground">
                Check your phone
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your MoMo PIN to approve payment of GHS {amount}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Waiting for confirmation...
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="text-sm text-muted-foreground hover:text-surface-foreground"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <HiOutlineCheckCircle className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="font-semibold text-surface-foreground">
                Payment Successful!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Your listing is now paid and pending approval.
              </p>
            </div>
          </div>
        )}

        {/* Failed Step */}
        {step === "failed" && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <HiOutlineXMark className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-surface-foreground">
                Payment Failed
              </p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
