import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, UnauthorizedException, Res, NotFoundException, Patch } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UserService } from 'src/user/services/user.service';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Request() req, @Res() res) {
    return this.authService.login(req.user, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req: Request) {
    const access_token = req.headers['authorization']?.split(' ')[1];
    if (!access_token) {
      throw new UnauthorizedException('Invalid token.');
    }
    await this.authService.logout(access_token);
    return { message: 'Logout successful', statusCode: 200 };
  }

  @Public()
  @Patch('reset-password')
  @ApiOperation({ summary: 'Reset user password by email' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findUserByEmail(resetPasswordDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userService.update(user.id, { password: resetPasswordDto.newPassword });
  }
}