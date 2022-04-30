
import { Database } from 'firebase-admin/lib/database/database';
import {  getCustomerStatus } from '../Database/CustomersDatabase';
import {broadCastMessage} from './SocketManager';
import OrderStatus from './Types';

let firebaseRealTime : Database


async function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        if(snapshot.key !== null){
            const orderSnapshot = snapshot.val()
        
        getCustomerStatus(snapshot.key)
        .then(infos=>{
            if(infos !== undefined){
                broadCastMessage("newOrder",{
                    id :snapshot.key,
                    customerName : orderSnapshot.FullName,
                    phoneNumber : orderSnapshot.PhoneNumber,
                    email : orderSnapshot.Email,
                    banStatus : infos.BanStatus,
                    items : orderSnapshot.items
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

    ordersRef.once("value",(snapshot) =>{
        if(snapshot.exists()){
            childrenCount = snapshot.numChildren()
            snapshot.forEach((childSnapshot) => {
                id = childSnapshot.key
                getCustomerStatus(id).then(infos => {
                    result['id'] = id
                    result = {...result, ...childSnapshot.val() }
                        Orders[id] = result
                        currentCount++
                        result = {}
                        if(currentCount > childrenCount){
                            callback(Orders)
                        }
                })
            })
        }
    })
                
}


export function updateOrderStatus(status : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(status.id).set(status.state)
}

export async function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    firebaseRealTime.ref()
    listenToOrdersOnFirebase()
}



