import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../schemas/product.schema';
import { ProductService } from './product.service';
import { prefixAdmin, prefixApi } from '../../../config/system';
import { Public } from 'src/modules/decorator/customize';
@Controller(prefixApi + prefixAdmin + '/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  async index(@Query('keyword') keyword: string,
              @Query('status') status: string,
              @Query('page') page: number, 
              @Query('sortKey') sortKey: string, 
              @Query('sortValue') sortValue: string) {
    return this.productService.index(keyword, status, page, sortKey, sortValue);
  }

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto, 
              @Body('position') position: string,
             ): Promise<Product> {
    return this.productService.create(createProductDto, position);
  }

  @Patch('/edit/:id')
  async update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<{ success: boolean, message: string }> {
    return this.productService.update(id, updateProductDto);
  }

  @Get('/detail/:id')
  async detail(@Param('id') id: string): Promise<Product> {
    return this.productService.detail(id);
  }


  @Delete('/delete')
  async delete() : Promise<{ success: boolean, message: string }> {
    return this.productService.delete();
  }
}