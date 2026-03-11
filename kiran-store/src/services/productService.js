import { groceryProducts } from "../data/products";

/**
 * Product Service
 * 
 * Handles fetching, filtering, and managing product data.
 * Currently uses mock data, but designed to easily swap to a real API 
 * or CSV parser in the future as per the PRD requirements.
 */

class ProductService {
  // Simulate fetching all products from an API
  async getAllProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(groceryProducts);
      }, 300); // simulate network delay
    });
  }

  // Simulate fetching a specific product by ID
  async getProductById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = groceryProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Product not found"));
        }
      }, 300);
    });
  }

  // Simulate parsing an uploaded CSV file (Admin feature)
  async uploadProductsFromCSV(file) {
    return new Promise((resolve) => {
      // In a real implementation:
      // 1. Parse CSV (e.g., using PapaParse)
      // 2. Validate row headers (Name, Category, Price, Stock)
      // 3. Send to backend database
      console.log(`Uploading file ${file.name}...`);
      setTimeout(() => {
        resolve({ success: true, message: "Products successfully imported!" });
      }, 1000);
    });
  }
}

export const productService = new ProductService();
