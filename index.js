const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
populateUI();

const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  console.log(seatsIndex);
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

function setMovieData(price,index){
  localStorage.setItem("selectedPrice",price)
  localStorage.setItem("movieIndex",index)
}
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length >0){
    selectedSeats.forEach((seat,index)=>{
      if(selectedSeats.indexOf(index)>-1){
        seat.classList.add('selected')
      }
    })
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.value,e.target.selectedIndex)
  updateSelectedCount();
});
