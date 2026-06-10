import { IUser } from '@/types/user';
import { api } from './api';
import { IListing } from '@/types/listing';
import { IQueryResponse } from '@/types';

export interface IAdminUser {
    _id: string;
    fullName: string;
    phoneNumber: string;
    role: 'seller' | 'buyer' | 'admin';
    isVerified: boolean;
    isActive: boolean;
    momoVerified: boolean;
    region?: string;
    town?: string;
    listingCount: number;
    createdAt: string;
}

interface IUsersResponse {
    success: boolean;
    count: number;
    data: IAdminUser[];
    stats: {
        total: number;
        seller?: number;
        buyer?: number;
        admin?: number;
        verified: number;
        unverified: number;
    };
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface IListingStats {
    pending: number;
    sold: number;
    approved: number;
    rejected?: number;
}


export interface IAdminUserProfileResponse {
    user: IUser;
    listings: IListing[];
    listingStats: IListingStats;
}

export const adminUserApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get all users with filters
        getAdminUsers: builder.query<IUsersResponse, Record<string, any>>({
            query: (params) => ({ url: '/users', params }),
            providesTags: ['Users'],
        }),

        // Get single user
        getAdminUser: builder.query<IQueryResponse<IAdminUserProfileResponse>, string>({
            query: (id) => `/users/${id}`,
            providesTags: (_r, _e, id) => [{ type: 'Users', id }],
        }),

        // Update user
        updateUser: builder.mutation<any, { id: string; data: Partial<IAdminUser> }>({
            query: ({ id, data }) => ({ url: `/users/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['Users'],
        }),

        // Toggle active (ban/unban)
        toggleUserActive: builder.mutation<any, string>({
            query: (id) => ({ url: `/users/${id}/toggle-active`, method: 'PATCH' }),
            invalidatesTags: ['Users'],
        }),

        // Verify user
        verifyUser: builder.mutation<any, string>({
            query: (id) => ({ url: `/users/${id}/verify`, method: 'PATCH' }),
            invalidatesTags: ['Users'],
        }),

        // Delete user
        deleteUser: builder.mutation<any, string>({
            query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetAdminUsersQuery,
    useGetAdminUserQuery,
    useUpdateUserMutation,
    useToggleUserActiveMutation,
    useVerifyUserMutation,
    useDeleteUserMutation,
} = adminUserApi;