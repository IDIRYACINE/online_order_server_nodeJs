
import express from 'express';
import App from './src/App';
import Subscriber from './src/Orders/SocketManager';
import http from 'http';

const PORT = process.env.PORT || 3001;
const nodeApp = express();
const server = http.createServer(nodeApp);

Subscriber.createInstance(server)


nodeApp.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


nodeApp.get("/db", (req, res) => {
  let app = new App(false);
  let ordersService = app.ordersService;

  res.json({ message: "Hello from !" });
});

nodeApp.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
