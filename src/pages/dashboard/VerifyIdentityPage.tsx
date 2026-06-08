import { useState } from "react";
import { toast } from "sonner";
import {
  HiOutlineShieldCheck,
  HiOutlineIdentification,
  HiOutlineCamera,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi2";
import { useAppSelector } from "@/store/hooks/store";

const VerifyIdentityPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [ghanaCard, setGhanaCard] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!ghanaCard || !selfie || !cardNumber) {
      toast.error("Missing information", {
        description: "Please provide all required documents",
      });
      return;
    }

    setIsSubmitting(true);
    // Upload logic here
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Verification submitted!", {
        description: "We will review your documents shortly.",
      });
    }, 2000);
  };

  if (user?.isVerified) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <HiOutlineCheckCircle className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-xl font-bold text-surface-foreground">
          You're Verified!
        </h1>
        <p className="text-muted-foreground text-sm">
          Your identity has been verified. You can now post listings and
          transact with confidence.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-surface-foreground">
          Verify Your Identity
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Submit your Ghana Card to get verified and start selling
        </p>
      </div>

      <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
        {/* Info */}
        <div className="flex items-start gap-3 bg-info/5 rounded-xl p-3">
          <HiOutlineShieldCheck className="w-5 h-5 text-info shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-surface-foreground">
              Why verify?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verified sellers get more inquiries and build trust with buyers.
              Your information is secure.
            </p>
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-surface-foreground mb-1.5">
            Ghana Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="e.g., GHA-123456789-0"
            className="w-full px-4 py-2.5 bg-surface-muted border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
              placeholder:text-muted-foreground/50"
          />
        </div>

        {/* Upload Card */}
        <div>
          <label className="block text-sm font-medium text-surface-foreground mb-1.5">
            Ghana Card Photo
          </label>
          <div className= " relative border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-brand/50 transition-colors cursor-pointer">
            {ghanaCard ? (
              <div className="flex items-center gap-2 text-success">
                <HiOutlineCheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{ghanaCard.name}</span>
              </div>
            ) : (
              <>
                <HiOutlineIdentification className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload front of your Ghana Card
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGhanaCard(e.target.files?.[0] || null)}
              className="hidden"
              id="card-upload"
            />
            <label
              htmlFor="card-upload"
              className="absolute inset-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Upload Selfie */}
        <div>
          <label className="block text-sm font-medium text-surface-foreground mb-1.5">
            Selfie with Ghana Card
          </label>
          <div className= " relative border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-brand/50 transition-colors cursor-pointer ">
            {selfie ? (
              <div className="flex items-center gap-2 text-success">
                <HiOutlineCheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{selfie.name}</span>
              </div>
            ) : (
              <>
                <HiOutlineCamera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Take a selfie holding your Ghana Card
                </p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => setSelfie(e.target.files?.[0] || null)}
              className="hidden"
              id="selfie-upload"
            />
            <label
              htmlFor="selfie-upload"
              className="absolute inset-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
          <HiOutlineClock className="w-4 h-4" />
          <span>Verification usually takes 24-48 hours after submission</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !ghanaCard || !selfie || !cardNumber}
          className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
            hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit for Verification"
          )}
        </button>
      </div>
    </div>
  );
};
export default VerifyIdentityPage;
