import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const updateToAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "admin@kirana.com";
        let user = await User.findOne({ email });

        if (!user) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            user = await User.create({
                name: "Test Admin",
                email,
                phone: "1234567890",
                password: hashedPassword,
                role: "admin"
            });
            console.log("Admin user created:", email);
        } else {
            user.role = "admin";
            await user.save();
            console.log("User updated to admin:", email);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateToAdmin();
