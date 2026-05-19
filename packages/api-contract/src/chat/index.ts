import { z } from 'zod';
import {
  ChannelSchema,
  CreateMessageInputSchema,
  MarkChannelReadInputSchema,
  MessageSchema,
} from '@trainer/types';

export const ListChannelsResponseSchema = z.object({ channels: z.array(ChannelSchema) });
export const ListMessagesResponseSchema = z.object({ messages: z.array(MessageSchema) });
export const CreateMessageRequestSchema = CreateMessageInputSchema;
export const CreateMessageResponseSchema = MessageSchema;
export const MarkChannelReadRequestSchema = MarkChannelReadInputSchema;
export const MarkChannelReadResponseSchema = z.object({ ok: z.literal(true) });
