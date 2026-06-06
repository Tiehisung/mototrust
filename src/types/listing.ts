export interface IListing {
    _id: string;
    seller: { _id: string; fullName: string; phoneNumber: string; town?: string; isVerified: boolean };
    brand: string;
    model?: string;
    year?: number;
    mileage?: number;
    engineCapacity?: number;
    condition: string;
    price: number;
    priceNegotiable: boolean;
    location: string;
    description?: string;
    images: string[];
    hasDocuments: boolean;
    listingType: 'standard' | 'premium';
    paymentStatus: 'unpaid' | 'paid' | 'refunded';
    status: 'pending' | 'approved' | 'rejected' | 'sold' | 'expired';
    isPhysicallyVerified: boolean;
    viewCount: number;
    createdAt: string;
}