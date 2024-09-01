import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const param = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const upDateItem = async () => {
      try {
        const product = await axios.get(
          `http://localhost:5000/product/${param.id}`
        );
        setName(product.data.name);
        setPrice(product.data.price);
        setCompany(product.data.company);
        setCategory(product.data.category);
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    upDateItem();
  }, [param.id]);

  const updateProduct = async () => {
    try {
      const updatedProduct = {
        name,
        price,
        company,
        category,
      };
      const response = await axios.put(
        `http://localhost:5000/product/${param.id}`,
        updatedProduct
      );
      console.log("Product updated successfully:", response.data);
      // Add any success notification or redirect logic here
    } catch (error) {
      console.log("Error updating product:", error);
    }
    navigate("/");
  };

  return (
    <div>
      <div className=" space-y-4 border-none ml-5 mt-10">
        <h1 className="   text-4xl   mt-2 my-5">update Product:</h1>
        <div className=" space-y-12">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
          />

          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
            className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
          />

          <input
            type="text"
            name="compant"
            id="company"
            placeholder="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
          />

          <input
            type="text"
            name="category"
            id="category"
            value={category}
            placeholder="category"
            onChange={(e) => setCategory(e.target.value)}
            className=" bg-slate-200 pl-3  border-none rounded-md  w-4/5 text-black h-10"
          />
        </div>
        <button
          onClick={updateProduct}
          class="select-none rounded-lg mt-6 bg-slate-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Update-Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
