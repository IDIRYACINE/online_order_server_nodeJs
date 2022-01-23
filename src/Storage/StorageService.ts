import {Storage } from "firebase-admin/lib/storage/storage";

let cloudStorage : Storage;


export async function UploadFile(file : any){
       
}

export async function DonwloadFile(downloadUrl : string){
       
}


export default function StorageService(storage : Storage){
    cloudStorage = storage
}