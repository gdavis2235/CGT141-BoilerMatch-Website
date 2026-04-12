
//highlights selected element with css class selected (used for interests)
function toggleSelect(element) {
  element.classList.toggle("selected");
}

//process of going to swipe page
function goToSwipe() {
  //check if at least one interest is selected
  const selected = document.querySelectorAll(".selected");

  if (selected.length === 0) {
    alert("Please select at least one interest!");
    return;
  }

  //for now, just go to swipe page without saving interests
  window.location.href = "swipe.html";
}

//swipe page js
function swipeLeft() {
  const card = document.getElementById("card");

  //animate card off the screen to the left and fade out
  card.style.transform = "translateX(-400px) rotate(-20deg)";
  card.style.opacity = "0";

  //wait 300ms then load the next card
  setTimeout(() => {
    loadNextCard();
  }, 300);
}

function swipeRight() {
  const card = document.getElementById("card");

  //animate card off the screen to the right and fade out
  card.style.transform = "translateX(400px) rotate(20deg)";
  card.style.opacity = "0";

  //wait 300ms then load the next card
  setTimeout(() => {
    loadNextCard();
  }, 300);
}

//array of club objects with name, members, description, meeting time, tags, and image
//basically mock database of clubs
const clubs = [
  {
    name: "ACM Purdue Chapter",
    members: "287 members",
    desc: "ACM (Association for Computing Machinery) at Purdue is an organization for connecting students, faculty and companies for the betterment of the computing community. As a representative of one the world's most influential computing organizations, we provide academic resources, forums for the spreading of ideas, and communities for technological discovery and growth.",
    time: "Wednesdays 7 PM",
    tags: ["Technology", "Computing"],
    img: "images/acm.jpg"
  },
  {
    name: "Purdue Art Community",
    members: "120 members",
    desc: "Purdue Art Community is a club where students from any discipline can create works of art and participate in art-related projects. Students will be able to work with many mediums (sketching, watercolor, and acrylics to name a few) and gain new art skills or fine-tune their unique styles, though no background in art is required. In addition to weekly meetings, we hold social events that occur on a monthly basis. Activities for socials typically involve going out for dessert/food, making pottery, or game nights, but we like to change it up! We are also dedicated to serving campus and the local community through art, and occasionally take on larger projects (such as murals) to bring more art to campus and the West Lafayette/Lafayette area when opportunities arise. ",
    time: "Fridays 6 PM",
    tags: ["Art"],
    img: "images/art.jpg"
  }
];

//index to keep track of which club card is currently being shown
let currentIndex = 0;

//function to load the next club card into the swipe interface
function loadNextCard() {
  //if all clubs have been swiped, show an alert and stop
  if (currentIndex >= clubs.length) {
    alert("You have swiped through all available clubs!");
    return;
  }

  //get the current club and card element
  const club = clubs[currentIndex];
  const card = document.getElementById("card");

  //reset card position and opacity for animation
  card.style.transform = "none";
  card.style.opacity = "1";

  //create HTML for the club's tags by looping through the tags array and creating a span element for each tag
  let tagsHTML = "";
  //loop through each tag in the club tags array
  for (let i = 0; i < club.tags.length; i++) {
      //take the current tag and wrap it in a span element, then add it to the tagsHTML string
      tagsHTML += "<span>" + club.tags[i] + "</span>";
    }

  //populate card with club info from the clubs array
  //for the tags. instead of just inserting the club.tags array, we insert the tagsHTML string which contains all the club's tags wrapped in span elements for styling
  card.innerHTML = `
    <img src="${club.img}">
    <div class="card-content">
      <h2>${club.name}</h2>
      <p class="members">${club.members}</p>
      <p class="description">${club.desc}</p>
      <p class="time">🕒 ${club.time}</p>
      <div class="tags">
      ${tagsHTML}
      </div>
    </div>
  `;

  //increment index for the next card/club
  currentIndex++;
}

//when the page loads, load the first club card
window.onload = function() {
    loadNextCard();
};