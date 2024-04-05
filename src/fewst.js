import connection from "./config/mongo.js";
import purchase from "./models/purchase.js";
import product from "./models/product.js";
connection();

const main = async () => {
  const least = await purchase.aggregate([
    { $group: { _id: "$product_id", totalquantity: { $sum: "$quantity" } } },
    { $sort: { totalquantity: 1 } },
    { $limit: 1 },
  ]);

  const existingProduct = await product.findOne({ id: least[0]._id });

  console.log(existingProduct.name);

  process.exit();
};

main();
