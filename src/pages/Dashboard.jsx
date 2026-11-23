import { useState, useEffect } from "react";
import { getProducts, categories } from "../services/api.js";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const lowStock = products.filter((p) => p.stock < 5).length;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="box">
          <p>Total Products</p>
          <h2>{products.length}</h2>
        </div>
        <div className="box">
          <p>Categories</p>
          <h2>{categories.length}</h2>
        </div>
        <div className="box">
          <p>Low Stock</p>
          <h2>{lowStock}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
