
import admin from 'firebase-admin';

class OrdersService{
    #firebaseRealTime;
    #subscribers = [];

    constructor(database){
        this.#firebaseRealTime = database;
        this.#listenToOrdersOnFirebase();
    }

    #listenToOrdersOnFirebase(){
       
        const ordersRef =  this.#firebaseRealTime.ref("Orders");

        ordersRef.on("value" ,(snapshot) => {
            console.log(snapshot.val());
        })

        this.#firebaseRealTime.ref("version").get().then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            }});
           
    
    }

    subscribeToNewOrders(subscriber){
        this.#subscribers.push(subscriber);
    }

}

export { OrdersService as default}