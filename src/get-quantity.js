import connection from "./config/mongo.js";
import prompts from "prompts";
import purchase from "./models/purchase.js";
connection();

const main = async () => {
  const response = await prompts([
    { type: "number", name: "id", message: "Please enter product ID" },
  ]);

  const existingProduct = await purchase.find({ product_id: response.id });

  if (existingProduct > 0) {
    let items = 0;
    const quantity = existingProduct.forEach(
      (item) => (items += item.quantity)
    );
    console.log(items);
    return items;
  }
  process.exit();
};

main();
