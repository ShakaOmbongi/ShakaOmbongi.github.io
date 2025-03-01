/** 
 * Name: Shaka Ombongi
 * Date: 2025-02-28
 * CSC 372-01
 * JavaScript for Product Details Page
 */

// Function to load product details dynamically if coming from another page
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name");
    const productPrice = params.get("price");
    const productImage = params.get("image");
    const productDescription = params.get("description");
    const productMaterial = params.get("material");

    if (productName) {
        document.getElementById("product-name").textContent = productName;
        document.getElementById("product-price").textContent = `$${productPrice}`;
        document.getElementById("product-image").src = productImage;
        document.getElementById("product-description").textContent = productDescription;
        document.getElementById("product-material").textContent = productMaterial;
    }
});

/**
 * Function to add the product to the cart.
 */
function addToCart() {
    const productName = document.getElementById("product-name").textContent;
    const productPrice = document.getElementById("product-price").textContent.replace("$", "");
    const productImage = document.getElementById("product-image").src;
    const quantity = document.getElementById("quantity").value;

    const cartItem = {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        quantity: parseInt(quantity),
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${quantity} ${productName} added to cart!`);
    updateCartCount();
}

/**
 * Function to update cart count in the navbar.
 */
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}

// Initialize cart count on page load
updateCartCount();
