import { z } from 'zod';
import { LoginInputSchema, SessionSchema } from '@trainer/types';

export const LoginRequestSchema = LoginInputSchema;
export const LoginResponseSchema = SessionSchema;
export const MeResponseSchema = SessionSchema;

export const AuthErrorSchema = z.object({
  code: z.enum(['INVALID_CREDENTIALS', 'UNAUTHORIZED']),
  message: z.string(),
});
