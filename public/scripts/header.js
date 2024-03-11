var burguerMenuBtn = document.querySelector(`#btnMenu`);
var menuBurguer = document.querySelector('#burguerMenu');
var CloseBurguerMenuBtn = document.querySelector(`#closeBMBtn`);

burguerMenuBtn.addEventListener('click', () => {
    // menuBurguer.style.animation = "all .7s showMenu ease-in-out";
    menuBurguer.style.right = '0%';

})

CloseBurguerMenuBtn.addEventListener('click', () => {
    // menuBurguer.style.animation = "all .7s showMenu ease-in-out";
    menuBurguer.style.right = '-100%';

})