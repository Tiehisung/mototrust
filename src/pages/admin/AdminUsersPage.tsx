import { useState } from "react";
import {
  useGetPendingUsersQuery,
  useVerifyUserMutation,
} from "@/services/adminApi";
import { toast } from "sonner";
import {
  HiOutlineUser,
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlineIdentification,
  HiOutlinePhone,
  HiOutlineMapPin,
} from "react-icons/hi2";

const AdminUsersPage = () => {
  const { data, isLoading, refetch } = useGetPendingUsersQuery();
  const [verifyUser, { isLoading: isVerifying }] = useVerifyUserMutation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const users = data?.data || [];

  const handleVerify = async (id: string) => {
    try {
      await verifyUser(id).unwrap();
      toast.success("User verified successfully");
      refetch();
    } catch (err: any) {
      toast.error("Failed to verify", { description: err?.data?.message });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-foreground">Users</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {users.length} users pending verification
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface-elevated rounded-2xl p-5 space-y-3"
            >
              <div className="h-5 w-1/3 _shimmer rounded-lg" />
              <div className="h-4 w-1/2 _shimmer rounded-lg" />
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 bg-surface-elevated border border-border rounded-3xl">
          <HiOutlineCheck className="w-16 h-16 text-success/30 mx-auto mb-4" />
          <h3 className="font-semibold text-surface-foreground">
            All users verified
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            No pending verifications.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user: any) => (
            <div
              key={user._id}
              className="bg-surface-elevated border border-border rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-muted rounded-full flex items-center justify-center text-brand font-bold text-lg shrink-0">
                    {user.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-foreground">
                      {user.fullName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <HiOutlinePhone className="w-3 h-3" />
                        {user.phoneNumber}
                      </span>
                      {user.town && (
                        <span className="flex items-center gap-1">
                          <HiOutlineMapPin className="w-3 h-3" />
                          {user.town}
                        </span>
                      )}
                      <span className="capitalize">· {user.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {user.ghanaCardImage && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <HiOutlineIdentification className="w-3.5 h-3.5" />
                      Ghana Card
                    </p>
                    <img
                      src={user.ghanaCardImage}
                      alt="Ghana Card"
                      className="w-full h-40 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-border"
                      onClick={() => setSelectedImage(user.ghanaCardImage)}
                    />
                  </div>
                  {user.ghanaCardSelfie && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                        <HiOutlineUser className="w-3.5 h-3.5" />
                        Selfie with Card
                      </p>
                      <img
                        src={user.ghanaCardSelfie}
                        alt="Selfie"
                        className="w-full h-40 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-border"
                        onClick={() => setSelectedImage(user.ghanaCardSelfie)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Card Number */}
              {user.ghanaCardNumber && (
                <p className="text-xs text-muted-foreground">
                  Card Number:{" "}
                  <span className="font-medium text-surface-foreground">
                    {user.ghanaCardNumber}
                  </span>
                </p>
              )}

              {/* Action */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <button
                  onClick={() => handleVerify(user._id)}
                  disabled={isVerifying}
                  className="flex items-center gap-1.5 px-4 py-2 bg-success text-success-foreground rounded-xl text-sm font-medium
                    hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  <HiOutlineShieldCheck className="w-4 h-4" />
                  Verify User
                </button>
                <span className="text-xs text-muted-foreground">
                  Submitted {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
