import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useUpdateProfileMutation } from "@/services/authApi";

import { Input, Select } from "@/components/form";
import { HiOutlineUser, HiOutlineMapPin } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/store/hooks/store";
import { setUser } from "@/store/slices/auth.slice";
import { GHANA_REGIONS } from "@/data/location";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name too short").max(50, "Name too long"),
  region: z.string().optional(),
  town: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const REGIONS = [
  { value: "", label: "Select region" },
  ...GHANA_REGIONS.map((r) => ({ value: r, label: r })),
];

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      region: user?.region || "",
      town: user?.town || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const result = await updateProfile(data).unwrap();
      dispatch(setUser(result.user));
      toast.success("Profile updated!");
    } catch (err: any) {
      toast.error("Failed to update", {
        description: err?.data?.message || "Please try again",
      });
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-surface-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Update your personal information
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5"
      >
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-16 h-16 bg-brand-muted rounded-full flex items-center justify-center text-brand font-bold text-2xl">
            {user?.fullName?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div>
            <p className="font-semibold text-surface-foreground">
              {user?.fullName}
            </p>
            <p className="text-sm text-muted-foreground">{user?.phoneNumber}</p>
            <span
              className={`_badge text-xs mt-1 ${user?.isVerified ? "_badgeVerified" : "_badgePending"}`}
            >
              {user?.isVerified ? "Verified" : "Not verified"}
            </span>
          </div>
        </div>

        <Input
          label="Full Name"
          icon={<HiOutlineUser className="w-5 h-5" />}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Select
          label="Region"
          options={REGIONS}
          error={errors.region?.message}
          {...register("region")}
        />

        <Input
          label="Town"
          icon={<HiOutlineMapPin className="w-5 h-5" />}
          placeholder="e.g., Wa"
          error={errors.town?.message}
          {...register("town")}
        />

        <button
          type="submit"
          disabled={isLoading || !isDirty}
          className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
            hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
