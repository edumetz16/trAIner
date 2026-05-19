import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateMessageRequestSchema,
  CreateMessageResponseSchema,
  ListChannelsResponseSchema,
  ListMessagesResponseSchema,
  MarkChannelReadRequestSchema,
  MarkChannelReadResponseSchema,
} from '@trainer/api-contract';
import { ChatService } from './chat.service';

@Controller('v1/channels')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  listChannels() {
    return ListChannelsResponseSchema.parse({ channels: this.chatService.listChannels() });
  }

  @Get(':channelId/messages')
  listMessages(@Param('channelId') channelId: string) {
    return ListMessagesResponseSchema.parse({ messages: this.chatService.listMessages(channelId) });
  }

  @Post(':channelId/messages')
  createMessage(@Param('channelId') channelId: string, @Body() body: unknown) {
    const input = CreateMessageRequestSchema.parse(body);
    return CreateMessageResponseSchema.parse(this.chatService.createMessage({ ...input, channelId }));
  }

  @Post(':channelId/read')
  markRead(@Param('channelId') _channelId: string, @Body() body: unknown) {
    MarkChannelReadRequestSchema.parse(body);
    return MarkChannelReadResponseSchema.parse(this.chatService.markRead());
  }
}
