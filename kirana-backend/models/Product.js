// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    image: { type: String },
    description: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Indexes for fast searching
ProductSchema.index({ name: 'text', tags: 'text', category: 'text' });

export default mongoose.model("Product", ProductSchema);
