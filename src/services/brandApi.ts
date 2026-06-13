import { IQueryResponse } from '@/types';
import { api } from './api';

export interface IBrandData {
    _id: string;
    name: string;
    slug: string;
    tier: EBrandTier
    isPopular: boolean;
    logo?: string;
    isActive: boolean;
    displayOrder: number;
}
export enum EBrandTier {
    high = 'high',
    mid = 'mid',
    economy = 'economy'
}

interface IBrandResponse { success: boolean; count: number; data: IBrandData[] }

export const brandApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<IBrandResponse, void>({
            query: () => '/brands',
            providesTags: ['Brands'],
        }),
        getPopularBrands: builder.query<IBrandResponse, void>({
            query: () => '/brands/popular',
        }),

        // Admin
        // Get all brands (including inactive)
        getAdminBrands: builder.query<IBrandResponse, void>({
            query: () => '/brands/all',
            providesTags: ['Brands'],
        }),

        // Create brand
        createBrand: builder.mutation<{ success: boolean; data: IBrandData; message: string }, Partial<IBrandData>>({
            query: (body) => ({
                url: '/brands',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Brands'],
        }),

        // Update brand
        updateBrand: builder.mutation<IQueryResponse<IBrandData>, { id: string; data: Partial<IBrandData> }>({
            query: ({ id, data }) => ({
                url: `/brands/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Brands'],
        }),

        // Toggle active
        toggleBrandActive: builder.mutation<IQueryResponse<IBrandData>, string>({
            query: (id) => ({
                url: `/brands/${id}/toggle-active`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Brands'],
        }),

        // Delete brand
        deleteBrand: builder.mutation<IQueryResponse<IBrandData>, string>({
            query: (id) => ({
                url: `/brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brands'],
        }),
    }),
})


export const {
    useGetBrandsQuery,
    useGetPopularBrandsQuery,

    // Adming
    useGetAdminBrandsQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useToggleBrandActiveMutation,
    useDeleteBrandMutation,
} = brandApi;