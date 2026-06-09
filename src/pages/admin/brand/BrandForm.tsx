// components/brand/BrandForm.tsx
import {
  EBrandTier,
  IBrandData,
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from "@/services/brandApi";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select } from "@/components/form";
import { enumToOptions } from "@/lib/select";
import { HiOutlineFire } from "react-icons/hi2";
import { toast } from "sonner";
import { Button } from "@/components/buttons/Button";
import { fireEscape } from "@/hooks/Esc";

// Schema definition
export const brandFormSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .max(50, "Brand name is too long"),
  tier: z.nativeEnum(EBrandTier),
  isPopular: z.boolean().default(false),
  displayOrder: z
    .number()
    .int()
    .min(0, "Display order must be 0 or greater")
    .default(0),
  //   logo: z.string().url("Must be a valid URL").optional(),
});

export type IBrandFormData = z.infer<typeof brandFormSchema>;

interface BrandFormProps {
  existingBrand?: Partial<IBrandData>;
  onCancel?: () => void;
}

export function BrandForm({ existingBrand, onCancel }: BrandFormProps) {
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const onSubmit = async (data: IBrandFormData) => {
    try {
      let result;
      if (existingBrand) {
        result = await updateBrand({
          id: existingBrand?._id!,
          data: data,
        }).unwrap();
        toast.success(result.message);
        fireEscape();
      } else {
        result = await createBrand(data).unwrap();
        toast.success(result.message);
        fireEscape();
      }
    } catch (err: any) {
      toast.error("Failed", { description: err?.data?.message });
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IBrandFormData>({
    resolver: zodResolver(brandFormSchema as any),
    defaultValues: {
      name: "",
      tier: EBrandTier.mid,
      isPopular: false,
      displayOrder: 0,
      ...existingBrand,
    },
  });

  // Reset form when existingBrand changes
  useEffect(() => {
    if (existingBrand) {
      reset({
        name: "",
        tier: EBrandTier.mid,
        isPopular: false,
        displayOrder: 0,
        ...existingBrand,
      });
    }
  }, [existingBrand, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Brand Name"
        required
        placeholder="e.g., Haojue"
        error={errors.name?.message}
        {...register("name")}
      />

      <Controller
        name="tier"
        control={control}
        render={({ field }) => (
          <Select
            label="Tier"
            required
            options={enumToOptions(EBrandTier)}
            error={errors.tier?.message}
            {...field}
          />
        )}
      />

      <Input
        label="Display Order"
        type="number"
        placeholder="0"
        error={errors.displayOrder?.message}
        {...register("displayOrder", { valueAsNumber: true })}
      />

      {/* <Input
        label="Logo URL"
        type="url"
        placeholder="https://example.com/logo.png"
        error={errors.logo?.message}
        {...register("logo")}
      /> */}

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-border text-brand focus:ring-brand/20"
          {...register("isPopular")}
        />
        <span className="text-sm text-surface-foreground flex items-center gap-1.5">
          <HiOutlineFire className="w-4 h-4 text-brand" />
          Popular Brand
        </span>
      </label>

      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 bg-surface-muted text-surface-foreground rounded-xl text-sm font-medium
              hover:bg-surface-muted/80 transition-colors"
          >
            Cancel
          </button>
        )}
        <Button
          type="submit"
          text={existingBrand ? "Update Brand" : "Add Brand"}
          loading={isCreating || isUpdating}
          loadingText={"Saving..."}
          className="grow"
        />
      </div>
    </form>
  );
}

 