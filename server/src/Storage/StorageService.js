import { getStorage,ref,getDownloadURL,uploadBytes} from "firebase/storage";

class StorageService{
    #cloudStorage;

    constructor(firebaseApp){
        this.#cloudStorage = getStorage(firebaseApp) ;
    }

    async UploadFile(file){
        const storageRef = ref(storage, 'some-child');
        uploadBytes(storageRef, file)
    }

    async DonwloadFile(downloadUrl){
        const file = ref(this.#cloudStorage , downloadUrl)
        getDownloadURL(file).then((url) => {
           return url
          })
          .catch((error) => {
            return error
          });
    }
}

export {StorageService as default}