import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RosterController } from './roster/roster.controller';
import { RosterService } from './roster/roster.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';

@Module({
  controllers: [AuthController, RosterController, ChatController],
  providers: [AuthService, RosterService, ChatService],
})
export class AppModule {}
