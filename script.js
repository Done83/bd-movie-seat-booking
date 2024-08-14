const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = parseInt(movieSelect.value);

// Update number of seats selected
const updateSelectedCount = () => {
  const slectedSeats = document.querySelectorAll(".row .seat.selected");
  const slectedSeatsCount = slectedSeats.length;

  count.innerText = slectedSeatsCount;
  total.innerText = slectedSeatsCount * ticketPrice;
};

// Seat click even listener
container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("seat") &&
    !event.target.classList.contains("occupied")
  ) {
    event.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

// Movie selection listener
movieSelect.addEventListener("change", (event) => {
  ticketPrice = parseInt(event.target.value);
  updateSelectedCount();
});
