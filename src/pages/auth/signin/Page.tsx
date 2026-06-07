import { DIALOG } from "@/components/Dialog";
import { TButtonVariant } from "@/components/ui/button";
import SignInForm from "@/pages/auth/signin/SignInForm";
import { ReactNode } from "react";

const SignInPage = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;

export const SignInController = ({
  trigger,
  variant = "ghost",
}: {
  className?: string;
  redirectTo?: string;
  text?: string;
  trigger?: ReactNode;
  description?: ReactNode;
  variant?: TButtonVariant;
}) => {
 
  return (
    <DIALOG
      trigger={trigger}
      title={"Sign in to continue"}
      id="login-controller"
      variant={variant}
    >
       <SignInForm />
    </DIALOG>
  );
};