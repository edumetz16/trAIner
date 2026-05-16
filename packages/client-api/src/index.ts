import { ListChannelsResponseSchema, ListPlayersResponseSchema } from '@trainer/api-contract';

export class TrainerApiClient {
  constructor(private readonly baseUrl: string, private readonly accessToken?: string) {}

  async listPlayers() {
    const res = await fetch(`${this.baseUrl}/v1/players`, { headers: this.headers() });
    return ListPlayersResponseSchema.parse(await res.json());
  }

  async listChannels() {
    const res = await fetch(`${this.baseUrl}/v1/channels`, { headers: this.headers() });
    return ListChannelsResponseSchema.parse(await res.json());
  }

  private headers() {
    return this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : undefined;
  }
}
