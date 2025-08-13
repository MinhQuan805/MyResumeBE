export const paginationHelper = (countArticle: number, page: number) => {
    const pagination: { currentPage: number, skip: number, limitItem: number, totalPage: number } = {
        currentPage: page ? page : 1,
        limitItem: 10,
        skip: 0,
        totalPage: 0,
    };
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItem;
    pagination.totalPage = Math.ceil(countArticle/pagination.limitItem);
    return pagination;
}