import { z } from 'zod';
import { IdSchema, PlayerStatusSchema } from './common';

export const PlayerSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  teamId: IdSchema,
  fullName: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  position: z.string().min(2),
  jerseyNumber: z.number().int().min(1).max(99),
  status: PlayerStatusSchema,
});
export type Player = z.infer<typeof PlayerSchema>;
