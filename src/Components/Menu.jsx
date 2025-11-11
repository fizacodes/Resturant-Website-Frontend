

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Add ref for scroll functionality
  const menuRef = React.useRef(null);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category/show-category");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    // Fetch menu items
    const fetchMenuItems = async () => {
      try {
        const res = await axiosInstance.get("/menu/all");
        setMenuItems(res.data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };

    fetchCategories();
    fetchMenuItems();
  }, []);

  // Filter items by selected category
  const filteredItems = selectedCategory
    ? menuItems.filter(item => item.category?.name === selectedCategory)
    : menuItems;

  return (
    <div id="menu" className="min-h-screen bg-black text-white px-4 sm:px-8 py-24 font-serif">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-amber-600 text-lg font-semibold tracking-wide">Our Menu</h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium font-serif mt-2">Culinary Masterpieces</h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-300">
          Explore our carefully crafted dishes made with the finest ingredients for a truly unforgettable dining experience.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full border border-amber-500 transition-all duration-300 ${
              selectedCategory === cat.name
                ? "bg-amber-500 text-black"
                : "text-amber-500 hover:bg-amber-500 hover:text-black"
            }`}
          >
            {cat.name}
          </button>
        ))}

        {/* All Categories */}
        <button
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-2 rounded-full border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300"
        >
          All
        </button>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-black/70 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 border border-amber-400"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-amber-500 text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-300 mt-1">{item.description}</p>
              <p className="text-gray-300 mt-2 font-medium">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
