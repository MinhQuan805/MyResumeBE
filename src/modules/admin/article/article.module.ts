import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article, ArticleSchema } from '../../schemas/article.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [CloudinaryModule, MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema, collection: 'articles' }])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
