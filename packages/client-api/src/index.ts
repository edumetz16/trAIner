import {
  CreatePlayerRequestSchema,
  CreatePlayerResponseSchema,
  CreateTeamRequestSchema,
  CreateTeamResponseSchema,
  ListPlayersResponseSchema,
  ListTeamsResponseSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  MeResponseSchema,
  UpdatePlayerStatusRequestSchema,
  UpdatePlayerStatusResponseSchema,
} from '@trainer/api-contract';

export class TrainerApiClient {
  constructor(private readonly baseUrl: string, private readonly accessToken?: string) {}

  async login(input: { email: string; password: string }) {
    const parsed = LoginRequestSchema.parse(input);
    const res = await fetch(`${this.baseUrl}/v1/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed),
    });
    return LoginResponseSchema.parse(await res.json());
  }

  async me() {
    const res = await fetch(`${this.baseUrl}/v1/auth/me`, {
      headers: this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : undefined,
    });
    return MeResponseSchema.parse(await res.json());
  }

  async listTeams() {
    const res = await fetch(`${this.baseUrl}/v1/teams`);
    return ListTeamsResponseSchema.parse(await res.json());
  }

  async createTeam(input: { clubId: string; name: string; categoryOrder: number }) {
    const res = await fetch(`${this.baseUrl}/v1/teams`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(CreateTeamRequestSchema.parse(input)),
    });
    return CreateTeamResponseSchema.parse(await res.json());
  }

  async listPlayers() {
    const res = await fetch(`${this.baseUrl}/v1/players`);
    return ListPlayersResponseSchema.parse(await res.json());
  }

  async createPlayer(input: {
    clubId: string;
    teamId: string;
    fullName: string;
    phone: string;
    email: string;
    position: string;
    jerseyNumber: number;
    status: 'active' | 'injured' | 'no_clearance' | 'inactive';
  }) {
    const res = await fetch(`${this.baseUrl}/v1/players`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(CreatePlayerRequestSchema.parse(input)),
    });
    return CreatePlayerResponseSchema.parse(await res.json());
  }

  async updatePlayerStatus(input: { playerId: string; status: 'active' | 'injured' | 'no_clearance' | 'inactive' }) {
    const parsed = UpdatePlayerStatusRequestSchema.parse(input);
    const res = await fetch(`${this.baseUrl}/v1/players/${parsed.playerId}/status`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: parsed.status }),
    });
    return UpdatePlayerStatusResponseSchema.parse(await res.json());
  }
}
