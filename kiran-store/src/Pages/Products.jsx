import ProductCard from "../components/ProductCard";
import { useState } from "react";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    {
      name: "Biscuits & Chocolates",
      products: [
        { name: "Britannia 50-50 Biscuits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd50rFQJbWqYeLPhbxoiLdNTjC3AzcPZGYcg&s", price: 10 },
        { name: "Parle-G Gold Biscuits", image: "https://m.media-amazon.com/images/I/51MVCw8nBaL._AC_UF894,1000_QL80_.jpg", price: 20 },
        { name: "Cadbury 5 Star Chocolate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVvYvbw0mUW9mcMrGGiI2gTodu3Z7SIuwGdQ&s", price: 30 },
        { name: "Nestle Kitkat", image: "https://m.media-amazon.com/images/I/61uzxiUgqcL._AC_UF894,1000_QL80_.jpg", price: 50 },
        { name: "Oreo Biscuits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS83No5AsvRcVHYlVoLLY5J7m8hIOUgBPHRg&s", price: 100 },
      ]
    },
    {
      name: "Snacks & Namkeen",
      products: [
        { name: "Lay's Magic Masala Chips", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4mK4c_BdtFWnOWVNGAwFIcQRrZCnoAsIOBg&s", price: 10 },
        { name: "Kurkure Masala Munch", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/c5cb2b8d-607e-4d46-a81e-2fc7bc882aa6.png", price: 20 },
        { name: "Haldiram Bhujia", image: "https://dms.mydukaan.io/original/jpeg/master/products/haldiram-s-bhujia-1-kg.png", price: 30 },
        { name: "Bingo Mad Angles", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2BTbkpxwCOPSvOjtxkdFYJF8LR1_IqUjHA&s", price: 50 },
        { name: "Peanuts (Moongphali)", image: "https://m.media-amazon.com/images/I/619ZKWOmJPL._AC_UF894,1000_QL80_.jpg", price: 100 },
      ]
    },
    {
      name: "Noodles & Chowmein",
      products: [
        { name: "Maggi Masala Noodles", image: "https://themintleaves.com/cdn/shop/products/812o4EQXPKL._SX679_3e23b64a-9636-4544-9e9d-4f0c396cc724_1024x1024@2x.jpg?v=1619599706", price: 10 },
      
        { name: "Chowmein Noodles", image: "https://m.media-amazon.com/images/I/91ZsiYbaZRL._SX679_.jpg", price: 30 },
        { name: "Maggi Pasta", image: "https://www.bigbasket.com/media/uploads/p/l/2000494_12-maggi-pazzta-cheese-macaroni.jpg", price: 50 },
        { name: "Bambino Vermicelli", image: "https://www.bigbasket.com/media/uploads/p/l/123048_4-bambino-vermicelli.jpg", price: 100 },
      ]
    },
    {
      name: "Staples: Aata, Chawal, Dal",
      products: [
        { name: "Aata (Flour)", image: "https://unsplash.com/photos/a-wooden-cutting-board-topped-with-dough-next-to-a-bowl-of-flour-P5OWOQecGTY", price: 10 },
        { name: "Chawal (Rice)", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80", price: 20 },
        { name: "Dal (Lentils)", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80", price: 30 },
        { name: "Moong Dal", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80", price: 50 },
        { name: "Urad Dal", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80", price: 100 },
      ]
    },
    {
      name: "Essentials: Sugar, Oil, Masale",
      products: [
        { name: "Sugar", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=300&q=80", price: 10 },
        { name: "Gud (Jaggery)", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=300&q=80", price: 20 },
        { name: "Oil", image: "https://images.unsplash.com/photo-1601033201520-25e24399e82c?auto=format&fit=crop&w=300&q=80", price: 30 },
        { name: "Masale (Spices)", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80", price: 50 },
        { name: "Tea Leaves", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80", price: 100 },
      ]
    },
    {
      name: "Fun Stuff: Pens, Pencils, Toothpaste",
      products: [
        { name: "Pens", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=300&q=80", price: 10 },
        { name: "Pencils", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=300&q=80", price: 20 },
        { name: "Cutters", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=300&q=80", price: 30 },
        { name: "Toothpaste", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80", price: 50 },
        { name: "Fun Stationery Set", image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=300&q=80", price: 100 },
      ]
    }
  ];

  // For a future filter feature, you could combine all products
  // const allProducts = categories.flatMap(cat => cat.products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#14532d] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#facc15]">राजकुमारी किराना</span> स्टोर
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            रोज़मर्रा की जरूरतें, अब और भी आसान – ₹10 से ₹100 तक के सस्ते दाम!
          </p>
          {/* Quick Category Pills (optional) */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.name
                    ? 'bg-[#facc15] text-[#14532d]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category, catIdx) => (
          // Only show category if activeCategory is "All" or matches
          (activeCategory === "All" || activeCategory === category.name) && (
            <div key={catIdx} className="mb-16 last:mb-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#14532d] relative">
                  {category.name}
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#facc15] rounded-full"></span>
                </h2>
                <a href="#" className="text-[#14532d] hover:text-[#facc15] font-medium text-sm transition-colors">
                  सभी देखें →
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {category.products.map((product, pIdx) => (
                  <ProductCard
                    key={pIdx}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}