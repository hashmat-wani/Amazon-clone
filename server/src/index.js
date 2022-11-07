import express from "express";
import dotenv from "dotenv";
import dBconn from "./configs/db.js";
import Product from "./models/product.model.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  // console.log("get request");
  // res.send("hello world");
  Product.find().then((data) => res.send(data));
});

app.post("/addproduct", (req, res) => {
  console.log(req.body);
  Product.create(req.body)
    .then((pro) => res.send(pro))
    .catch((err) => console.log(err.message));
});
dBconn(process.env.DB_URI);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
