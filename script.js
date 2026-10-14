const alliums = {
  scallion: {
    name: "Scallion / green onion",
    latin: "Usually Allium fistulosum",
    symbol: "scallion",
    leaf: "Thin, hollow tubes",
    base: "Slim white base",
    move: "Fresh garnish + quick cooking"
  },
  daepa: {
    name: "Daepa",
    latin: "Allium fistulosum",
    symbol: "daepa",
    leaf: "Large, hollow tubes",
    base: "Long, thick white shank",
    move: "Stocks, soups + grilling"
  },
  leek: {
    name: "Leek",
    latin: "Allium ampeloprasum",
    symbol: "leek",
    leaf: "Broad, flat fan",
    base: "Thick, layered shank",
    move: "Slow cooking + braising"
  },
  onion: {
    name: "Regular onion",
    latin: "Allium cepa",
    symbol: "onion",
    leaf: "Usually sold trimmed",
    base: "Large, round bulb",
    move: "Raw through caramelized"
  },
  shallot: {
    name: "Shallot",
    latin: "Allium cepa, Aggregatum Group",
    symbol: "shallot",
    leaf: "Usually sold trimmed",
    base: "Small clustered bulbs",
    move: "Dressings, sauces + roasting"
  },
  chives: {
    name: "Chives",
    latin: "Allium schoenoprasum",
    symbol: "chives",
    leaf: "Very fine hollow tubes",
    base: "Tiny, not the point",
    move: "Snipped fresh like an herb"
  }
};

const verdicts = {
  "daepa|scallion": "Same botanical lane, different build: daepa is the much bigger, sturdier bunching onion.",
  "leek|scallion": "Check the leaves: scallion leaves are hollow tubes; leek leaves are broad, flat fans.",
  "onion|scallion": "The bulb decides it: a mature onion makes a round storage bulb; a scallion stays slim.",
  "scallion|shallot": "Scallions are eaten for slim greens and white base; shallots make small clustered bulbs.",
  "chives|scallion": "Both have hollow leaves, but chives are thread-thin herbs; scallions have a crisp edible shank.",
  "daepa|leek": "They can be similarly chunky, but daepa has hollow tubes and leek has broad, flat leaves.",
  "daepa|onion": "Daepa puts its energy into a long shank; a bulb onion puts it into a round bulb.",
  "daepa|shallot": "Daepa is one long bunching onion; shallots form compact clusters of small bulbs.",
  "chives|daepa": "They bookend the bunch: daepa is huge and substantial; chives are tiny and herb-like.",
  "leek|onion": "A leek makes a layered cylindrical shank, while an onion swells into a round bulb.",
  "leek|shallot": "Leek is all about the long layered shank; shallot is all about clustered bulbs.",
  "chives|leek": "Flat, substantial leek leaves are built for cooking; fine chive tubes are built for snipping.",
  "onion|shallot": "Very close relatives: onions usually make one larger bulb; shallots make smaller clustered bulbs.",
  "chives|onion": "Onion is a bulb vegetable; chives are a fine-leaved herb. Same genus, very different job.",
  "chives|shallot": "Shallots contribute a bulb; chives contribute delicate green leaves."
};

const leftSelect = document.querySelector("#left-select");
const rightSelect = document.querySelector("#right-select");
const keys = Object.keys(alliums);

function fillSelect(select) {
  keys.forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = alliums[key].name;
    select.appendChild(option);
  });
}

fillSelect(leftSelect);
fillSelect(rightSelect);
leftSelect.value = "daepa";
rightSelect.value = "leek";

function fighterMarkup(item) {
  return `
    <svg aria-hidden="true"><use href="#${item.symbol}"></use></svg>
    <div class="fighter-info">
      <h3>${item.name}</h3>
      <i>${item.latin}</i>
      <dl>
        <div><dt>LEAVES</dt><dd>${item.leaf}</dd></div>
        <div><dt>BASE</dt><dd>${item.base}</dd></div>
        <div><dt>KITCHEN MOVE</dt><dd>${item.move}</dd></div>
      </dl>
    </div>`;
}

function updateComparison() {
  let leftKey = leftSelect.value;
  let rightKey = rightSelect.value;

  if (leftKey === rightKey) {
    const currentIndex = keys.indexOf(rightKey);
    rightKey = keys[(currentIndex + 1) % keys.length];
    rightSelect.value = rightKey;
  }

  document.querySelector("#left-fighter").innerHTML = fighterMarkup(alliums[leftKey]);
  document.querySelector("#right-fighter").innerHTML = fighterMarkup(alliums[rightKey]);
  const pair = [leftKey, rightKey].sort().join("|");
  document.querySelector("#verdict").textContent = verdicts[pair] || "Same family, different kitchen personality.";
}

leftSelect.addEventListener("change", updateComparison);
rightSelect.addEventListener("change", updateComparison);
updateComparison();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const cheatSheet = "Scallions are skinny hollow bunching onions; daepa are their giant Korean relatives; leeks are flat-leaved cousins; and regular onions make the big round bulb.";
const copyButton = document.querySelector("#copy-button");
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(cheatSheet);
    copyButton.innerHTML = "Copied! <span>✓</span>";
    window.setTimeout(() => { copyButton.innerHTML = "Copy for Slack <span>↗</span>"; }, 1800);
  } catch {
    copyButton.innerHTML = "Select the sentence above <span>↑</span>";
  }
});

const quizQuestions = [
  {
    id: "chat",
    text: "The group chat asks: ‘What are we doing tonight?’ You…",
    caption: "THE CHAT IS TYPING…",
    art: "chat",
    scene: ["scallion", "onion", "chives"],
    choices: [
      ["Make a plan, book the table, send the calendar invite", { onion: 2, leek: 1 }],
      ["Suggest a tiny place nobody else has heard of", { ramp: 2, shallot: 1 }],
      ["Invite everyone over and start making soup", { daepa: 2, garlic: 1 }],
      ["Say ‘anything works!’ then arrive with elite snacks", { scallion: 2, chives: 1 }]
    ]
  },
  {
    id: "project",
    text: "A promising project has no owner and mild chaos. Your move?",
    caption: "MEETING: 2 MINUTES IN",
    art: "project",
    scene: ["leek", "daepa", "garlic"],
    choices: [
      ["Make the spreadsheet that quietly saves everyone", { onion: 2, leek: 1 }, "scope-change"],
      ["Rally the room and get people moving", { daepa: 2, garlic: 1 }, "demo-day"],
      ["Fix the one subtle detail nobody noticed", { shallot: 2, scallion: 1 }, "scope-change"],
      ["Draw an unhinged but somehow brilliant whiteboard", { chives: 2, ramp: 1 }, "demo-day"]
    ]
  },
  {
    id: "support",
    text: "A friend is having a rough week. How do you show up?",
    caption: "EMOTIONAL SUPPORT AISLE",
    art: "support",
    scene: ["shallot", "onion", "garlic"],
    choices: [
      ["Sit with them and really listen", { leek: 2, shallot: 1 }],
      ["Appear at their door with enough food for six", { daepa: 2, onion: 1 }],
      ["Defend them with frankly alarming intensity", { garlic: 2, ramp: 1 }],
      ["Send perfect memes, then suggest a little walk", { chives: 2, scallion: 1 }]
    ]
  },
  {
    id: "weekend",
    text: "Choose your ideal Saturday with absolutely no obligations.",
    caption: "WEEKEND MODE: ON",
    art: "weekend",
    scene: ["ramp", "scallion", "leek"],
    choices: [
      ["Farmers’ market, wandering, and a late brunch", { scallion: 2, shallot: 1 }, "mystery-stand"],
      ["A three-hour recipe that makes the house smell amazing", { leek: 2, onion: 1 }, "surprise-party"],
      ["A trail, no signal, one weird little field guide", { ramp: 2, garlic: 1 }, "mystery-stand"],
      ["A loud dinner table with everyone squeezed in", { daepa: 2, chives: 1 }, "surprise-party"]
    ]
  },
  {
    id: "potluck",
    text: "The potluck is wobbling toward disaster. You instinctively…",
    caption: "OPERATION: SAVE DINNER",
    art: "potluck",
    scene: ["daepa", "chives", "shallot"],
    choices: [
      ["Taste everything and make one surgical seasoning fix", { shallot: 2, scallion: 1 }],
      ["Take charge of the stove before somebody gets hurt", { garlic: 2, daepa: 1 }],
      ["Turn the burnt dish into the joke of the night", { chives: 2, ramp: 1 }],
      ["Rearrange the whole table so it somehow works", { onion: 2, leek: 1 }]
    ]
  },
  {
    id: "compliment",
    text: "Which compliment would secretly delight you the most?",
    caption: "COMPLIMENT INCOMING ♡",
    art: "compliment",
    scene: ["chives", "garlic", "onion"],
    choices: [
      ["‘You make everything work better.’", { onion: 2, scallion: 1 }],
      ["‘Your taste is impeccable.’", { shallot: 2, leek: 1 }],
      ["‘You bring exactly the energy we needed.’", { garlic: 2, chives: 1 }],
      ["‘You make people feel completely at home.’", { daepa: 2, ramp: 1 }]
    ]
  },
  {
    id: "superpower",
    text: "Last one: choose your extremely specific allium superpower.",
    caption: "FINAL FORM UNLOCKED",
    art: "superpower",
    scene: ["ramp", "garlic", "daepa"],
    choices: [
      ["Every layer reveals the next right answer", { onion: 2, leek: 1 }],
      ["Grow wild, thrive anywhere, remain mysterious", { ramp: 2, scallion: 1 }],
      ["One tiny clove transforms the entire situation", { garlic: 2, shallot: 1 }],
      ["Turn any room into a warm, noisy feast", { daepa: 2, chives: 1 }]
    ]
  },
  {
    id: "scope-change",
    branch: true,
    text: "At 4:58 PM, someone asks for a ‘tiny change.’ It is not tiny.",
    caption: "THE SCOPE HAS ESCAPED",
    art: "scope",
    scene: ["leek", "spring-onion", "garlic-chives"],
    choices: [
      ["Ask three clarifying questions, then update the plan", { leek: 2, onion: 1 }],
      ["Adapt fast without making the whole thing weird", { springOnion: 5, scallion: 1 }],
      ["Name the hidden impact clearly and hold the line", { garlic: 2, daepa: 1 }],
      ["Find the elegant compromise nobody hates", { garlicChives: 5, shallot: 1 }]
    ]
  },
  {
    id: "demo-day",
    branch: true,
    text: "Your weird idea works. Everyone turns to you to give the demo.",
    caption: "SUDDENLY: SHOWTIME",
    art: "demo",
    scene: ["chives", "spring-onion", "garlic"],
    choices: [
      ["Tell the story with a medically unnecessary amount of jazz hands", { springOnion: 5, chives: 1 }],
      ["Hand the mic to the person who quietly made it real", { garlicChives: 5, daepa: 1 }],
      ["Live demo. No rehearsal. Maximum danger.", { ramp: 2, garlic: 1 }],
      ["Explain exactly why it works, then take questions", { shallot: 2, leek: 1 }]
    ]
  },
  {
    id: "mystery-stand",
    branch: true,
    text: "You spot an unlabeled allium at a tiny roadside stand. You…",
    caption: "MYSTERY PRODUCE DETECTED",
    art: "mystery",
    scene: ["ramp", "spring-onion", "garlic-chives"],
    choices: [
      ["Buy it first. Questions can happen later.", { springOnion: 5, ramp: 1 }],
      ["Interview the farmer about its entire life story", { leek: 2, onion: 1 }],
      ["Taste one leaf. This is field research.", { garlic: 2, chives: 1 }],
      ["Sketch it, photograph it, then look up the taxonomy", { garlicChives: 5, shallot: 1 }]
    ]
  },
  {
    id: "surprise-party",
    branch: true,
    text: "One extra dinner guest becomes six. Your quiet meal is now a party.",
    caption: "TABLE EXPANSION PROTOCOL",
    art: "party",
    scene: ["daepa", "spring-onion", "garlic-chives"],
    choices: [
      ["Stretch the soup. There is always enough soup.", { daepa: 2, onion: 1 }],
      ["Make six tiny side dishes from what is already here", { garlicChives: 5, shallot: 1 }],
      ["Put cushions on the floor and call it intentional", { springOnion: 5, scallion: 1 }],
      ["Hand everyone a job and turn dinner into a team sport", { garlic: 2, leek: 1 }]
    ]
  }
];

const quizSceneDecor = {
  chat: `
    <div class="chat-panel">
      <b>ALLIUM CHAT</b>
      <span class="chat-line one">tonight??</span>
      <span class="chat-line two">● ● ●</span>
    </div>
    <span class="tiny-phone phone-one">♡</span>
    <span class="tiny-phone phone-two">!</span>`,
  project: `
    <div class="project-board">
      <b>THE PLAN</b>
      <span class="board-line l1"></span><span class="board-line l2"></span>
      <span class="board-arrow">→ ?</span>
    </div>
    <i class="sticky-note note-one">OWNER?</i>
    <i class="sticky-note note-two">DUE: NOW</i>
    <span class="project-marker"></span>`,
  support: `
    <div class="rain-cloud"><i></i><i></i><i></i></div>
    <div class="soup-bowl"><span>〰</span></div>
    <span class="support-heart h1">♥</span><span class="support-heart h2">♥</span>`,
  weekend: `
    <div class="weekend-sun"></div>
    <div class="weekend-hill hill-one"></div><div class="weekend-hill hill-two"></div>
    <div class="picnic-blanket"></div>
    <div class="market-bag"><span>♧</span></div>`,
  potluck: `
    <div class="dinner-table"></div>
    <div class="wobbly-pot"><span class="pot-handle"></span></div>
    <i class="smoke s1"></i><i class="smoke s2"></i><i class="smoke s3"></i>
    <b class="panic-mark">!</b><b class="panic-mark p2">!!</b>`,
  compliment: `
    <div class="compliment-bubble">YOU MAKE<br>EVERYTHING BETTER!<i></i></div>
    <span class="compliment-heart c1">♥</span><span class="compliment-heart c2">♥</span><span class="compliment-star">✦</span>`,
  superpower: `
    <div class="power-burst"><i></i></div>
    <span class="power-star ps1">✦</span><span class="power-star ps2">✦</span><span class="power-star ps3">✦</span>
    <span class="hero-cape cape-one"></span><span class="hero-cape cape-two"></span><span class="hero-cape cape-three"></span>`,
  scope: `
    <div class="scope-clock">4:58</div>
    <div class="change-card"><b>TINY CHANGE :)</b><span></span><span></span><span></span></div>
    <i class="scope-note sn1">+ 1 THING</i><i class="scope-note sn2">+ 4 THINGS</i><i class="scope-note sn3">HELP</i>`,
  demo: `
    <div class="demo-curtain left"></div><div class="demo-curtain right"></div>
    <div class="demo-spotlight"></div>
    <div class="demo-screen">IT WORKS!<span>✓</span></div>
    <div class="demo-mic"></div><div class="audience-dots">● ● ● ● ●</div>`,
  mystery: `
    <div class="stand-awning"></div>
    <div class="stand-sign">ROADSIDE<br>ALLIUMS</div>
    <div class="mystery-crate"><b>?</b></div>
    <span class="mystery-spark ms1">✦</span><span class="mystery-spark ms2">✦</span>`,
  party: `
    <div class="party-door"><span>KNOCK<br>KNOCK</span></div>
    <div class="party-table"></div>
    <i class="place-setting set1"></i><i class="place-setting set2"></i><i class="place-setting set3"></i>
    <span class="party-note">+ 6 GUESTS!</span>`
};

const quizResults = {
  scallion: { name: "Scallion", title: "The Social Spark", latin: "Often Allium fistulosum", traits: ["adaptable", "bright", "easy company"], match: "Best kitchen friend: Chives", copy: "You make things fresher without making them complicated. You’re flexible, upbeat, and somehow friends with every person at the table." },
  daepa: { name: "Daepa", title: "The Big-Hearted Host", latin: "Allium fistulosum", traits: ["generous", "grounding", "warm"], match: "Best kitchen friend: Garlic", copy: "You’re sturdy, generous, and built for bringing people together. When things get cold or chaotic, everybody gravitates toward you." },
  leek: { name: "Leek", title: "The Soft Strategist", latin: "Allium ampeloprasum", traits: ["thoughtful", "patient", "quietly elegant"], match: "Best kitchen friend: Shallot", copy: "You take your time, notice the shape of things, and make complicated situations feel calmer. Your power sneaks up on people." },
  onion: { name: "Regular Onion", title: "The Essential", latin: "Allium cepa", traits: ["dependable", "layered", "resourceful"], match: "Best kitchen friend: Scallion", copy: "You’re the person everyone assumes will be there—and thank goodness you are. Practical on the surface, surprisingly layered underneath." },
  shallot: { name: "Shallot", title: "The Tastemaker", latin: "Allium cepa, Aggregatum Group", traits: ["discerning", "subtle", "charming"], match: "Best kitchen friend: Leek", copy: "You notice the tiny detail that changes everything. A little fancy, never loud about it, and usually correct about the restaurant." },
  chives: { name: "Chives", title: "The Confetti", latin: "Allium schoenoprasum", traits: ["witty", "light", "delightful"], match: "Best kitchen friend: Daepa", copy: "You don’t need to dominate the room to change its mood. You arrive, say one perfect thing, and suddenly the whole evening is better." },
  garlic: { name: "Garlic", title: "The Force", latin: "Allium sativum", traits: ["bold", "loyal", "protective"], match: "Best kitchen friend: Daepa", copy: "You commit. You care loudly, defend your people fiercely, and leave an impression long after you’ve left the room." },
  ramp: { name: "Ramp", title: "The Wild Card", latin: "Allium tricoccum", traits: ["independent", "rare", "adventurous"], match: "Best kitchen friend: Shallot", copy: "You follow curiosity off the marked trail. A little elusive, deeply memorable, and at your best when nobody overmanages you." },
  springOnion: { symbol: "spring-onion", name: "Spring Onion", title: "The Shape-Shifter", latin: "Young Allium cepa", traits: ["flexible", "curious", "still becoming"], match: "Best kitchen friend: Scallion", copy: "You adapt without losing yourself. You’re comfortable between categories, quick to grow into a new role, and never quite done becoming." },
  garlicChives: { symbol: "garlic-chives", name: "Garlic Chives", title: "The Quiet Plot Twist", latin: "Allium tuberosum", traits: ["observant", "balanced", "unexpectedly bold"], match: "Best kitchen friend: Shallot", copy: "You look calm and understated right up until you change the whole flavor of the room. You bridge worlds, find elegant compromises, and contain surprises." }
};

const quizBotany = {
  scallion: {
    description: "A scallion is a slim allium with hollow green leaves and a small white base. It’s often <em>A. fistulosum</em>, though young bulb onions are also sold under this name.",
    share: "Scallions are slim, hollow-leaved green onions with a small white base.",
    anchor: "#scallion-profile",
    link: "Meet scallions in the main lineup"
  },
  daepa: {
    description: "Daepa (대파) is the Korean large green onion: a sturdy, long-shanked <em>A. fistulosum</em> with hollow leaves. It looks leek-ish, but it’s a giant bunching onion.",
    share: "Daepa is the Korean large green onion—a giant bunching onion, not a leek.",
    anchor: "#daepa-profile",
    link: "See daepa next to scallion and leek"
  },
  leek: {
    description: "A leek is a thick-shanked <em>A. ampeloprasum</em> with broad, flat leaves arranged like a fan. It’s its own crop, not an overgrown scallion.",
    share: "Leeks are thick-shanked alliums with broad, flat leaves—not giant scallions.",
    anchor: "#leek-profile",
    link: "Meet the leek in the main lineup"
  },
  onion: {
    description: "The everyday bulb onion is mature <em>A. cepa</em>: a round, layered bulb wrapped in papery skin. Some green and spring onions are this same species harvested young.",
    share: "Regular onions are mature A. cepa with a round, layered storage bulb.",
    anchor: "#onion-profile",
    link: "See how bulb onions compare"
  },
  shallot: {
    description: "A shallot is a close onion relative within <em>A. cepa</em>. It makes smaller bulbs in clusters and has a delicate flavor that’s popular in dressings and sauces.",
    share: "Shallots are small, clustered bulb onions with a delicate flavor.",
    anchor: "#shallot-profile",
    link: "Meet shallot in the extended family"
  },
  chives: {
    description: "Chives are <em>A. schoenoprasum</em>: fine, hollow green leaves used like an herb. You snip the leaves rather than cooking a bulb or shank.",
    share: "Chives are fine, hollow-leaved alliums used fresh like an herb.",
    anchor: "#chives-profile",
    link: "Meet chives in the extended family"
  },
  garlic: {
    description: "Garlic is <em>A. sativum</em>, an allium that stores energy in a bulb made of individual cloves. Its flavor is more pungent and sulfurous than onion.",
    share: "Garlic is the clove-forming, famously pungent member of the allium family.",
    anchor: "#garlic-profile",
    link: "Meet garlic in the extended family"
  },
  ramp: {
    description: "A ramp is a seasonal North American wild allium, usually <em>A. tricoccum</em>. It has broad leaves and a strong garlic-onion flavor—and gets expensive at spring markets.",
    share: "Ramps are seasonal North American wild alliums with broad leaves and garlic-onion flavor.",
    anchor: "#ramp-profile",
    link: "Meet the wild ramp"
  },
  springOnion: {
    description: "A spring onion is usually young <em>A. cepa</em> harvested after it starts making a small round bulb but before maturity. The name varies by region and sometimes just means scallion.",
    share: "Spring onions are usually young bulb onions harvested while the bulb is still small.",
    anchor: "#spring-onion-profile",
    link: "Untangle the spring onion name"
  },
  garlicChives: {
    description: "Garlic chives are <em>A. tuberosum</em>, an herb with flat, grassy leaves and a garlicky taste. They’re not regular hollow-leaved chives and not baby garlic.",
    share: "Garlic chives are flat-leaved herbs with a garlicky taste—not baby garlic.",
    anchor: "#garlic-chives-profile",
    link: "Meet garlic chives in the name guide"
  }
};

const quizHome = document.querySelector("#quiz-home");
const quizGame = document.querySelector("#quiz-game");
const quizResult = document.querySelector("#quiz-result");
const quizShell = document.querySelector("#quiz-shell");
const quizQuestionById = Object.fromEntries(quizQuestions.map((question) => [question.id, question]));
const baseQuizFlow = quizQuestions.filter((question) => !question.branch).map((question) => question.id);
const quizTotalQuestions = baseQuizFlow.length + 2;
let quizIndex = 0;
let quizScores = {};
let quizFlow = [];

function resetQuiz() {
  quizIndex = 0;
  quizFlow = [...baseQuizFlow];
  quizScores = Object.fromEntries(Object.keys(quizResults).map((key) => [key, 0]));
  quizHome.hidden = false;
  quizGame.hidden = true;
  quizResult.hidden = true;
}

function renderQuizQuestion() {
  const question = quizQuestionById[quizFlow[quizIndex]];
  document.querySelector("#quiz-count").textContent = `${quizIndex + 1} / ${quizTotalQuestions}`;
  document.querySelector("#quiz-progress-bar").style.width = `${((quizIndex + 1) / quizTotalQuestions) * 100}%`;
  document.querySelector("#quiz-question").textContent = question.text;
  const routeNote = document.querySelector("#quiz-route-note");
  routeNote.hidden = !question.branch;

  const scene = document.querySelector("#quiz-scene");
  scene.className = `quiz-scene scene-frame-${question.art}`;
  scene.dataset.caption = question.caption;
  const characters = question.scene.map((symbol, index) => `<svg class="scene-character character-${index + 1}"><use href="#${symbol}"></use></svg>`).join("");
  scene.innerHTML = `<div class="scene-world scene-${question.art}">${quizSceneDecor[question.art]}<div class="scene-characters">${characters}</div></div>`;

  const choices = document.querySelector("#quiz-choices");
  choices.innerHTML = "";
  question.choices.forEach(([label, points, nextBranch]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-choice";
    button.textContent = label;
    button.addEventListener("click", () => {
      Object.entries(points).forEach(([allium, score]) => { quizScores[allium] += score; });
      if (nextBranch) quizFlow.splice(quizIndex + 1, 0, nextBranch);
      quizIndex += 1;
      if (quizIndex === quizFlow.length) revealQuizResult();
      else renderQuizQuestion();
    });
    choices.appendChild(button);
  });

  quizGame.classList.remove("quiz-bump");
  requestAnimationFrame(() => quizGame.classList.add("quiz-bump"));
}

function startQuiz() {
  quizIndex = 0;
  quizFlow = [...baseQuizFlow];
  quizScores = Object.fromEntries(Object.keys(quizResults).map((key) => [key, 0]));
  quizHome.hidden = true;
  quizResult.hidden = true;
  quizGame.hidden = false;
  renderQuizQuestion();
  quizShell.scrollIntoView({ behavior: "smooth", block: "start" });
}

function revealQuizResult() {
  const winnerKey = Object.entries(quizScores).sort((a, b) => b[1] - a[1])[0][0];
  const result = quizResults[winnerKey];
  const botany = quizBotany[winnerKey];
  quizGame.hidden = true;
  quizResult.hidden = false;
  quizResult.innerHTML = `
    <p class="result-overline">DRUMROLL… YOUR ALLIUM ID IS</p>
    <div class="result-id">
      <svg aria-hidden="true"><use href="#${result.symbol || winnerKey}"></use></svg>
      <h3>${result.name}</h3>
      <span class="result-title">${result.title}</span>
      <p>${result.copy}</p>
      <div class="result-botany">
        <b>OKAY, BUT WHAT IS IT?</b>
        <p>${botany.description}</p>
        <a href="${botany.anchor}">${botany.link} →</a>
      </div>
      <div class="result-traits">${result.traits.map((trait) => `<span>${trait}</span>`).join("")}</div>
      <div class="result-match">${result.latin}<br>${result.match}</div>
    </div>
    <div class="quiz-result-actions">
      <button class="pixel-button" id="quiz-share" type="button">Copy result ↗</button>
      <button class="pixel-button" id="quiz-retake" type="button">Retake ↺</button>
    </div>`;

  document.querySelector("#quiz-retake").addEventListener("click", startQuiz);
  document.querySelector("#quiz-share").addEventListener("click", async (event) => {
    const message = `I’m ${result.name}, ${result.title}, in the Allium Field Guide 🧅 ${botany.share} Find yours: https://meetthealliums.com/#quiz`;
    try {
      await navigator.clipboard.writeText(message);
      event.currentTarget.textContent = "Copied! ✓";
    } catch {
      event.currentTarget.textContent = "Copy blocked — tell them!";
    }
  });
  quizShell.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelector("#quiz-start").addEventListener("click", startQuiz);
resetQuiz();

const eggTrigger = document.querySelector("#vincent-onion");
const egg = document.querySelector("#vincent-egg");
const eggCloseButtons = egg.querySelectorAll(".egg-close, .egg-button, .egg-backdrop");
const confetti = egg.querySelector(".confetti");

function tossConfetti() {
  const colors = ["#f0a688", "#f3bd55", "#c7da69", "#fffdf4", "#9fcac2"];
  confetti.innerHTML = "";
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * .65}s`;
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    confetti.appendChild(piece);
  }
}

function openEgg() {
  egg.hidden = false;
  document.body.classList.add("egg-open");
  tossConfetti();
  egg.querySelector(".egg-close").focus();
}

function closeEgg() {
  egg.hidden = true;
  document.body.classList.remove("egg-open");
  confetti.innerHTML = "";
  eggTrigger.focus();
}

eggTrigger.addEventListener("click", openEgg);
eggTrigger.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEgg();
  }
});
eggCloseButtons.forEach((button) => button.addEventListener("click", closeEgg));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !egg.hidden) closeEgg();
});
