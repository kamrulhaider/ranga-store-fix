// API calling 
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data))
};
loadProducts();

// show all product in UI 
const showProducts = products => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product mx-2 my-4">
      <div>
    <img class="product-image img-fluid" src="${image}"></img>
      </div>
      <h4>${product.title.slice(0, 30)}</h4>
      <p>Category: ${product.category}</p>
      <h3>Price: $ ${product.price}</h3>
      <p class="d-inline-block">Rating: ${product.rating.rate}</p>
      <p class="d-inline-block ms-3">Rated by: ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now">add to cart</button>
      <button id="details-btn" class="details">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Product count and function call 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  document.getElementById("total-Products").innerText = count;
  updateTaxAndCharge();
  updateTotal();
};

// value conversion into floating point
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  setInnerText("total", grandTotal);
};