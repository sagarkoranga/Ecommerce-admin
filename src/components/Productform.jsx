// import React, { useState, useEffect } from "react";
// import { createProduct, updateProduct, uploadImages } from "../services/api.js";
// import CategorySelect from "./Categoryselect";

// export default function ProductForm({ product, onSaved }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState(0);
//   const [categoryId, setCategoryId] = useState("");

//   const [newImages, setNewImages] = useState([]); 
//   const [existingImages, setExistingImages] = useState([]); 
//   const [previews, setPreviews] = useState([]); 
//   useEffect(() => {
//     if (product) {
//       setTitle(product.title);
//       setDescription(product.description);
//       setPrice(product.price);
//       setCategoryId(product.categoryId);

//       const imgs = Array.isArray(product.images) ? product.images : [];

//       setExistingImages(imgs);


//       const previewUrls = imgs.map(img =>
//         img.startsWith("/uploads")
//           ? `http://localhost:3000${img}`
//           : img
//       );

//       setPreviews(previewUrls);
//       setNewImages([]);
//     }
//   }, [product]);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     setNewImages(prev => [...prev, ...files]);

//     const newPreviews = files.map(file => URL.createObjectURL(file));

//     setPreviews(prev => [...prev, ...newPreviews]);
//   };

//   const removeImage = (index) => {
//     const img = previews[index];

//     if (img.startsWith("blob")) {

//       const newIndex = index - existingImages.length;
//       setNewImages(prev => prev.filter((_, i) => i !== newIndex));
//     } else {

//       setExistingImages(prev => prev.filter((_, i) => i !== index));
//     }

//     setPreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let uploadedImagePaths = [...existingImages]; 

//     if (newImages.length > 0) {
//       const formData = new FormData();
//       newImages.forEach(img => formData.append("images", img));

//       const res = await uploadImages(formData);
//       console.log("Uploaded image paths:", res.data);
//       uploadedImagePaths = [...existingImages, ...res.data];
//     }


//     const productFormData = new FormData();

//     productFormData.append("title", title);
//     productFormData.append("description", description);
//     productFormData.append("price", price);
//     productFormData.append("categoryId", categoryId);


//     uploadedImagePaths.forEach(img => {
//       productFormData.append("images", img);
//     });

//     const payload = {
//       title,
//       description,
//       price: Number(price),
//       categoryId: Number(categoryId),
//       images: uploadedImagePaths,
//     };

//     if (product?.id) {
//       await updateProduct(product.id, productFormData);
//     } else {
//       await createProduct(payload);
//     }

//     onSaved();
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mb-6">
//       <h2 className="text-xl font-semibold mb-4">
//         {product ? "Edit Product" : "Add New Product"}
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           placeholder="Product Title"
//           required
//         />

//         <textarea
//           className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={description}
//           onChange={e => setDescription(e.target.value)}
//           placeholder="Description"
//           required
//         />

//         <input
//           type="number"
//           className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           placeholder="Price"
//           required
//         />

//         <CategorySelect
//           value={categoryId}
//           onChange={e => setCategoryId(e.target.value)}
//         />

//         <div className="border-dashed border-2 border-gray-300 p-4 rounded text-center">
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             className="cursor-pointer"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             Select multiple product images
//           </p>
//         </div>

//         {previews.length > 0 && (
//           <div className="flex flex-wrap gap-3 mt-3">
//             {previews.map((img, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={img}
//                   alt="preview"
//                   className="w-20 h-20 object-cover border rounded"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           {product ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { createProduct, updateProduct, uploadImages } from "../services/api";
import CategorySelect from "./Categoryselect";

export default function ProductForm({ product, onSaved }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.categoryId);

      const imgs = Array.isArray(product.images) ? product.images : [];
      setExistingImages(imgs);
      setPreviews(imgs);
      setNewImages([]);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews([...existingImages, ...urls]);
  };

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);

    if (index < existingImages.length) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages(newImages.filter((_, i) => i !== newIndex));
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    let uploadedImagePaths = [...existingImages];

    if (newImages.length > 0) {
      const formData = new FormData();
      newImages.forEach(img => formData.append("images", img));

      const res = await uploadImages(formData);
      uploadedImagePaths = [...existingImages, ...res.data];
    }

    const payload = {
      title,
      description,
      price: Number(price),
      categoryId: Number(categoryId),
      images: uploadedImagePaths,
    };

    if (product?.id) {
      await updateProduct(product.id, payload);
    } else {
      await createProduct(payload);
    }

    onSaved();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Product Title"
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          required
        />

        <CategorySelect
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        />

        <div className="border-dashed border-2 p-4 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {previews.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={
                    img.startsWith("blob")
                      ? img
                      : `https://ecommerce-backend.onrender.com${img}`
                  }
                  alt="preview"
                  className="w-20 h-20 object-cover border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}