import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { LoginRequestSchema, LoginResponseSchema, MeResponseSchema } from '@trainer/api-contract';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: unknown) {
    const input = LoginRequestSchema.parse(body);
    return LoginResponseSchema.parse(this.authService.login(input.email, input.password));
  }

  @Get('me')
  me(@Headers('authorization') authorization?: string) {
    return MeResponseSchema.parse(this.authService.me(authorization));
  }
}
