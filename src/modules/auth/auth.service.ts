
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePasswordHelper } from '../../utils/password';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
                private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Sai mật khẩu');
    }
    
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    const tokens = await this.generateTokens(payload);
    return { 
      user: {
        email: user.email,
        _id: user._id,
        role: user.role,
      },
      ...tokens,
    };
  }

  async handleRegister(registerUserDto: CreateAuthDto) {
    return await this.userService.handleRegister(registerUserDto);
  }
  async generateTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
    });
    await this.userService.updateRefreshToken(payload.sub, refreshToken);

    return { accessToken, refreshToken };
  }
  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      const user = await this.userService.findById(decoded.sub);
      if (!user) {
        throw new UnauthorizedException('Không tìm thấy người dùng');
      }

      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Token không hợp lệ');
      }

      const payload = { username: user.email, sub: user._id };
      const tokens = await this.generateTokens(payload);

      await this.userService.updateRefreshToken(user._id.toString(), tokens.refreshToken);

      return tokens;
    } catch (err) {
      throw new UnauthorizedException('Token đã hết hạn hoặc không hợp lệ');
    }
  }
}
