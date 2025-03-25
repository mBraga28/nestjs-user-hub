import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { Utils } from '../utils/utils';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {

  private invalidatedTokens: Set<string> = new Set();

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateToken(email: string, user: User & { role?: { name: string } }) {
    const payload = {
      email,
      sub: user.id,
      role: user.role?.name, 
    };
    const accessToken: string = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: Utils.calculateMissingSeconds23hours(),
    });
    return accessToken;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User, res: any) {
    const accessToken: string = await this.generateToken(user.email, user);

    res.status(HttpStatus.OK).json({
      accessToken,
    });
  }

  async logout(access_token: string): Promise<void> {
    // Invalida o token para impedir novos acessos com ele
    await this.invalidateToken(access_token);
  }

  async invalidateToken(access_token: string): Promise<void> {
    this.invalidatedTokens.add(access_token);
    console.log(`Token invalidated: ${access_token}`);
  }

  async isTokenValid(access_token: string): Promise<boolean> {
    return !this.invalidatedTokens.has(access_token);
  }
}