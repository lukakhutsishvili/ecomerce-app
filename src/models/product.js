import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  id: {
    type: Schema.Types.Number,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
});

const product = mongoose.model("product", productSchema);

export default product;
