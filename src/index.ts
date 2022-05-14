
import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, fetchCategory, fetchProduct, updateCategory, updateProduct } from './Database/ProductsDatabase';
import cors from 'cors'
import App from './App';
import { SynchroniseDatabase } from './Storage/StorageService';
import { Api } from './Config';
import { BanCustomer, getPhoneNumber, RateCustomer, registerPhoneNumber } from './Database/CustomersDatabase';

const nodeApp = express();

nodeApp.use(cors({
  origin :"*",
  allowedHeaders :["Content-Type", "X-Auth-key"],
  methods : ["GET","POST","PUT","PATCH","DELETE"]
}))

nodeApp.use(express.json())

const server = nodeApp.listen(process.env.PORT || 3001);
App(false,server)

nodeApp.post(Api.createCategory, (req, res) => {  
  createCategory(req.body.options)
  .then(()=>{
      res.json({msg:"Created Category"})
  })
  .catch(error=>{
    res.statusCode = 400
    res.json({error : error})
  })

});

nodeApp.get(Api.fetchCategory, (req, res) => {
  
  const fetchOptions = {startIndex:req.query.startIndex as string ,count:req.query.count as string}

  fetchCategory(fetchOptions)
  .then(result=>{
    res.json(result)
  })
  .catch(error=>{
    res.json({error : error})
  })
  
});


nodeApp.get(Api.deleteCategory, (req, res) => {
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


nodeApp.post(Api.updateCategory, (req, res) => {
  updateCategory(req.body.options)
  .then(()=>{
    res.json({response:"Updated Category"})
  })
  .catch((e:Error) =>{
    res.statusCode = 400
    res.json({error:e.message})
  })
  
});


nodeApp.post(Api.createProduct, (req, res) => {
  createProduct(req.body.options)
  .then(()=>{
    res.json({response:"Created Product"})
  })
  .catch(e=>{
    res.json({error:e})
  })
});


nodeApp.get(Api.fetchProduct, (req, res) => {
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


nodeApp.get(Api.deleteProduct, (req, res) => {
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


nodeApp.post(Api.updateProduct, (req, res) => {
  updateProduct(JSON.parse(req.body.options))
  .then(()=>{
    res.json({response:"Updated Product"})
  })
  .catch(e=>{
    res.json({error:e})
  })
});


nodeApp.get(Api.synchroniseDatabase,(req,res)=>{
  SynchroniseDatabase().then((value)=>{
    res.send("Database Synchronised")
  }).catch(e=>{
    res.statusCode = 400
    res.send("Synchronisation Failed")
  });
})


nodeApp.post(Api.rateCustomer, (req, res) => {
  RateCustomer(JSON.parse(req.body.options))
  .then(()=>{
    res.json({response:"Rated Customer"})
  })
  .catch(e=>{
    res.json({error:e})
  })
});


nodeApp.post(Api.banCustomer, (req, res) => {
  BanCustomer(JSON.parse(req.body.options))
  .then(()=>{
    res.json({response:"Banned Customer"})
  })
  .catch(e=>{
    res.json({error:e})
  })
});



nodeApp.post(Api.updateCustomerPhone, (req, res) => {
  const options = req.body
  console.log(options)

  registerPhoneNumber(options.Id , options.PhoneNumber)
  .then(()=>{
    res.send("Updated")
  })
  .catch(e=>{
    res.json({error:e})
  })
});

nodeApp.get(Api.fetchCustomerPhone,(req,res)=>{
  const customerId = req.query.customerId as string
  getPhoneNumber(customerId).then((result)=>{
    console.log(result);
    res.json(result)
  }).catch(e=>{
    res.statusCode = 400
    res.send("Customer not Found")
  });
})


    
 
