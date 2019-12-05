function getSadInterval() {
  return Date.now() + 1000;
}
function getLeavingInterval() {
  return Date.now() + 1000;
}
function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}
function getHungryInterval() {
  return Date.now() + 2000;
}
function getKingStatus() {
  return Math.random() > 0.9;
}
let score = 0;
const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-0")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-1")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-2")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-3")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-4")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-5")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-6")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-7")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-8")
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.querySelector("#hole-9")
  }
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getLeavingInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "./Images/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./Images/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.node.children[0].classList.remove("gone");
      mole.node.children[0].classList.add("hungry");
      if (mole.king) {
        mole.node.children[0].src = "./Images/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./Images/mole-hungry.png";
      }
      break;
    case "hungry":
      mole.next = getSadInterval();
      mole.status = "sad";
      if (mole.king) {
        mole.node.children[0].src = "./Images/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./Images/mole-sad.png";
      }
      break;
  }
}

function feed(event) {
  if (
    event.target.tagName !== "IMG" ||
    !event.target.classList.contains("hungry")
  ) {
    return;
  }
  const mole = moles[parseInt(event.target.dataset.index)];
  mole.status = "fed";
  mole.next = getSadInterval();
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = "./Images/king-mole-fed.png";
  } else {
    score++;
    mole.node.children[0].src = "./Images/mole-fed.png";
  }
  mole.node.children[0].classList.remove("hungry");
  document.querySelector(".worm-container").style.width = `${score * 10}%`;

  if (score >= 10) {
    win();
  }
}

function win() {
  document.querySelector(".container").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
  document.querySelector(".play-again-btn").classList.remove("hide");
}

document.querySelector(".container").addEventListener("click", feed);

let runAgainAt = Date.now() + 100;
function nextFrame() {
  const now = Date.now();
  if (now >= runAgainAt) {
    console.log("iam here");
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next < now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = Date.now() + 100;
  }
  requestAnimationFrame(nextFrame);
}

nextFrame();

const playBtn = document.querySelector(".play-btn");
// Start buttom to show the game
playBtn.addEventListener("click", function() {
  playBtn.classList.add("hide");
  document.querySelector(".container").classList.remove("hide");
  document.querySelector(".container").classList.add("show");
});
