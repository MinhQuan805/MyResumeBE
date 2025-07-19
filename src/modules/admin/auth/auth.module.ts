import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../auth/passport/local.strategy';
import { JwtStrategy } from '../../auth/passport/jwt.strategy';
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
@Module({
  imports: [ 
            JwtModule.registerAsync({
              useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                  expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRE'),
                },
              }),
              inject: [ConfigService],
            }),
            PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
