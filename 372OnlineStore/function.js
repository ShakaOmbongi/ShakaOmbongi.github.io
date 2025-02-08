document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn, button");
    
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        //  pressed class on click for visual feedback
        btn.classList.toggle("pressed");
        console.log("Button clicked:", btn.innerText);
        
        // add to cart alert
        if (btn.innerText.includes("Add to Cart")) {
          alert("Item added to cart!");
        }
      });
    });
  });
  