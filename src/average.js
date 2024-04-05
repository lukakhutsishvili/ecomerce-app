import connection from "./config/mongo.js";
import prompts from "prompts";
import purchase from "./models/purchase.js";

connection();

const main = async () => {
  try {
    const response = await prompts([
      { type: "number", name: "id", message: "Please enter product ID" },
    ]);

    let quantity = 0;
    let price = 0;

    const existingProduct = await purchase.find({ product_id: response.id });

    if (existingProduct.length > 0) {
      existingProduct.forEach((item) => {
        quantity += item.quantity;
        price += item.quantity * item.price;
      });
      const sum = price / quantity;
      console.log(sum);
      return sum;
    } else {
      console.log("No such product found.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    process.exit();
  }
};

main();
