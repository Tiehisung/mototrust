import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import {
  useCreateListingMutation,
  useUpdateListingMutation,
} from "@/services/listingsApi";
import { useGetBrandsQuery } from "@/services/brandApi";
import { useGetLocationsQuery } from "@/services/locationApi";
import { useListingForm } from "@/hooks/useListingForm";
import { Input, Select, Textarea } from "@/components/form";
import { ImageUpload, validateImages } from "@/components/form/ImageUpload";
import {
  createListingSchema,
  type ICreateListingFormData,
} from "./validations";
import { IListing } from "@/types/listing";

// ============================================
// CONSTANTS
// ============================================
const TOTAL_STEPS = 5;

const CONDITIONS = [
  { value: "", label: "Select condition" },
  { value: "Excellent", label: "Excellent - Like new" },
  { value: "Good", label: "Good - Minor signs of use" },
  { value: "Fair", label: "Fair - Visible wear, runs well" },
  { value: "Needs Repair", label: "Needs Repair - Requires work" },
];

const DOCUMENT_TYPES = [
  { value: "", label: "Select document type" },
  { value: "Original Registration", label: "Original Registration" },
  { value: "Duplicate Registration", label: "Duplicate Registration" },
  { value: "Receipt Only", label: "Receipt Only" },
];

const STEP_FIELDS: Record<number, (keyof ICreateListingFormData)[]> = {
  1: ["brand"],
  2: ["condition", "price", "location"],
  3: ["description"],
  4: [],
  5: ["listingType"],
};

// ============================================
// TYPES
// ============================================
interface ListingFormProps {
  existingListing?: IListing;
}

const EditableListingForm = ({ existingListing }: ListingFormProps) => {
  const navigate = useNavigate();
  const [createListing, { isLoading: isCreating }] = useCreateListingMutation();
  const [updateListing, { isLoading: isUpdating }] = useUpdateListingMutation();

  const isLoading = isCreating || isUpdating;

  // Fetch brands and locations
  const { data: brandsData } = useGetBrandsQuery();
  const { data: locationsData } = useGetLocationsQuery();

  const brandOptions = [
    { value: "", label: "Select brand" },
    ...(brandsData?.data.map((b) => ({
      value: b.name,
      label: b.isPopular ? `⭐ ${b.name}` : b.name,
    })) || []),
  ];

  const locationOptions = [
    { value: "", label: "Select location" },
    ...(locationsData?.data.map((l) => ({
      value: l.name,
      label: l.isPopular ? `📍 ${l.name}` : l.name,
    })) || []),
  ];
  // Form state (only for create mode)
  const {
    formData,
    currentStep,
    lastSaved,
    updateMultipleFields,
    setCurrentStep,
    submitSuccess,
    clearForm,
  } = useListingForm();

  // Build default values
  const defaultValues =
    existingListing && existingListing ? { ...existingListing } : formData;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ICreateListingFormData>({
    resolver: zodResolver(createListingSchema as any),
    mode: "onChange",
    defaultValues,
  });

  // Sync Redux → Form (create mode only, on mount)
  useEffect(() => {
    if (!existingListing) {
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          setValue(key as keyof ICreateListingFormData, value);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch values
  const hasDocuments = watch("hasDocuments");
  const watchedImages = watch("images") || [];

  // ============================================
  // HANDLERS
  // ============================================
  const handleImagesChange = useCallback(
    (urls: string[]) => {
      setValue("images", urls, { shouldValidate: true, shouldDirty: true });
      if (!existingListing) {
        updateMultipleFields({ images: urls } as any);
      }
    },
    [setValue, updateMultipleFields, existingListing],
  );

  const handleNextStep = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep] || [];

    if (currentStep === 4) {
      const imageError = validateImages(watchedImages as string[]);
      if (imageError) {
        toast.error(imageError);
        return;
      }
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    const currentValues = watch();
    if (!existingListing) {
      updateMultipleFields(currentValues);
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    const currentValues = watch();
    if (!existingListing) {
      updateMultipleFields(currentValues);
    }
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: ICreateListingFormData) => {
    try {
      if (existingListing?._id) {
        // Update existing
        const result = await updateListing({
          id: existingListing._id,
          data,
        }).unwrap();
        toast.success("Listing updated!", {
          description: "Your changes have been saved.",
        });
        navigate(`/listing/${result.data._id}`);
      } else {
        // Create new
        const result = await createListing(data).unwrap();
        submitSuccess();
        clearForm();
        toast.success("Listing created!", {
          description: "Pay the listing fee to publish it.",
        });
        navigate(`/listing/${result.data._id}`);
      }
    } catch (err: any) {
      toast.error(existingListing ? "Failed to update" : "Failed to create", {
        description: err?.data?.message || "Please try again",
      });
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return null;
    return new Date(lastSaved).toLocaleTimeString();
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-surface-muted rounded-xl transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-surface-foreground">
              {existingListing ? "Edit Listing" : "Create Listing"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {existingListing
                ? `${existingListing?.brand || ""} ${existingListing?.model || ""}`
                : `Step ${currentStep} of ${TOTAL_STEPS}`}
            </p>
          </div>
        </div>
        {!existingListing && lastSaved && (
          <span className="text-xs text-muted-foreground bg-surface-muted px-2 py-1 rounded-lg">
            💾 {formatLastSaved()}
          </span>
        )}
        {existingListing && (
          <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded-lg">
            Editing
          </span>
        )}
      </div>

      {/* Progress (create mode only) */}
      {!existingListing && (
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i + 1 <= currentStep ? "bg-brand" : "bg-surface-muted"
              }`}
            />
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ============ STEP 1: BIKE DETAILS ============ */}
        {(currentStep === 1 || existingListing) && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Bike Details
            </h2>
            <Controller
              control={control}
              name="brand"
              render={({ field }) => (
                <Select
                  label="Brand"
                  required
                  options={brandOptions}
                  error={errors.brand?.message}
                  {...field}
                />
              )}
            />
            <Input
              label="Model"
              placeholder="e.g., Super 125"
              error={errors.model?.message}
              {...register("model")}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Year"
                type="number"
                placeholder="e.g., 2022"
                error={errors.year?.message}
                {...register("year", { valueAsNumber: true })}
              />
              <Input
                label="Engine (cc)"
                type="number"
                placeholder="e.g., 125"
                error={errors.engineCapacity?.message}
                {...register("engineCapacity", { valueAsNumber: true })}
              />
            </div>
            <Input
              label="Mileage (km)"
              type="number"
              placeholder="e.g., 15000"
              error={errors.mileage?.message}
              {...register("mileage", { valueAsNumber: true })}
            />
          </div>
        )}

        {/* ============ STEP 2: CONDITION & PRICE ============ */}
        {(currentStep === 2 || existingListing) && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Condition & Price
            </h2>
            <Controller
              control={control}
              name="condition"
              render={({ field }) => (
                <Select
                  label="Condition"
                  required
                  options={CONDITIONS}
                  error={errors.condition?.message}
                  {...field}
                />
              )}
            />
            <Input
              label="Price (GHS)"
              required
              type="number"
              placeholder="Enter price"
              error={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border text-brand focus:ring-brand/20"
                {...register("priceNegotiable")}
              />
              <span className="text-sm text-surface-foreground">
                Price is negotiable
              </span>
            </label>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <Select
                  label="Location"
                  required
                  options={locationOptions}
                  error={errors.location?.message}
                  {...field}
                />
              )}
            />
          </div>
        )}

        {/* ============ STEP 3: DETAILS & DOCUMENTS ============ */}
        {(currentStep === 3 || existingListing) && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Details & Documents
            </h2>
            <Textarea
              label="Description"
              placeholder="Describe your bike..."
              error={errors.description?.message}
              {...register("description")}
            />
            <Input
              label="Reason for selling"
              placeholder="e.g., Upgrading to a car"
              error={errors.reasonForSelling?.message}
              {...register("reasonForSelling")}
            />
            <div className="border-t border-border pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-brand focus:ring-brand/20"
                  {...register("hasDocuments")}
                />
                <span className="text-sm font-medium text-surface-foreground">
                  I have registration documents
                </span>
              </label>
              {hasDocuments && (
                <div className="mt-3 ml-6 space-y-3">
                  <Controller
                    control={control}
                    name="documentType"
                    render={({ field }) => (
                      <Select
                        label="Document type"
                        options={DOCUMENT_TYPES}
                        error={errors.documentType?.message}
                        {...field}
                      />
                    )}
                  />
                  <Input
                    label="Chassis Number"
                    placeholder="Enter chassis number"
                    error={errors.chassisNumber?.message}
                    {...register("chassisNumber")}
                  />
                  <Input
                    label="Engine Number"
                    placeholder="Enter engine number"
                    error={errors.engineNumber?.message}
                    {...register("engineNumber")}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ STEP 4: PHOTOS ============ */}
        {(currentStep === 4 || existingListing) && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Photos
            </h2>
            <ImageUpload
              label="Bike Photos"
              value={(watchedImages as string[]) || []}
              onChange={handleImagesChange}
              error={errors.images?.message}
              maxFiles={10}
            />
          </div>
        )}

        {/* ============ STEP 5: LISTING TYPE ============ */}
        {(currentStep === 5 || existingListing) && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Listing Type
            </h2>
            <Controller
              control={control}
              name="listingType"
              render={({ field }) => (
                <div className="space-y-3">
                  {[
                    {
                      value: "standard",
                      label: "Standard",
                      price: 25,
                      desc: "30-day listing • Appears in search results",
                    },
                    {
                      value: "premium",
                      label: "Premium",
                      price: 40,
                      desc: "Featured badge • Top of search • 30-day listing",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => field.onChange(option.value)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        field.value === option.value
                          ? "border-brand bg-brand-muted"
                          : "border-border hover:bg-surface-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-surface-foreground">
                            {option.label}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            {option.desc}
                          </p>
                        </div>
                        <span className="text-brand font-bold">
                          GHS {option.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.listingType?.message && (
              <p className="text-xs text-red-500">
                {errors.listingType.message}
              </p>
            )}
          </div>
        )}

        {/* ============ NAVIGATION ============ */}
        <div className="flex gap-3">
          {currentStep > 1 && !existingListing && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm font-medium
                text-surface-foreground hover:bg-surface-muted transition-colors"
            >
              Back
            </button>
          )}

          {existingListing ? (
            // Edit mode: just show update button
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
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
          ) : currentStep < TOTAL_STEPS ? (
            // Create mode: Continue button
            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
                hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          ) : (
            // Create mode: Submit button
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Listing"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditableListingForm;
