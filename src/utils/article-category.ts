import { Model } from "mongoose";
import { CategoryArticle } from "../modules/schemas/category.schema";

const getSubCategory = async (parentID: string, categoryModel: Model<CategoryArticle>) => {
    const subs = await categoryModel.find({
        parent_id: parentID,
        status: "active",
        deleted: false,
    });
    
    let arr = [...subs];
    
    for (const sub of subs) {
        const child = await getSubCategory(sub.id, categoryModel);
        arr = arr.concat(child);
    }

    return arr;
}

export const getSubCategoryHelper = {
    getSubCategory: getSubCategory,
}