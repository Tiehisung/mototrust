import { api } from './api';

export const paymentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentHistory: builder.query<any, void>({
            query: () => '/payments/history',
        }),
    }),
});

export const { useGetPaymentHistoryQuery } = paymentsApi;