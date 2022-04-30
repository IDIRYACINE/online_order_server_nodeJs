export declare function setUpCustomerDatabase(): Promise<void>;
export declare function BanCustomer(customer: any): Promise<void>;
export declare function RateCustomer(customer: any): Promise<void>;
export declare function getCustomerStatus(customerId: string): Promise<any>;
export declare function getPhoneNumber(customerId: string): Promise<any>;
export declare function registerPhoneNumber(customerId: string, newPhone: string): Promise<void>;
