import Database from "better-sqlite3"
import { CustomersDatabaseConfig as configurations} from "../Config"
 
let connection : Database.Database

export async function setUpCustomerDatabase(){
    connection = new Database(configurations.databaseUrl + '/' +configurations.databaseName)

    const create_customers_table_query = `CREATE TABLE IF NOT EXISTS ${configurations.mainTable} (
    Id string PRIMARY KEY,
    PhoneNumber string ,
    Rating real DEFAULT 0,
    NegativeRating real DEFAULT 0,
    BanStatus bool DEFAULT true 
    )`

    const create_areas_table_query = `CREATE TABLE IF NOT EXISTS ${configurations.secondaryTable}(
    Id string PRIMARY KEY,
    Latitude real ,
    Longitude real ,
    Rating real DEFAULT 0,
    NegativeRating real DEFAULT 0,
    BanStatus bool DEFAULT true )`

    connection.prepare(create_customers_table_query).run()
    connection.prepare(create_areas_table_query).run()
}


export async function BanCustomer(customer : any){
    let update_customer_banStatus_query = "UPDATE" + configurations.secondaryTable
        + "Set BanStatus = " + customer.banStatus + " WHERE Id = " + customer.id

    connection.prepare(update_customer_banStatus_query).run()   
}

export async function RateCustomer(customer : any){
    let update_customer_banStatus_query = "UPDATE" + configurations.secondaryTable
    + `Set Rating = Rating + ${customer.rating}, NegativeRating = NegativeRating + ${customer.negativeRating} WHERE Id = ${customer.id}`
    connection.prepare(update_customer_banStatus_query).run()
}

export async function getCustomerStatus(customerId : string){
    let get_customer_infos = `SELECT ${GetValuesHelper("infos")} FROM ${configurations.mainTable} WHERE Id = '${customerId}'`
    return await connection.prepare(get_customer_infos).get()

}

export async function getPhoneNumber(customerId : string){
    let get_customer_phone = `SELECT PhoneNumber FROM ${configurations.mainTable} WHERE Id = ${customerId}`
    return await connection.prepare(get_customer_phone).get()
}

export async function registerPhoneNumber(customerId : string,newPhone : string){
    let update_phone_query = `UPDATE ${configurations.mainTable} WHERE Id = ${customerId} 
                            Set PhoneNumber = ${newPhone}`
    connection.prepare(update_phone_query).run()                            
}



function GetValuesHelper(type : string ){
    let result = ""
    const helper = (attributes : Array<string>)=>{
        const length = attributes.length

        for (let i = 0 ; i < length ; i++){
            if(i < length-1){
                result += attributes[i] + ","
            }
            else{
                result += attributes[i] 
            }
        }
    }
    if (type === "infos"){
        helper(configurations.mainTableAttrbs)
    }
    else{
       helper(configurations.secondaryTableAttrbs)
    }
    return result
}



