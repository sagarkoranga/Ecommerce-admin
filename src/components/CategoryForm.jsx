import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api.js";
import CategoryTree from "../components/CategoryTree";
import { useNavigate } from "react-router-dom";

export default function CategoryManagement() {
    const navigate=useNavigate();
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [editing, setEditing] = useState(null);
  const [categories, setCategories] = useState([]);

  const loadTree = () =>
    getCategories().then((res) => setCategories(res.data));

  useEffect(() => {
    loadTree();
  }, []);

  const submit = async () => {
    if (editing) {
      await updateCategory(editing.id, { name, parentId });
    } else {
      await createCategory({ name, parentId });
    }
    setName("");
    setParentId("");
    setEditing(null);
    loadTree();
  };

  const renderOptions = (cats, prefix = "") =>
    cats.flatMap((cat) => [
      <option key={cat.id} value={cat.id}>
        {prefix + cat.name}
      </option>,
      ...(cat.children ? renderOptions(cat.children, prefix + "--") : []),
    ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Category Management
        </h2>

        {/* FORM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={parentId}
            onChange={(e) => setParentId(Number(e.target.value))}
          >
            <option value="">Parent Category (optional)</option>
            {renderOptions(categories)}
          </select>
        </div>

        <button
          onClick={submit}
          className={`px-4 py-2 rounded text-white transition ${
            editing
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editing ? "Update Category" : "Create Category"}
        </button>
        <button className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700  ml-20" onClick={()=>navigate('/category-list')}>
            Category Tree
        </button>

        <hr className="my-6" />

        {/* CATEGORY TREE */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-2">Category Tree</h3>

          <CategoryTree
            categories={categories}
            onEdit={(cat) => {
              setEditing(cat);
              setName(cat.name);
              setParentId(cat.parentId || "");
            }}
            onDelete={async (id) => {
              await deleteCategory(id);
              loadTree();
            }}
          />
        </div>
      </div>
    </div>
  );
}