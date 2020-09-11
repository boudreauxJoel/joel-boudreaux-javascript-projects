const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// function to add "0" to front of minutes in date display and countdown timer
function format(item)
{
  if (item < 10)
  {
    return item = `0${item}`;
  }
  return item;
}

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");


let futureDate = new Date(2020, 11, 25, 13, 0, 0);

const year = futureDate.getFullYear();
// gives a value 0-11
const month = months[futureDate.getMonth()];
const day = futureDate.getDate();
// gives a value 0-6 Sunday: 0
const weekday = weekdays[futureDate.getDay()];
let hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// if time is after 12pm, revert to standard time from military time
// and set proper time suffix
let morning = "AM";
if(hours > 12)
{
  hours -= 12;
  morning = "PM";
}


// must use grave key " ` " when setting textContent
giveaway.textContent = `giveaway ends on ${weekday}, ${month} ${day} ${year} at ${hours}:${format(minutes)} ${morning}`;

// gets milliseconds
const futureTime = futureDate.getTime();

function getRemainingTime()
{
  const today = new Date().getTime();
  const t = futureTime - today;

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1 day  = 24hr

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  items.forEach(function(item, index)
  {
    item.innerHTML = format(values[index]);
  });

  let countdown = setInterval(getRemainingTime, 1000);

  // if deadline has passed
  if (t < 0)
  {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class = expired>sorry, this giveaway has expired</h4>`;
  }
}

getRemainingTime();