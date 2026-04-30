
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

  // save liked club to local storage matches array
  const likedClub = clubs[currentIndex - 1];

  let matches = JSON.parse(localStorage.getItem("matches")) || [];
  matches.push(likedClub);
  localStorage.setItem("matches", JSON.stringify(matches));

  //swiping animation
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
  },
  {
    name: "Purdue Airsoft Club",
    members: "25 members",
    desc: "The Purdue Airsoft Club is dedicated to promoting the sport of airsoft within the Purdue community and upholding values such as teamwork, integrity and fitness. All club members have FREE access to over $10,000 in high quality airsoft guns, tactical gear, uniforms, safety gear, and other equipment such as radios for team communication. BBs are provided for free. All members get free equipment  'rentals'. Additionally, we provide an off-campus storage unit for all personal airsoft guns, as they cannot be stored on campus per Purdue rules. Everyone in the club loves the sport of airsoft, and we want to share it with as many people as possible!",
    time: "Mondays 6:30 PM",
    tags: ["Fitness", "Entertainment"],
    img: "images/airsoft.jpg"
  },
  {
    name: "Afghan Students Association of Purdue",
    members: "10 members",
    desc: "The Afghan Student Association works to showcase Afghan culture and educate the Purdue community about Afghanistan.",
    time: "Tuesdays 7 PM",
    tags: ["Cultural"],
    img: "images/asap.jpg"
  },
  {
    name: "Graduate Women in Business",
    members: "10 members",
    desc: "Graduate Women in Business is dedicated to empowering and supporting women in business, as well as preparing women for leadership positions and diversity in the workplace. This organization works to achieve this goal through education, professional development, networking, and collaboration. Leveraging the experiences of participation in information sessions with major companies, networking events with Purdue Krannert Women Alumni, skill development opportunities with other graduate students, and career fair preparation, we seek to provide multiple opportunities to truly give members valuable, empowering experiences to incorporate both personally and professionally.",
    time: "Thursdays 6 PM",
    tags: ["Business", "Cultural"],
    img: "images/gwib.jpg"
  },
  {
    name: "Nursing Community Service",
    members: "15 members",
    desc: "Nursing Community Service Organization plays many roles both on Purdue's campus as well as the Lafayette community. We look forward to assisting our partners in Lafayette as well as any other organizations that are willing to work with us. As an organization, our focus involves: Providing support to our Lafayette community through acts of service such as volunteer and fundraising events, Coordinating service projects between all classes, faculty, and student organizations within the School of Nursing, Uniting the School of Nursing students and faculty to perform acts of service to the Lafayette community, and Getting nursing students involved in both their major and community",
    time: "Fridays 5 PM",
    tags: ["Service", "Fitness"],
    img: "images/nursing.jpg"
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

//matches page js
function loadMatches() {
  const container = document.getElementById("matches-container");

  if (!container) return; //only run on matches page

  const matches = JSON.parse(localStorage.getItem("matches")) || [];

  if (matches.length === 0) {
    container.innerHTML = "<p>No matches yet!</p>";
    return;
  }

  let html = "";

  for (let i = 0; i < matches.length; i++) {
    const club = matches[i];

    html += `
      <div class="match-card">
        <img src="${club.img}">
        <h3>${club.name}</h3>
        <p>${club.members}</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

//add club page js
//function to add a new club from the add club page form and save it to local storage
function addClub() {
  const name = document.getElementById("club-name").value;
  const members = document.getElementById("club-members").value;
  const time = document.getElementById("club-time").value;
  const tags = document.getElementById("club-tags").value.split(",");
  const desc = document.getElementById("club-desc").value;

  const newClub = {
    name: name,
    members: members,
    time: time,
    tags: tags,
    desc: desc,
    img: "images/default.jpg"
  };

  let userClubs = JSON.parse(localStorage.getItem("userClubs")) || [];
  userClubs.push(newClub);
  localStorage.setItem("userClubs", JSON.stringify(userClubs));

  alert("Club added!");
}

//when the page loads, check if the card element exists (checking for swipe page) and if so, load the first card.
//also load matches for the matches page
window.onload = function () {
  if (document.getElementById("card")) {
    localStorage.removeItem("matches"); //clear matches when going to swipe page (for the purpose of this demo)
    currentIndex = 0; //reset index to show first club card
    loadNextCard(); //load card for swipe page
  }

  loadMatches(); //load matches for matches page
};