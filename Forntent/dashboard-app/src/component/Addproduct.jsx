import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState({
    name: false,
    price: false,
    company: false,
    category: false,
  });
  const Navigate = useNavigate();

  const addProduct = async () => {
    const newError = {
      name: !name,
      price: !price,
      company: !company,
      category: !category,
    };
    setError(newError);

    // If any field has an error, stop the form submission
    if (Object.values(newError).some((e) => e)) {
      return false;
    }
    // Retrieve the user data from localStorage
    const user = localStorage.getItem("user");

    // Check if user data exists
    if (!user) {
      console.error("User data not found in localStorage.");
      return;
    }

    // Parse the user data and extract the userId
    const parsedUser = JSON.parse(user);
    const userId = parsedUser?._id;

    // Check if userId is valid
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    console.log(name, price, company, category, userId);
    try {
      const result = await axios.post(
        "http://localhost:5000/add-product",
        { name, price, company, category, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(result);
      Navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <div className=" space-y-2 border-none ml-5 mt-10">
      <h1 className="   text-4xl   mt-2">Add Product</h1>
      <div className=" space-y-5">
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError((prev) => ({ ...prev, name: false }));
          }}
          placeholder="name"
          className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
        />
        {error && !name && (
          <span className="text-red-500 text-sm mt-1 block">
            Enter Valid name
          </span>
        )}
        <input
          type="text"
          name="price"
          id="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setError((prev) => ({ ...prev, price: false }));
          }}
          placeholder="Enter Price"
          className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
        />
        {error && !price && (
          <span className="text-red-500 text-sm mt-1 block">
            Enter Valid Price
          </span>
        )}

        <input
          type="text"
          name="compant"
          id="company"
          placeholder="company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            setError((prev) => ({ ...prev, company: false }));
          }}
          className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
        />
        {error && !company && (
          <span className="text-red-500 text-sm mt-1 block">
            Enter Valid company
          </span>
        )}

        <input
          type="text"
          name="category"
          id="category"
          value={category}
          placeholder="category"
          onChange={(e) => {
            setCategory(e.target.value);
            setError((prev) => ({ ...prev, category: false }));
          }}
          className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
        />
        {error && !category && (
          <span className="text-red-500 text-sm mt-1 block">
            Enter Valid category
          </span>
        )}
      </div>
      <button
        onClick={addProduct}
        class="select-none rounded-lg bg-slate-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Add-Product
      </button>
    </div>
  );
};

export default Addproduct;
