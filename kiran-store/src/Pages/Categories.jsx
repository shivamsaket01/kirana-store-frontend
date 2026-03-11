// pages/Categories.jsx
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  // Sample data with item counts (you can replace with real counts from your backend)
  const categories = [
    {
      title: "Biscuits & Chocolates 🍪",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
      itemCount: 24,
    },
    {
      title: "Snacks & Namkeen 🥨",
      image: "https://images.unsplash.com/photo-1600492193202-31d04135508a?auto=format&fit=crop&w=600&q=80",
      itemCount: 18,
    },
    {
      title: "Noodles & Chowmein 🍜",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
      itemCount: 12,
    },
    {
      title: "Staples: Aata, Chawal, Dal 🌾",
      image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80",
      itemCount: 15,
    },
    {
      title: "Essentials: Sugar, Oil, Masale 🧂",
      image: "https://images.unsplash.com/photo-1601033201520-25e24399e82c?auto=format&fit=crop&w=600&q=80",
      itemCount: 20,
    },
    {
      title: "Fun Stuff: Pens, Pencils, Toothpaste ✏️",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
      itemCount: 30,
    },
  ];

  // Stats for the header
  const stats = [
    { label: "Total Categories", value: "24+" },
    { label: "Products Available", value: "2,500+" },
    { label: "Happy Customers", value: "50K+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-r from-[#0a3b1e] to-[#1e6b37] text-white overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#facc15] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              <span className="text-[#facc15]">खरीदारी करें</span>
              <span className="block mt-2">श्रेणी के अनुसार</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              आपकी पसंद की हर चीज़, बिल्कुल सही श्रेणी में – 
              <span className="block mt-2 font-semibold text-[#facc15]">ढूंढना हुआ आसान!</span>
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#facc15]">{stat.value}</div>
                  <div className="text-sm md:text-base text-gray-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filter chips - enlarged */}
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {["All", "Popular", "New Arrivals", "Best Sellers", "Special Offers"].map((tag) => (
                <button
                  key={tag}
                  className="px-6 py-3 rounded-full text-sm font-medium bg-white/10 text-white 
                           hover:bg-white/20 hover:scale-105 transition-all duration-300 
                           backdrop-blur-sm border border-white/20 shadow-lg"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb">
            <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </div>

      {/* Category Grid - LARGER CARDS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, i) => (
            <CategoryCard
              key={i}
              title={category.title}
              image={category.image}
              itemCount={category.itemCount}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Trust Section */}
      <div className="bg-white py-20 mt-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#14532d] mb-4">
            हमारी गारंटी
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 text-lg">
            गुणवत्ता और विश्वास के साथ, हम देते हैं आपको बेहतरीन अनुभव
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl 
                          shadow-lg hover:shadow-2xl transition-all duration-300 
                          hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🌿</div>
              <h3 className="text-2xl font-bold text-[#14532d] mb-3">ताज़ा उत्पाद</h3>
              <p className="text-gray-600 leading-relaxed">
                हर श्रेणी में सिर्फ ताज़ा और शुद्ध सामान, 
                सीधे सप्लायर से आपके घर तक
              </p>
              <div className="mt-4 h-1 w-20 bg-[#facc15] rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
            
            <div className="group bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl 
                          shadow-lg hover:shadow-2xl transition-all duration-300 
                          hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏠</div>
              <h3 className="text-2xl font-bold text-[#14532d] mb-3">फ्री होम डिलीवरी</h3>
              <p className="text-gray-600 leading-relaxed">
                आस-पास के इलाकों में 2 घंटे में डिलीवरी, 
                ऑर्डर करें और आराम से पाएं
              </p>
              <div className="mt-4 h-1 w-20 bg-[#facc15] rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
            
            <div className="group bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl 
                          shadow-lg hover:shadow-2xl transition-all duration-300 
                          hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-2xl font-bold text-[#14532d] mb-3">कम से कम दाम</h3>
              <p className="text-gray-600 leading-relaxed">
                हर उत्पाद पर सबसे सस्ता रेट, 
                कीमत में पारदर्शिता, कोई मिलावट नहीं
              </p>
              <div className="mt-4 h-1 w-20 bg-[#facc15] rounded-full group-hover:w-32 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}