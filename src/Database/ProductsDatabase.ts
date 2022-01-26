import sqlite3 from 'sqlite3'
import {open ,Database} from 'sqlite'

type Category = {
    name : String ,
    imageUrl : String
}
    let connection : Database;
    const configuration = {
        databaseName : "products.db",
        databaseUrl : "./data",
        categoryTableName : "Categories",
    }

    export async function setUpProductsDataabase(){
        connection = await open({
            filename: configuration.databaseUrl + '/' +configuration.databaseName,
            driver: sqlite3.Database
        })

        const create_categories_holder_query = "CREATE TABLE IF NOT EXISTS "+ configuration.categoryTableName +" (\n"
        + "	Id String PRIMARY KEY,\n"
        + "	Name text NOT NULL,\n"
        + "	ImageUrl text NOT NULL,\n"
        + " ProductsCount Integer "
        + ")"

        connection.exec(create_categories_holder_query)
    }

    export async function createCategory(category:Category){
        let create_category_table_query = "CREATE TABLE IF NOT EXISTS "+ category.name +" (\n"
        + "	Id String PRIMARY KEY,\n"
        + "	Name text NOT NULL,\n"
        + "	ImageUrl text NOT NULL\n,"
        + "	Description text DEFAULT '' NOT NULL\n"
        + ")"

        let register_category_query = "INSERT INTO "+configuration.categoryTableName+"(Id,Name,ImageUrl,ProductsCount) VALUES(?,?,?,?)"
        
        connection.exec(create_category_table_query)
        connection.run(register_category_query,[category.name,category.name,category.imageUrl,0])
      
    }

    export async function updateCategory(id :string ,attributes : any){
        let update_product_query = "UPDATE ? SET "
        let query_helper = [configuration.categoryTableName]

        const attributesLength = attributes.length

        for(let i = 0  ;i < attributesLength ; i++){
            if(i != attributesLength - 1){
                update_product_query +=  attributes[i].name +" = ? ,"
                query_helper.push(attributes[i].value)
            }
            else{
                update_product_query += attributes[i].name +" = ? WHERE Id = ? "
                query_helper.push(attributes[i].value)
                query_helper.push(id)
            }
        }

        connection.run(update_product_query,query_helper)
    }

    export async function deleteCategory(id : string){
        let drop_table_query = "DROP TABLE IF EXISTS ? "
        let unregister_table_query = "DELETE FROM ? WHERE Id = ?"
        connection.run(drop_table_query , [id])
        connection.run(unregister_table_query , [configuration.categoryTableName , id])
    }

    export async function fetchCategory(){
        let select_category_quert = ""
        connection.get
    }
    
    export async function createProduct(name :string, image:string , price:number , size :string, description :string,categoryId:string,productsCount:number){
        let insert_product_query = "INSERT INTO ? (Id,Name,Description,ImageUrl,Size,Price) VALUES(?,?,?,?,?,?)"
        let update_category_query = "UPDATE ? SET ProductsCount = ? WHERE Id = ?"

        connection.run(insert_product_query,[categoryId , name,name,description,image,size,price])
        connection.run(update_category_query,[configuration.categoryTableName,productsCount+1,categoryId])

    }

    export async function deleteProduct(productId :string, categoryId:string){
        let drop_product_query = " DELETE FROM ? WHERE Id = ? "
        connection.run(drop_product_query , [categoryId , productId])

    }

    export async function updateProduct(productId :string, categoryId :string, attributes:any){
        let update_product_query = "UPDATE ? SET "
        let query_helper = [categoryId]

        const attributesLength = attributes.length

        for(let i = 0 ; i < attributesLength ; i++){
            if(i != attributesLength - 1){
                update_product_query +=  attributes[i].name +" = ? ,"
                query_helper.push(attributes[i].value)
            }
            else{
                update_product_query += attributes[i].name +" = ? WHERE Id = ? "
                query_helper.push(attributes[i].value)
                query_helper.push(productId)
            }
        }
        connection.run(update_product_query,query_helper)
    }



