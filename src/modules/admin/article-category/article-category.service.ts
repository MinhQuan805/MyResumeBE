import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryArticle } from '../../schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { findAll } from '../../../utils/findAll';

@Injectable()
export class ArticleCategoryService {
    constructor(@InjectModel(CategoryArticle.name) private categoryModel: Model<CategoryArticle>) {}

    async index(keyword: string, status: string, page: number, sortKey: string, sortValue: string) {
        return findAll(this.categoryModel, {
            keyword,
            page,
            sortKey,
            sortValue,
            deleted: false,
            status: status
        });
    }

    async create(createArticleDto: CreateCategoryDto, position: string): Promise<CategoryArticle> {
        if (!position || position === "") {
            const position = await this.categoryModel.countDocuments({});
            createArticleDto.position = position + 1;
        }
        else {
            createArticleDto.position = parseInt(position);
        }
        const createdCategory = new this.categoryModel(createArticleDto);
        return createdCategory.save();
    }

    async update(id: string, updateArticleDto: UpdateCategoryDto): Promise<{ success: boolean, message: string }> {
        const updatedCategory = await this.categoryModel.updateOne({ _id: id }, {...updateArticleDto, $set: { updatedAt: new Date()}});
        if (updatedCategory) {
            return { success: true, message: "Cập nhật thành công" };
        }
        return { success: false, message: "Cập nhật thất bại"};
    }

    async detail(id: string): Promise<CategoryArticle> {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }


    // Xóa vĩnh viễn
    async delete(id: string): Promise<{ success: boolean, message: string }> {
        const deleted = await this.categoryModel.deleteOne({ _id: id });
        if (deleted) {
            return { success: true, message: "Xóa vĩnh viễn thành công" };
        }
        return { success: false, message: "Xóa vĩnh viễn không thành công"};                            
    }

}
