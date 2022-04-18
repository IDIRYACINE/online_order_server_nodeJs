import { Database } from 'firebase-admin/lib/database/database';
import OrderStatus from './Types';
export declare function onFirstConnectionOrders(callback: (orders: any) => void): Promise<void>;
export declare function updateOrderStatus(status: OrderStatus): void;
export declare function setUpFirebaseDatabase(database: Database): Promise<void>;
export declare function decodeOrder(customerId: string): Promise<{
    address: any;
    rating: any;
    negativeRating: any;
    latitude: any;
    longitude: any;
}>;
