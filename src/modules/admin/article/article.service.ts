import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { findAll } from '../../../utils/findAll';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>,
                private readonly cloudinaryService: CloudinaryService
    ) {}

    async index(keyword: string, status: string, deleted: string, page: number, sortKey: string, sortValue: string) {
        return findAll(this.articleModel, {
            keyword,
            page,
            sortKey,
            sortValue,
            status: status,
            deleted: deleted === 'true' ? true : false
        });
    }
    async upload(file: Express.Multer.File) {
        const result = await this.cloudinaryService.uploadFile(file);
        return { url: result.secure_url };
    }
    async create(createArticleDto: CreateArticleDto, position: number): Promise<{ success: boolean, message: string }> {
        if (!position) {
            const countPosition = await this.articleModel.countDocuments({});
            createArticleDto.position = countPosition + 1;
        }
        else {
            createArticleDto.position = position;
        }
        const createdArticle = new this.articleModel(createArticleDto);
        createdArticle.save();
        if (createdArticle) {
            return { success: true, message: "Tạo bài báo thành công" };
        }
        return { success: false, message: "Tạo bài báo thất bại"};
    }

    async update(id: string, updateArticleDto: UpdateArticleDto): Promise<{ success: boolean, message: string }> {
        const updatedArticle = await this.articleModel.updateOne({ _id: id }, {...updateArticleDto, $set: { updatedAt: new Date()}});
        if (updatedArticle) {
            return { success: true, message: "Cập nhật thành công" };
        }
        return { success: false, message: "Cập nhật thất bại"}; 
    }

    async detail(id: string): Promise<Article> {
        const article = await this.articleModel.findById(id);
        if (!article) {
            throw new NotFoundException('Article not found');
        }
        return article;
    }
    
    // PHẦN THAO TÁC XÓA VÀ KHÔI PHỤC

    // Xóa mềm
    async deleteSoft(id: string): Promise<{ success: boolean, message: string }> {
        const deleteSoft = await this.articleModel.updateOne({ _id: id }, 
                                                                { deleted: true, deletedAt: new Date(),})
        if (deleteSoft) {
            return { success: true, message: "Xóa thành công" };
        }
        return { success: false, message: "Xóa không thành công"};                            
    }

    // Xóa vĩnh viễn
    async deleteHard(id: string): Promise<{ success: boolean, message: string }> {
        const deleteHard = await this.articleModel.deleteOne({ _id: id });
        if (deleteHard) {
            return { success: true, message: "Xóa vĩnh viễn thành công" };
        }
        return { success: false, message: "Xóa vĩnh viễn không thành công"};                            
    }

    // Phục hồi bài báo
    async recovery(id: string): Promise<{ success: boolean, message: string }> {
        const recovery = await this.articleModel.updateOne({ _id: id }, 
                                                            { deleted: false, deletedAt: null});
        if (recovery) {
            return { success: true, message: "Phục hồi thành công" };
        }
        return { success: false, message: "Phục hồi thất bại"};                            
    }
}