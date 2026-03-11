import Product from "../models/Product.js";

// @desc    Get all products (with Search, Pagination & Filtering)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { keyword, category, pageNumber = 1, limit = 10 } = req.query;

    const query = {};

    // Standard Category Filter
    if (category) {
      query.category = category;
    }

    // Basic Keyword Search (if not using the dedicated Smart Search endpoint)
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } }
      ];
    }

    const count = await Product.countDocuments(query);
    const pages = Math.ceil(count / limit);

    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(limit * (pageNumber - 1))
      .sort({ createdAt: -1 });

    res.json({
      products,
      page: Number(pageNumber),
      pages,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    AI Smart Search over products
// @route   GET /api/products/search?q=XYZ
// @access  Public
export const smartSearchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    // We can leverage MongoDB's $text index if properly built, OR comprehensive regex matching:
    // Searching over `name`, `category`, and `tags` (which acts as synonyms)
    const products = await Product.find({
      $or: [
        { $text: { $search: q } }, 
        { name: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } }
      ]
    }).limit(20);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
