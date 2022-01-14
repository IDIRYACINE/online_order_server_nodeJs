
import express from 'express';
import App from './App';
import auth from './Orders/SocketManager';
import SocketManager from './Orders/SocketManager';

const PORT = process.env.PORT || 3001;
const nodeApp = express();
const server = nodeApp.listen(PORT);
//const app = new App(false);
const io = new SocketManager(server)


nodeApp.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

nodeApp.get("/admin/connect", (req, res) => {  
  res.json({ message: "Hello from server!" });
});

nodeApp.get("/db", (req, res) => {

  res.json({ message: "Hello from !" });
});
