import Database from "better-sqlite3"


 
let configurations = {
    databaseName : "customers.db",
    databaseUrl : "./data",
    mainTable : "Customers",
    mainTableAttrbs : ["FullName","Email","PhoneNumber","BanStatus"],
    secondaryTable : "Extras",
    secondaryTableAttrbs : ["Rating","NegativeRating","Latitude","Longitude","Addresse"]
}

let connection : Database.Database


async function connect(){
    connection = new Database(configurations.databaseUrl + '/' +configurations.databaseName)

    const create_customers_table_query = "CREATE TABLE IF NOT EXISTS "+ configurations.mainTable +" (\n"
    + "	Id String PRIMARY KEY,"
    + "	FullName text NOT NULL,"
    + "	Email text NOT NULL,"
    + " PhoneNumber text NOT NULL,"
    + " BanStatus bool DEFAULT true "
    + ")"

    const create_customers_extraInfos_table_query = "CREATE TABLE IF NOT EXISTS "+ configurations.secondaryTable +" ("
    + "	Id String PRIMARY KEY,"
    + " Rating real DEFAULT 0,"
    + " NegativeRating real DEFAULT 0,"
    + " Latitude real ,"
    + " Longitude real ,"
    + " Address text ,"
    + ")"

    connection.prepare(create_customers_table_query).run()
    connection.prepare(create_customers_extraInfos_table_query).run()
}

async function RegsiterCustomer(customer : any){
    let register_customer_query = "INSERT INTO "+ configurations.mainTable
        +InsertValuesQueryHelper(customer , customer.length)

    connection.prepare(register_customer_query).run()
}

async function RegisterCustomerExtras(extras : any){
    let register_customer_extras_query = "INSERT INTO "+ configurations.secondaryTable
    + InsertValuesQueryHelper(extras,extras.length) 

    connection.prepare(register_customer_extras_query).run()
}

async function UpdateCustomer(customer : any){
    let update_customer_query = "UPDATE "+ configurations.mainTable
        +UpdateValuesQueryHelper(customer , customer.length)
        

    connection.prepare(update_customer_query).run()
}

async function UpdateCustomerExtras(extras : any){
    let update_customer_extras_query = "UPDATE "+ configurations.secondaryTable
    + UpdateValuesQueryHelper(extras,extras.length) 

    connection.prepare(update_customer_extras_query).run()
}

function InsertValuesQueryHelper (attributes : any,length : number){
    let attributesHelper = " ("
    let valuesHelper = "Values("

    for(let i = 0 ; i< length ; i++){
        if(i < length-1){
            valuesHelper += attributes[i].value + ","
            attributesHelper += attributes[i].name +","
        }
        else{
            valuesHelper += attributes[i].value  + ")"
            attributesHelper += attributes[i].name + ") "
        }
    }
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

async function GetCustomerInfos(customerId : String){
    let get_customer_infos = "SELECT "+ GetValuesHelper("infos")
        +" FROM "+configurations.mainTable+"WHERE Id = "+ customerId

    return await connection.prepare(get_customer_infos).get()

}

async function GetCustomerExtras(customerId : String){
    let get_customer_extras = "SELECT "+ GetValuesHelper("extras") 
        +" FROM "+configurations.secondaryTable+"WHERE Id = "+ customerId
    return connection.prepare(get_customer_extras).get()

}

function GetValuesHelper(type : String ){
    let result = "("
    const helper = (attributes : Array<string>)=>{
        for (let i = 0 ; i < attributes.length ; i++){
            if(i < length-1){
                result += attributes[i]
            }
            else{
                result += attributes[i] + ")"
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



