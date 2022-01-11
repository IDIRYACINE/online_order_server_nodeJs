
interface OrderStatus{
    id : string
    state : Status
}

enum Status{
    Received , Declined , Cooking , Delivering
}

export default OrderStatus