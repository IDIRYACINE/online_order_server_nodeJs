declare type Customer = {
    Id: string;
    FullName: string;
    Email: string;
    PhoneNumber: string;
};
declare type CustomerExtras = {
    Id: string;
    Latitude: number;
    Longitude: number;
    Address: string;
};
export declare function setUpCustomerDatabase(): Promise<void>;
export declare function regsiterCustomer(customer: Customer): Promise<void>;
export declare function registerCustomerExtras(extras: CustomerExtras): Promise<void>;
export declare function updateCustomer(customer: any): Promise<void>;
export declare function updateCustomerExtras(extras: any): Promise<void>;
export declare function getCustomerInfos(customerId: string): Promise<any>;
export declare function getCustomerExtras(customerId: string): Promise<any>;
export declare function getCustomerData(customerId: string): Promise<{
    infos: Promise<any>;
    extras: Promise<any>;
}>;
export {};
