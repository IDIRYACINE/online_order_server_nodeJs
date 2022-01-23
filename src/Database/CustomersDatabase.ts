import sqlite3 from 'sqlite3'
import {open ,Database} from 'sqlite'
import AttributeHolder from './Repository/AttributeHolder'

class CustomersDatabase{
    
    #configurations = {
        databaseName : "customers.db",
        databaseUrl : "./data",
        mainTable : "Customers",
        mainTableAttrbs : ["FullName","Email","PhoneNumber","BanStatus"],
        secondaryTable : "Extras",
        secondaryTableAttrbs : ["Rating","NegativeRating","Latitude","Longitude","Addresse"]
    }
    
    #connection : Database

   
    async connect(){
        this.#connection = await open({
            filename: this.#configurations.databaseUrl + '/' +this.#configurations.databaseName,
            driver: sqlite3.Database
        })

        const create_customers_table_query = "CREATE TABLE IF NOT EXISTS "+ this.#configurations.mainTable +" (\n"
        + "	Id String PRIMARY KEY,"
        + "	FullName text NOT NULL,"
        + "	Email text NOT NULL,"
        + " PhoneNumber text NOT NULL,"
        + " BanStatus bool DEFAULT true "
        + ")"

        const create_customers_extraInfos_table_query = "CREATE TABLE IF NOT EXISTS "+ this.#configurations.secondaryTable +" ("
        + "	Id String PRIMARY KEY,"
        + " Rating real DEFAULT 0,"
        + " NegativeRating real DEFAULT 0,"
        + " Latitude real ,"
        + " Longitude real ,"
        + " Address text ,"
        + ")"

        this.#connection.exec(create_customers_table_query)
        this.#connection.exec(create_customers_extraInfos_table_query)
    }

    async RegsiterCustomer(customer : any){
        let register_customer_query = "INSERT INTO "+ this.#configurations.mainTable
            +this.#InsertValuesQueryHelper(customer , customer.length)

        this.#connection.exec(register_customer_query)
    }

    async RegisterCustomerExtras(extras : any){
        let register_customer_extras_query = "INSERT INTO "+ this.#configurations.secondaryTable
        + this.#InsertValuesQueryHelper(extras,extras.length) 

        this.#connection.exec(register_customer_extras_query)
    }

    async UpdateCustomer(customer : any){
        let update_customer_query = "UPDATE "+ this.#configurations.mainTable
            +this.#UpdateValuesQueryHelper(customer , customer.length)
            

        this.#connection.exec(update_customer_query)
    }

    async UpdateCustomerExtras(extras : any){
        let update_customer_extras_query = "UPDATE "+ this.#configurations.secondaryTable
        + this.#UpdateValuesQueryHelper(extras,extras.length) 

        this.#connection.exec(update_customer_extras_query)
    }

    #InsertValuesQueryHelper (attributes : any,length : number){
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

    #UpdateValuesQueryHelper(attributes : any,length : number){
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


    async BanCustomer(customer : any){
        let update_customer_banStatus_query = "UPDATE" + this.#configurations.secondaryTable
            + "Set BanStatus = " + customer.banStatus + " WHERE Id = " + customer.id

        this.#connection.exec(update_customer_banStatus_query)    
    }

    async RateCustomer(customer : any){
        let update_customer_banStatus_query = "UPDATE" + this.#configurations.secondaryTable
        + "Set Rating = Rating + ${customer.rating}, NegativeRating = NegativeRating + ${customer.negativeRating} WHERE Id = ${customer.id}"
        this.#connection.exec(update_customer_banStatus_query)    
    }

    async GetCustomerInfos(customerId : String){
        let get_customer_infos = "SELECT "+ this.#GetValuesHelper("infos")
            +" FROM "+this.#configurations.mainTable+"WHERE Id = "+ customerId

        return await this.#connection.run(get_customer_infos)

    }

    async GetCustomerExtras(customerId : String){
        let get_customer_extras = "SELECT "+ this.#GetValuesHelper("extras") 
            +" FROM "+this.#configurations.secondaryTable+"WHERE Id = "+ customerId
        return await this.#connection.run(get_customer_extras)

    }

    #GetValuesHelper(type : String ){
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
            helper(this.#configurations.mainTableAttrbs)
        }
        else{
           helper(this.#configurations.secondaryTableAttrbs)
        }
        return result
    }

}

export default CustomersDatabase