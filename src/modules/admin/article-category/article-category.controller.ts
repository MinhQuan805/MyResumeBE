import { Controller, Get, Query, Patch, Param, Post, Body, Delete } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { CategoryArticle } from '../../schemas/category.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { prefixAdmin, prefixApi } from '../../../config/system';

@Controller(prefixApi + prefixAdmin + '/article-category')
export class ArticleCategoryController {
  constructor(private readonly articleCategoryService: ArticleCategoryService) {}
  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
    return this.articleCategoryService.index(keyword, status, page, sortKey, sortValue);
  }
  @Post('/create')
  async create(@Body() createCategoryDto: CreateCategoryDto, 
              @Body('position') position: string,
             ): Promise<CategoryArticle> {
    return this.articleCategoryService.create(createCategoryDto, position);
  }

  @Patch('/edit/:id')
    async update(@Body() updateCategoryDto: UpdateCategoryDto, @Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.articleCategoryService.update(id, updateCategoryDto);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<CategoryArticle> {
    return this.articleCategoryService.detail(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleCategoryService.delete(id);
  }
}
