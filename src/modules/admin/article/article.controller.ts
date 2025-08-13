import { Controller, UploadedFile, UseInterceptors, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '../../schemas/article.schema';
import { prefixAdmin, prefixApi } from '../../../config/system';
import { Public } from 'src/modules/decorator/customize';
// Upload image
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../../cloudinary/cloudinary.service';
@Controller(prefixApi + prefixAdmin + '/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService,
              private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('deleted') deleted: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
    return this.articleService.index(keyword, status, deleted, page, sortKey, sortValue);
  }
  
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.articleService.upload(file);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
      @UploadedFile() file: Express.Multer.File,
      @Body() ArticleDto: CreateArticleDto, 
      @Body('position') position: number,
      ): Promise<{ success: boolean, message: string }> {
      return this.articleService.create(ArticleDto, position);
  }

  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() ArticleDto: UpdateArticleDto, 
    @Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.articleService.update(id, ArticleDto);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<Article> {
    return this.articleService.detail(id);
  }

  @Delete('/deleteSoft/:id')
  async delete(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.deleteSoft(id);
  }

  @Delete('/deleteHard/:id')
  async deleteHard(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.deleteHard(id);
  }

  @Patch('/recovery/:id')
  async recovery(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.recovery(id);
  }

}