
import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, fetchCategory, fetchProduct, setUpProductsDataabase, updateCategory, updateProduct } from './Database/ProductsDatabase';
import SocketManager from './Orders/SocketManager';
import cors from 'cors'

const PORT = process.env.PORT || 3001;
const nodeApp = express();

nodeApp.use(cors({
  origin :"*",
  allowedHeaders :["Content-Type", "X-Auth-key"],
  methods : ["GET","POST","PUT","PATCH","DELETE"]
}))

nodeApp.use(express.json())

const server = nodeApp.listen(PORT);
SocketManager(server)
setUpProductsDataabase()

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
    res.json({error:e})
  })
});


nodeApp.get("/FetchProduct", (req, res) => {
  const fetchOptions = {startIndex:req.query.startIndex as string ,count:req.query.count as string}
  fetchProduct(fetchOptions)
  .then((result)=>{
    res.json({response:result})
  })
  .catch(e=>{
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
    res.json({error:e})
  })
});


nodeApp.post("/UpdateProduct", (req, res) => {
  updateProduct(req.body.options)
  .then(()=>{
    res.json({response:"Updated Product"})
  })
  .catch(e=>{
    res.json({error:e})
  })
});