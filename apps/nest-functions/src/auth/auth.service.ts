import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Session } from '@trainer/types';

const users = [
  {
    id: 'u1',
    email: 'coach@plantel.app',
    password: 'password123',
    clubId: 'c1',
    role: 'head_coach' as const,
  },
];

@Injectable()
export class AuthService {
  login(email: string, password: string): Session {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new UnauthorizedException('INVALID_CREDENTIALS');
    return {
      accessToken: 'dev-token-u1',
      userId: user.id,
      clubId: user.clubId,
      role: user.role,
    };
  }

  me(token?: string): Session {
    if (!token?.startsWith('Bearer dev-token-')) throw new UnauthorizedException('UNAUTHORIZED');
    return {
      accessToken: token.replace('Bearer ', ''),
      userId: 'u1',
      clubId: 'c1',
      role: 'head_coach',
    };
  }
}
