import { z } from 'zod';
import { IdSchema, IsoDateSchema } from './common';

export const ChannelSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  name: z.string().min(2),
  kind: z.enum(['general', 'team', 'staff']),
});

export const MessageSchema = z.object({
  id: IdSchema,
  clubId: IdSchema,
  channelId: IdSchema,
  authorUserId: IdSchema,
  text: z.string().min(1).max(2000),
  createdAt: IsoDateSchema,
});

export const CreateMessageInputSchema = z.object({
  clubId: IdSchema,
  authorUserId: IdSchema,
  text: z.string().min(1).max(2000),
});

export const MarkChannelReadInputSchema = z.object({
  clubId: IdSchema,
  userId: IdSchema,
});
