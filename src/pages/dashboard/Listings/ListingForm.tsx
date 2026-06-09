import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import { useCreateListingMutation } from "@/services/listingsApi";
import { Input, Select, Textarea } from "@/components/form";
import { ImageUpload, validateImages } from "@/components/form/ImageUpload";
import {
  createListingSchema,
  type ICreateListingFormData,
} from "./validations";
import { Button } from "@/components/buttons/Button";
import { useListingForm } from "@/hooks/useListingForm";
import { useGetBrandsQuery } from "@/services/brandApi";

// ============================================
// CONSTANTS
// ============================================
const TOTAL_STEPS = 5;

const BRANDS = [
  { value: "", label: "Select brand" },
  { value: "Haojue", label: "Haojue" },
  { value: "Bajaj", label: "Bajaj" },
  { value: "Royal", label: "Royal" },
  { value: "Honda", label: "Honda" },
  { value: "Yamaha", label: "Yamaha" },
  { value: "TVS", label: "TVS" },
  { value: "KTM", label: "KTM" },
  { value: "Kawasaki", label: "Kawasaki" },
  { value: "Suzuki", label: "Suzuki" },
  { value: "Other", label: "Other" },
];

const CONDITIONS = [
  { value: "", label: "Select condition" },
  { value: "Excellent", label: "Excellent - Like new" },
  { value: "Good", label: "Good - Minor signs of use" },
  { value: "Fair", label: "Fair - Visible wear, runs well" },
  { value: "Needs Repair", label: "Needs Repair - Requires work" },
];

const LOCATIONS = [
  { value: "", label: "Select location" },
  { value: "Wa", label: "Wa" },
  { value: "Lawra", label: "Lawra" },
  { value: "Tumu", label: "Tumu" },
  { value: "Jirapa", label: "Jirapa" },
  { value: "Nadowli", label: "Nadowli" },
  { value: "Bamahu", label: "Bamahu" },
  { value: "Other", label: "Other" },
];

const DOCUMENT_TYPES = [
  { value: "", label: "Select document type" },
  { value: "Original Registration", label: "Original Registration" },
  { value: "Duplicate Registration", label: "Duplicate Registration" },
  { value: "Receipt Only", label: "Receipt Only" },
];

// Fields to validate per step
const STEP_FIELDS: Record<number, (keyof ICreateListingFormData)[]> = {
  1: ["brand"],
  2: ["condition", "price", "location"],
  3: ["description"],
  4: [], // Images validated separately
  5: ["listingType"],
};

// ============================================
// COMPONENT
// ============================================
const ListingForm = () => {
  const navigate = useNavigate();
  const { data: brandsData } = useGetBrandsQuery();

  // Build brand options from API
  const brandOptions = [
    { value: "", label: "Select brand" },
    ...(brandsData?.data || []).map((brand) => ({
      value: brand.name,
      label: `${brand.name}${brand.isPopular ? " ⭐" : ""}`,
    })),
  ];

  const [createListing, { isLoading }] = useCreateListingMutation();
  const {
    formData,
    currentStep,
    lastSaved,
    updateMultipleFields,
    setCurrentStep,
    submitSuccess,
    clearForm,
  } = useListingForm();

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
    defaultValues: formData,
  });

  // Sync Redux → Form on mount (one time)
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        setValue(key as keyof ICreateListingFormData, value);
      }
    });
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
      updateMultipleFields({ images: urls } as any);
    },
    [setValue, updateMultipleFields],
  );

  const handleNextStep = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep] || [];

    // Validate images on step 4
    if (currentStep === 4) {
      const imageError = validateImages(watchedImages);
      if (imageError) {
        toast.error(imageError);
        return;
      }
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    // Save current values to Redux
    const currentValues = watch();
    updateMultipleFields(currentValues);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    const currentValues = watch();
    updateMultipleFields(currentValues);
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: ICreateListingFormData) => {
    try {
      const result = await createListing(data).unwrap();
      submitSuccess();
      clearForm();
      toast.success("Listing created!", {
        description: "Pay the listing fee to publish it.",
      });
      navigate(`/listing/${result.data._id}`);
    } catch (err: any) {
      toast.error("Failed to create listing", {
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
              Create Listing
            </h1>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </div>
        </div>
        {lastSaved && (
          <span className="text-xs text-muted-foreground bg-surface-muted px-2 py-1 rounded-lg">
            💾 {formatLastSaved()}
          </span>
        )}
      </div>

      {/* Progress */}
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

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ============ STEP 1: BIKE DETAILS ============ */}
        {currentStep === 1 && (
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
        {currentStep === 2 && (
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
                  options={LOCATIONS}
                  error={errors.location?.message}
                  {...field}
                />
              )}
            />
          </div>
        )}

        {/* ============ STEP 3: DETAILS & DOCUMENTS ============ */}
        {currentStep === 3 && (
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
        {currentStep === 4 && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Photos
            </h2>
            <ImageUpload
              label="Bike Photos"
              value={watchedImages}
              onChange={handleImagesChange}
              error={errors.images?.message}
              maxFiles={10}
            />
          </div>
        )}

        {/* ============ STEP 5: LISTING TYPE ============ */}
        {currentStep === 5 && (
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
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm font-medium
                text-surface-foreground hover:bg-surface-muted transition-colors"
            >
              Back
            </button>
          )}
          {currentStep < TOTAL_STEPS && (
            <Button
              type="button"
              onClick={handleNextStep}
              text="Continue"
              size="lg"
              className="rounded-xl grow"
            />
          )}
          {currentStep == TOTAL_STEPS && (
            <Button
              type={"submit"}
              loading={isLoading}
              text="Create Listing"
              loadingText="Creating..."
              size="lg"
              className="rounded-xl grow"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ListingForm;
