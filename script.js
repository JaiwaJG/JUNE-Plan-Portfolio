function showMessage() {
    window.open("https://t.me/JaiwaJG","_blank");
}

const menuBtn = document.querySelector(".menu-btn");
const navRight = document.querySelector(".nav-right");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navRight.classList.toggle("active");
});

const navLinks = document.querySelectorAll(".nav-right a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navRight.classList.remove("active");
    });
});
