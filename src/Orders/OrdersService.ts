
import { Database } from 'firebase-admin/lib/database/database';
import {  getCustomerStatus } from '../Database/CustomersDatabase';
import {broadCastMessage} from './SocketManager';
import OrderStatus, { Order } from './Types';

let firebaseRealTime : Database


async function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        if(snapshot.key !== null){
            const orderSnapshot = snapshot.val()
        
        getCustomerStatus(snapshot.key)
        .then(infos=>{
            if(infos !== undefined){
                orderFormater(snapshot.key! , orderSnapshot,infos , (order:Order)=>{
                    broadCastMessage("newOrder",order)
                })
               
            }
            
        })
        }
    })
}


export async function onFirstConnectionOrders(callback:(orders:any)=>void) {
    const ordersRef =  firebaseRealTime.ref("Orders")
    let Orders : any  = {}
    
    let id :any;
    let result : any = {}
    let childrenCount : number
    let currentCount = 1
    let value :any;

    ordersRef.once("value",(snapshot) =>{
        if(snapshot.exists()){
            childrenCount = snapshot.numChildren()
            snapshot.forEach((childSnapshot) => {
                id = childSnapshot.key
                value = childSnapshot.val()
                getCustomerStatus(id).then(infos => {
                    result['id'] = id
                    orderFormater(id,value,infos,(order:Order)=>{
                        result = {...result, ...order}
                        Orders[id] = result
                        currentCount++
                        result = {}
                        if(currentCount > childrenCount){
                            callback(Orders)
                        }
                    })                  
                })
            })
        }
    })
                
}

async function orderFormater(key : string ,orderSnapshot : any , infos:any , onSuccess:(order:Order)=>void ) {
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(key).once("value", (statusSnapshot) => {
        onSuccess( {
            id :key,
            customerName : orderSnapshot.fullName,
            phoneNumber : orderSnapshot.phoneNumber,
            email : orderSnapshot.email,
            banStatus : false,
            state : statusSnapshot.val().status,
            latitude : orderSnapshot.latitude,
            longitude : orderSnapshot.longitude,
            address : orderSnapshot.address,
            items : orderSnapshot.items,
            time: orderSnapshot.time,
        })
    })
    

    
}

export async function updateOrderStatus(status : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(status.id).set(status.state)
}

export async function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    firebaseRealTime.ref()
    listenToOrdersOnFirebase()
}

