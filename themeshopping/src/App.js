import "./App.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetail from "./components/itemDetail/ItemDetail";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Itemsection from "./components/Itemsection/Itemsection";
import Addproduct from "./components/seller/addproduct/Addproduct";
import Addshow from "./components/seller/addshow/Addshow";
import Admin from "./components/admin/Admin";
import Adduser from "./components/admin/Adduser";
import Seller from "./components/seller/Seller";
import Error from "./components/Error";
import Productreport from "./components/common/Productreport";
import Userreport from "./components/admin/Userport";
import Contactus from "./components/navbar/Contactus";
import Contactusreport from "./components/common/Contactusreport";
import Show from "./components/Show/Show";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="adduser" element={<Adduser />} />
          <Route path="userreport" element={<Userreport />} />
          <Route path="contactus" element={<Contactusreport />} />
          <Route path="adduser" element={<Adduser />} />
          <Route path="productreport" element={<Productreport />} />

          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/seller" element={<Seller />}>
          <Route path="addproduct" element={<Addproduct />} />
          <Route path="addshow" element={<Addshow />} />
          <Route path="productreport" element={<Productreport />} />

          <Route path="*" element={<Error />} />
        </Route>
        <Route exact path="/" element={<HomePage />}>
          <Route path="/itemsection" element={<Itemsection />} />

          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Show" element={<Show />} />

          <Route path="/Contact" element={<Contactus />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
