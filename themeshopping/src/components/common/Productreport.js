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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
