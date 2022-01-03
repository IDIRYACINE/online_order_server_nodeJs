import { initializeApp } from 'firebase/app';
import {fs} from 'fs';

class App{
    #app;
    #authenticationService;
    #ordersService;
    #storageService;

    constructor(isTestMode){
        if(isTestMode){

        }
        else{
            const firebaseConfig = JSON.parse(fs.readFileSync("googleServices.json"));
            this.#app = initializeApp(firebaseConfig);
        }
    }
  
    get authenticationService(){
        return this.#authenticationService;
    }

    get ordersService(){
        return this.#ordersService;
    }

    get storageService(){
        return this.#storageService;
    }  
    
}

export {App as default };
