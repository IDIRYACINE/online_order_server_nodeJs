
    export const ProductsDatabaseConfig = {
        databaseName : "Products.db",
        databaseUrl : "./data",
        categoryTableName : "Categories",
    }

    export const CustomersDatabaseConfig = {
        databaseName : "Customers.db",
        databaseUrl : "./data",
        mainTable : "Customers",
        mainTableAttrbs : ["FullName","Email","PhoneNumber","BanStatus"],
        secondaryTable : "Extras",
        secondaryTableAttrbs : ["Rating","NegativeRating","Latitude","Longitude","Address"]
    }
