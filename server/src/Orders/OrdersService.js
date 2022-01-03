
class OrdersService{
    #firebaseRealTime;
    
    constructor(firebaseApp){
        this.#firebaseRealTime = getDatabase(firebaseApp);
    }
}

export { OrdersService as default}