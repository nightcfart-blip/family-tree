const addCharacterButton =
  document.getElementById("addCharacterButton");

const addFirstCharacterButton =
  document.getElementById("addFirstCharacterButton");

const message =
  document.getElementById("message");

function showComingSoonMessage() {
  message.classList.remove("hidden");

  clearTimeout(showComingSoonMessage.timeout);

  showComingSoonMessage.timeout = setTimeout(() => {
    message.classList.add("hidden");
  }, 2200);
}

addCharacterButton.addEventListener(
  "click",
  showComingSoonMessage
);

addFirstCharacterButton.addEventListener(
  "click",
  showComingSoonMessage
);
