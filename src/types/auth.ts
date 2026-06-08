import type { IUser } from "./user";

export interface IAuthResponse {
    success: boolean;
    message: string;
    data: {
        user: IUser;
        token: string;
    };
}

export interface ILoginCredentials {
    phoneNumber: string;
    password: string;
}

export interface IRegisterCredentials {
    name: string;
    phoneNumber: string;
    password: string;
}

export interface ITokenRefreshResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
    };
}