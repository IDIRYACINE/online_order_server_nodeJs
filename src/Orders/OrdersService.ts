
import { Database } from 'firebase-admin/lib/database/database';
import { getCustomerExtras, getCustomerInfos } from '../Database/CustomersDatabase';
import {broadCastMessage} from './SocketManager';
import OrderStatus from './Types';

let firebaseRealTime : Database


async function listenToOrdersOnFirebase(){
    const ordersRef =  firebaseRealTime.ref("Orders")
    ordersRef.on("child_added" ,(snapshot) => {
        if(snapshot.key !== null){
            const orderSnapshot = snapshot.val()
        
        getCustomerInfos(snapshot.key)
        .then(infos=>{
            if(infos !== undefined){
                broadCastMessage("newOrder",{
                    id :snapshot.key,
                    customerName : infos.FullName,
                    phoneNumber : infos.PhoneNumber,
                    email : infos.Email,
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
    let Orders : any  = []
    
    let id :any;
    let result : any = {}
    let childrenCount : number
    let currentCount = 1

    ordersRef.once("value",(snapshot) =>{
        if(snapshot.exists()){
            childrenCount = snapshot.numChildren()
            snapshot.forEach((childSnapshot) => {
                id = childSnapshot.key
                getCustomerInfos(id).then(infos => {
                    result['id'] = id
                    result = {...result, ...infos }
                    getCustomerExtras(id).then(extras => {
                        result = {...result, ...extras }
                        result = {...result, ...childSnapshot.val() }
                        Orders.push(result)
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


export function updateOrderStatus(status : OrderStatus){
    const statusRef = firebaseRealTime.ref("OrdersStatus")
    statusRef.child(status.id).set(status.state)
}

export async function setUpFirebaseDatabase(database :Database) {
    firebaseRealTime = database
    firebaseRealTime.ref()
    listenToOrdersOnFirebase()
}



export async function decodeOrder(customerId:string ){
    return Promise.resolve(
        getCustomerExtras(customerId)
        .then((customerExtras)=>{
            return {
                address: customerExtras.Address,
                rating : customerExtras.Rating,
                negativeRating : customerExtras.NegativeRating,
                latitude : customerExtras.Latitude,
                longitude : customerExtras.Longitude
                
            }
        }
    ))
}


