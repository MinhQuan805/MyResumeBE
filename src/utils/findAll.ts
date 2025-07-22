import { Model } from 'mongoose';
import { paginationHelper } from './pagination';

export interface SearchParams {
    keyword?: string;
    status?: string;
    page: number;
    sortKey?: string;
    sortValue?: string;
    deleted: boolean;
}

export interface SearchResult<T> {
    data: T[];
    currentPage: number;
    totalItems: number;
}

export interface PaginationConfig {
    limitItem?: number;
}

/**
 * Helper function để tìm kiếm và phân trang
 * @param model Mongoose model
 * @param params Tham số tìm kiếm
 * @param config Cấu hình phân trang
 * @returns Kết quả tìm kiếm với phân trang
 */

export async function findAll<T>(
    model: Model<T>,
    params: SearchParams,
    config: PaginationConfig = {}
): Promise<SearchResult<T>> {
    const { keyword, status, page, sortKey, sortValue, deleted } = params;
    
    // Tạo điều kiện tìm kiếm
    const find: { title?: RegExp, deleted: boolean, status?: string } = {
        deleted
    };

    // Thêm tìm kiếm theo keyword
    if (status) {
        find.status = status;
    }
    if (keyword) {
        find.title = new RegExp(keyword, 'i');
    }
    
    // Tạo điều kiện sắp xếp
    const sort: { [key: string]: number } = {};
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue === 'asc' ? 1 : -1;
    } else {
        sort['position'] = 1;
    }
    
    // Tính tổng số items
    const totalItems = await model.countDocuments(find);

    // Tính toán phân trang
    const pagination = paginationHelper(totalItems, page);
    const skip = pagination.skip;
    const currentPage = pagination.currentPage;

    // Thực hiện query
    const data = await model.find(find)
        .sort(sort as any)
        .skip(skip);
        
    return {
        data: data as T[], 
        currentPage, 
        totalItems,
    };
}