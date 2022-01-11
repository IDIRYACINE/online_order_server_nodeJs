import { getStorage,ref,getDownloadURL,uploadBytes, FirebaseStorage} from "firebase/storage";

class StorageService{
    #cloudStorage : FirebaseStorage;

    constructor(firebaseApp){
        this.#cloudStorage = getStorage(firebaseApp) ;
    }

    async UploadFile(file : any){
        const storageRef = ref(this.#cloudStorage);
        uploadBytes(storageRef, file)
    }

    async DonwloadFile(downloadUrl : string){
        const file = ref(this.#cloudStorage , downloadUrl)
        getDownloadURL(file).then((url) => {
           return url
          })
          .catch((error) => {
            return error
          });
    }
}

export default StorageService