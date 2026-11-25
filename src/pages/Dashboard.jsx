import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories, getProducts } from "../services/api.js";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const lowStock = products.filter((product) => Number(product.stock) < 5);
  const inventoryValue = products.reduce(
    (total, product) => total + Number(product.price) * Number(product.stock),
    0
  );
  const categoryCounts = useMemo(
    () =>
      categories.map((name) => ({
        name,
        count: products.filter((product) => product.category === name).length,
      })),
    [products]
  );
  const maxCategoryCount = Math.max(...categoryCounts.map(({ count }) => count), 1);
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="page-description">Here&apos;s what&apos;s happening with your inventory.</p>
        </div>
        <Link className="btn dashboard-add" to="/add-product">
          <span aria-hidden="true">+</span> Add product
        </Link>
      </div>

      <section className="stats-grid" aria-label="Inventory summary">
        <Link className="stat-card stat-blue" to="/products">
          <span className="stat-icon" aria-hidden="true">▦</span>
          <span className="stat-label">Total products</span>
          <strong>{products.length}</strong>
          <span className="stat-foot">View your full catalog <span aria-hidden="true">↗</span></span>
        </Link>
        <Link className="stat-card stat-violet" to="/products">
          <span className="stat-icon" aria-hidden="true">$</span>
          <span className="stat-label">Inventory value</span>
          <strong>{inventoryValue.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</strong>
          <span className="stat-foot">Based on current stock <span aria-hidden="true">↗</span></span>
        </Link>
        <Link className="stat-card stat-amber" to="/products?filter=low-stock">
          <span className="stat-icon" aria-hidden="true">!</span>
          <span className="stat-label">Low stock</span>
          <strong>{lowStock.length}</strong>
          <span className="stat-foot">Products with fewer than 5 units <span aria-hidden="true">↗</span></span>
        </Link>
        <Link className="stat-card stat-green" to="/products">
          <span className="stat-icon" aria-hidden="true">◉</span>
          <span className="stat-label">Categories</span>
          <strong>{categories.length}</strong>
          <span className="stat-foot">Browse product categories <span aria-hidden="true">↗</span></span>
        </Link>
      </section>

      <section className="dashboard-panels">
        <div className="panel category-panel">
          <div className="panel-heading">
            <div>
              <h2>Categories</h2>
              <p>Products across your catalog</p>
            </div>
            <Link className="text-link" to="/products">View all <span aria-hidden="true">→</span></Link>
          </div>
          <div className="category-list">
            {categoryCounts.map(({ name, count }, index) => (
              <Link className="category-row" key={name} to={`/products?category=${encodeURIComponent(name)}`}>
                <span className={`category-dot category-dot-${index}`} aria-hidden="true" />
                <span className="category-name">{name}</span>
                <span className="category-track" aria-hidden="true">
                  <span style={{ width: `${(count / maxCategoryCount) * 100}%` }} />
                </span>
                <strong>{count}</strong>
                <span className="category-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="panel attention-panel">
          <div className="panel-heading">
            <div>
              <h2>Needs attention</h2>
              <p>Keep popular items in stock</p>
            </div>
            <span className="attention-count">{lowStock.length}</span>
          </div>
          {lowStock.length > 0 ? (
            <div className="attention-list">
              {lowStock.slice(0, 3).map((product) => (
                <Link className="attention-item" key={product.id} to={`/edit-product/${product.id}`}>
                  <span className="attention-indicator" aria-hidden="true">!</span>
                  <span className="attention-product">
                    <strong>{product.name}</strong>
                    <small>{product.category}</small>
                  </span>
                  <span className="stock-warning">{product.stock} left</span>
                  <span className="category-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
              {lowStock.length > 3 && (
                <Link className="text-link attention-more" to="/products?filter=low-stock">
                  See all {lowStock.length} low-stock products →
                </Link>
              )}
            </div>
          ) : (
            <div className="all-stocked">
              <span aria-hidden="true">✓</span>
              <p>Everything is well stocked.</p>
            </div>
          )}
        </div>
      </section>

      <section className="panel product-panel">
        <div className="panel-heading product-panel-heading">
          <div>
            <h2>Product inventory</h2>
            <p>Search and explore your products</p>
          </div>
          <div className="dashboard-filters">
            <label className="dashboard-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search products"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
              />
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter products by category"
            >
              <option value="All">All categories</option>
              {categories.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
        </div>
        <div className="table-scroll">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th><span className="visually-hidden">Open product</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr><td className="empty-products" colSpan="6">No products match your search.</td></tr>
              ) : filteredProducts.slice(0, 6).map((product) => {
                const isLowStock = Number(product.stock) < 5;
                return (
                  <tr key={product.id}>
                    <td><strong className="product-name">{product.name}</strong></td>
                    <td><span className="product-category">{product.category}</span></td>
                    <td>{Number(product.price).toLocaleString(undefined, { style: "currency", currency: "USD" })}</td>
                    <td>{product.stock}</td>
                    <td><span className={`stock-status ${isLowStock ? "status-low" : "status-good"}`}>{isLowStock ? "Low stock" : "In stock"}</span></td>
                    <td><Link className="row-link" to={`/edit-product/${product.id}`} aria-label={`Edit ${product.name}`}>→</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredProducts.length > 6 && (
          <div className="table-footer">
            <span>Showing 6 of {filteredProducts.length} products</span>
            <Link className="text-link" to="/products">View all products <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
