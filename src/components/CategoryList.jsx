// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getCategoriesbyid, getProductById } from "../services/api";

// export default function CategoryList({ categories }) {
  
//   const [openMap, setOpenMap] = useState({});
//   const [activeId, setActiveId] = useState(null);
//   const [products, setProducts] = useState([]);
  
  
//   const navigate = useNavigate();



  

//   const toggle = (level, id) => {
//     setOpenMap((prev) => ({
//       ...prev,
//       [level]: prev[level] === id ? null : id,
//     }));
//   };

//   // ✅ WHEN CATEGORY CLICKED → LOAD PRODUCTS HERE (SAME PAGE)
//   const onSelect = async (id) => {
//     const res = await getCategoriesbyid(id);
//     setProducts(res.data);
//   };

//   const renderTree = (cats, level = 0) =>
//     cats.map((cat) => {
//       const hasChildren = cat.children && cat.children.length > 0;
//       const isOpen = openMap[level] === cat.id;
//       const isActive = activeId === cat.id;

//       return (
//         <div key={cat.id} className="w-full">
//           {/* Accordion Header */}
//           <div
//             className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all
//               ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}
//               ${level === 0 ? "font-semibold" : "text-sm"}
//             `}
//             style={{ marginLeft: level * 16 }}
//             onClick={() => {
//               setActiveId(cat.id);
//               hasChildren ? toggle(level, cat.id) : onSelect(cat.id);
//             }}
//           >
//             {hasChildren && (
//               <span
//                 className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""
//                   }`}
//               >
//                 ▶
//               </span>
//             )}
//             {!hasChildren && <span className="w-4">•</span>}
//             <span>{cat.name}</span>
//           </div>

//           {/* Accordion Body */}
//           {hasChildren && (
//             <div
//               className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                 }`}
//             >
//               <div className="pl-2 border-l border-gray-300 ml-2">
//                 {renderTree(cat.children, level + 1)}
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     });

//   return (
//     <div className="flex h-screen">
//       {/* LEFT SIDEBAR */}
//       <div className="w-64 bg-white h-screen border-r shadow-md p-3 flex flex-col">
//         <h3 className="text-lg font-semibold mb-3 px-2">Categories</h3>

//         <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
//           <div className="space-y-1">
//             {renderTree(categories)}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: PRODUCTS PANEL */}
//       <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Products</h2>

//         {products.length === 0 ? (
//           <p className="text-gray-500">Select a category to view products</p>
//         ) : (
//           <div className="grid grid-cols-4 gap-6">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className=" rounded-lg transition-transform transform duration-300 hover:scale-105 p-3 shadow-lg hover:shadow-2xl  cursor-pointer bg-white"
//                 onClick={() => navigate(`/products/${p.id}`)}
//               >
//                 {/* SHOW FIRST IMAGE */}
//                 {Array.isArray(p.images) && p.images.length > 0 && (
//                   <img
                    
//                     src={`http://localhost:3000${p.images[0]}`}
//                     alt={p.title}
//                     className="w-full h-90  object-cover rounded-md mb-2"
//                   />
//                 )}

              
//                 <h3 className="font-semibold">{p.title}</h3>
//                 <p className="text-green-700 font-bold">₹ {p.price}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoriesbyid, getProductById } from "../services/api";

export default function CategoryList({ categories }) {

  const [openMap, setOpenMap] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggle = (level, id) => {
    setOpenMap((prev) => ({
      ...prev,
      [level]: prev[level] === id ? null : id,
    }));
  };

  // Load products when category clicked
  const onSelect = async (id) => {
    const res = await getCategoriesbyid(id);
    setProducts(res.data);
    setSelectedProduct(null); // reset detail panel
  };

  // Load single product details when product clicked
  const openProductDetails = async (id) => {
    const res = await getProductById(id);
    setSelectedProduct(res.data);
  };

  const renderTree = (cats, level = 0) =>
    cats.map((cat) => {
      const hasChildren = cat.children && cat.children.length > 0;
      const isOpen = openMap[level] === cat.id;
      const isActive = activeId === cat.id;

      return (
        <div key={cat.id} className="w-full">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all
              ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"}
            `}
            style={{ marginLeft: level * 16 }}
            onClick={() => {
              setActiveId(cat.id);
              hasChildren ? toggle(level, cat.id) : onSelect(cat.id);
            }}
          >
            {hasChildren && (
              <span
                className={`text-gray-500 transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            )}
            {!hasChildren && <span className="w-4">•</span>}
            <span>{cat.name}</span>
          </div>

          {hasChildren && (
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-2 border-l border-gray-300 ml-2">
                {renderTree(cat.children, level + 1)}
              </div>
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="flex h-screen">

      {/* LEFT: CATEGORY SIDEBAR */}
      <div className="w-64 bg-white h-screen border-r shadow-md p-3 flex flex-col">
        <h3 className="text-lg font-semibold mb-3 px-2">Categories</h3>
        <div className="flex-1 overflow-y-auto pr-1">
          {renderTree(categories)}
        </div>
      </div>

      {/* MIDDLE: PRODUCT GRID */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">Select a category to view products</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-lg p-3 shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => openProductDetails(p.id)}
              >
                {Array.isArray(p.images) && p.images.length > 0 && (
                  <img
                    src={`https://ecommerce-backend-alnr.onrender.com${p.images[0]}`}
                    alt={p.title}
                    className="w-full h-52 object-cover rounded-md mb-2"
                  />
                )}
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-green-700 font-bold">₹ {p.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: PRODUCT DETAIL PANEL */}
      <div className="w-1/3 bg-white border-l shadow-md p-6 overflow-y-auto">
        {selectedProduct ? (
          <>
            <h2 className="text-2xl font-bold mb-3">
              {selectedProduct.title}
            </h2>

            {/* ALL IMAGES */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {selectedProduct.images?.map((img, i) => (
                <img
                  key={i}
                  src={`https://ecommerce-backend-alnr.onrender.com${img}`}
                  alt="product"
                  className="w-full h-40 object-cover rounded-md"
                />
              ))}
            </div>

            <p className="mb-3">{selectedProduct.description}</p>
            <p className="text-xl font-bold text-green-700 mb-2">
              ₹ {selectedProduct.price}
            </p>
            <p className="text-gray-600">
              Category: {selectedProduct.category?.name}
            </p>

            
          </>
        ) : (
          <p className="text-gray-500">
            Click a product to see details here
          </p>
        )}
      </div>
    </div>
  );
}