import { api } from './api';

export interface ILocation {
    _id: string;
    name: string;
    slug: string;
    region: string;
    type: ELocationType
    isActive: boolean;
    isPopular: boolean;
    displayOrder: number;
}

export enum ELocationType {
    town = 'town',
    city = 'city',
    district = 'district',
}

export const locationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLocations: builder.query<{ success: boolean; data: ILocation[] }, string | void>({
            query: (region) => region ? `/locations?region=${region}` : '/locations',
            providesTags: ['Locations'],
        }),
        getPopularLocations: builder.query<{ success: boolean; data: ILocation[] }, void>({
            query: () => '/locations/popular',
        }),

        // Admin
        getAdminLocations: builder.query<{ success: boolean; data: ILocation[] }, void>({
            query: () => '/locations/all',
            providesTags: ['Locations'],
        }),
        createLocation: builder.mutation<any, Partial<ILocation>>({
            query: (body) => ({ url: '/locations', method: 'POST', body }),
            invalidatesTags: ['Locations'],
        }),
        updateLocation: builder.mutation<any, { id: string; data: Partial<ILocation> }>({
            query: ({ id, data }) => ({ url: `/locations/${id}`, method: 'PUT', body: data }),
            invalidatesTags: ['Locations'],
        }),
        toggleLocationActive: builder.mutation<any, string>({
            query: (id) => ({ url: `/locations/${id}/toggle-active`, method: 'PATCH' }),
            invalidatesTags: ['Locations'],
        }),
        deleteLocation: builder.mutation<any, string>({
            query: (id) => ({ url: `/locations/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Locations'],
        }),
    }),
});

export const {
    useGetLocationsQuery,
    useGetPopularLocationsQuery,
    useGetAdminLocationsQuery,
    useCreateLocationMutation,
    useUpdateLocationMutation,
    useToggleLocationActiveMutation,
    useDeleteLocationMutation,
} = locationApi;