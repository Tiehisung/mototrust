// import { ReactNode } from "react";
// import SignInForm from "./SignInForm";
// import { DIALOG } from "@/components/Dialog";
// import { TButtonVariant } from "@/components/ui/button";
// import Divider from "@/components/Divider";
// import { useAppSelector } from "@/store/hooks/store";

// /**
//  * id - login-controller
//  * Access modal by programmatically clicking the trigger via id [login-controller]
//  * @returns A button to trigger google account selector.
//  */
// const SignInModal = ({
//   description = "You need to signin",
//   trigger,
//   variant = "ghost",
//   children,
// }: {
//   className?: string;
//   trigger?: ReactNode;
//   description?: ReactNode;
//   variant?: TButtonVariant;
//   children?: ReactNode;
// }) => {
//   const { user } = useAppSelector((s) => s.auth);
//   if (!user) return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
//   if(!user) return (
//     <DIALOG
//       trigger={trigger}
//       title={"Sign in to continue"}
//       id="login-controller"
//       variant={variant}
//     >
//       <SignInForm />

//       {description && (
//         <div>
//           <Divider className="px-4 my-10" />

//           <div>{description}</div>
//         </div>
//       )}
//     </DIALOG>
//   );
// };

// export default SignInModal;
