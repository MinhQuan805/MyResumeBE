import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { findAll } from '../../../utils/findAll';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async index(keyword: string, status: string, deleted: string, page: number, sortKey: string, sortValue: string) {
    return findAll(this.productModel, {
      keyword,
      page,
      sortKey,
      sortValue,
      status: status,
      deleted: deleted === 'true' ? true : false,
    });
  }

  async upload(file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadFile(file);
    return { url: result.secure_url };
  }

  async create(createProductDto: CreateProductDto, position: number): Promise<{ success: boolean, message: string }> {
    if (!position) {
      const countPosition = await this.productModel.countDocuments({});
      createProductDto.position = countPosition + 1;
    } else {
      createProductDto.position = position;
    }
    const createdProduct = new this.productModel(createProductDto);
    const savedProduct = await createdProduct.save();
    if (savedProduct) {
      return { success: true, message: 'Tạo sản phẩm thành công' };
    }
    return { success: false, message: 'Tạo sản phẩm thất bại' };
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<{ success: boolean, message: string }> {
    const updatedProduct = await this.productModel.updateOne(
      { _id: id },
      { ...updateProductDto, $set: { updatedAt: new Date() } },
    );
    if (updatedProduct.modifiedCount > 0) {
      return { success: true, message: 'Cập nhật thành công' };
    }
    return { success: false, message: 'Cập nhật thất bại' };
  }

  async detail(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async deleteSoft(id: string): Promise<{ success: boolean, message: string }> {
    const deleteSoft = await this.productModel.updateOne(
      { _id: id },
      { deleted: true, deletedAt: new Date() },
    );
    if (deleteSoft.modifiedCount > 0) {
      return { success: true, message: 'Xóa thành công' };
    }
    return { success: false, message: 'Xóa không thành công' };
  }

  async deleteHard(id: string): Promise<{ success: boolean, message: string }> {
    const deleteHard = await this.productModel.deleteOne({ _id: id });
    if (deleteHard.deletedCount > 0) {
      return { success: true, message: 'Xóa vĩnh viễn thành công' };
    }
    return { success: false, message: 'Xóa vĩnh viễn không thành công' };
  }

  async recovery(id: string): Promise<{ success: boolean, message: string }> {
    const recovery = await this.productModel.updateOne(
      { _id: id },
      { deleted: false, deletedAt: null },
    );
    if (recovery.modifiedCount > 0) {
      return { success: true, message: 'Phục hồi thành công' };
    }
    return { success: false, message: 'Phục hồi thất bại' };
  }
}