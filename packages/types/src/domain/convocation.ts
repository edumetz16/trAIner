import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common';

export const ConvocationSlotSchema = z.object({
  jersey: z.number().int().min(1).max(23),
  playerId: IdSchema,
  isCaptain: z.boolean().default(false),
});

export const ConvocationSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  teamId: IdSchema,
  eventId: IdSchema,
  status: z.enum(['draft', 'published']),
  slots: z.array(ConvocationSlotSchema).max(23),
  createdAt: IsoDateSchema,
});
