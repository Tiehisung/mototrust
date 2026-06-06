// services/api.ts

import { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User', 'Listings', 'MyListings', 'Payments', 'Inspections','Uploads'],
    // keepUnusedDataFor: 300, // Keep data for 5 minutes (in seconds)
    // refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
    endpoints: () => ({}),

});

