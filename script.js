function chooseRoom(room) {
    const story = document.getElementById("story");
    const choises = document.getElementById("choices");

    if (room === "living") {
    story.innerText = "You enter the living room. A bulldog guards jewelry. Do you steal it?";

    choices.innerHTML = `
      <button onclick="pitbullChoice('yes')">Yes</button>
      <button onclick="pitbullChoice('no')">No</button>
    `;
  }

  else if (room === "dining") {
    story.innerText = "You enter the dining room. A shiny vase sits on the table. Open it?";

    choices.innerHTML = `
      <button onclick="vaseChoice('yes')">Yes</button>
      <button onclick="vaseChoice('no')">No</button>
    `;
  }
}

function pitbullChoice(choice) {
  const story = document.getElementById("story");
  const choices = document.getElementById("choices");

  if (choice === "yes") {
    story.innerText = "The dog attacks you. You are dead 💀";
    choices.innerHTML = "";
  } else {
    story.innerText = "You leave safely. Good choice.";
    choices.innerHTML = "";
  }
}

function vaseChoice(choice) {
  const story = document.getElementById("story");
  const choices = document.getElementById("choices");

  if (choice === "yes") {
    story.innerText = "You find bones inside 😨";
  } else {
    story.innerText = "A shadow knocks you out... it was all a dream.";
  }

  choices.innerHTML = "";
}
}