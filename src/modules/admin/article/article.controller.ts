import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '../../schemas/article.schema';
import { prefixAdmin, prefixApi } from '../../../config/system';
import { Public } from 'src/modules/decorator/customize';
@Controller(prefixApi + prefixAdmin + '/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
    return this.articleService.index(keyword, status, page, sortKey, sortValue);
  }
  
  @Post('/create')
  async create(@Body() createArticleDto: CreateArticleDto, 
              @Body('position') position: string,
             ): Promise<Article> {
    return this.articleService.create(createArticleDto, position);
  }

  @Patch('/edit/:id')
  async update(@Body() updateArticleDto: UpdateArticleDto, @Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.articleService.update(id, updateArticleDto);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<Article> {
    return this.articleService.detail(id);
  }

  @Public()
  @Delete('/deleteSoft/:id')
  async delete(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.deleteSoft(id);
  }

  @Delete('/deleteHard')
  async deleteHard() : Promise<{ success: boolean, message: string }> {
    return this.articleService.deleteHard();
  }

  @Get('/deleted')
  async getAllDeleted(@Query('keyword') keyword: string, 
                      @Query('status') status: string,
                      @Query('page') page: number, 
                      @Query('sortKey') sortKey: string, 
                      @Query('sortValue') sortValue: string) {
    return this.articleService.getAllDeleted(keyword, status, page, sortKey, sortValue);
  }

  @Patch('/recovery/:id')
  async recovery(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.recovery(id);
  }

}