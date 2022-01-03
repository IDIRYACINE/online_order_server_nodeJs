import { getStorage } from "firebase/storage";

class StorageService{
    #cloudStorage;
    
    constructor(firebaseApp){
        this.#cloudStorage = getStorage(firebaseApp) ;
    }
}

export {StorageService as default}