import { api } from './api';

export const inspectionsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyInspections: builder.query<any, void>({
            query: () => '/inspections/mine',
            providesTags: ['Inspections'],
        }),
    }),
});

export const { useGetMyInspectionsQuery } = inspectionsApi;