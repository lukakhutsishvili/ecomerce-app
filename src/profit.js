import connection from "./config/mongo.js";
import prompts from "prompts";
import product from "./models/product.js";
import purchase from "./models/purchase.js";
import order from "./models/order.js";
connection();

const main = async () => {
  const response = await prompts([
    { type: "number", name: "id", message: "Please enter product ID" },
  ]);

  const existingPurchase = await purchase.find({ product_id: response.id });
  const existingOrder = await order.find({ product_id: response.id });

  let totalPurchaseQuantity = 0;
  let totalPurchasePrice = 0;
  let totalOrderQuantity = 0;
  let totalOrderPrice = 0;
  if (existingPurchase) {
    totalPurchaseQuantity += existingPurchase.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
    totalPurchasePrice += existingPurchase.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }

  const avgPurchasePrice = totalPurchasePrice / totalPurchaseQuantity;
  if (existingOrder) {
    totalOrderQuantity += existingOrder.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );
    totalOrderPrice += existingOrder.reduce(
      (acc, curr) => acc + curr.totalprice,
      0
    );
  }

  const avgOrderPrice = totalOrderPrice / totalOrderQuantity;

  const profit = avgOrderPrice - avgPurchasePrice;
  console.log(profit);

  process.exit();
};

main();
