import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CreatePlayerRequestSchema,
  CreatePlayerResponseSchema,
  CreateTeamRequestSchema,
  CreateTeamResponseSchema,
  ListPlayersResponseSchema,
  ListTeamsResponseSchema,
  UpdatePlayerStatusRequestSchema,
  UpdatePlayerStatusResponseSchema,
} from '@trainer/api-contract';
import { RosterService } from './roster.service';

@Controller('v1')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get('teams')
  listTeams() {
    return ListTeamsResponseSchema.parse({ teams: this.rosterService.listTeams() });
  }

  @Post('teams')
  createTeam(@Body() body: unknown) {
    const input = CreateTeamRequestSchema.parse(body);
    return CreateTeamResponseSchema.parse(this.rosterService.createTeam(input));
  }

  @Get('players')
  listPlayers() {
    return ListPlayersResponseSchema.parse({ players: this.rosterService.listPlayers() });
  }

  @Post('players')
  createPlayer(@Body() body: unknown) {
    const input = CreatePlayerRequestSchema.parse(body);
    return CreatePlayerResponseSchema.parse(this.rosterService.createPlayer(input));
  }

  @Patch('players/:playerId/status')
  updatePlayerStatus(@Param('playerId') playerId: string, @Body() body: unknown) {
    const parsedBody =
      typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {};
    const input = UpdatePlayerStatusRequestSchema.parse({ ...parsedBody, playerId });
    return UpdatePlayerStatusResponseSchema.parse(
      this.rosterService.updatePlayerStatus(input.playerId, input.status),
    );
  }
}
