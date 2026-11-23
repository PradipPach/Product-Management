import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, categories } from "../services/api.js";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      category: category,
      price: Number(price),
      stock: Number(stock),
    };
    addProduct(product);
    navigate("/products");
  };

  return (
    <div>
      <h1>Add Product</h1>
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

        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddProduct;
