export declare const ProductsDatabaseConfig: {
    databaseName: string;
    databaseUrl: string;
    categoryTableName: string;
};
export declare const CustomersDatabaseConfig: {
    databaseName: string;
    databaseUrl: string;
    mainTable: string;
    mainTableAttrbs: string[];
    secondaryTable: string;
    secondaryTableAttrbs: string[];
};
export declare const Emulator: {
    firestore: string;
    firestoreEnvKey: string;
    database: string;
    databaseEnvKey: string;
    auth: string;
    authEnvKey: string;
    storage: string;
    storageEnvKey: string;
};
export declare const Api: {
    createCategory: string;
    updateCategory: string;
    fetchCategory: string;
    deleteCategory: string;
    createProduct: string;
    updateProduct: string;
    fetchProduct: string;
    deleteProduct: string;
    synchroniseDatabase: string;
    banCustomer: string;
    rateCustomer: string;
    updateCustomerPhone: string;
    fetchCustomerPhone: string;
};
