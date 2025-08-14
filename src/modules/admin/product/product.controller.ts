import { Controller, Get, Post, Body, Patch, Param, Query, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../schemas/product.schema';
import { prefixAdmin, prefixApi } from '../../../config/system';
import { Public } from 'src/modules/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../../cloudinary/cloudinary.service';

@Controller(prefixApi + prefixAdmin + '/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Public()
  @Get()
  async index(
    @Query('keyword') keyword: string,
    @Query('status') status: string,
    @Query('deleted') deleted: string,
    @Query('page') page: number,
    @Query('sortKey') sortKey: string,
    @Query('sortValue') sortValue: string,
  ) {
    return this.productService.index(keyword, status, deleted, page, sortKey, sortValue);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.productService.upload(file);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Body('position') position: number,
  ): Promise<{ success: boolean, message: string }> {
    return this.productService.create(createProductDto, position);
  }

  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<{ success: boolean, message: string }> {
    return this.productService.update(id, updateProductDto);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<Product> {
    return this.productService.detail(id);
  }

  @Delete('/deleteSoft/:id')
  async deleteSoft(@Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.productService.deleteSoft(id);
  }

  @Delete('/deleteHard/:id')
  async deleteHard(@Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.productService.deleteHard(id);
  }

  @Patch('/recovery/:id')
  async recovery(@Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.productService.recovery(id);
  }
}