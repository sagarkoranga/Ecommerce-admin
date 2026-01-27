// // import React from "react";
// // import ProductList from "../components/Productlist";


// // import CategoryManagement from "./CategoryManagement";
// // import { useNavigate } from "react-router-dom";


// // export default function Dashboard() {
// //   const navigate=useNavigate();
// //   return (
// //     <div>
// //       <h1>Admin Dashboard</h1>
// //    <button onClick={()=>navigate('/category')}>Category Management</button>

// //     {/* <ProductForm/> */}
// //    <button onClick={()=>navigate('/product')}>Product Management</button>
// //     </div>
// //   );
// // }

// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 dashboard">
//       <div className="max-w-6xl mx-auto">
//         {/* HEADER */}
//         <div className="bg-white p-6 rounded-lg shadow mb-6 dash-btn flex justify-between items-center">
//           <h1 className="text-2xl font-bold  text-gray-800">
//             Admin Dashboard
//           </h1>

//           <span className="text-sm text-gray-500">
//             Welcome, Admin
//           </span>
//         </div>

//         {/* GRID MENU */}
//         <div className="grid grid-cols-1 md:grid-cols-2 dash-btn gap-6">
//           {/* CATEGORY MANAGEMENT CARD */}
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Category Management
//             </h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Create, update, organize and manage product categories and
//               sub-categories.
//             </p>
//             <button
//               onClick={() => navigate("/category")}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Go to Categories
//             </button>
//           </div>

       
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Product Management
//             </h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Add, edit, manage products, upload images and control product
//               status.
//             </p>
//             <button
//               onClick={() => navigate("/product")}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//             >
//               Go to Products
//             </button>

//           </div>

//           {/* //admin management card */}
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Admin Management
//             </h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Add, edit, manage admins username and password.
//             </p>
//             <button
//               onClick={() => navigate("/admin/manageadmins")}
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//             >
//               Manage Admins
//             </button>

//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Banner Management
//             </h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Add, edit, manage Banners
//             </p>
//             <button
//               onClick={() => navigate("/admin/banners")}
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//             >
//               Manage Admins
//             </button>

//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Testimonials Management
//             </h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Add, edit, manage Testimonials
//             </p>
//             <button
//               onClick={() => navigate("/admin/testimonials")}
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//             >
//               Manage Admins
//             </button>

//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Orders Management
//             </h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Add, edit, manage Testimonials
//             </p>
//             <button
//               onClick={() => navigate("/admin/orders")}
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//             >
//               Manage orders
//             </button>

//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="mt-10 text-center text-gray-500 text-sm">
//           Admin Panel • Powered by React & Tailwind
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // 🔥 clear token
    navigate("/");               // 🔁 redirect
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 dashboard">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-lg shadow mb-6 dash-btn flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <span className="text-sm text-gray-500">
              Welcome, Admin
            </span>
          </div>

          {/* 🔴 LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* GRID MENU */}
        <div className="grid grid-cols-1 md:grid-cols-2 dash-btn gap-6">
          {/* CATEGORY MANAGEMENT CARD */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Category Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Create, update, organize and manage product categories and
              sub-categories.
            </p>
            <button
              onClick={() => navigate("/category")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Go to Categories
            </button>
          </div>

          {/* PRODUCT MANAGEMENT CARD */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Product Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Add, edit, manage products, upload images and control product
              status.
            </p>
            <button
              onClick={() => navigate("/product")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Go to Products
            </button>
          </div>

          {/* ADMIN MANAGEMENT CARD */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Admin Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Add, edit, manage admins username and password.
            </p>
            <button
              onClick={() => navigate("/admin/manageadmins")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Manage Admins
            </button>
          </div>

          {/* BANNER MANAGEMENT */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Banner Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Add, edit, manage banners
            </p>
            <button
              onClick={() => navigate("/admin/banners")}
              className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900 transition"
            >
              Manage Banners
            </button>
          </div>

          {/* TESTIMONIALS */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Testimonials Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Add, edit, manage testimonials
            </p>
            <button
              onClick={() => navigate("/admin/testimonials")}
              className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition"
            >
              Manage Testimonials
            </button>
          </div>

          {/* ORDERS */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Orders Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              View and update orders
            </p>
            <button
              onClick={() => navigate("/admin/orders")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Manage Orders
            </button>
          </div>


          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact info Management
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              View and update Contact info
            </p>
            <button
              onClick={() => navigate("/admin/contact")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Manage Contact
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
}