import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class ProductsDatabase {
    
    constructor(){
    }

    async connect(){

        let db = await open({
            filename: '/tmp/database.db',
            driver: sqlite3.Database
          }).then(()=>{console.log("done");},await createDatabase());

        let createDatabase = async ()=>{
            
        }
        
    }


}

export {ProductsDatabase as default };
