import admin from 'firebase-admin';
import http from 'http'
import {setUpFirebaseAuth} from './Authentication/AuthenticationService';
import { setUpCustomerDatabase } from './Database/CustomersDatabase';
import { setUpProductsDatabase } from './Database/ProductsDatabase';
import {setUpFirebaseDatabase} from './Orders/OrdersService';
import SocketManger from './Orders/SocketManager';
import StorageService from './Storage/StorageService';

function App(isTestMode:boolean , server:http.Server){   
        
        //doesn't work need to figure it out
        if (isTestMode){
                process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:4400';
        }

        admin.initializeApp({credential : admin.credential.cert('./servicesAccount.json'),
        databaseURL : "https://online-order-client-default-rtdb.europe-west1.firebasedatabase.app"
        ,storageBucket:"online-order-client.appspot.com"
})
        
        SocketManger(server)
        setUpFirebaseDatabase(admin.database());
        StorageService(admin.storage())
        setUpFirebaseAuth(admin.auth())
        setUpProductsDatabase()
        setUpCustomerDatabase()
       
  
}

export default App ;
