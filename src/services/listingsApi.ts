import { IListing } from '@/types/listing';
import { api } from './api';
import { IPagination } from '@/types';

interface IListingsResponse {
    success: boolean;
    count: number;
    data: IListing[];
    pagination?: IPagination;
}

interface ISingleListingResponse {
    success: boolean;
    data: IListing;
}

export const listingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getListings: builder.query<IListingsResponse, Record<string, any>>({
            query: (params) => ({ url: '/listings', params }),
            providesTags: ['Listings'],
        }),
        getListing: builder.query<ISingleListingResponse, string>({
            query: (id) => `/listings/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Listings', id }],
        }),
        getMyListings: builder.query<IListingsResponse, Record<string, any>>({
            query: (params) => ({ url: '/listings/user/mine', params }),
            providesTags: ['MyListings'],
        }),
        createListing: builder.mutation<ISingleListingResponse, FormData | any>({
            query: (body) => ({ url: '/listings', method: 'POST', body }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        updateListing: builder.mutation<ISingleListingResponse, { id: string; data: any }>({
            query: ({ id, data }) => ({ url: `/listings/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        deleteListing: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({ url: `/listings/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        markAsSold: builder.mutation<ISingleListingResponse, string>({
            query: (id) => ({ url: `/listings/${id}/mark-sold`, method: 'PATCH' }),
            invalidatesTags: ['Listings', 'MyListings'],
        }),
        uploadListingImages: builder.mutation<any, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/listings/${id}/images`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Listings'],
        }),
        contactSeller: builder.mutation<any, string>({
            query: (id) => ({ url: `/listings/${id}/contact`, method: 'POST' }),
        }),
    }),
});

export const {
    useGetListingsQuery,
    useGetListingQuery,
    useGetMyListingsQuery,
    useCreateListingMutation,
    useUpdateListingMutation,
    useDeleteListingMutation,
    useMarkAsSoldMutation,
    useUploadListingImagesMutation,
    useContactSellerMutation,
} = listingsApi;