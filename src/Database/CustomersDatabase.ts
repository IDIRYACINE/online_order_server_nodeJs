import Database from "better-sqlite3"

type Customer = {
    Id : string ,
    FullName : string,
    Email : string,
    PhoneNumber : string,
}
type CustomerExtras = {
    Id : string,
    Latitude : number,
    Longitude : number,
    Address : string
}
 
let configurations = {
    databaseName : "customers.db",
    databaseUrl : "./data",
    mainTable : "Customers",
    mainTableAttrbs : ["FullName","Email","PhoneNumber","BanStatus"],
    secondaryTable : "Extras",
    secondaryTableAttrbs : ["Rating","NegativeRating","Latitude","Longitude","Address"]
}

let connection : Database.Database


export async function setUpCustomerDatabase(){
    connection = new Database(configurations.databaseUrl + '/' +configurations.databaseName)

    const create_customers_table_query = "CREATE TABLE IF NOT EXISTS "+ configurations.mainTable +" (\n"
    + "	Id string PRIMARY KEY,\n"
    + "	FullName text NOT NULL,\n"
    + "	Email text NOT NULL,\n"
    + " PhoneNumber text NOT NULL,\n"
    + " BanStatus bool DEFAULT true \n"
    + ")"

    const create_customers_extraInfos_table_query = "CREATE TABLE IF NOT EXISTS "+ configurations.secondaryTable +" ("
    + "	Id string PRIMARY KEY,\n"
    + " Rating real DEFAULT 0,\n"
    + " NegativeRating real DEFAULT 0,\n"
    + " Latitude real ,\n"
    + " Longitude real ,\n"
    + " Address text \n"
    + ")"

    connection.prepare(create_customers_table_query).run()
    connection.prepare(create_customers_extraInfos_table_query).run()
}

export async function regsiterCustomer(customer : Customer){
    let register_customer_query = "INSERT INTO "+ configurations.mainTable
        +insertValuesQueryHelper(customer)
        console.log(register_customer_query)
    connection.prepare(register_customer_query).run()
}

export async function registerCustomerExtras(extras : CustomerExtras ){
    let register_customer_extras_query = "INSERT INTO "+ configurations.secondaryTable
    + insertValuesQueryHelper(extras) 

    connection.prepare(register_customer_extras_query).run()
}

export async function updateCustomer(customer : any){
    let update_customer_query = "UPDATE "+ configurations.mainTable
        +UpdateValuesQueryHelper(customer , customer.length)
        

    connection.prepare(update_customer_query).run()
}

export async function updateCustomerExtras(extras : any){
    let update_customer_extras_query = "UPDATE "+ configurations.secondaryTable
    + UpdateValuesQueryHelper(extras,extras.length) 

    connection.prepare(update_customer_extras_query).run()
}

function insertValuesQueryHelper (attributes : any){
    let attributesHelper = " ("
    let valuesHelper = "Values("

    const length = Object.keys(attributes).length
    let i = 0

    Object.entries(attributes).forEach(([key,value]) => {
        if(i < length-1){
            valuesHelper += "'" + value +"'" + ","
            attributesHelper += key +","
        }
        else{
            valuesHelper += "'" + value +"'"  + ")"
            attributesHelper += key + ") "
        }
        i++
    });

    return attributesHelper + valuesHelper
}

function UpdateValuesQueryHelper(attributes : any,length : number){
    let result = "Set "
    for(let i = 0 ; i< length ; i++){
        if(i < length-1){
            result += attributes[i].name + "=" +attributes[i].value + ","
        }
        else{
            result += attributes[i].name + "=" +attributes[i].value
            result += " WHERE Id = " + attributes.id 
        }
    }
    return result;
}


async function BanCustomer(customer : any){
    let update_customer_banStatus_query = "UPDATE" + configurations.secondaryTable
        + "Set BanStatus = " + customer.banStatus + " WHERE Id = " + customer.id

    connection.prepare(update_customer_banStatus_query).run()   
}

async function RateCustomer(customer : any){
    let update_customer_banStatus_query = "UPDATE" + configurations.secondaryTable
    + "Set Rating = Rating + ${customer.rating}, NegativeRating = NegativeRating + ${customer.negativeRating} WHERE Id = ${customer.id}"
    connection.prepare(update_customer_banStatus_query).run()
}

export async function getCustomerInfos(customerId : string){
    let get_customer_infos = `SELECT ${GetValuesHelper("infos")} FROM ${configurations.mainTable} WHERE Id = '${customerId}'`
    return await connection.prepare(get_customer_infos).get()

}

export async function getCustomerExtras(customerId : string){
    let get_customer_extras = `SELECT ${GetValuesHelper("extras")} FROM ${configurations.secondaryTable} WHERE Id ='${customerId}'`
    return connection.prepare(get_customer_extras).get()

}

export async function getCustomerData(customerId : string){
    const infos = getCustomerInfos(customerId)
    const extras = getCustomerExtras(customerId)
    return {
        infos : infos,
        extras : extras
    }
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



