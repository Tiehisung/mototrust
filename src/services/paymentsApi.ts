import { api } from './api';


export interface IInitiatePaymentRequest {
    listingId?: string;
    momoNumber?: string;
    network?: 'MTN' | 'AirtelTigo' | 'Vodafone';
    paymentType?: 'listing_fee' | 'verification_fee';
}

export interface IPaymentResponse {
    success: boolean;
    message?: string;
    data?: {
        paymentId: string;
        reference: string;
        amount: number;
        status: string;
        authorizationUrl?: string;
    };
}

export interface IVerifyPaymentResponse {
    success: boolean;
    data?: {
        verified: boolean;
        status: string;
        amount?: number;
        paymentId?: string;
    };
}

export interface IPaymentHistoryItem {
    _id: string;
    listing?: {
        _id: string;
        brand: string;
        model?: string;
        price: number;
    };
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed' | 'refunded';
    paymentType: string;
    paystackReference?: string;
    paystackChannel?: string;
    createdAt: string;
    completedAt?: string;
}

// ============================================
// API ENDPOINTS
// ============================================
export const paymentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Direct MoMo charge
        initiatePayment: builder.mutation<IPaymentResponse, IInitiatePaymentRequest>({
            query: (body) => ({
                url: '/payments/pay',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payments'],
        }),

        // Paystack checkout (redirect)
        initiateCheckout: builder.mutation<IPaymentResponse, { listingId: string }>({
            query: (body) => ({
                url: '/payments/checkout',
                method: 'POST',
                body,
            }),
        }),

        // Verify payment status
        verifyPayment: builder.query<IVerifyPaymentResponse, string>({
            query: (reference) => `/payments/verify/${reference}`,
        }),

        // Payment history
        getPaymentHistory: builder.query<{ success: boolean; data: IPaymentHistoryItem[] }, void>({
            query: () => '/payments/history',
            providesTags: ['Payments'],
        }),

        // Get single payment
        getPayment: builder.query<{ success: boolean; data: IPaymentHistoryItem }, string>({
            query: (id) => `/payments/${id}`,
        }),
    }),
});

export const {
    useInitiatePaymentMutation,
    useInitiateCheckoutMutation,
    useVerifyPaymentQuery,
    useGetPaymentHistoryQuery,
    useGetPaymentQuery,
} = paymentApi;