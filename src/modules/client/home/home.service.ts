import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../../schemas/article.schema';
import { Product } from '../../schemas/product.schema';

@Injectable()
export class HomeService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>, @InjectModel(Product.name) private productModel: Model<Product>) {}

    async index() {
        const articles = await this.articleModel.find({
            deleted: false,
            status: 'active',
            outstand: true,
        }).sort({ position: "desc" }).limit(3);
        const products = await this.productModel.find({
            deleted: false,
            status: 'active',
        }).sort({ position: "desc" });
        return { articles, products };
    }

}