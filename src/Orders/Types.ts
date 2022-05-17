
interface OrderStatus{
    id : string
    status : Status
}

enum Status{
    Received , Declined , Cooking , Delivering
}

export interface Order {
    id :string,
    customerName : string,
    phoneNumber : string,
    email : string,
    banStatus : boolean,
    latitude : number,
    state : Status,
    longitude : number,
    address : string,
    time:number,
    items : Array<any>
}

export default OrderStatus