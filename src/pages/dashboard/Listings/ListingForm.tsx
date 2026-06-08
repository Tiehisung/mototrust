import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateListingMutation } from "@/services/listingsApi";

import { Input, Select, Textarea } from "@/components/form";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { createListingSchema, ICreateListingFormData } from "./validations";
import { EListingType } from "@/types/listing";

const BRANDS = [
  { value: "", label: "Select brand" },
  { value: "Haojue", label: "Haojue" },
  { value: "Bajaj", label: "Bajaj" },
  { value: "Royal", label: "Royal" },
  { value: "Honda", label: "Honda" },
  { value: "Yamaha", label: "Yamaha" },
  { value: "TVS", label: "TVS" },
  { value: "KTM", label: "KTM" },
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

const ListingForm = () => {
  const navigate = useNavigate();
  const [createListing, { isLoading }] = useCreateListingMutation();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ICreateListingFormData>({
    resolver: zodResolver(createListingSchema as any),
    mode: "onBlur",
    defaultValues: {
      priceNegotiable: true,
      hasDocuments: false,
      listingType: EListingType.Standard,
      condition: undefined,
      brand: "",
      location: "",
    },
  });

  const hasDocuments = watch("hasDocuments");
 

  const onSubmit = async (data: ICreateListingFormData) => {
    try {
      const result = await createListing(data).unwrap();
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

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
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
            Step {step} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i + 1 <= step ? "bg-brand" : "bg-surface-muted"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
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
                  options={BRANDS}
                  error={errors.brand?.message}
                  {...field}
                />
              )}
            />
            <Input
              label="Model"
              placeholder="e.g., Super 125"
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

        {/* Step 2: Condition & Price */}
        {step === 2 && (
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

        {/* Step 3: Description & Documents */}
        {step === 3 && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Details & Documents
            </h2>
            <Textarea
              label="Description"
              placeholder="Describe your bike - condition, history, any issues..."
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
                        options={[
                          { value: "", label: "Select type" },
                          {
                            value: "Original Registration",
                            label: "Original Registration",
                          },
                          {
                            value: "Duplicate Registration",
                            label: "Duplicate Registration",
                          },
                          { value: "Receipt Only", label: "Receipt Only" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Input
                    label="Chassis Number"
                    placeholder="Enter chassis number"
                    {...register("chassisNumber")}
                  />
                  <Input
                    label="Engine Number"
                    placeholder="Enter engine number"
                    {...register("engineNumber")}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Listing Type */}
        {step === 4 && (
          <div className="space-y-4 bg-surface-elevated border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Listing Type
            </h2>
            <Controller
              control={control}
              name="listingType"
              render={({ field }) => (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => field.onChange("standard")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      field.value === "standard"
                        ? "border-brand bg-brand-muted"
                        : "border-border hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-surface-foreground">
                        Standard
                      </span>
                      <span className="text-brand font-bold">GHS 25</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      30-day listing. Appears in search results.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("premium")}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      field.value === "premium"
                        ? "border-brand bg-brand-muted"
                        : "border-border hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-surface-foreground">
                        Premium
                      </span>
                      <span className="text-brand font-bold">GHS 40</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Top of search results. Featured badge. 30-day listing.
                    </p>
                  </button>
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

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2.5 bg-surface-elevated border border-border rounded-xl text-sm font-medium
                text-surface-foreground hover:bg-surface-muted transition-colors"
            >
              Back
            </button>
          )}
          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
                hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          ) : (
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

export default ListingForm;
