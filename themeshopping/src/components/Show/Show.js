import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

export default function Show() {
  const [mongoData, setMongoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addItemToCartList } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/productdata");
      const result = await response.json();
      setMongoData(result);
    }
    fetchData();
  }, []);

  const addToCart = (item) => {
    addItemToCartList(item);
  };

  const filteredData = mongoData.filter((item) => {
    if (searchQuery !== "" && !item.name.includes(searchQuery) && !item.show.includes(searchQuery)) {
      return false;
    }

    return true;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {filteredData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gray-400 h-64">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
            <h3 className="font-semibold text-lg mb-2">{item.show}</h3>

            <p className="text-gray-700 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">${item.price}</span>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:bg-gray-700"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
