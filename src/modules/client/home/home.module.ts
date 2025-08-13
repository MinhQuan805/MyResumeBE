import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../../schemas/article.schema';
import { Product, ProductSchema } from '../../schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }, { name: Product.name, schema: ProductSchema }])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
