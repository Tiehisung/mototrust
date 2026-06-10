export interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  role: EUserRole
  isVerified: boolean;
  momoVerified: boolean;
  isActive: boolean;
  ghanaCardImage?: string;
  ghanaCardNumber?: string;
  ghanaCardSelfie?: string;
  region?: string;
  town?: string;
  createdAt: string;
  __v: number;
}

export enum EUserRole {
  SELLER = "seller",
  BUYER = "buyer",
  ADMIN = "admin"
}
 