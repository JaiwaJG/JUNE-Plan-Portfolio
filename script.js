function showMessage() {
    window.open("https://t.me/JaiwaJG","_blank");
}
const menuBtn = document.querySelector('.menu-btn');
const navRight = document.querySelector('.nav-right');
menuBtn.addEventListener('click', () => {
    navRight.classList.toggle('active');
}
);
