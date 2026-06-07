import { useState } from "react";
import { Link, useNavigate,   } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useLoginMutation } from "@/services/authApi";

import { Input } from "@/components/form";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlinePhone,
} from "react-icons/hi2";
import { useAppDispatch } from "@/store/hooks/store";
import { setCredentials } from "@/store/slices/auth.slice";
import { ISigninFormData,   signinSchema} from "@/pages/auth/validations";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = (location.state as any)?.from?.pathname;

  const onSubmit = async (data: ISigninFormData) => {
    setServerError("");

    try {
      const result = await login({
        phoneNumber: data.phoneNumber,
        password: data.password,
      }).unwrap();

      const { user, token } = result;

      dispatch(setCredentials({ user, token }));
      toast.success("Welcome back! 👋", {
        description: `Signed in as ${result.user.fullName}`,
      });
      const path =  (user.role === "admin" ? "/admin" : "/dashboard");
      navigate(path, { replace: true });
    } catch (err: any) {
      const message = err?.data?.message || "Invalid credentials";
      setServerError(message);
      toast.error("Login failed", {
        description: message,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-surface-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to your MotoTrust account
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
          label="Phone Number"
          placeholder="024XXXXXXX"
          icon={<HiOutlinePhone className="w-5 h-5" />}
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
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
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="text-brand hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
