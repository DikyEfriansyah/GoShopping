import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import indexRoute from "./app/route/indexRoute.js";
import addToCart from "./app/controller/cartController.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/category", indexRoute.categoryRoute);
app.use("/product", indexRoute.productRoute);
app.use("/user", indexRoute.userRoute);
app.use("/order", indexRoute.orderRoute);
app.use("/cart", indexRoute.cartRoute);
const add = addToCart.addToCart(
  "3611c8b6-887a-464e-b290-d3a6c2c117cb",
  "14d19d93-b92d-4d05-9296-0240767b7b08"
);

console.log(add);

app.listen(process.env.PORT, () =>
  console.log(`server listen on port ${process.env.PORT}`)
);