import connection from "./config/mongo.js";
import prompts from "prompts";
import product from "./models/product.js";
connection();

const main = async () => {
  const response = await prompts([
    { type: "text", name: "name", message: "Please enter product name" },
    { type: "number", name: "price", message: "Please enter product price" },
    { type: "number", name: "id", message: "Please enter product ID" },
  ]);

  const existingProduct = await product.findOne({ id: response.id });

  if (existingProduct) {
    existingProduct.price = response.price;
    existingProduct.name = response.name;
    await existingProduct.save();
    console.log("product successfully updated");
  } else {
    await product.create({
      name: response.name,
      price: response.price,
      id: response.id,
    });
    console.log("product successfully added");
  }
  process.exit();
};

main();
