const addCharacterButton =
  document.getElementById("addCharacterButton");

const addFirstCharacterButton =
  document.getElementById("addFirstCharacterButton");

const emptyState =
  document.getElementById("emptyState");

const characterLayer =
  document.getElementById("characterLayer");

const formBackdrop =
  document.getElementById("formBackdrop");

const characterFormPanel =
  document.getElementById("characterFormPanel");

const closeFormButton =
  document.getElementById("closeFormButton");

const cancelFormButton =
  document.getElementById("cancelFormButton");

const characterForm =
  document.getElementById("characterForm");


let characters = [];


/* -------------------------
   OPEN / CLOSE FORM
------------------------- */

function openCharacterForm() {
  characterForm.reset();

  formBackdrop.classList.remove("hidden");
  characterFormPanel.classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("givenName").focus();
  }, 100);
}


function closeCharacterForm() {
  formBackdrop.classList.add("hidden");
  characterFormPanel.classList.add("hidden");
}


addCharacterButton.addEventListener(
  "click",
  openCharacterForm
);

addFirstCharacterButton.addEventListener(
  "click",
  openCharacterForm
);

closeFormButton.addEventListener(
  "click",
  closeCharacterForm
);

cancelFormButton.addEventListener(
  "click",
  closeCharacterForm
);

formBackdrop.addEventListener(
  "click",
  closeCharacterForm
);


/* -------------------------
   SAVE CHARACTER
------------------------- */

characterForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    const character = {

      id: Date.now(),

      title:
        document
          .getElementById("title")
          .value
          .trim(),

      givenName:
        document
          .getElementById("givenName")
          .value
          .trim(),

      aliases:
        document
          .getElementById("aliases")
          .value
          .split(",")
          .map(alias => alias.trim())
          .filter(alias => alias !== ""),

      maidenName:
        document
          .getElementById("maidenName")
          .value
          .trim(),

      familyName:
        document
          .getElementById("familyName")
          .value
          .trim(),

      birthYear:
        document
          .getElementById("birthYear")
          .value
          .trim(),

      deathYear:
        document
          .getElementById("deathYear")
          .value
          .trim()

    };


    characters.push(character);

    renderCharacters();

    closeCharacterForm();

  }
);


/* -------------------------
   RENDER TREE CHARACTERS
------------------------- */

function renderCharacters() {

  characterLayer.innerHTML = "";


  if (characters.length === 0) {

    emptyState.classList.remove("hidden");

    return;

  }


  emptyState.classList.add("hidden");


  characters.forEach(
    function (character, index) {

      const node =
        document.createElement("button");

      node.className = "character-node";

      node.type = "button";


      /*
        TEMPORARY POSITIONING

        For now, every new person gets
        spaced across the canvas.

        Later, our family-tree engine
        will calculate their real position.
      */

      const column = index % 3;

      const row = Math.floor(index / 3);

      node.style.left =
        `${25 + (column * 25)}%`;

      node.style.top =
        `${30 + (row * 170)}px`;


      const initial =
        character.givenName
          .charAt(0)
          .toUpperCase();


      const fullName =
        `${character.givenName} ${character.familyName}`
          .trim();


      const years =
        makeYearText(character);


      node.innerHTML = `

        <div class="character-circle">
          ${escapeHTML(initial)}
        </div>

        <div class="character-name">
          ${escapeHTML(fullName)}
        </div>

        <div class="character-years">
          ${escapeHTML(years)}
        </div>

      `;


      node.addEventListener(
        "click",
        function () {

          console.log(
            "Character selected:",
            character
          );

        }
      );


      characterLayer.appendChild(node);

    }
  );

}


/* -------------------------
   YEAR DISPLAY
------------------------- */

function makeYearText(character) {

  const birth =
    character.birthYear || "?";

  const death =
    character.deathYear || "";


  if (death) {
    return `${birth} – ${death}`;
  }


  if (character.birthYear) {
    return `${birth} –`;
  }


  return "Unknown";
}


/* -------------------------
   SAFETY
------------------------- */

function escapeHTML(value) {

  const element =
    document.createElement("div");

  element.textContent = value;

  return element.innerHTML;

}


/* FIRST RENDER */

renderCharacters();
