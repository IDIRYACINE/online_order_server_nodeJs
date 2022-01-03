
import express from 'express';
import ProductsDatabase from './src/Database/ProductsDatabase.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get("/db", (req, res) => {
  let db = new ProductsDatabase();
  
  res.json({ message: "Hello from !" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
