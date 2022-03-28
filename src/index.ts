
import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, fetchCategory, fetchProduct, updateCategory, updateProduct } from './Database/ProductsDatabase';
import cors from 'cors'
import {registerCustomerExtras, regsiterCustomer } from './Database/CustomersDatabase';
import App from './App';
import { decodeOrder, test } from './Orders/OrdersService';
import { SynchroniseDatabase } from './Storage/StorageService';

const PORT = process.env.PORT || 3001;
const nodeApp = express();

nodeApp.use(cors({
  origin :"*",
  allowedHeaders :["Content-Type", "X-Auth-key"],
  methods : ["GET","POST","PUT","PATCH","DELETE"]
}))

nodeApp.use(express.json())

const server = nodeApp.listen(PORT);
App(true,server)

nodeApp.post("/CreateCategory", (req, res) => {  
  createCategory(req.body.options)
  .then(()=>{
      res.json({msg:"Created Category"})
  })
  .catch(error=>{
    res.statusCode = 400
    res.json({error : error})
  })

});

nodeApp.get("/FetchCategory", (req, res) => {
  
  const fetchOptions = {startIndex:req.query.startIndex as string ,count:req.query.count as string}

  fetchCategory(fetchOptions)
  .then(result=>{
    res.json(result)
  })
  .catch(error=>{
    res.json({error : error})
  })
  
});


nodeApp.get("/DeleteCategory", (req, res) => {
  const deleteOptions = {categoryId : req.query.categoryId as string}
  deleteCategory(deleteOptions)
  .then(()=>{
    res.json({response:"Deleted Category"})
  })
  .catch((error)=>{
    res.statusCode = 400
    res.json({error:error.msg})
  })
});


nodeApp.post("/UpdateCategory", (req, res) => {
  updateCategory(req.body.options)
  .then(()=>{
    res.json({response:"Updated Category"})
  })
  .catch((e:Error) =>{
    console.log(e.stack)
    res.statusCode = 400
    res.json({error:e.message})
  })
  
});


nodeApp.post("/CreateProduct", (req, res) => {
  createProduct(req.body.options)
  .then(()=>{
    res.json({response:"Created Product"})
  })
  .catch(e=>{
    console.log(e.stack)
    res.json({error:e})
  })
});


nodeApp.get("/FetchProduct", (req, res) => {
  const fetchOptions = {startIndex:req.query.startIndex as string ,count:req.query.count as string,categoryId:req.query.categoryId as string}
  fetchProduct(fetchOptions)
  .then((result)=>{
    res.json(result)
  })
  .catch(e=>{
    res.statusCode = 400
    res.json({error:e})
  })
});


nodeApp.get("/DeleteProduct", (req, res) => {
  const deleteOptions = {categoryId : req.query.categoryId as string , productId: req.query.productId as string}
  deleteProduct(deleteOptions)
  .then(()=>{
    res.json({response:"Deleted Product"})
  })
  .catch(e=>{
    res.statusCode = 400
    res.json({error:e})
  })
});


nodeApp.post("/UpdateProduct", (req, res) => {
  updateProduct(JSON.parse(req.body.options))
  .then(()=>{
    res.json({response:"Updated Product"})
  })
  .catch(e=>{
    console.log(e.stack)
    res.json({error:e})
  })
});

nodeApp.post("/RegisterCustomer",(req,res)=>{
  
  console.log(req.body)
  regsiterCustomer(req.body.infos)
  .then(()=>{
    registerCustomerExtras(req.body.extras).then(()=>{
      res.send("Registered")
    })
  })
  .catch(e=>{
    console.log(e)
    res.statusCode = 400
    res.send(e)
  })
  
})

nodeApp.post("/RegisterCustomerExtras" , (req,res)=>{
  registerCustomerExtras(req.body.extras)
  .then(()=>{
    res.send("Registered")
  })
  .catch(e=>{
    res.statusCode = 400
    res.send(e)
  })
})

nodeApp.get("/GetCustomerExtras",(req,res)=>{
  decodeOrder(req.query.id as string)
  .then((extras)=>{
    res.json(extras)
  })
  .catch(e=>{
    res.statusCode = 400
    res.json(e)
  })
})


nodeApp.get("/SynchroniseDatabase",(req,res)=>{
  SynchroniseDatabase().then((value)=>{
    res.send("Database Synchronised")
  }).catch(e=>{
    res.statusCode = 400
    res.send("Synchronisation Failed")
  });
})

nodeApp.get("/test",(req,res)=>{
  console.log("test");
  test().then(
    (response)=>{
      res.json(response)
    }
  )
})