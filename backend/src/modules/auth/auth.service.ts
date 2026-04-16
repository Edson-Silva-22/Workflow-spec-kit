import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.validatePassword(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }

  async login(user: any) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600'),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    };
  }

  async refreshToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600'),
    };
  }
}