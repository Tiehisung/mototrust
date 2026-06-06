import { IUser } from '@/types/user';
import { api } from './api';

export interface IAuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: IUser;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, { fullName: string; phoneNumber: string; password: string; role: string }>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    login: builder.mutation<IAuthResponse, { phoneNumber: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    getMe: builder.query<{ success: boolean; user: IUser }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<{ success: boolean; user: IUser }, Partial<IUser>>({
      query: (body) => ({ url: '/auth/profile', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = authApi;