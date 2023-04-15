import React from "react";
import { useEffect, useState, useRef } from "react";

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
            <th className="px-4 py-2">ProductName</th>
            <th className="px-4 py-2">ProductShow</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {mongoData.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">{item.ProductName}</td>
              <td className="px-4 py-2">{item.ProductShow}</td>
              <td className="px-4 py-2">{item.Description}</td>
              <td className="px-4 py-2">{item.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
