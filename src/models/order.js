import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  product_id: {
    type: Schema.Types.Number,
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  totalprice: {
    type: Schema.Types.Number,
  },
});

const order = mongoose.model("order", orderSchema);

export default order;
