import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../../schemas/article.schema';
import { findAll } from '../../../utils/findAll';
import { Product } from 'src/modules/schemas/product.schema';
import { CategoryArticle } from '../../schemas/category.schema';
import { getSubCategoryHelper } from '../../../utils/article-category';
@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>, @InjectModel(CategoryArticle.name) private categoryModel: Model<CategoryArticle>) {}

    async index(keyword: string, status: string, page: number, sortKey: string, sortValue: string) {
        return findAll(this.articleModel, {
            keyword,
            page,
            sortKey,
            sortValue,
            deleted: false,
            status: status
        });
    }

    async detail(slugArticle: string): Promise<Article> {
        const article = await this.articleModel.findOne({ slug: slugArticle, deleted: false, status: 'active' });
        if (!article) {
            throw new NotFoundException('Article not found');
        }
        return article;
    }

    async category(slugCategory: string): Promise<Article[]> {
        const category = await this.categoryModel.findOne({
            slug: slugCategory,
            deleted: false,
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        const listItem = await getSubCategoryHelper.getSubCategory(category.id, this.categoryModel);
    
        const listItemId = listItem.map((item => item.id));
        const articles = await this.articleModel.find({
            category_id: { $in: [category.id, ...listItemId] },
            deleted: false,
        }).sort({ position: "desc" });
        return articles;
    }
}