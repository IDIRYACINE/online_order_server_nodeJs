import sqlite3 from 'sqlite3'
import {open ,Database} from 'sqlite'

class ProductsDatabase {
    #connection;

    #configuration = {
        databaseName : "products.db",
        databaseUrl : "./data",
        categoryTableName : "Categories",
    }

    async connect(){
        this.connection = await open({
            filename: this.#configuration.databaseUrl + '/' +this.#configuration.databaseName,
            driver: sqlite3.Database
        })

        const create_categories_holder_query = "CREATE TABLE IF NOT EXISTS "+ this.#configuration.categoryTableName +" (\n"
        + "	Id String PRIMARY KEY,\n"
        + "	Name text NOT NULL,\n"
        + "	ImageUrl text NOT NULL,\n"
        + " ProductsCount Integer "
        + ")"

        this.#connection.exec(create_categories_holder_query)
    }

    async createCategory(name,image){
        let create_category_table_query = "CREATE TABLE IF NOT EXISTS "+ name +" (\n"
        + "	Id String PRIMARY KEY,\n"
        + "	Name text NOT NULL,\n"
        + "	ImageUrl text NOT NULL\n"
        + "	Description text NOT NULL,\n"
        + "	Price text NOT NULL,\n"
        + "	Size text NOT NULL\n"
        + ")"

        let register_category_query = "INSERT INTO "+this.#configuration.categoryTableName+"(Id,Name,ImageUrl,ProductsCount) VALUES(?,?,?,?)"
        
        this.#connection.exec(create_category_table_query)
        this.#connection.run(register_category_query,[name,name,image,0])
        
    }

    async updateCategory(id ,attributes){
        let update_product_query = "UPDATE ? SET "
        let query_helper = [this.#configuration.categoryTableName]

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

        this.#connection.run(update_product_query,query_helper)
    }

    async removeCategory(id){
        let drop_table_query = "DROP TABLE IF EXISTS ? "
        let unregister_table_query = "DELETE FROM ? WHERE Id = ?"
        this.#connection.run(drop_table_query , [id])
        this.#connection.run(unregister_table_query , [this.#configuration.categoryTableName , id])
    }
    
    async createProduct(name , image , price , size , description ,categoryId,productsCount){
        let insert_product_query = "INSERT INTO ? (Id,Name,Description,ImageUrl,Size,Price) VALUES(?,?,?,?,?,?)"
        let update_category_query = "UPDATE ? SET ProductsCount = ? WHERE Id = ?"

        this.#connection.run(insert_product_query,[categoryId , name,name,description,image,size,price])
        this.#connection.run(update_category_query,[this.#configuration.categoryTableName,productsCount+1,categoryId])

    }

    async removeProduct(productId , categoryId){
        let drop_product_query = " DELETE FROM ? WHERE Id = ? "
        this.#connection.run(drop_product_query , [categoryId , productId])

    }

    async updateProduct(productId , categoryId , attributes){
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
        this.#connection.run(update_product_query,query_helper)
    }

}

export {ProductsDatabase as default }
