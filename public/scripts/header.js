var burguerMenuBtn = document.querySelector(`#btnMenu`);
var menuBurguer = document.querySelector('#burguerMenu');
var CloseBurguerMenuBtn = document.querySelector(`#closeBMBtn`);

burguerMenuBtn.addEventListener('click', () => {
    menuBurguer.style.right = '0%';

});

CloseBurguerMenuBtn.addEventListener('click', () => {
    menuBurguer.style.right = '-100%';

});

var userDescriptionBtn = document.getElementById('email-burguerMenu');
var userDescriptionContainer = document.getElementById('userDescription-burguerMenu');

function showModalBurguerMenu() {
    if (userDescriptionContainer.style.display == 'none') {
        userDescriptionContainer.style.display = 'flex'
    } else {
        userDescriptionContainer.style.display = 'none'
    }
}

