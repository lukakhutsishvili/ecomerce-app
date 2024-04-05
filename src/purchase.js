import connection from "./config/mongo.js";
import prompts from "prompts";
import product from "./models/product.js";
import purchase from "./models/purchase.js";

connection();

const main = async () => {
  const response = await prompts([
    {
      type: "text",
      name: "quantity",
      message: "Please enter product quantity",
    },
    {
      type: "text",
      name: "product_id",
      message: "Please enter product product_id",
    },
    {
      type: "text",
      name: "price",
      message: "Please enter product price",
    },
  ]);

  const existingProduct = await product.findOne({
    id: response.product_id,
  });

  if (existingProduct) {
    await purchase.create({
      quantity: response.quantity,
      product_id: response.product_id,
      price: response.price,
    });

    console.log("added to mongodb");
  } else {
    console.log("no such product");
  }
  process.exit();
};

main();
