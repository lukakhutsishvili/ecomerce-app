import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema({
  product_id: {
    type: Schema.Types.Number,
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
  },
});

const purchase = mongoose.model("purchase", purchaseSchema);

export default purchase;
