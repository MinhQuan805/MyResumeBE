import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/admin/article/article.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleCategoryModule } from './modules/admin/article-category/article-category.module';
import { ProductModule } from './modules/admin/product/product.module';
import { HomeModule } from './modules/client/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/passport/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ArticleModule,
    ArticleCategoryModule,
    ProductModule,
    HomeModule,
    ArticleModule,
    ProductModule,
    AuthModule,
    UserModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
