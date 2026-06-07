import { EUserRole } from '@/types/user';
import { z } from 'zod';

export const signinSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^0[0-9]{9}$/, 'Enter a valid Ghana phone number (e.g., 024XXXXXXX)'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    phoneNumber: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^0[0-9]{9}$/, 'Enter a valid Ghana phone number (e.g., 024XXXXXXX)'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password cannot exceed 50 characters'),
    confirmPassword: z.string(),
    role: z.nativeEnum(EUserRole, {
        error: 'Please select a role',
    }).refine((value) => !value.includes('admin'), {
        message: 'Please select a non-admin role',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type ISigninFormData = z.infer<typeof signinSchema>;
export type IRegisterFormData = z.infer<typeof registerSchema>;