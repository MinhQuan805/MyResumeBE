import { Controller, Body, Post, UseGuards, Request, Get, UnauthorizedException, Headers, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { prefixApi } from 'src/config/system';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '../decorator/customize';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller(prefixApi +'/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() registerAuthDto: CreateAuthDto) {
    return this.authService.handleRegister(registerAuthDto);
  }

  @Public()
  @Get('/refreshToken')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    return this.authService.refreshToken(refreshToken);
  }

}
