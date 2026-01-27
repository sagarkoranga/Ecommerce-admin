import React, { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import CategoryManagement from "./pages/CategoryManagement";
import ProductList from "./components/Productlist";
import CategoryList from "./components/CategoryList";
import { getCategories } from "./services/api";
import AdminGuard from "./adminguard";
import AdminLogin from "./Adminlogin";
import ForgotPassword from "./Forgotpassword";
import ResetPasswordGuard from "./resetguard";
import ResetPassword from "./Resetpassword";
import ManageAdmins from "./ManageAdmin";
import Banners from "./components/Banner";
import Testimonials from "./components/Testimonials";
import AdminOrders from "./components/AdminOrders";
import Contact from "./components/Contact";

// import ProductsByCategory from "./components/ProductsbyCategory";

function App() {

  const [categories, setCategories] = useState([]);
  const fetchCategories = () => {
    getCategories().then(res => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route
            path="/resetpassword"
            element={
              <ResetPasswordGuard>
                <ResetPassword />
              </ResetPasswordGuard>
            }
          />
          <Route path="/" element={<AdminLogin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="/home" element={
            <AdminGuard><Dashboard /></AdminGuard>} />

          <Route path="/category" element={<AdminGuard><CategoryManagement /></AdminGuard>} />

          <Route path="/product" element={<AdminGuard><ProductList /></AdminGuard>} />

          <Route path="/category-list" element={<AdminGuard><CategoryList categories={categories} /></AdminGuard>} />
          {/* <Route path="/products/category/:id" element={<ProductsByCategory />} /> */}

          <Route
            path="/admin/manageadmins"
            element={
              <AdminGuard> <ManageAdmins /></AdminGuard>
            }
          />
          <Route
            path="/admin/banners"
            element={
              <AdminGuard>
                <Banners />

              </AdminGuard>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AdminGuard>
                <Testimonials />

              </AdminGuard>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminGuard>
                <AdminOrders />

              </AdminGuard>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <AdminGuard>
                <Contact />

              </AdminGuard>
            }
          />
        </Routes>



      </BrowserRouter>
    </div>
  );
}

export default App;