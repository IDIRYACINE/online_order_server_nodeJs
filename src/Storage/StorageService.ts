import {Storage } from "firebase-admin/lib/storage/storage";
import { ProductsDatabaseConfig } from "../Config"

let cloudStorage : Storage;


export async function UploadFile(file : any){
       
}

export async function DonwloadFile(downloadUrl : string){
       
}


export async function SynchroniseDatabase(){
    cloudStorage.bucket().upload(ProductsDatabaseConfig.databaseUrl+'/'+ProductsDatabaseConfig.databaseName)
}

export default function StorageService(storage : Storage){
    cloudStorage = storage
}
