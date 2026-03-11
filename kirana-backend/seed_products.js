import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const groceryProducts = [
    {
        name: "Basmati Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
        description: "Premium quality aged basmati rice for perfect biryani.",
        brand: "Fortune",
        category: "Rice",
        price: 450,
        countInStock: 50,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: "Fresh Tomatoes",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d5d?auto=format&fit=crop&q=80&w=400",
        description: "Farm fresh organic red tomatoes.",
        brand: "Local Farm",
        category: "Vegetables",
        price: 40,
        countInStock: 100,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: "Coca Cola (2L)",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400",
        description: "Refreshing cold drink for parties.",
        brand: "Coca Cola",
        category: "Cold Drinks",
        price: 95,
        countInStock: 30,
        rating: 4.8,
        numReviews: 25,
    },
    {
        name: "Kurkure Masala Munch",
        image: "https://images.unsplash.com/photo-1621447509374-f44cedc3d7dc?auto=format&fit=crop&q=80&w=400",
        description: "Crunchy and spicy Indian snacks.",
        brand: "Kurkure",
        category: "Snacks",
        price: 20,
        countInStock: 200,
        rating: 4.2,
        numReviews: 45,
    }
];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding");

        await Product.deleteMany();
        await Product.insertMany(groceryProducts);

        console.log("Products seeded successfully!");
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedProducts();
