
import admin from 'firebase-admin';
import { Database } from 'firebase-admin/lib/database/database';

class OrdersService{
    #firebaseRealTime : Database;
    #subscribers = [];

    constructor(database){
        this.#firebaseRealTime = database;
        this.#ListenToOrdersOnFirebase();
    }

    #ListenToOrdersOnFirebase(){
        const ordersRef =  this.#firebaseRealTime.ref("Orders")

        ordersRef.on("child_added" ,(snapshot) => {
            this.#subscribers.forEach(subscriber =>{
                subscriber.NewOrder(snapshot.val())
            })
        })
    
    }

    SubscribeToNewOrders(subscriber){
        this.#subscribers.push(subscriber);
    }

    UpdateOrderStatus(status){
        const statusRef = this.#firebaseRealTime.ref("OrdersStatus")
        statusRef.child(status.orderId).set(status.value)
    }

}

export default OrdersService 