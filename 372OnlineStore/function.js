document.addEventListener("DOMContentLoaded", function () {
  // Select only the add-to-cart buttons
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

  // Get the element that displays the cart count (ensure this exists in your HTML)
  const cartCountElement = document.getElementById("cart-count");

  // Initialize cart count from localStorage (or 0 if not set)
  let cartCount = localStorage.getItem("cartCount")
    ? parseInt(localStorage.getItem("cartCount"))
    : 0;
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }

  // Add event listener to each add-to-cart button
  addToCartButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Add visual feedback: add the 'pressed' class briefly
      btn.classList.add("pressed");

      // Increase the cart count and update localStorage
      cartCount++;
      localStorage.setItem("cartCount", cartCount);

      // Update the cart count in the navigation
      if (cartCountElement) {
        cartCountElement.textContent = cartCount;
      }

      // Provide an alert as confirmation
      alert("Item added to cart!");

      // Remove the 'pressed' class after a short delay (200ms)
      setTimeout(() => {
        btn.classList.remove("pressed");
      }, 200);
    });
  });
});
