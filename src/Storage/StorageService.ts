import { Database } from "firebase-admin/lib/database/database";
import {Storage } from "firebase-admin/lib/storage/storage";
import { ProductsDatabaseConfig } from "../Config"

let cloudStorage : Storage
let realTimeDatabase : Database

export async function UploadFile(file : any){
       
}

export async function DonwloadFile(downloadUrl : string){
       
}


export async function SynchroniseDatabase(){
    cloudStorage.bucket().upload(ProductsDatabaseConfig.databaseUrl+'/'+ProductsDatabaseConfig.databaseName).then(()=>{
        realTimeDatabase.ref('version').get().then((version)=>{
            realTimeDatabase.ref('version').set(version.val() + 1 )
        })
    })
}

export default function StorageService(storage : Storage , database: Database){
    cloudStorage = storage
    realTimeDatabase = database
}
