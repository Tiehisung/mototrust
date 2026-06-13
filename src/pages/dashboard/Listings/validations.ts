import { EBikeCondition, EDocumentType, EListingType, } from '@/types/listing';
import { z } from 'zod';

export const createListingSchema = z.object({
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().optional(),
    year: z
        .number()
        .min(1990, 'Year must be 1990 or later')
        .max(new Date().getFullYear() + 1, 'Year cannot be in the future')
        .optional()
        .or(z.literal('')),
    mileage: z.preprocess(
        (val) => (val === '' || val === undefined ? undefined : Number(val)),
        z.number().min(0, 'Mileage cannot be negative').optional()
    ),
    engineCapacity: z.number().min(50, 'Must be at least 50cc').optional().or(z.literal('')),
    condition: z.nativeEnum(EBikeCondition, {
        error: 'Condition is required',
    }),
    price: z
        .number({ error: 'Price is required', })
        .min(100, 'Price must be at least GHS 100'),
    priceNegotiable: z.boolean().default(true),
    location: z.string().min(1, 'Location is required'),
    description: z.string().max(1000, 'Description too long').optional().or(z.literal('')),
    reasonForSelling: z.string().max(500).optional().or(z.literal('')),
    hasDocuments: z.boolean().default(false),
    documentType: z.nativeEnum(EDocumentType).optional(),
    chassisNumber: z.string().optional().or(z.literal('')),
    engineNumber: z.string().optional().or(z.literal('')),

    // Images
    images: z.array(z.string().url()).min(1, 'At least one image is required').max(10, 'Maximum 10 images'),

    // images: z.array(z.instanceof(File))
    //     .min(1, "At least one image is required")
    //     .max(10, "Maximum 10 images allowed")
    //     .refine(
    //         (files) => files.every(f => f.size <= 5 * 1024 * 1024),
    //         "Each image must be less than 5MB"
    //     )
    //     .refine(
    //         (files) => files.every(f => ["image/jpeg", "image/png", "image/webp"].includes(f.type)),
    //         "Only JPEG, PNG, or WebP images are allowed"
    //     ),
    listingType: z.nativeEnum(EListingType, { error: 'Select listing type' }).default(EListingType.Standard),
});


export type ICreateListingFormData = z.infer<typeof createListingSchema>;