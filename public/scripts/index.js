
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


/* TIMERS PRODUCTS */
const timer = document.getElementById("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

let timeLeft = 60 * 60 * 3; // 3 hours in seconds

function updateTimer() {
  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  hours.textContent = hoursLeft.toString().padStart(2, "0");
  minutes.textContent = minutesLeft.toString().padStart(2, "0");
  seconds.textContent = secondsLeft.toString().padStart(2, "0");

  if (timeLeft == 0) {
    clearInterval(intervalId);
    timer.classList.add("timer-finished");
  }

  timeLeft--;
}

let intervalId = setInterval(updateTimer, 1000);

timer.addEventListener("click", function () {
  timeLeft = 60 * 60 * 3;
  timer.classList.remove("timer-finished");
});
/* TIMERS PRODUCTS FIN */
