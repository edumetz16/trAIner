import { Injectable } from '@nestjs/common';
import type { Channel, Message } from '@trainer/types';

@Injectable()
export class ChatService {
  private channels: Channel[] = [
    { id: 'ch1', clubId: 'c1', name: 'General', kind: 'general' },
    { id: 'ch2', clubId: 'c1', name: 'Primera', kind: 'team' },
  ];
  private messages: Message[] = [
    {
      id: 'msg1',
      clubId: 'c1',
      channelId: 'ch1',
      authorUserId: 'u1',
      text: 'Bienvenidos al canal general',
      createdAt: new Date().toISOString(),
    },
  ];

  listChannels() {
    return this.channels;
  }

  listMessages(channelId: string) {
    return this.messages.filter((m) => m.channelId === channelId);
  }

  createMessage(input: Omit<Message, 'id' | 'channelId' | 'createdAt'> & { channelId: string }) {
    const message: Message = {
      id: `msg${this.messages.length + 1}`,
      clubId: input.clubId,
      channelId: input.channelId,
      authorUserId: input.authorUserId,
      text: input.text,
      createdAt: new Date().toISOString(),
    };
    this.messages.push(message);
    return message;
  }

  markRead() {
    return { ok: true as const };
  }
}
