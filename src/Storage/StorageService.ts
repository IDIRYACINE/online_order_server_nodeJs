import {Storage } from "firebase-admin/lib/storage/storage";

class StorageService{
    #cloudStorage : Storage;

    constructor(storage : Storage){
        this.#cloudStorage = storage ;
    }

    async UploadFile(file : any){
       
    }

    async DonwloadFile(downloadUrl : string){
       
    }
}

export default StorageService