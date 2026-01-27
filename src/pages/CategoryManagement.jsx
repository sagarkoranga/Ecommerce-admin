import React, { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";
import { getCategories } from "../services/api";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    getCategories().then(res => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      
      <CategoryForm onSaved={fetchCategories} />
     
  
    </div>
  );
}