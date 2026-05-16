import { z } from 'zod';
import { EventTypeSchema, IdSchema, IsoDateSchema } from './common';

export const CalendarEventSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  teamId: IdSchema,
  type: EventTypeSchema,
  title: z.string().min(2),
  location: z.string().min(2),
  startsAt: IsoDateSchema,
});
