import { z } from 'zod';
import {
  CalendarEventSchema,
  ChannelSchema,
  ConvocationSchema,
  MessageSchema,
  PlayerSchema,
  RoleSchema,
} from '@trainer/types';

export const LoginRequestSchema = z.object({
  firebaseIdToken: z.string().min(10),
});
export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  userId: z.string(),
  clubId: z.string(),
  role: RoleSchema,
});

export const ListPlayersResponseSchema = z.object({ players: z.array(PlayerSchema) });
export const ListChannelsResponseSchema = z.object({ channels: z.array(ChannelSchema) });
export const ListMessagesResponseSchema = z.object({ messages: z.array(MessageSchema) });
export const CreateMessageRequestSchema = z.object({ text: z.string().min(1) });

export const ListCalendarEventsResponseSchema = z.object({ events: z.array(CalendarEventSchema) });
export const ListConvocationsResponseSchema = z.object({ convocations: z.array(ConvocationSchema) });

export const OpenApiSpec = {
  openapi: '3.0.3',
  info: { title: 'Plantel API', version: '1.0.0' },
  paths: {
    '/v1/auth/login': { post: { operationId: 'login' } },
    '/v1/players': { get: { operationId: 'listPlayers' } },
    '/v1/channels': { get: { operationId: 'listChannels' } },
    '/v1/channels/{channelId}/messages': { get: { operationId: 'listMessages' }, post: { operationId: 'createMessage' } },
    '/v1/calendar/events': { get: { operationId: 'listCalendarEvents' } },
    '/v1/convocations': { get: { operationId: 'listConvocations' } },
  },
} as const;
