import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateMessageRequestSchema,
  ListCalendarEventsResponseSchema,
  ListChannelsResponseSchema,
  ListConvocationsResponseSchema,
  ListMessagesResponseSchema,
  ListPlayersResponseSchema,
  LoginRequestSchema,
  LoginResponseSchema,
} from '@trainer/api-contract';
import { seed } from './app.data';

@Controller('v1')
export class AppController {
  @Post('auth/login')
  login(@Body() body: unknown) {
    LoginRequestSchema.parse(body);
    return LoginResponseSchema.parse({ accessToken: 'dev-token', userId: 'u1', clubId: 'c1', role: 'head_coach' });
  }

  @Get('players')
  listPlayers() {
    return ListPlayersResponseSchema.parse({ players: seed.players });
  }

  @Get('channels')
  listChannels() {
    return ListChannelsResponseSchema.parse({ channels: seed.channels });
  }

  @Get('channels/:channelId/messages')
  listMessages(@Param('channelId') channelId: string) {
    return ListMessagesResponseSchema.parse({ messages: seed.messages.filter((m) => m.channelId === channelId) });
  }

  @Post('channels/:channelId/messages')
  createMessage(@Param('channelId') channelId: string, @Body() body: unknown) {
    const parsed = CreateMessageRequestSchema.parse(body);
    const message = { id: `m${seed.messages.length + 1}`, channelId, authorUserId: 'u1', text: parsed.text, createdAt: new Date().toISOString() };
    seed.messages.push(message);
    return message;
  }

  @Get('calendar/events')
  listEvents() {
    return ListCalendarEventsResponseSchema.parse({ events: seed.events });
  }

  @Get('convocations')
  listConvocations() {
    return ListConvocationsResponseSchema.parse({ convocations: seed.convocations });
  }
}
