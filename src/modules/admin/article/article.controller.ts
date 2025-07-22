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
@Controller(prefixApi + prefixAdmin + '/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService,
              private readonly cloudinaryService: CloudinaryService
  ) {}

  @Public()
  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('deleted') deleted: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
    return this.articleService.index(keyword, status, deleted, page, sortKey, sortValue);
  }
  
  @Public()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.articleService.upload(file);
  }

  @Public()
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
      @UploadedFile() file: Express.Multer.File,
      @Body() ArticleDto: CreateArticleDto, 
      @Body('position') position: string,
      ): Promise<{ success: boolean, message: string }> {

      // Thêm phần tạo ảnh
      let thumbnailUrl = '';
      if (file) {
        const uploadResult = await this.cloudinaryService.uploadFile(file);
        if ('secure_url' in uploadResult) {
          thumbnailUrl = uploadResult.secure_url;
        }
      }

      const createArticleDto = {
        ...ArticleDto,
        thumbnail: thumbnailUrl,
      }
      return this.articleService.create(createArticleDto, position);
  }

  @Public()
  @Patch('/edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() ArticleDto: UpdateArticleDto, 
    @Param('id') id: string): Promise<{ success: boolean, message: string }> {
    let thumbnailUrl = '';
      if (file) {
        const uploadResult = await this.cloudinaryService.uploadFile(file);
        if ('secure_url' in uploadResult) {
          thumbnailUrl = uploadResult.secure_url;
        }
      }

      const updateArticleDto = {
        ...ArticleDto,
        thumbnail: thumbnailUrl,
      }
    return this.articleService.update(id, updateArticleDto);
  }

  @Public()
  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<Article> {
    return this.articleService.detail(id);
  }

  @Public()
  @Delete('/deleteSoft/:id')
  async delete(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.deleteSoft(id);
  }

  @Public()
  @Delete('/deleteHard/:id')
  async deleteHard(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.deleteHard(id);
  }

  @Public()
  @Patch('/recovery/:id')
  async recovery(@Param('id') id: string) : Promise<{ success: boolean, message: string }> {
    return this.articleService.recovery(id);
  }

}