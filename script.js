// Define an array to store items in the cart
let cart = [];

// Function to add item to cart
function addToCart(productName) {
  cart.push(productName);
  updateCart(); // Update the cart display
}

// Function to update cart display
function updateCart() {
  // Get the cart element
  let cartElement = document.getElementById("cart");

  // Clear previous contents
  cartElement.innerHTML = "";

  // Add each item to the cart
  cart.forEach((item) => {
    let itemElement = document.createElement("li");
    itemElement.textContent = item;
    cartElement.appendChild(itemElement);
  });
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".product button").forEach((button) => {
  button.addEventListener("click", function () {
    let productName = this.parentNode.querySelector("h2").textContent;
    addToCart(productName);
  });
});

// Call updateCart initially to display an empty cart
updateCart();
