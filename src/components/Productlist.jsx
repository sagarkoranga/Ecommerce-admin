import React, { useEffect, useState } from "react";
import { getProducts, updateProductStatus } from "../services/api";
import ProductForm from "./Productform";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = () => {
        getProducts().then(res => setProducts(res.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleStatus = async (id, status) => {
        await updateProductStatus(id, !status);
        fetchProducts();
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl  text-center font-bold mb-4">Product Management</h2>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <ProductForm
                        product={editingProduct}
                        onSaved={() => {
                            setEditingProduct(null);
                            fetchProducts();
                        }}
                    />
                </div>

                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Images</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{p.id}</td>
                                    <td className="px-4 py-3 font-medium">{p.title}</td>
                                    <td className="px-4 py-3">{p.category?.name || "-"}</td>
                                    <td className="px-4 py-3 font-semibold">₹ {p.price}</td>

                                    <td className="px-4 py-3">
                                        <div className="flex gap-2 flex-wrap">
                                            {p.images?.map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={`https://ecommerce-backend-alnr.onrender.com/uploads${img}`}
                                                    alt="product"
                                                    className="w-12 h-12 object-cover rounded border transition-transform duration-300 hover:scale-110"
                                                />
                                            ))}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingProduct(p)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => toggleStatus(p.id, p.status)}
                                                className={`px-3 py-1 text-white rounded ${p.status ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                                    }`}
                                            >
                                                {p.status ? "Deactivate" : "Activate"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <p className="text-center py-4 text-gray-500">No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}