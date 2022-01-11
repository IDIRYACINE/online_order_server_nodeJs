
import express from 'express';
import App from './src/App.js';
import Subscriber from './src/Orders/Subscriber.ts'
const http = require('http');
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

Subscriber.createInstance(server)


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get("/db", (req, res) => {
  let app = new App(false);
  let ordersService = app.ordersService;

  ordersService.subscribeToNewOrders();

  res.json({ message: "Hello from !" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
