import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct, categories } from "../services/api.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const filtered = products.filter((p) => {
    const nameOk = p.name.toLowerCase().includes(search.toLowerCase());
    const catOk = category == "All" || p.category == category;
    return nameOk && catOk;
  });

  return (
    <div>
      <h1>Products</h1>

      <div className="top">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Link className="btn" to="/add-product">Add Product</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length == 0 && (
            <tr><td colSpan="5">No products found</td></tr>
          )}
          {filtered.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Link className="btn small" to={"/edit-product/" + p.id}>Edit</Link>
                <button className="btn small red" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
