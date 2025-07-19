import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { findAll } from '../../../utils/findAll';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async index(keyword: string, status: string, page: number, sortKey: string, sortValue: string) {
        return findAll(this.productModel, {
            keyword,
            page,
            sortKey,
            sortValue,
            deleted: false,
            status: status
        });
    }

    async create(createProductDto: CreateProductDto, position: string): Promise<Product> {
        if (!position || position === "") {
            const position = await this.productModel.countDocuments({});
            createProductDto.position = position + 1;
        }
        else {
            createProductDto.position = parseInt(position);
        }
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<{ success: boolean, message: string }> {
        const updatedProduct = await this.productModel.updateOne({ _id: id }, {...updateProductDto, $set: { updatedAt: new Date()}});
        if (updatedProduct) {
            return { success: true, message: "Cập nhật thành công" };
        }
        return { success: false, message: "Cập nhật thất bại"}; 
    }

    async detail(id: string): Promise<Product> {
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async delete(): Promise<{ success: boolean, message: string }> {
        const deleteHard = await this.productModel.deleteMany({ deleted: true });
        if (deleteHard) {
            return { success: true, message: "Xóa vĩnh viễn thành công" };
        }
        return { success: false, message: "Xóa vĩnh viễn không thành công"};                            
    }
}