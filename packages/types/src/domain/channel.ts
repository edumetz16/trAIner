import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common';

export const ChannelSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  name: z.string().min(2),
  visibilityKey: z.string().min(2),
});

export const MessageSchema = z.object({
  id: IdSchema,
  channelId: IdSchema,
  authorUserId: IdSchema,
  text: z.string().min(1),
  createdAt: IsoDateSchema,
});
