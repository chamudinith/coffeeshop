let search = document.querySelector(".search-box");

document.querySelector("#search-icon").onclick = () => {
  search.classList.toggle("active");
  navbar.classList.remove("active");
};

let navbar = document.querySelector(".navbar");

document.querySelector("#menu-icon").onclick = () => {
  navbar.classList.toggle("active");
  search.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  search.classList.remove("active");
};

// cart

// Add these to your script.js
const cartTab = document.querySelector(".cart-tab");
const cartButton = document.querySelector(".cart-box-button");
const closeButton = document.querySelector(".close");

// Toggle cart when cart icon is clicked
cartButton.addEventListener("click", () => {
  cartTab.classList.toggle("active");
});

// Close cart when close button is clicked
closeButton.addEventListener("click", () => {
  cartTab.classList.remove("active");
});

// Close cart when clicking outside
document.addEventListener("click", (e) => {
  if (!cartTab.contains(e.target) && !cartButton.contains(e.target)) {
    cartTab.classList.remove("active");
  }
});

//chadni
document.addEventListener("DOMContentLoaded", function () {
  // Selecting elements
  const addToCartButtons = document.querySelectorAll(".content a");
  const cartButton = document.querySelector(".cart-box-button");
  const cartContainer = document.querySelector(".list-cart");
  const cartTab = document.querySelector("#cart-tab");
  const closeButton = document.querySelector(".close");
  const totalPriceContainer = document.createElement("div"); // Total Price Element
  totalPriceContainer.classList.add("cart-total");

  // Function to load cart from localStorage and display in cart section
  function loadCart() {
    cartContainer.innerHTML = ""; // Clear cart before updating
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty!</p>";
      totalPriceContainer.innerHTML = "";
      return;
    }

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("item");
      let itemTotalPrice = item.price * item.quantity; // Calculate item total
      totalPrice += itemTotalPrice;
      cartItem.innerHTML = `
                <div class="image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="name">${item.name}</div>
                <div class="totalprice">Rs. ${item.price}</div>
                <div class="quantity">
                    <button class="minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus" data-index="${index}">+</button>
                </div>
                <button class="remove" data-index="${index}">Remove</button>
            `;
      cartContainer.appendChild(cartItem);
    });
    totalPriceContainer.innerHTML = `<h2>Total: Rs. ${totalPrice}</h2>`;
    cartContainer.appendChild(totalPriceContainer);

    attachCartEventListeners();
  }

  // Function to attach event listeners to +, -, and remove buttons
  function attachCartEventListeners() {
    document.querySelectorAll(".minus").forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });

    document.querySelectorAll(".plus").forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", removeItem);
    });
  }

  // Add item to cart (same as previous step)
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const productBox = this.closest(".box");
      const image = productBox.querySelector("img").src;
      const name = productBox.querySelector("h3").innerText;
      let price = productBox.querySelector("span").innerText;
      price = price.replace("Rs.", "").replace("/=", "").trim(); // Clean price
      price = parseInt(price);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if item exists
      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          image,
          name,
          price,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });

  // Open cart when clicking the cart icon
  cartButton.addEventListener("click", function () {
    cartTab.style.display = "block"; // Show cart
    loadCart(); // Load items into cart
  });

  // Close cart when clicking the close button
  closeButton.addEventListener("click", function () {
    cartTab.style.display = "none"; // Hide cart
  });

  // Decrease quantity function
  function decreaseQuantity(event) {
    const index = event.target.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1); // Remove item if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  // Increase quantity function
  function increaseQuantity(event) {
    const index = event.target.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  // Remove item function
  function removeItem(event) {
    const index = event.target.dataset.index;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
});
