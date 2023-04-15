import React, { useState } from "react";
import "./Addshow.css";

export default function Addshow() {
  const [show, setShow] = useState([]);

  return (
    <div>
      <body>
        <form action="#" method="post">
          <p>
            <label for="name">Show Name</label>
            <input
              id="name"
              name="username"
              type="text"
              value={show}
              onChange={(e) => setShow(e.target.value)}
            />
          </p>
          <p>
            <label for="image"></label>
            <input className="images" id="image" name="image" type="file" />
          </p>
          <p>
            <input
              className="addshow"
              type="submit"
              value="ADD SHOW"
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
