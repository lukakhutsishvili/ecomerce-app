import connection from "./config/mongo.js";
import prompts from "prompts";
import product from "./models/product.js";
import purchase from "./models/purchase.js";
import order from "./models/order.js";

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
  ]);

  const existingPurchase = await purchase.findOne({
    product_id: response.product_id,
  });
  if (existingPurchase && existingPurchase.quantity >= response.quantity) {
    await order.create({
      quantity: response.quantity,
      product_id: response.product_id,
      totalprice: existingPurchase.price * response.quantity,
    });
    existingPurchase.quantity -= response.quantity;
    await existingPurchase.save();
    console.log("Added to MongoDB");
  } else {
    console.log("No such product");
  }

  process.exit();
};

main();
