import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { prefixAdmin, prefixApi } from '../../../config/system';
import { Article } from 'src/modules/schemas/article.schema';
@Controller(prefixApi + '/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
    return this.articleService.index(keyword, status, page, sortKey, sortValue);
  }

  @Get('/detail/:slugArticle')
  async detail(@Param('slugArticle') slugArticle: string): Promise<Article> {
    return this.articleService.detail(slugArticle);
  }
}