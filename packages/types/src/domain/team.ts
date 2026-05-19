import { z } from 'zod';
import { IdSchema } from './common';

export const TeamSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  name: z.string().min(2),
  categoryOrder: z.number().int().min(1),
});

export type Team = z.infer<typeof TeamSchema>;
