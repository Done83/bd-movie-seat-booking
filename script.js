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

  // Copy selected seats into the array
  const seatsIndex = [...slectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = slectedSeatsCount;
  total.innerText = slectedSeatsCount * ticketPrice;
};

// Save selected movie index and value
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selctedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Movie selection listener
movieSelect.addEventListener("change", (event) => {
  ticketPrice = parseInt(event.target.value);
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

// Get data from localStorage and populate UI
const populateUI = () => {
  const seatsSelected = JSON.parse(localStorage.getItem("selectedSeats"));
  if (seatsSelected !== null && seatsSelected.length > 0) {
    seats.forEach((seat, index) => {
      if (seatsSelected.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

populateUI();

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

updateSelectedCount();
