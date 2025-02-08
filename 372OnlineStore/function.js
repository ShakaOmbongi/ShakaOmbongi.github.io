// making affects when button is pressed
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn, button");
    
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // pressed class on the clicked button
        btn.classList.toggle("pressed");
        console.log("Button clicked:", btn.innerText);
      });
    });
  });
  