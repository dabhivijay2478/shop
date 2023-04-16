import React, { useState } from "react";
import "./Addproduct.css";
import { useNavigate } from "react-router-dom";
import csvtojson from "csvtojson";
export default function Addproduct() {
  const history = useNavigate();

  const [pname, setPname] = useState("");
  const [pshow, setPshow] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [saleDiscount, setSaleDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const addproduct = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/addproduct", {
      method: "POST",
      changeOrigin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pname,
        show: pshow,
        brand: brand,
        size: size,
        color: color,
        saleDiscount: saleDiscount,
        price: price,
        rating: rating,
        image: image,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid");
    } else {
      window.alert("Success");
      history("/seller");
    }
  };
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };
  const addmultiple = async () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        const jsonData = await csvtojson().fromString(reader.result);
        fetch("http://localhost:8000/addmutlipleproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      };
    }
    history("/seller");
  };

  return (
    <>
      <div>
        <body>
          <form action="#" method="post">
            <p>
              <label for="name">Product Name</label>
              <input
                id="name"
                name="pname"
                type="text"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
              />
            </p>
            <p>
              <label for="name">Product's Show</label>
              <input
                id="name"
                name="show"
                type="text"
                value={pshow}
                onChange={(e) => setPshow(e.target.value)}
              />
            </p>
            <p>
              <label for="brand">Brand</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </p>
            <p>
              <label for="brand">Size</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </p>
            <p>
              <label for="brand">Color</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </p>
            <p>
              <label for="brand">SalesDiscount</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={saleDiscount}
                onChange={(e) => setSaleDiscount(e.target.value)}
              />
            </p>

            <p>
              <label for="brand">Price</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </p>
            <p>
              <label for="brand">Rating</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </p>
            <p>
              <label for="brand">Image</label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </p>
            <button onClick={addproduct}>Addproduct</button>
            <p>
              <label for="file">File</label>
              <input
                id="File"
                name="File"
                type="File"
                onChange={handleFileInputChange}
              />
            </p>
            <button onClick={addmultiple}>Multi Addproduct</button>
          </form>
          <script
            src="https://code.jquery.com/jquery-1.11.0.min.js"
            type="text/javascript"
            charset="utf-8"
          ></script>
          <script
            src="js/app.js"
            type="text/javascript"
            charset="utf-8"
          ></script>
        </body>
      </div>
    </>
  );
}
