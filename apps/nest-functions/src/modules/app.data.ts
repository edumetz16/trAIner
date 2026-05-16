import type { z } from 'zod';
import {
  CalendarEventSchema,
  ChannelSchema,
  ConvocationSchema,
  MessageSchema,
  PlayerSchema,
} from '@trainer/types';

type Player = z.infer<typeof PlayerSchema>;
type Channel = z.infer<typeof ChannelSchema>;
type Message = z.infer<typeof MessageSchema>;
type CalendarEvent = z.infer<typeof CalendarEventSchema>;
type Convocation = z.infer<typeof ConvocationSchema>;

export const seed = {
  players: [
    {
      id: 'p1', clubId: 'c1', teamId: 't1', fullName: 'Juan Perez', phone: '+54911',
      email: 'juan@example.com', position: 'Forward', jerseyNumber: 1, status: 'active',
    },
  ] satisfies Player[],
  channels: [{ id: 'ch1', clubId: 'c1', name: 'General Plantel', visibilityKey: 'all' }] satisfies Channel[],
  messages: [{ id: 'm1', channelId: 'ch1', authorUserId: 'u1', text: 'Bienvenidos', createdAt: new Date().toISOString() }] satisfies Message[],
  events: [{ id: 'e1', clubId: 'c1', teamId: 't1', type: 'training', title: 'Entrenamiento', location: 'Cancha 1', startsAt: new Date().toISOString() }] satisfies CalendarEvent[],
  convocations: [{ id: 'cv1', clubId: 'c1', teamId: 't1', eventId: 'e1', status: 'draft', slots: [], createdAt: new Date().toISOString() }] satisfies Convocation[],
};
