import admin from 'firebase-admin';
import * as fs from 'fs';
import AuthenticationService from './Authentication/AuthenticationService';
import OrdersService from './Orders/OrdersService';
import SocketManager from './Orders/SocketManager';
import StorageService from './Storage/StorageService';

class App{
    #authenticationService : AuthenticationService;
    #ordersService : OrdersService; 
    #storageService : StorageService;

    constructor(isTestMode : boolean){
        if(isTestMode){

        }
        else{
            admin.initializeApp({credential : admin.credential.cert('./servicesAccount.json'),
            databaseURL : "https://online-order-client-default-rtdb.europe-west1.firebasedatabase.app"});
        }
        this.#ordersService = new OrdersService(admin.database());
        this.#storageService = new StorageService(admin.storage())
        this.#authenticationService = new AuthenticationService(admin.auth())
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

export default App ;
