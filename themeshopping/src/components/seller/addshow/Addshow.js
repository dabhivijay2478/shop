import React, { useState } from "react";
import "./Addshow.css";
import csvtojson from "csvtojson";
import { useNavigate } from "react-router-dom";
export default function Addshow() {
  const history = useNavigate();
  const [show, setShow] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };
  const addshow = async () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        const jsonData = await csvtojson().fromString(reader.result);
        fetch("http://localhost:8000/addquize", {
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
              className="addshow"
              type="submit"
              value="ADD SHOW"
              onClick={addshow}
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
