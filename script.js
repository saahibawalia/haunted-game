// ======================
// TYPEWRITER (CLEAN + SCARY)
// ======================
function typeText(text, elementId, speed = 120, callback = null) {
  const element = document.getElementById(elementId);
  const sound = document.getElementById("typeSound");

  element.innerHTML = "";
  const words = text.split(" ");
  let i = 0;

  if (sound) {
    sound.volume = 0.25;
    sound.play().catch(() => {});
  }

  function typing() {
    if (i < words.length) {
      let word = words[i];
      element.innerHTML += word + " ";

      let delay = speed;
      if (word.includes("...")) delay = 800;
      else if (word.endsWith(".")) delay = 500;

      i++;
      setTimeout(typing, delay);
    } else {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
      if (callback) callback();
    }
  }

  typing();
}

// ======================
// SYSTEM
// ======================
function changeBackground(image) {
  document.body.style.backgroundImage = `url('${image}')`;
}

function showChoices(html) {
  const choices = document.getElementById("choices");
  choices.innerHTML = html;
  choices.style.opacity = "1";
}

// ======================
// SIMPLE HORROR EFFECTS
// ======================
function flickerScreen() {
  document.body.style.opacity = "0.3";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 120);
}

// ======================
// HEALTH
// ======================
let health = 100;

function updateHealth(amount) {
  health += amount;
  document.getElementById("health").innerText = "Health: " + health + " ❤️";

  if (health <= 0) {
    endGame("Your body gives out... something else continues. 💀");
  }
}

// ======================
// INTRO
// ======================
function startIntro() {
  changeBackground("images/haunted-house.png");

  const text = `You receive a letter sealed in black wax...

"To my only heir...

If you are reading this, I am gone.

Everything I owned now belongs to you.

But the mansion...

It is not empty."

The paper feels damp.

Like it was never meant to be touched.`;

  typeText(text, "story", 25, () => {
    showChoices(`
      <button onclick="enterMansion()">Enter</button>
      <button onclick="endGame('You leave... but something watches you go.')">Leave</button>
    `);
  });
}

// ======================
// ENTER
// ======================
function enterMansion() {
  changeBackground("images/mansion-inside.png");

  const text = `The door closes behind you.

You didn’t hear it shut.

But you feel it.

The house is breathing.

And now...

so are you.`;

  typeText(text, "story", 25, () => {
    flickerScreen();

    showChoices(`
      <button onclick="livingRoom()">Follow the Light</button>
      <button onclick="darkHall()">Go into Darkness</button>
    `);
  });
}

// ======================
// LIVING ROOM
// ======================
function livingRoom() {
  changeBackground("images/scary-dog.png");

  const text = `The dog is completely still.

Too still.

Then its eyes move.

Not its head.

Just its eyes.

They lock onto you.`;

  typeText(text, "story", 25, () => {
    showChoices(`
      <button onclick="stealGold()">Take the gold</button>
      <button onclick="leaveGold()">Stay still</button>
    `);
  });
}

function stealGold() {
  updateHealth(-100);

  const text = `You touch the gold.

Something shifts.

Not around you.

Inside you.`;

  typeText(text, "story", 25, () => {
    endGame("You are no longer alone in your body. 💀");
  });
}

function leaveGold() {
  const text = `You don’t move.

The dog stares.

Then slowly...

it looks away.

You survived.

Why?`;

  typeText(text, "story", 25, () => {
    showChoices(`
      <button onclick="secretRoom()">Keep moving</button>
    `);
  });
}

// ======================
// DARK HALL
// ======================
function darkHall() {
  changeBackground("images/ghost.png");

  const text = `You step into darkness.

Your footsteps echo.

Then...

another set of footsteps answers.

Perfectly in sync.

But not yours.`;

  typeText(text, "story", 25, () => {
    showChoices(`
      <button onclick="run()">Run</button>
      <button onclick="faceGhost()">Turn around</button>
    `);
  });
}

function run() {
  updateHealth(-50);

  const text = `You run.

Something follows.

But it never gets closer.

It doesn’t need to.`;

  typeText(text, "story", 25, () => {
    showChoices(`
      <button onclick="secretRoom()">Hide</button>
    `);
  });
}

function faceGhost() {
  const text = `You turn slowly.

It is already there.

No face.

Just skin stretched tight—

trying to become one.`;

  typeText(text, "story", 25, () => {
    endGame("It learns your face. 💀");
  });
}

// ======================
// SECRET ROOM
// ======================
function secretRoom() {
  changeBackground("images/haunted-house.png");

  const text = `You find a hidden room.

Something is inside.

It looks like you.

But it isn’t breathing.`;

  typeText(text, "story", 25, () => {
    showChoices(`
      <button onclick="realEnding()">Touch it</button>
      <button onclick="endGame('You back away... and escape.')">Leave it</button>
    `);
  });
}

// ======================
// ENDINGS
// ======================
function realEnding() {
  const text = `You reach out.

Your hand passes through it.

No...

You pass through it.

You realize—

You never left the mansion.`;

  typeText(text, "story", 25, () => {
    document.getElementById("choices").innerHTML = "";
    document.getElementById("restart").style.display = "inline-block";
  });
}

function endGame(message) {
  document.getElementById("story").innerText = message;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("restart").style.display = "inline-block";
}

// ======================
// RESET
// ======================
function restartGame() {
  health = 100;
  document.getElementById("health").innerText = "Health: 100 ❤️";
  document.getElementById("restart").style.display = "none";
  startIntro();
}

// ======================
// LOAD
// ======================
window.onload = function () {
  startIntro();
};

// unlock sound
document.body.addEventListener("click", () => {
  const sound = document.getElementById("typeSound");
  if (sound) {
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;
    }).catch(() => {});
  }
}, { once: true });