import { CSSProperties, useEffect, useState } from "react";
import { Button } from "./buttons/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fireEscape } from "@/hooks/Esc";
import { useUpdateSearchParams } from "@/hooks/params";
import { TButtonVariant } from "./ui/button";
import { getErrorMessage } from "@/lib/error";
import { Input } from "./form";

interface IProps {
  placeholder: string;
  className?: string;
  variant?: TButtonVariant;
  buttonText?: string;
  loadingText?: string;
  // RTK Query mutation hook (required)
  mutationHook: () => any; // RTK Query mutation hook
  escapeOnEnd?: boolean;
  styles?: CSSProperties;
  title: string;
  fieldName: string;
  useParam?: boolean;
  // Additional options
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  transformData?: (input: string, existingBody?: any) => any;
  successMessage?: string;
  errorMessage?: string;
  // Optional body data to merge with input
  body?: unknown;
}

export function SingleInputForm(props: IProps) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { setParam } = useUpdateSearchParams();
  const [waiting, setWaiting] = useState(false);

  // Initialize mutation
  const [executeMutation, mutationState] = props.mutationHook();

  useEffect(() => {
    if (props.useParam && input) setParam(props?.fieldName ?? "input", input);
  }, [input, props.useParam, props.fieldName, setParam]);

  const handleAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setWaiting(true);

      // Prepare data for mutation
      const mutationData = props.transformData
        ? props.transformData(input, props.body)
        : {
            ...(props.body ?? {}),
            [props.fieldName ?? "input"]: input,
          };

      const result = await executeMutation(mutationData).unwrap();

      toast.success(props.successMessage || result?.message || "Success!");

      if (props.onSuccess) {
        props.onSuccess(result);
      }

      // Refresh and cleanup
      navigate(0);
      if (props.escapeOnEnd) fireEscape();
    } catch (error) {
      const errorMsg = props.errorMessage || getErrorMessage(error);
      toast.error(errorMsg);

      if (props.onError) {
        props.onError(error);
      }
    } finally {
      setWaiting(false);
    }
  };

  const isLoading = waiting || mutationState?.isLoading;

  return (
    <form
      className="w-2xs grid gap-2.5 _card mt-16 bg-card"
      onSubmit={handleAction}
    >
      <p className="_label mb-3">{props.title}</p>
      <Input
        name="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="grow"
        placeholder={props.placeholder}
      />

      <Button
       text={props.buttonText}
        loading={isLoading}
        loadingText={props?.loadingText ?? "Saving..."}
        className="w-full justify-center"
        variant={props?.variant}
      />
    </form>
  );
}
`https://vercel.com/new/import?framework=vite&hasTrialAvailable=1&id=1162279039&name=MotoMart-GH&owner=Tiehisung&project-name=moto-mart-gh&provider=github&remainingProjects=1&s=https%3A%2F%2Fgithub.com%2FTiehisung%2FMotoMart-GH&teamSlug=soskodes-projects&totalProjects=1`;