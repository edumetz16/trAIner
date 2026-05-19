import {
  CreateMessageRequestSchema,
  CreateMessageResponseSchema,
  CreatePlayerRequestSchema,
  CreatePlayerResponseSchema,
  CreateTeamRequestSchema,
  CreateTeamResponseSchema,
  ListChannelsResponseSchema,
  ListMessagesResponseSchema,
  ListPlayersResponseSchema,
  ListTeamsResponseSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  MarkChannelReadRequestSchema,
  MarkChannelReadResponseSchema,
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

  async listChannels() {
    const res = await fetch(`${this.baseUrl}/v1/channels`);
    return ListChannelsResponseSchema.parse(await res.json());
  }

  async listMessages(channelId: string) {
    const res = await fetch(`${this.baseUrl}/v1/channels/${channelId}/messages`);
    return ListMessagesResponseSchema.parse(await res.json());
  }

  async createMessage(channelId: string, input: { clubId: string; authorUserId: string; text: string }) {
    const parsed = CreateMessageRequestSchema.parse(input);
    const res = await fetch(`${this.baseUrl}/v1/channels/${channelId}/messages`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed),
    });
    return CreateMessageResponseSchema.parse(await res.json());
  }

  async markChannelRead(channelId: string, input: { clubId: string; userId: string }) {
    const parsed = MarkChannelReadRequestSchema.parse(input);
    const res = await fetch(`${this.baseUrl}/v1/channels/${channelId}/read`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed),
    });
    return MarkChannelReadResponseSchema.parse(await res.json());
  }

}
