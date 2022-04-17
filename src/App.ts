import admin from 'firebase-admin';
import http from 'http'
import {setUpFirebaseAuth} from './Authentication/AuthenticationService';
import { setUpCustomerDatabase } from './Database/CustomersDatabase';
import { setUpProductsDatabase } from './Database/ProductsDatabase';
import {setUpFirebaseDatabase} from './Orders/OrdersService';
import SocketManger from './Orders/SocketManager';
import StorageService from './Storage/StorageService';
import {Emulator} from './Config'

function App(isTestMode:boolean , server:http.Server){   

        if (isTestMode){
                process.env[Emulator.authEnvKey] = Emulator.auth
                process.env[Emulator.databaseEnvKey] = Emulator.database
                process.env[Emulator.storageEnvKey] = Emulator.storage
                process.env[Emulator.firestoreEnvKey] = Emulator.firestore
        }

        admin.initializeApp({credential : admin.credential.cert('./servicesAccount.json'),
        databaseURL : "https://online-order-client-default-rtdb.europe-west1.firebasedatabase.app"
        ,storageBucket:"online-order-client.appspot.com"
})
        
        SocketManger(server)
        setUpFirebaseDatabase(admin.database());
        StorageService(admin.storage(),admin.database())
        setUpFirebaseAuth(admin.auth())
        setUpProductsDatabase()
        setUpCustomerDatabase()
       
  
}

export default App ;
