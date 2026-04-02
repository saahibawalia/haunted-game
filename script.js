function typeText(text, elementId, speed = 120, callback = null) {
  const element = document.getElementById(elementId);
  const sound = document.getElementById("typeSound");

  element.innerHTML = "";
  const words = text.split(" ");
  let i = 0;

  if (sound) {
    sound.volume = 0.3;
    sound.play().catch(() => {});
  }

  function typing() {
    if (i < words.length) {
      let word = words[i];
      element.innerHTML += word + " ";

      let delay = speed;

      if (word.includes("...")) delay = 800;
      else if (word.endsWith(".")) delay = 500;
      else if (word.endsWith(",")) delay = 300;

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

function changeBackground(image) {
  document.body.style.backgroundImage = `url('${image}')`;
}

let health = 100;

function updateHealth(amount) {
  health += amount;
  document.getElementById("health").innerText = "Health: " + health + " ❤️";

  if (health <= 0) endGame("You have died 💀");
}

function showChoices(html) {
  const choices = document.getElementById("choices");
  choices.style.opacity = "0";
  choices.innerHTML = html;

  setTimeout(() => {
    choices.style.opacity = "1";
  }, 100);
}

function chooseRoom(room) {
  const story = document.getElementById("story");

  if (room === "living") {
    changeBackground("images/scary-dog.png");

    story.innerText = "A bulldog guards treasure... steal it?";

    showChoices(`
      <button onclick="pitbullChoice('yes')">Steal</button>
      <button onclick="pitbullChoice('no')">Leave</button>
    `);
  }

  else if (room === "dining") {
    changeBackground("https://images.unsplash.com/photo-1618220179428-22790b461013");

    story.innerText = "A glowing vase sits on the table...";

    showChoices(`
      <button onclick="vaseChoice('open')">Open it</button>
      <button onclick="vaseChoice('ignore')">Ignore it</button>
    `);
  }
}

function pitbullChoice(choice) {
  const story = document.getElementById("story");

  if (choice === "yes") {
    updateHealth(-100);
    story.innerText = "The dog attacks you!";
    endGame("Game Over 💀");
  } else {
    story.innerText = "You leave safely. Smart choice.";
    showRestart();
  }
}

function vaseChoice(choice) {
  const story = document.getElementById("story");

  if (choice === "open") {
    updateHealth(-30);
    story.innerText = "Bones inside! You feel cursed...";

    showChoices(`
      <button onclick="ghostEncounter()">Keep exploring</button>
    `);
  } else {
    story.innerText = "You walk away... but something follows you.";

    showChoices(`
      <button onclick="ghostEncounter()">Turn around</button>
    `);
  }
}

function ghostEncounter() {
  const story = document.getElementById("story");

  changeBackground("https://images.unsplash.com/photo-1509248961158-e54f6934749c");

  updateHealth(-50);

  story.innerText = "A ghost attacks you from the shadows!";

  showChoices(`
    <button onclick="escape()">Run</button>
  `);
}

function escape() {
  const story = document.getElementById("story");
  story.innerText = "You barely escape the mansion alive!";
  showRestart();
}

function endGame(message) {
  document.getElementById("story").innerText = message;
  document.getElementById("choices").innerHTML = "";
  showRestart();
}

function showRestart() {
  document.getElementById("restart").style.display = "inline-block";
}

function restartGame() {
  health = 100;
  document.getElementById("health").innerText = "Health: 100 ❤️";
  document.getElementById("restart").style.display = "none";

  changeBackground("images/haunted-house.png");

  window.onload(); // restart intro properly
}

window.onload = function() {
  changeBackground("images/haunted-house.png");

  const introText = `You receive a letter sealed in black wax.

"To my only heir...

If you are reading this, I am gone.

Everything I owned, my wealth, my estate, my secrets, now belongs to you.

But be warned...

The mansion is not just a house.

There are things inside it that should have stayed buried.

Enter if you wish to claim your inheritance...

But once you step inside, there is no turning back."`;

    typeText(introText, "story", 25, () => {
      showChoices(`
        <button onclick="chooseRoom('living')">Enter the Mansion</button>
        <button onclick="endGame('You walk away... but something follows you home.')">Leave</button>
      `);
    });
  };

// unlock sound on first click
document.body.addEventListener("click", () => {
  const sound = document.getElementById("typeSound");
  if (sound) {
    sound.play().then(() => {
      sound.pause();
      sound.currentTime = 0;
    }).catch(() => {});
  }
}, { once: true });