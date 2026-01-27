// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getCategoriesbyid } from "../services/api";

// export default function ProductsByCategory() {
//   const { id } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getCategoriesbyid(id).then(res => setProducts(res.data));
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Products</h2>

//       <div className="grid grid-cols-5 gap-4">
//         {products.map(p => (
//           <div key={p.id} className=" w-60 p-3 rounded shadow-2xl">
//                {Array.isArray(p.images) && p.images.length > 0 && (
//               <img
//                 src={`http://localhost:3000${p.images[0]}`}
//                 alt={p.title}
//                 className=" h-60 object-cover rounded-sm mb-2"
//               />
//             )}
//             <h3 className="font-semibold">{p.title}</h3>
//             <p>₹ {p.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }