
import express from 'express';
import { createCategory, createProduct, deleteCategory, deleteProduct, fetchCategory, setUpProductsDataabase, updateCategory, updateProduct } from './Database/ProductsDatabase';
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


nodeApp.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

nodeApp.post("/CreateCategory", (req, res) => {  
  
  createCategory(req.body.category)
  .then(()=>{
      res.json({msg:"Created Category"})
  })
  .catch(error=>{
    res.statusCode = 400
    res.json({error : error})
  })

});

nodeApp.get("/FetchCategory", (req, res) => {
  fetchCategory(req.body.product)
 
});


nodeApp.get("/DeleteCategory", (req, res) => {
  deleteCategory()
});


nodeApp.post("/UpdateCategory", (req, res) => {
  updateCategory()
});


nodeApp.get("/CreateProduct", (req, res) => {
  createProduct()
});


nodeApp.get("/FetchProduct", (req, res) => {
  fetchProduct()
});


nodeApp.get("/DeleteProduct", (req, res) => {
  deleteProduct()
});


nodeApp.get("/UpdateProduct", (req, res) => {
  updateProduct()
});