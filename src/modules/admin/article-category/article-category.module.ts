import { Module } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryArticle, CategoryArticleSchema } from '../../schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CategoryArticle.name, schema: CategoryArticleSchema, collection: 'categories' }])],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
