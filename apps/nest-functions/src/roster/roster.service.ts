import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { Player, Team } from '@trainer/types';

@Injectable()
export class RosterService {
  private teams: Team[] = [{ id: 't1', clubId: 'c1', name: 'Primera', categoryOrder: 1 }];
  private players: Player[] = [
    {
      id: 'p1',
      clubId: 'c1',
      teamId: 't1',
      fullName: 'Juan Perez',
      phone: '111111',
      email: 'juan@example.com',
      position: 'Forward',
      jerseyNumber: 1,
      status: 'active',
    },
  ];

  listTeams() {
    return this.teams;
  }

  createTeam(input: Omit<Team, 'id'>): Team {
    const exists = this.teams.some((t) => t.clubId === input.clubId && t.name.toLowerCase() === input.name.toLowerCase());
    if (exists) throw new BadRequestException('TEAM_ALREADY_EXISTS');

    const team = { ...input, id: `t${this.teams.length + 1}` };
    this.teams.push(team);
    return team;
  }

  listPlayers() {
    return this.players;
  }

  createPlayer(input: Omit<Player, 'id'>): Player {
    const team = this.teams.find((t) => t.id === input.teamId && t.clubId === input.clubId);
    if (!team) throw new BadRequestException('TEAM_NOT_FOUND');

    const duplicatedEmail = this.players.some((p) => p.clubId === input.clubId && p.email === input.email);
    if (duplicatedEmail) throw new BadRequestException('PLAYER_EMAIL_EXISTS');

    const player = { ...input, id: `p${this.players.length + 1}` };
    this.players.push(player);
    return player;
  }

  updatePlayerStatus(playerId: string, status: Player['status']): Player {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) throw new NotFoundException('PLAYER_NOT_FOUND');
    player.status = status;
    return player;
  }
}
