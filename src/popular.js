import connection from "./config/mongo.js";
import order from "./models/order.js";
import product from "./models/product.js";
connection();

const main = async () => {
  const most = await order.aggregate([
    { $group: { _id: "$product_id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  const existingProduct = await product.findOne({ id: most[0]._id });

  console.log(existingProduct.name);

  process.exit();
};

main();
