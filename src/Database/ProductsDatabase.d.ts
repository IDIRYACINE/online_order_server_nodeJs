declare type Category = {
    Id: string;
    Name: string;
    ImageUrl: string;
    ProductsCount: number;
};
declare type Product = {
    Id: string;
    Name: string;
    ImageUrl: string;
    Price: number[];
    Size: string[];
    Description: string;
};
declare type FetchOptions = {
    startIndex: string;
    count: string;
    categoryId?: string;
};
declare type DeleteOptions = {
    categoryId: string;
    productId?: string;
};
declare type Attribute = {
    name: string;
    value: any;
};
declare type UpdateOptions = {
    categoryId: string;
    productId?: string;
    updatedValues: Attribute[];
};
declare type CreateProductOptions = {
    product: Product;
    categoryId: string;
};
declare type CreateCategoryOptions = {
    category: Category;
};
export declare function setUpProductsDatabase(): Promise<void>;
export declare function createCategory(options: CreateCategoryOptions): Promise<void>;
export declare function updateCategory(options: UpdateOptions): Promise<void>;
export declare function deleteCategory(options: DeleteOptions): Promise<void>;
export declare function fetchCategory(options: FetchOptions): Promise<Category[]>;
export declare function createProduct(options: CreateProductOptions): Promise<void>;
export declare function fetchProduct(options: FetchOptions): Promise<Product[]>;
export declare function deleteProduct(options: DeleteOptions): Promise<void>;
export declare function updateProduct(options: UpdateOptions): Promise<void>;
export {};
