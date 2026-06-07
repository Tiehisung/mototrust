import { IUser } from '@/types/user';
import { api } from './api';
import { IRegisterFormData, ISigninFormData } from '@/pages/auth/validations';

export interface IAuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: IUser;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, Exclude<IRegisterFormData, 'confirmPassword'>>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    login: builder.mutation<IAuthResponse, ISigninFormData>({
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