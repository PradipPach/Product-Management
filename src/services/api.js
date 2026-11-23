export const categories = ["Electronics", "Grocery", "Clothing", "Stationery"];

const demoData = [
  { id: 1, name: "Mouse", category: "Electronics", price: 500, stock: 20 },
  { id: 2, name: "Rice", category: "Grocery", price: 450, stock: 40 },
  { id: 3, name: "T-Shirt", category: "Clothing", price: 350, stock: 3 },
  { id: 4, name: "Notebook", category: "Stationery", price: 120, stock: 60 },
];

export function loginUser(email, password) {
  if (email === "admin@gmail.com" && password === "123456") {
    return "abc123token";
  }
  return null;
}

export function getProducts() {
  const data = localStorage.getItem("products");
  if (data == null) {
    localStorage.setItem("products", JSON.stringify(demoData));
    return demoData;
  }
  return JSON.parse(data);
}

export function getProductById(id) {
  const list = getProducts();
  return list.find((item) => item.id == id);
}

export function addProduct(product) {
  const list = getProducts();
  product.id = Date.now();
  list.push(product);
  localStorage.setItem("products", JSON.stringify(list));
}

export function updateProduct(id, product) {
  const list = getProducts();
  const index = list.findIndex((item) => item.id == id);
  product.id = list[index].id;
  list[index] = product;
  localStorage.setItem("products", JSON.stringify(list));
}

export function deleteProduct(id) {
  const list = getProducts();
  const newList = list.filter((item) => item.id != id);
  localStorage.setItem("products", JSON.stringify(newList));
}
