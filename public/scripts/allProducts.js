

let showFilterSectionBtn = document.querySelector(".show-filter-sectionBtn");
let filterModalWindow = document.querySelector(".filter-modalWindow");


function showModalFilter() {
    if (filterModalWindow.style.display == 'none') {
        filterModalWindow.style.display = 'flex'
    } else {
        filterModalWindow.style.display = 'none'
    }
}