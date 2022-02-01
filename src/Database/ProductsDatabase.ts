
import Database from 'better-sqlite3';

type Category = {
    Id : string,
    Name : string ,
    ImageUrl : string,
    ProductsCount : number
}

type Product = {
    Id : string,
    Name :string,
    ImageUrl:string ,
    Price:number[] ,
    Size :string[],
    Description :string,
}

type FetchOptions = {
    startIndex : string,
    count : string,
    categoryId?:string
}

type DeleteOptions = {
    categoryId : string,
    productId? : string
}

type Attribute = {
    name :string,
    value : any
}

type UpdateOptions = {
    categoryId : string,
    productId? : string,
    updatedValues : Attribute[]
}

type CreateProductOptions = {
    product:Product,
    categoryId:string
}

type CreateCategoryOptions = {
    category:Category
}

    let connection : Database.Database 

    const configuration = {
        databaseName : "products.db",
        databaseUrl : "./data",
        categoryTableName : "Categories",
    }

    export async function setUpProductsDatabase(){
        connection = new Database(configuration.databaseUrl + '/' +configuration.databaseName)
       
        const createCategoryHolder = connection.prepare("CREATE TABLE IF NOT EXISTS "+ configuration.categoryTableName +" (\n"
        + "	Id String PRIMARY KEY,\n"
        + "	Name text NOT NULL,\n"
        + "	ImageUrl text NOT NULL,\n"
        + " ProductsCount Integer "
        + ")")

        createCategoryHolder.run()
    }

    export async function createCategory(options:CreateCategoryOptions){
        const category = options.category 

        const createCategoryTable = connection.prepare("CREATE TABLE IF NOT EXISTS "+ category.Name +" (\n"
        + "	Id String PRIMARY KEY,\n"
        + "	Name text NOT NULL,\n"
        + "	ImageUrl text NOT NULL\n,"
        + "	Price text NOT NULL\n,"
        + "	Size text NOT NULL\n,"
        + "	Description text DEFAULT '' NOT NULL\n"
        + ")")
        createCategoryTable.run()

        const registerCategory = connection.prepare("INSERT INTO "+configuration.categoryTableName+"(Id,Name,ImageUrl,ProductsCount) VALUES(?,?,?,?)")
        registerCategory.run(category.Id,category.Name,category.ImageUrl,0)

      
    }

    export async function updateCategory(options:UpdateOptions){
        let update_category_query = "UPDATE "+ configuration.categoryTableName +" SET "
        let query_helper = []

        const updatedValues = options.updatedValues
        const attributesLength = updatedValues.length

        for(let i = 0  ;i < attributesLength ; i++){
            if(i != attributesLength - 1){
                update_category_query +=  updatedValues[i].name +" = ? ,"
                query_helper.push(updatedValues[i].value)
            }
            else{
                update_category_query += updatedValues[i].name +" = ? WHERE Id = ? "
                query_helper.push(updatedValues[i].value)
                query_helper.push(options.categoryId)
            }
        }

        const stmt = connection.prepare(update_category_query)
        stmt.run(query_helper)
    }

    export async function deleteCategory(options:DeleteOptions){
        const dropTable = connection.prepare("DROP TABLE IF EXISTS " + options.categoryId)
        const unregisterCategory = connection.prepare("DELETE FROM "+configuration.categoryTableName +" WHERE Id = ?")

        dropTable.run()
        unregisterCategory.run(options.categoryId)
    }

    export async function fetchCategory(options:FetchOptions) : Promise<Category[]>{
        const selectCategory = connection.prepare("SELECT * FROM "+configuration.categoryTableName + " LIMIT ? OFFSET ?;")
        return selectCategory.all(options.count,options.startIndex)
    }
    
    export async function createProduct(options:CreateProductOptions){
        const insertProduct = connection.prepare("INSERT INTO "+options.categoryId +" (Id,Name,Description,ImageUrl,Size,Price) VALUES(?,?,?,?,?,?)")
        const updateCategory = connection.prepare("UPDATE "+configuration.categoryTableName+" SET ProductsCount = ProductsCount+1 WHERE Id = ?")
        const product = options.product
        insertProduct.run(product.Id,product.Name,product.Description,product.ImageUrl,JSON.stringify(product.Size),JSON.stringify(product.Price))
        updateCategory.run(options.categoryId)

    }

    export async function fetchProduct(options:FetchOptions) : Promise<Product[]>{
        const selectProduct = connection.prepare("SELECT * FROM "+options.categoryId + " LIMIT ? OFFSET ?;")
        return selectProduct.all(options.count,options.startIndex)
    }

    export async function deleteProduct(options:DeleteOptions){
        const dropProduct = connection.prepare(" DELETE FROM "+ options.categoryId +" WHERE Id = ? ")
        const updateCategory = connection.prepare("UPDATE "+configuration.categoryTableName+" SET ProductsCount = ProductsCount-1 WHERE Id = ?")
        dropProduct.run(options.productId)
        updateCategory.run(options.categoryId)


    }

    export async function updateProduct(options:UpdateOptions){
        let update_product_query = "UPDATE "+ configuration.categoryTableName +" SET "
        let query_helper = [options.categoryId]
        const updatedValues = options.updatedValues
        const attributesLength = options.updatedValues.length
        
        for(let i = 0 ; i < attributesLength ; i++){
            if(i != attributesLength - 1){
                update_product_query +=  updatedValues[i].name +" = ? ,"
                query_helper.push(updatedValues[i].value)
            }
            else{
                update_product_query += updatedValues[i].name +" = ? WHERE Id = ? "
                query_helper.push(updatedValues[i].value)
                query_helper.push(options.productId!)
            }
        }

        const stmt = connection.prepare(update_product_query)
        stmt.run(query_helper)
    }



