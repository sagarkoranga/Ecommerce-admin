import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  const renderOptions = (cats, prefix = "") =>
    cats.flatMap(cat => [
      <option key={cat.id} value={cat.id}>
        {prefix + cat.name}
      </option>,
      ...(cat.children ? renderOptions(cat.children, prefix + "--") : []),
    ]);

  return (
    <select value={value} onChange={onChange}>
      <option value="">Select Category</option>
      {renderOptions(categories)}
    </select>
  );
}