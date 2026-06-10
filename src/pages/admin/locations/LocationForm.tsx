import { toast } from "sonner";
import {
  useCreateLocationMutation,
  useUpdateLocationMutation,
  ELocationType,
  ILocation,
} from "@/services/locationApi";
import { HiOutlineFire } from "react-icons/hi2";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select } from "@/components/form";
import { enumToOptions } from "@/lib/select";
import { Button } from "@/components/buttons/Button";
import { fireEscape } from "@/hooks/Esc";
import { GHANA_REGIONS } from "@/data/location";

 

// Schema definition
export const locationFormSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .max(50, "Brand name is too long"),
  region: z.string().min(2, "Region is required").max(50, "Region is too long"),
  type: z.nativeEnum(ELocationType),
  isPopular: z.boolean().default(false),
  displayOrder: z
    .number()
    .int()
    .min(0, "Display order must be 0 or greater")
    .default(0),
});

export type ILocationFormData = z.infer<typeof locationFormSchema>;

interface LocationFormProps {
  existingLocation?: Partial<ILocation>;
  onCancel?: () => void;
}

export function LocationForm({
  existingLocation,
  onCancel,
}: LocationFormProps) {
  const [createLocation, { isLoading: isCreating }] =
    useCreateLocationMutation();
  const [updateLocation, { isLoading: isUpdating }] =
    useUpdateLocationMutation();

  const onSubmit = async (data: ILocationFormData) => {
    try {
      let result;
      if (existingLocation) {
        result = await updateLocation({
          id: existingLocation?._id!,
          data: data,
        }).unwrap();
        toast.success(result.message);
        fireEscape();
      } else {
        result = await createLocation(data).unwrap();
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
  } = useForm<ILocationFormData>({
    resolver: zodResolver(locationFormSchema as any),
    defaultValues: {
      name: "",
      type: ELocationType.city,
      isPopular: false,
      displayOrder: 0,
      ...existingLocation,
    },
  });

  // Reset form when existingLocation changes
  useEffect(() => {
    if (existingLocation) {
      reset({
        name: "",
        type: ELocationType.city,
        isPopular: false,
        displayOrder: 0,
        ...existingLocation,
      });
    }
  }, [existingLocation, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Location Name"
        required
        placeholder="e.g., Haojue"
        error={errors.name?.message}
        {...register("name")}
      />

      <Controller
        name="region"
        control={control}
        render={({ field }) => (
          <Select
            label="Region"
            required
            options={GHANA_REGIONS.map((r) => ({ label: r, value: r }))}
            error={errors.region?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            label="Type"
            required
            options={enumToOptions(ELocationType)}
            error={errors.region?.message}
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

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-border text-brand focus:ring-brand/20"
          {...register("isPopular")}
        />
        <span className="text-sm text-surface-foreground flex items-center gap-1.5">
          <HiOutlineFire className="w-4 h-4 text-brand" />
          Popular Location
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
          text={existingLocation ? "Update Location" : "Add Location"}
          loading={isCreating || isUpdating}
          loadingText={"Saving..."}
          className="grow"
        />
      </div>
    </form>
  );
}
