import React from "react";
import { useEffect, useState } from "react";
export default function Productreport() {
  const [mongoData, setMongoData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/productdata");
      const result = await response.json();
      setMongoData(result);
    }
    fetchData();
  }, []);
  async function handleDelete(name) {
    const response = await fetch(
      `http://localhost:8000/deleteproducts/${name}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      // Update the state to remove the deleted product from the list
      setMongoData(mongoData.filter((item) => item.name !== name));
    } else {
      console.log("Error deleting product");
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        {/* head */}
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Show</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Sale Discount</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Update</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {mongoData.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.brand}</td>
              <td className="px-4 py-2">{item.size}</td>
              <td className="px-4 py-2">{item.show}</td>
              <td className="px-4 py-2">{item.color}</td>
              <td className="px-4 py-2">{item.saleDiscount}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2">{item.rating}</td>
              <td className="px-4 py-2">
                {" "}
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover h-10 w-10"
                />
              </td>
              <td className="px-4 py-2 ">
                {" "}
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </td>
              <td className="px-4 py-2">
                {" "}
                <button
                  onClick={() => handleDelete(item.name)}
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
