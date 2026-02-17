import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dukan from "../assets/dukan.png";


export default function Home() {
  const [animatedStats, setAnimatedStats] = useState({ families: 0, years: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        families: Math.min(prev.families + 10, 500),
        years: Math.min(prev.years + 1, 12),
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { title: "आटा, चावल, दाल", img: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=300&q=80", color: "from-[#14532d]" },
    { title: "तेल, मसाले, नमक", img: "https://images.unsplash.com/photo-1601033201520-25e24399e82c?auto=format&fit=crop&w=300&q=80", color: "from-[#facc15]" },
    { title: "बिस्कुट, चॉकलेट", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80", color: "from-[#14532d]" },
    { title: "नमकीन, स्नैक्स", img: "https://images.unsplash.com/photo-1600492193202-31d04135508a?auto=format&fit=crop&w=300&q=80", color: "from-[#facc15]" },
    { title: "चाय, कॉफी, दूध", img: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=300&q=80", color: "from-[#14532d]" },
    { title: "साबुन, शैम्पू", img: "https://images.unsplash.com/photo-1615920349861-3d8ea316c322?auto=format&fit=crop&w=300&q=80", color: "from-[#facc15]" },
  ];

  // Dummy testimonials – replace with real ones later
  const testimonials = [
    {
      name: "प्रीति शर्मा",
      location: "गली नंबर 5",
      text: "राजकुमारी दीदी हमेशा ताज़ा सामान देती हैं। बच्चों को बिस्कुट भी पसंद हैं!",
      rating: 5,
      img: "https://images.unsplash.com/photo-1494790108777-766fd68f7d21?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "राजेश कुमार",
      location: "मेन बाज़ार",
      text: "पिछले 10 सालों से यहीं से ले रहा हूँ। दाम हमेशा उचित और मिलावट नहीं।",
      rating: 5,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "सुनीता देवी",
      location: "आज़ाद नगर",
      text: "फोन पर ऑर्डर करो, 2 घंटे में घर पर। बहुत सुविधा हो गई।",
      rating: 5,
      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "मनोज साहनी",
      location: "स्टेशन रोड",
      text: "यहाँ का मसाला बहुत खुशबूदार है। पूरे मोहल्ले में मशहूर।",
      rating: 5,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const featuredProducts = [
    { name: "आस्था आटा (5kg)", price: "₹220", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80" },
    { name: "धारा तेल (1L)", price: "₹110", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80" },
    { name: "बिस्कुट पैक (1kg)", price: "₹80", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80" },
    { name: "चना दाल (1kg)", price: "₹95", img: "https://images.unsplash.com/photo-1515543904379-3d757f383f7a?auto=format&fit=crop&w=300&q=80" },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section – Local Shop Feel */}
      <section className="relative pt-12 pb-20 px-4 bg-gradient-to-b from-[#14532d] to-[#14532d]/90 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 bg-[#facc15] text-[#14532d] px-4 py-2 rounded-full mb-6 font-bold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#facc15]"></span>
              </span>
              आपका अपना राजकुमारी किराना स्टोर
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              रोज़मर्रा की <br />
              <span className="text-[#facc15]">हर जरूरत </span> एक ही जगह
            </h1>
            <p className="text-gray-100 text-lg mb-8 max-w-lg">
              ताज़ा सामान, उचित दाम, और वही पुराना भरोसा। पिछले 12 सालों से आपके परिवार की सेवा में।
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="bg-[#facc15] text-[#14532d] hover:bg-yellow-400 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-black/20">
                अभी खरीदें →
              </Link>
            </div>
          </div>

          {/* Shop Image / Owner Photo */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-[#facc15]/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-[40px] border border-white/20 max-w-sm">
              {/* <img 
                src="https://images.unsplash.com/photo-1588964895597-cfccd6e2cbf9?auto=format&fit=crop&w=600&q=80" 
                className="rounded-[30px] w-full h-80 object-cover mb-4"
                alt="हमारी दुकान"
              /> */}

              <img 
  src={dukan}
  className="rounded-[30px] w-full h-80 object-cover mb-4"
  alt="हमारी दुकान"
/>

              <h3 className="text-2xl font-bold text-white">हमारा परिवार – आपका परिवार</h3>
              <p className="text-[#facc15] font-semibold italic">"राजकुमारी जी खुद चुनती हैं हर सामान"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories – Daily Essentials */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#14532d] uppercase tracking-tight">हमारी प्रमुख श्रेणियाँ</h2>
            <div className="h-1 w-20 bg-[#facc15] mt-2 rounded-full"></div>
          </div>
          <Link to="/categories" className="text-[#14532d] font-bold hover:underline">सभी देखें →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link to="/products" key={i} className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-square transition-all hover:shadow-xl hover:shadow-[#14532d]/20">
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <img src={cat.img} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110" alt={cat.title} />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm border-t border-[#facc15]">
                <p className="text-sm font-bold text-[#14532d] text-center">{cat.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-gray-50 rounded-3xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-[#14532d] uppercase tracking-tight">लोकप्रिय उत्पाद</h2>
            <div className="h-1 w-20 bg-[#facc15] mt-2 rounded-full"></div>
          </div>
          <Link to="/products" className="text-[#14532d] font-bold hover:underline">सभी देखें →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-100">
              <img src={product.img} className="w-full h-48 object-cover" alt={product.name} />
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#14532d]">{product.name}</h3>
                <p className="text-[#facc15] font-black text-xl mt-1">{product.price}</p>
                <Link to="/products" className="mt-3 inline-block bg-[#14532d] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#0f3a22] transition">
                  जल्दी लें →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Strip – Local Credibility */}
      <section className="bg-[#14532d] py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-black text-[#facc15] mb-2">{animatedStats.families}+</p>
            <p className="text-gray-300 text-sm font-bold uppercase tracking-widest">संतुष्ट परिवार</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#facc15] mb-2">२ घंटे</p>
            <p className="text-gray-300 text-sm font-bold uppercase tracking-widest">फ्री होम डिलीवरी</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#facc15] mb-2">१००%</p>
            <p className="text-gray-300 text-sm font-bold uppercase tracking-widest">ताज़ा उत्पाद</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#facc15] mb-2">{animatedStats.years}+ साल</p>
            <p className="text-gray-300 text-sm font-bold uppercase tracking-widest">आपके भरोसे का साथी</p>
          </div>
        </div>
      </section>

      {/* Owner's Message / Local Connect */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#facc15]/30">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gradient-to-br from-[#14532d] to-[#14532d]/90 text-white">
              <h2 className="text-3xl font-black mb-4">राजकुमारी जी का संदेश</h2>
              <p className="text-gray-100 mb-6 leading-relaxed">
                "पिछले १२ सालों से हम आपके लिए रोज़मर्रा का सामान लाते हैं। हर पैकेट, हर दाना हम खुद देखते हैं, ताकि आपको मिले सिर्फ़ सबसे अच्छा। ये दुकान सिर्फ़ दुकान नहीं, हमारा परिवार है – और आप उस परिवार का हिस्सा हैं।"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#facc15] rounded-full flex items-center justify-center text-[#14532d] font-black text-xl">रा</div>
                <div>
                  <p className="font-bold text-lg">राजकुमारी देवी</p>
                  <p className="text-sm text-[#facc15]">संस्थापक, राजकुमारी किराना स्टोर</p>
                </div>
              </div>
            </div>
            <div className="bg-[#facc15] p-8 md:p-12 flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl mb-4">🏪</p>
                <p className="text-2xl font-black text-[#14532d] mb-2">आओ, मिलकर बैठें</p>
                <p className="text-[#14532d]/80">गली नंबर ७, मेन बाज़ार – आपके बस कदमों की दूरी पर</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 USER REVIEWS / TESTIMONIALS */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#14532d] mb-4">हमारे ग्राहक, हमारी शान</h2>
          <div className="h-1 w-24 bg-[#facc15] mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-4">
                <img src={t.img} className="w-14 h-14 rounded-full object-cover border-2 border-[#facc15]" alt={t.name} />
                <div>
                  <p className="font-bold text-[#14532d]">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">"{t.text}"</p>
              <div className="flex text-[#facc15]">
                {[...Array(t.rating)].map((_, i) => <span key={i}>⭐</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#facc15]/10 to-[#14532d]/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-[#14532d] text-center mb-12">क्यों चुनें राजकुमारी किराना?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-[#14532d] mb-2">ताज़गी की गारंटी</h3>
              <p className="text-gray-600">हर उत्पाद की एक्सपायरी चेक होती है। पुराना सामान कभी नहीं बेचते।</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-[#14532d] mb-2">फ्री होम डिलीवरी</h3>
              <p className="text-gray-600">आस-पास के इलाकों में 2 घंटे के अंदर सामान पहुँच जाता है।</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-[#14532d] mb-2">उचित दाम, पूरा भरोसा</h3>
              <p className="text-gray-600">बाज़ार से कम दाम, मिलावट नहीं, और पुराने ग्राहकों के लिए खास छूट।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info & Timings */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#facc15]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black text-[#14532d] mb-4">दुकान का समय</h3>
              <div className="space-y-2 text-gray-700 text-lg">
                <p><span className="font-bold">सोम-शनि:</span> सुबह 8:00 – रात 9:00</p>
                <p><span className="font-bold">रविवार:</span> सुबह 9:00 – शाम 7:00</p>
                <p className="mt-4"><span className="font-bold">📞 फोन:</span> 98765 43210</p>
                <p><span className="font-bold">📍 पता:</span> गली नंबर 7, मेन बाज़ार, शहर</p>
              </div>
            </div>
            <div className="bg-[#facc15] p-6 rounded-2xl text-center">
              <p className="text-2xl font-black text-[#14532d] mb-2">हर ग्राहक परिवार है!</p>
              <p className="text-[#14532d]">बिना झिझक फोन करें – हम आपके लिए हैं।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#14532d] to-[#14532d] rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#facc15]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">अभी ऑर्डर करें, २ घंटे में पाएँ!</h2>
          <p className="text-gray-100 text-xl mb-10 max-w-2xl mx-auto">हर खरीद पर छोटा तोहफा और ताज़ा सामान की गारंटी।</p>
          <Link to="/products" className="bg-[#facc15] text-[#14532d] px-12 py-4 rounded-2xl font-black text-xl hover:bg-yellow-400 transition-all shadow-xl">
            दुकान चलें 🛒
          </Link>
        </div>
      </section>
    </div>
  );
}