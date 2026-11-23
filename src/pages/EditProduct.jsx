import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct, categories } from "../services/api.js";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // old data form me bharna
  useEffect(() => {
    const old = getProductById(id);
    if (old) {
      setName(old.name);
      setCategory(old.category);
      setPrice(old.price);
      setStock(old.stock);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      category: category,
      price: Number(price),
      stock: Number(stock),
    };
    updateProduct(id, product);
    navigate("/products");
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form className="box formbox" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Stock</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />

        <button className="btn" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;
