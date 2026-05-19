import { z } from 'zod';
import { IdSchema, RoleSchema } from '../domain/common';

export const SessionSchema = z.object({
  accessToken: z.string().min(10),
  userId: IdSchema,
  clubId: IdSchema,
  role: RoleSchema,
});

export const LoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type Session = z.infer<typeof SessionSchema>;
export type LoginInput = z.infer<typeof LoginInputSchema>;
