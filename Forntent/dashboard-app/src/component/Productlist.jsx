import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Productlist = () => {
  const [products, setProducts] = useState([]);

  const fetchProductList = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products", {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setProducts(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);
  //delete
  const deleteProduct = async (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (isConfirmed) {
      try {
        const result = await axios.delete(
          `http://localhost:5000/product/${id}`,
          {
            headers: {
              authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        console.log(result.data);

        // Update the product list after deletion
        setProducts(products.filter((product) => product._id !== id));

        // Show success alert
      } catch (error) {
        console.error("Error deleting the product:", error);

        // Show error alert
        alert("An error occurred while deleting the product.");
      }
    }
  };

  //serch product
  const searchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      console.log(`serch:${key}`);
      try {
        const result = await axios.get(`http://localhost:5000/search/${key}`, {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        console.log("Search response:", result.data);

        setProducts(result.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      // If the search input is cleared, refetch all products
      fetchProductList();
    }
  };

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl m-3 font-bold">All Products</h1>
          <div className="mt-3">
            <input
              onChange={searchHandler}
              className="text-start bg-gray-200 rounded-md font-bold mr-60 w-72 h-9"
              type="text"
              placeholder="Search products..."
            />
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                S.No
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Price
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Company
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Category
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {product.price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {product.company}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {product.category}
                  </td>
                  <td className="py-5 flex px-4 border-b border-gray-300">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="select-none rounded-lg bg-red-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button">
                      Delete
                    </button>
                    <Link to={`/update/${product._id}`}>
                      <button
                        className="select-none ml-3 rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Product not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      );
    </div>
  );
};

export default Productlist;
