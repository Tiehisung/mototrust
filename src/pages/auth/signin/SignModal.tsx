import { DIALOG } from "@/components/Dialog";
import { ReactNode } from "react";
import SignInForm from "./SignInForm";
import { TButtonVariant } from "@/components/ui/button";

export const SignInModal = ({
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