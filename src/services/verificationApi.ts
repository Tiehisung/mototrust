import { api } from './api';

export interface VerificationResponse {
    success: boolean;
    message?: string;
    user?: {
        _id: string;
        isVerified: boolean;
        ghanaCardImage?: string;
        ghanaCardSelfie?: string;
        ghanaCardNumber?: string;
    };
}

export const verificationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Submit identity verification
        submitVerification: builder.mutation<VerificationResponse, FormData>({
            query: (formData) => ({
                url: '/auth/verify-identity',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['User'],
        }),

        // Check verification status
        getVerificationStatus: builder.query<VerificationResponse, void>({
            query: () => '/auth/verification-status',
            providesTags: ['User'],
        }),

        // Verify MoMo number
        verifyMomo: builder.mutation<VerificationResponse, { momoNumber: string; network: string }>({
            query: (body) => ({
                url: '/auth/verify-momo',
                method: 'POST',
                body,
            }),
        }),

        // Confirm MoMo micro-transaction
        confirmMomo: builder.mutation<VerificationResponse, { code: string }>({
            query: (body) => ({
                url: '/auth/confirm-momo',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useSubmitVerificationMutation,
    useGetVerificationStatusQuery,
    useVerifyMomoMutation,
    useConfirmMomoMutation,
} = verificationApi;