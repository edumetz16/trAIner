import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RosterController } from './roster/roster.controller';
import { RosterService } from './roster/roster.service';

@Module({
  controllers: [AuthController, RosterController],
  providers: [AuthService, RosterService],
})
export class AppModule {}
