import { LoginRequestSchema, LoginResponseSchema, MeResponseSchema } from '@trainer/api-contract';

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
}
