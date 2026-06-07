// frontend/src/hooks/useAuth.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks/store';
import { useLoginMutation, } from '@/services/authApi';
import { ILoginCredentials } from '@/types/auth';
import { logout, setCredentials, } from '../slices/auth.slice';
import { getErrorMessage } from '@/lib/error';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, token, isAuthenticated, } = useAppSelector((state) => state.auth);

    const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
    // const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

 

    const login = async (credentials: ILoginCredentials) => {
        try {
            const response = await loginMutation(credentials).unwrap();

            dispatch(setCredentials({
                user: response.user,
                token: response.token,
            }));

            return { success: true, user: response.user };
        } catch (error: any) {
            return {
                success: false,
                error: getErrorMessage(error, 'Login failed')
            };
        }
    };

    const logoutUser = async () => {
        try {
            // await logoutMutation().unwrap();
        } finally {
            dispatch(logout());
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        isLoading: isLoggingIn ,
        login,
        logout: logoutUser,
    };
};