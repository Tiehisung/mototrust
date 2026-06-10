import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useGetListingQuery,
  useUpdateListingMutation,
} from "@/services/listingsApi";
 
import { Input, Select, Textarea } from "@/components/form";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { createListingSchema, ICreateListingFormData } from "./validations";
import { CONDITIONS } from "@/data/motor";

const BRANDS = [
  { value: "", label: "Select brand" },
  { value: "Haojue", label: "Haojue" },
  { value: "Bajaj", label: "Bajaj" },
  { value: "Royal", label: "Royal" },
  { value: "Honda", label: "Honda" },
  { value: "Yamaha", label: "Yamaha" },
  { value: "TVS", label: "TVS" },
  { value: "Other", label: "Other" },
];

const EditListingPage = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { data: listingData, isLoading: isLoadingListing } = useGetListingQuery(
    listingId!,
  );
  const [updateListing, { isLoading: isUpdating }] = useUpdateListingMutation();

  const listing = listingData?.data;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ICreateListingFormData>({
    resolver: zodResolver(createListingSchema as any),
  });

  useEffect(() => {
    if (listing) {
      reset({
        brand: listing.brand || "",
        model: listing.model || "",
        year: listing.year || ("" as any),
        mileage: listing.mileage || ("" as any),
        engineCapacity: listing.engineCapacity || ("" as any),
        condition: listing.condition,
        price: listing.price,
        priceNegotiable: listing.priceNegotiable,
        location: listing.location,
        description: listing.description || "",
        reasonForSelling: listing.reasonForSelling || "",
        hasDocuments: listing.hasDocuments,
        listingType: listing.listingType,
      });
    }
  }, [listing, reset]);

  const onSubmit = async (data: ICreateListingFormData) => {
    try {
      await updateListing({ id: listingId!, data }).unwrap();
      toast.success("Listing updated!");
      navigate(`/listing/${listingId}`);
    } catch (err: any) {
      toast.error("Failed to update", { description: err?.data?.message });
    }
  };

  if (isLoadingListing) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="h-8 w-1/2 _shimmer rounded-lg" />
        <div className="h-96 _shimmer rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-surface-muted rounded-xl"
        >
          <HiOutlineArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-surface-foreground">
            Edit Listing
          </h1>
          <p className="text-sm text-muted-foreground">
            {listing?.brand} {listing?.model}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 bg-surface-elevated border border-border rounded-2xl p-5"
      >
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
            error={errors.year?.message}
            {...register("year", { valueAsNumber: true })}
          />
          <Input
            label="Engine (cc)"
            type="number"
            error={errors.engineCapacity?.message}
            {...register("engineCapacity", { valueAsNumber: true })}
          />
        </div>
        <Input
          label="Mileage (km)"
          type="number"
          error={errors.mileage?.message}
          {...register("mileage", { valueAsNumber: true })}
        />
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
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
        />
        <Input
          label="Location"
          required
          error={errors.location?.message}
          {...register("location")}
        />
        <Textarea
          label="Description"
          error={errors.description?.message}
          {...register("description")}
        />

        <button
          type="submit"
          disabled={isUpdating || !isDirty}
          className="w-full py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-medium
            hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isUpdating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditListingPage;
