import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common';

export const ClubSchema = z.object({
  id: IdSchema,
  name: z.string().min(2),
  createdAt: IsoDateSchema,
});
export type Club = z.infer<typeof ClubSchema>;
