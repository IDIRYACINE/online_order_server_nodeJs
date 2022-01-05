import admin from 'firebase-admin';
import * as fs from 'fs';
import OrdersService from './Orders/OrdersService.js';

class App{
    #authenticationService;
    #ordersService;
    #storageService;

    constructor(isTestMode){
        if(isTestMode){

        }
        else{
            admin.initializeApp({credential : admin.credential.cert('./servicesAccount.json'),
            databaseURL : "https://online-order-client-default-rtdb.europe-west1.firebasedatabase.app"});
        }
        this.#ordersService = new OrdersService(admin.database());
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

export {App as default};
