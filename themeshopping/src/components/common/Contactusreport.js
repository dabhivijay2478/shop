import React from "react";
import { useEffect, useState } from "react";

export default function Contactusreport() {
  const [mongoData, setMongoData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/contactusreport");
      const result = await response.json();
      setMongoData(result);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full">
          {/* head */}
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody className="table-row-group">
            {mongoData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2">{item.Name}</td>
                <td className="px-4 py-2">{item.Email}</td>
                <td className="px-4 py-2">{item.Message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
