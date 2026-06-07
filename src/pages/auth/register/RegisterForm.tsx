import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useRegisterMutation } from "@/services/authApi";
import { Input } from "@/components/form";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi2";
import { IRegisterFormData, registerSchema } from "@/pages/auth/validations";
import { useAppDispatch } from "@/store/hooks/store";
import { EUserRole } from "@/types/user";
import { setCredentials } from "@/store/slices/auth.slice";
import { cn } from "@/lib/utils";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: EUserRole.BUYER,
    },
  });

  const [registerUser] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: IRegisterFormData) => {
    setServerError("");

    try {
      const result = await registerUser({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: data.role,
      }).unwrap();

      dispatch(setCredentials({ user: result.user, token: result.token }));
      toast.success("Account created! 🎉", {
        description: "Welcome to MotoTrust",
      });
      navigate("/dashboard");
    } catch (err: any) {
      const message = err?.data?.message || "Registration failed";
      setServerError(message);
      toast.error("Registration failed", {
        description: message,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-surface-foreground">
          Create account
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Join MotoTrust and start buying or selling
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
            {serverError}
          </div>
        )}

        <Input
          label="Full Name"
          required
          placeholder="John Doe"
          icon={<HiOutlineUser className="w-5 h-5" />}
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <Input
          label="Phone Number"
          required
          placeholder="024XXXXXXX"
          icon={<HiOutlinePhone className="w-5 h-5" />}
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
          type="tel"
        />

        <Input
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          placeholder="Min 6 characters"
          rightIcon={
            showPassword ? (
              <HiOutlineEyeSlash className="w-4 h-4" />
            ) : (
              <HiOutlineEye className="w-4 h-4" />
            )
          }
          onRightIconClick={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirm Password"
          required
          type={showPassword ? "text" : "password"}
          placeholder="Re-enter password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-surface-foreground mb-1.5">
            I want to <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => field.onChange(EUserRole.BUYER)}
                  className={cn(`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all
                    ${
                      field.value === EUserRole.BUYER
                        ? "border-brand bg-brand-muted text-brand"
                        : "border-border bg-surface-muted text-muted-foreground hover:bg-surface-elevated"
                    }`)}
                >
                  <span className="text-lg">🔍</span>
                  Buy Bikes
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange(EUserRole.SELLER)}
                  className={cn(`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all
                    ${
                      field.value === EUserRole.SELLER
                        ? "border-brand bg-brand-muted text-brand"
                        : "border-border bg-surface-muted text-muted-foreground hover:bg-surface-elevated"
                    }`)}
                >
                  <span className="text-lg">🏍️</span>
                  Sell Bikes
                </button>
              </div>
            )}
          />
          {errors.role?.message && (
            <p className="text-xs text-red-500 mt-1.5">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
            hover:opacity-90 active:opacity-80 transition-opacity
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="text-brand hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
