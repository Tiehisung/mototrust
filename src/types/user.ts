export interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  role: EUserRole
  isVerified: boolean;
  momoVerified: boolean;
  region?: string;
  town?: string;
  createdAt: string;
}

export enum EUserRole {
  SELLER = "seller",
  BUYER = "buyer",
  ADMIN = "admin"
}
 