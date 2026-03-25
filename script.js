let health = 100;

function updateHealth(amount) {
  health += amount;
  document.getElementById("health").innerText = "Health: " + health + " ❤️";

  if (health <= 0) {
    endGame("You have died 💀");
  }
}

function changeBackground(image) {
  document.body.style.backgroundImage = `url(${image})`;
}

function chooseRoom(room) {
  const story = document.getElementById("story");
  const choices = document.getElementById("choices");

  if (room === "living") {
    changeBackground("https://images.unsplash.com/photo-1600585154340-be6161a56a0c");

    story.innerText = "A bulldog guards treasure... steal it?";
    choices.innerHTML = `
      <button onclick="pitbullChoice('yes')">Steal</button>
      <button onclick="pitbullChoice('no')">Leave</button>
    `;
  }

  else if (room === "dining") {
    changeBackground("https://images.unsplash.com/photo-1618220179428-22790b461013");

    story.innerText = "A glowing vase sits on the table...";
    choices.innerHTML = `
      <button onclick="vaseChoice('open')">Open it</button>
      <button onclick="vaseChoice('ignore')">Ignore it</button>
    `;
  }
}

function pitbullChoice(choice) {
  const story = document.getElementById("story");
  const choices = document.getElementById("choices");

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
  const choices = document.getElementById("choices");

  if (choice === "open") {
    updateHealth(-30);
    story.innerText = "Bones inside! You feel cursed...";
    
    choices.innerHTML = `
      <button onclick="ghostEncounter()">Keep exploring</button>
    `;
  } else {
    story.innerText = "You walk away... but something follows you.";
    
    choices.innerHTML = `
      <button onclick="ghostEncounter()">Turn around</button>
    `;
  }
}

function ghostEncounter() {
  const story = document.getElementById("story");
  const choices = document.getElementById("choices");

  changeBackground("https://images.unsplash.com/photo-1509248961158-e54f6934749c");

  updateHealth(-50);

  story.innerText = "A ghost attacks you from the shadows!";
  choices.innerHTML = `
    <button onclick="escape()">Run</button>
  `;
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
  document.getElementById("story").innerText = "You stand outside a creepy mansion... Where do you go?";
  document.getElementById("choices").innerHTML = `
    <button onclick="chooseRoom('living')">Living Room</button>
    <button onclick="chooseRoom('dining')">Dining Room</button>
  `;
  document.getElementById("restart").style.display = "none";
  document.body.style.backgroundImage = "none";
