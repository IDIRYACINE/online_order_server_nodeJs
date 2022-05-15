interface OrderStatus {
    id: string;
    state: Status;
}
declare enum Status {
    Received = 0,
    Declined = 1,
    Cooking = 2,
    Delivering = 3
}


export default OrderStatus;
