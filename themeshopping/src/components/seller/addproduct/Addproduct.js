import React, { useState } from "react";
import "./Addproduct.css";
import { Link, useNavigate } from "react-router-dom";
import csvtojson from "csvtojson";

export default function Addproduct() {
  const history = useNavigate();
  const [file, setFile] = useState(null);

  const [pname, setPname] = useState([]);
  const [pshow, setPshow] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [rating, setRating] = useState([]);

  const addproduct = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/addproduct", {
      method: "POST",
      changeOrigin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductName: pname,
        ProductShow: pshow,
        Description: description,
        Price: price,
        Rating: rating,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invaild");
    } else {
      window.alert("Sucess");
      history("/seller");
    }
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };
  const addmutiliproduct = async () => {
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
            <label for="desc">Description</label>

            <input
              id="description"
              name="description"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <p>
            <label for="price">Price</label>
            <input
              id="price"
              name="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </p>
          <p>
            <label for="">Product Rating</label>
            <select
              name="fruit"
              style={{
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <p>
            <label for="image"></label>
            <input
              className="images"
              id="image"
              name="image"
              type="file"
              onChange={handleFileInputChange}
            />
          </p>

          <p>
            <input
              className="addproduct"
              type="submit"
              value="ADD PRODUCT"
              onClick={addproduct}
              id="submit"
            />
          </p>
          <p>
            <input
              className="addproduct"
              type="submit"
              value="ADD Multiple"
              onClick={addmutiliproduct}
              id="submit"
            />
          </p>
        </form>
        <script
          src="https://code.jquery.com/jquery-1.11.0.min.js"
          type="text/javascript"
          charset="utf-8"
        ></script>
        <script src="js/app.js" type="text/javascript" charset="utf-8"></script>
      </body>
    </div>
  );
}
