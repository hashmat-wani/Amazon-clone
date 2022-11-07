import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: { type: [String], validate: (v) => v.length > 0 },
    coupon: { type: Number },
    expected_delivery_duration: { type: Number, required: true },
    org_price: { type: Number, required: true },
    disc_price: { type: mongoose.Schema.Types.Mixed, required: true },
    first_delivery_free: { type: Boolean, default: false },
    image: { type: String, required: true },
    prime: { type: Boolean, default: false },
    qty: { type: Number, required: true },
    tag: String,
    title: { type: String, required: true },
  },
  { versionKey: false }
);
const Product = mongoose.model("product", productSchema);
export default Product;
