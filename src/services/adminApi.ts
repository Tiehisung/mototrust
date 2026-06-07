import { api } from './api';

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard
        getDashboardStats: builder.query<any, void>({
            query: () => '/admin/stats',
        }),

        // Listings
        getPendingListings: builder.query<any, Record<string, any>>({
            query: (params) => ({ url: '/admin/listings/pending', params }),
        }),
        approveListing: builder.mutation<any, string>({
            query: (id) => ({ url: `/admin/listings/${id}/approve`, method: 'PUT' }),
        }),
        rejectListing: builder.mutation<any, { id: string; reason: string }>({
            query: ({ id, reason }) => ({
                url: `/admin/listings/${id}/reject`,
                method: 'PUT',
                body: { reason },
            }),
        }),

        // Users
        getPendingUsers: builder.query<any, void>({
            query: () => '/admin/users/pending',
        }),
        verifyUser: builder.mutation<any, string>({
            query: (id) => ({ url: `/admin/users/${id}/verify`, method: 'PUT' }),
        }),

        // Inspections
        getPendingInspections: builder.query<any, void>({
            query: () => '/admin/inspections/pending',
        }),
        completeInspection: builder.mutation<any, { id: string } & Record<string, any>>({
            query: ({ id, ...body }) => ({
                url: `/admin/inspections/${id}/complete`,
                method: 'PUT',
                body,
            }),
        }),

        // Payments
        getAllPayments: builder.query<any, Record<string, any>>({
            query: (params) => ({ url: '/admin/payments', params }),
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetPendingListingsQuery,
    useApproveListingMutation,
    useRejectListingMutation,
    useGetPendingUsersQuery,
    useVerifyUserMutation,
    useGetPendingInspectionsQuery,
    useCompleteInspectionMutation,
    useGetAllPaymentsQuery,
} = adminApi;