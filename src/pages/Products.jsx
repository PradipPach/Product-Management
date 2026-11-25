import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts, deleteProduct, categories } from "../services/api.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const [category, setCategory] = useState(
    categories.includes(requestedCategory) ? requestedCategory : "All"
  );
  const lowStockOnly = searchParams.get("filter") === "low-stock";

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
    const categoryOk = category === "All" || p.category === category;
    const stockOk = !lowStockOnly || Number(p.stock) < 5;
    return nameOk && categoryOk && stockOk;
  });

  return (
    <div>
      <div className="products-heading">
        <div>
          <p className="eyebrow">CATALOG</p>
          <h1>Products</h1>
        </div>
        <Link className="btn" to="/add-product">+ Add product</Link>
      </div>
      {lowStockOnly && (
        <p className="filter-notice">
          Showing low-stock products <Link to="/products">Clear filter</Link>
        </p>
      )}

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
