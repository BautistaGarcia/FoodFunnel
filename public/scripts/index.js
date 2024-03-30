
let questionMark1 = document.getElementById("questionMark1")
let questionMark2 = document.getElementById("questionMark2")
let questionMark3 = document.getElementById("questionMark3")
let questionMark4 = document.getElementById("questionMark4")


let modalWidow = document.getElementById("modalWindow")

let closeModal = document.getElementById("closeModal")


questionMark1.addEventListener('click', () => {
    modalWidow.style.display = "flex";

});

closeModal.addEventListener('click', () => {
    modalWidow.style.display = "none";
});

let expandOffert1 = document.getElementById("expand-offert-banner1")
let offertModalWindow1 = document.getElementById("offertModalWindow1")

expandOffert1.addEventListener('click', () => {
    offertModalWindow1.style.display = "flex";

});

closeModal.addEventListener('click', () => {
    offertModalWindow1.style.display = "none";
});
