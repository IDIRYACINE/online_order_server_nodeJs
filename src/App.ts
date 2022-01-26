import admin from 'firebase-admin';
import * as fs from 'fs';
import {setUpFirebaseAuth} from './Authentication/AuthenticationService';
import { setUpProductsDataabase } from './Database/ProductsDatabase';
import {setUpFirebaseDatabase} from './Orders/OrdersService';
import SocketManger from './Orders/SocketManager';
import StorageService from './Storage/StorageService';

function App(isTestMode:boolean){   
        if(isTestMode){

        }
        else{
            admin.initializeApp({credential : admin.credential.cert('./servicesAccount.json'),
            databaseURL : "https://online-order-client-default-rtdb.europe-west1.firebasedatabase.app"});
        }
        
        setUpFirebaseDatabase(admin.database());
        StorageService(admin.storage())
        setUpFirebaseAuth(admin.auth())
        setUpProductsDataabase()
  
}

export default App ;
