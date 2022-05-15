
    export const ProductsDatabaseConfig = {
        databaseName : "Products.db",
        databaseUrl : "./data",
        categoryTableName : "Categories",
    }

    export const CustomersDatabaseConfig = {
        databaseName : "Customers.db",
        databaseUrl : "./data",
        mainTable : "Customers",
        mainTableAttrbs : ["PhoneNumber","BanStatus"],
        secondaryTable : "Extras",
        secondaryTableAttrbs : ["Rating","NegativeRating","Latitude","Longitude"]
    }

    export const Emulator = {
        firestore: "192.168.1.8:8080" ,
        firestoreEnvKey :"FIRESTORE_EMULATOR_HOST",
        database:"192.168.1.8:9000",
        databaseEnvKey :"FIREBASE_DATABASE_EMULATOR_HOST",
        auth:"192.168.1.8:9099",
        authEnvKey :"FIREBASE_AUTH_EMULATOR_HOST",
        storage : "192.168.1.8:9199",
        storageEnvKey :"FIREBASE_STORAGE_EMULATOR_HOST"
    }

    export const Api = {
        createCategory : "/CreateCategory",
        updateCategory : "/UpdateCategory",
        fetchCategory : "/FetchCategory",
        deleteCategory : "/DeleteCategory",
        createProduct : "/CreateProduct",
        updateProduct : "/UpdateProduct",
        fetchProduct : "/FetchProduct",
        deleteProduct : "/DeleteProduct",
        synchroniseDatabase : "/SynchroniseDatabase",
        banCustomer : "/BanCustomer",
        rateCustomer : "/RateCustomer",
        updateCustomerPhone : "/UpdateCustomerPhone",
        fetchCustomerPhone : '/FetchCustomerPhone',
        updateOrderStatus : '/UpdateOrderStatus',
        
    }