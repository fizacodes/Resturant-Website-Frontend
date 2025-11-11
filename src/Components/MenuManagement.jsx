import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  // Fetch Menu Items
  const fetchMenu = async () => {
    try {
      const res = await axiosInstance.get("/menu/all");
      setMenuItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(
        "/category/show-category",
        {
          withCredentials: true,
        }
      );
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  // Group menu items by category
const groupedItems = menuItems.reduce((acc, item) => {
  const categoryName = item.category?.name || "Uncategorized";
  if (!acc[categoryName]) acc[categoryName] = [];
  acc[categoryName].push(item);
  return acc;
}, {});


  // Add Menu Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      await axiosInstance.post("/menu/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
      setIsAddOpen(false);
      fetchMenu();
      setMessage("Menu item added successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Failed to add menu items.");
    }
  };

  // Delete Menu Item
  const deleteItem = async (id) => {
    try {
      await axiosInstance.delete(`/menu/${id}`, {
        withCredentials: true,
      });
      fetchMenu();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit Menu Item
  const openEditModal = (item) => {
    setEditData({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: null,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", editData.name);
    data.append("description", editData.description);
    data.append("price", editData.price);
    data.append("category", editData.category);
    if (editData.image) data.append("image", editData.image);

    try {
      await axiosInstance.put(`/menu/${editData.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setIsEditOpen(false);
      fetchMenu();
    } catch (err) {
      console.log(err);
    }
  };

  // Add New Category
  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      await axiosInstance.post(
        "/category/create-category",
        { name: newCategory },
        { withCredentials: true }
      );
      setNewCategory("");
      setShowAddCategory(false);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:ml-64 min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="md:text-3xl text-xl font-serif font-semibold text-amber-600">Menu Management</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-amber-600 text-black px-4 py-1 md:py-2 rounded font-semibold hover:bg-amber-500"
        >
          Add Menu Item
        </button>
      </div>

      {/* Menu Items grouped by category */}
      {Object.keys(groupedItems).map((category) => (
        <div
          key={category}
          className="mb-10 border border-amber-600/40 p-4 rounded-lg "
        >
          <h2 className="text-3xl font-serif  font-medium text-amber-400 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {groupedItems[category].map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 w-52 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-amber-600 m-2"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className=" h-24 w-full object-cover"
                  />
                )}
                <div className="p-2">
                  <h3 className="text-lg font-bold text-amber-400">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.description}
                  </p>
                  <p className="text-amber-400 font-semibold mt-2">
                    ${item.price}
                  </p>

                  <div className="mt-2 flex justify-between">
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="text-red-400 hover:text-red-500 font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-amber-400 hover:text-amber-500 font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Menu Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">
              Add Menu Item
            </h2>
            {message && (
              <p className="text-center text-green-600 mb-4">{message}</p>
            )}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                required
              />

              {/* Category Dropdown + Add New Category */}
              <div className="mb-2">
                <select
  value={formData.category}
  onChange={(e) =>
    setFormData({ ...formData, category: e.target.value })
  }
  className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
  required
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>


                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-amber-400 hover:text-amber-500 text-sm mb-2"
                >
                  + Add Category
                </button>

                {showAddCategory && (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="New Category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-3 py-2 bg-amber-400 text-black rounded hover:bg-amber-500"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                rows="3"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-3"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded border border-gray-700 hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-black rounded font-semibold hover:bg-amber-500"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Menu Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">
              Edit Menu Item
            </h2>
            <form onSubmit={handleUpdate} encType="multipart/form-data">
              <input
                type="text"
                placeholder="Name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                required
              />

              {/* Category Dropdown for Edit */}
              <div className="mb-2">
                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {" "}
                      {/* <-- send ObjectId */}
                      {cat.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-amber-400 hover:text-amber-500 text-sm mb-2"
                >
                  + Add Category
                </button>

                {showAddCategory && (
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="New Category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-3 py-2 bg-amber-400 text-black rounded hover:bg-amber-500"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              <textarea
                placeholder="Description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="bg-gray-800 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-2"
                rows="3"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.files[0] })
                }
                className="bg-gray-800 p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full mb-3"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded border border-gray-700 hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-black rounded font-semibold hover:bg-amber-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuManagement;
