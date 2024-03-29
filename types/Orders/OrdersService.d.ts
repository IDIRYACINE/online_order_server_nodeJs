import { Database } from 'firebase-admin/lib/database/database';
import admin from 'firebase-admin';
import OrderStatus from './Types';

export declare function onFirstConnectionOrders(callback: (orders: any) => void): Promise<void>;
export declare function updateOrderStatus(status: OrderStatus): void;
export declare function setUpFirebaseDatabase(database: Database): Promise<void>;


