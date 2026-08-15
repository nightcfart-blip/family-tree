const addCharacterButton =
  document.getElementById(
    "addCharacterButton"
  );

const addFirstCharacterButton =
  document.getElementById(
    "addFirstCharacterButton"
  );

const emptyState =
  document.getElementById(
    "emptyState"
  );

const characterLayer =
  document.getElementById(
    "characterLayer"
  );


/* CREATE FORM */

const formBackdrop =
  document.getElementById(
    "formBackdrop"
  );

const characterFormPanel =
  document.getElementById(
    "characterFormPanel"
  );

const closeFormButton =
  document.getElementById(
    "closeFormButton"
  );

const cancelFormButton =
  document.getElementById(
    "cancelFormButton"
  );

const characterForm =
  document.getElementById(
    "characterForm"
  );


/* PROFILE */

const profileBackdrop =
  document.getElementById(
    "profileBackdrop"
  );

const profilePanel =
  document.getElementById(
    "profilePanel"
  );

const closeProfileButton =
  document.getElementById(
    "closeProfileButton"
  );

const closeProfileFooterButton =
  document.getElementById(
    "closeProfileFooterButton"
  );

const editCharacterButton =
  document.getElementById(
    "editCharacterButton"
  );


let characters = [];

let selectedCharacterId = null;


/* -------------------------
   CHARACTER CREATION
------------------------- */

function openCharacterForm() {

  characterForm.reset();

  formBackdrop.classList.remove(
    "hidden"
  );

  characterFormPanel.classList.remove(
    "hidden"
  );

}


function closeCharacterForm() {

  formBackdrop.classList.add(
    "hidden"
  );

  characterFormPanel.classList.add(
    "hidden"
  );

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
   SAVE NEW CHARACTER
------------------------- */

characterForm.addEventListener(
  "submit",

  function(event) {

    event.preventDefault();


    const character = {

      id:
        Date.now(),

      title:
        getInputValue(
          "title"
        ),

      givenName:
        getInputValue(
          "givenName"
        ),

      aliases:
        getInputValue(
          "aliases"
        )
          .split(",")
          .map(
            alias =>
              alias.trim()
          )
          .filter(
            alias =>
              alias !== ""
          ),

      maidenName:
        getInputValue(
          "maidenName"
        ),

      familyName:
        getInputValue(
          "familyName"
        ),

      birthYear:
        getInputValue(
          "birthYear"
        ),

      deathYear:
        getInputValue(
          "deathYear"
        ),


      /* Future editing fields */

      race: "",

      eyeColor: "",

      hairColor: "",

      skinColor: "",

      physicalFeature: "",

      life: "",

      achievements: ""

    };


    characters.push(
      character
    );


    renderCharacters();

    closeCharacterForm();

  }
);


/* -------------------------
   RENDER CHARACTERS
------------------------- */

function renderCharacters() {

  characterLayer.innerHTML = "";


  if (
    characters.length === 0
  ) {

    emptyState.classList.remove(
      "hidden"
    );

    return;

  }


  emptyState.classList.add(
    "hidden"
  );


  characters.forEach(
    function(
      character,
      index
    ) {

      const node =
        document.createElement(
          "button"
        );


      node.className =
        "character-node";

      node.type =
        "button";


      const column =
        index % 3;

      const row =
        Math.floor(
          index / 3
        );


      node.style.left =
        `${
          25 +
          column * 25
        }%`;


      node.style.top =
        `${
          120 +
          row * 170
        }px`;


      const initial =
        character
          .givenName
          .charAt(0)
          .toUpperCase();


      const fullName =
        getTreeName(
          character
        );


      const years =
        makeYearText(
          character
        );


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

        function() {

          openProfile(
            character.id
          );

        }
      );


      characterLayer.appendChild(
        node
      );

    }
  );

}


/* -------------------------
   OPEN PROFILE
------------------------- */

function openProfile(
  characterId
) {

  const character =
    characters.find(
      person =>
        person.id ===
        characterId
    );


  if (!character) {
    return;
  }


  selectedCharacterId =
    character.id;


  setProfileText(
    "profileTitle",

    character.title
  );


  setProfileText(
    "profileFullName",

    getProfileName(
      character
    )
  );


  setProfileText(
    "profileYearsTop",

    makeYearText(
      character
    )
  );


  setProfileText(
    "profileAliases",

    character.aliases.length
      ? character.aliases.join(
          "\n"
        )
      : ""
  );


  setProfileText(
    "profileRace",

    character.race
  );


  setProfileText(
    "profileHairColor",

    character.hairColor
  );


  setProfileText(
    "profileEyeColor",

    character.eyeColor
  );


  setProfileText(
    "profileSkinColor",

    character.skinColor
  );


  setProfileText(
    "profilePhysicalFeature",

    character.physicalFeature
  );


  setProfileText(
    "profileAchievements",

    character.achievements
  );


  setProfileText(
    "profileLife",

    character.life
  );


  setColorSwatch(
    "hairColorSwatch",

    character.hairColor
  );


  setColorSwatch(
    "eyeColorSwatch",

    character.eyeColor
  );


  setColorSwatch(
    "skinColorSwatch",

    character.skinColor
  );


  profileBackdrop.classList.remove(
    "hidden"
  );


  profilePanel.classList.remove(
    "hidden"
  );

}


/* -------------------------
   CLOSE PROFILE
------------------------- */

function closeProfile() {

  profileBackdrop.classList.add(
    "hidden"
  );

  profilePanel.classList.add(
    "hidden"
  );

  selectedCharacterId =
    null;

}


closeProfileButton.addEventListener(
  "click",
  closeProfile
);

closeProfileFooterButton.addEventListener(
  "click",
  closeProfile
);

profileBackdrop.addEventListener(
  "click",
  closeProfile
);


/* -------------------------
   EDIT BUTTON
------------------------- */

editCharacterButton.addEventListener(
  "click",

  function() {

    if (
      !selectedCharacterId
    ) {
      return;
    }


    alert(
      "Editing comes next."
    );

  }
);


/* -------------------------
   NAMES
------------------------- */

function getTreeName(
  character
) {

  return `
    ${character.givenName}
    ${character.familyName}
  `
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


function getProfileName(
  character
) {

  const given =
    character.givenName;

  const maiden =
    character.maidenName
      ? `(${character.maidenName})`
      : "";

  const family =
    character.familyName;


  return `
    ${given}
    ${maiden}
    ${family}
  `
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


/* -------------------------
   YEARS
------------------------- */

function makeYearText(
  character
) {

  const birth =
    character.birthYear;

  const death =
    character.deathYear;


  if (
    birth &&
    death
  ) {

    return `
      ${birth} – ${death}
    `.trim();

  }


  if (birth) {

    return `
      ${birth} –
    `.trim();

  }


  if (death) {

    return `
      ? – ${death}
    `.trim();

  }


  return "Unknown";

}


/* -------------------------
   PROFILE HELPERS
------------------------- */

function setProfileText(
  elementId,
  value
) {

  const element =
    document.getElementById(
      elementId
    );


  element.textContent =
    value || "—";

}


function setColorSwatch(
  elementId,
  color
) {

  const swatch =
    document.getElementById(
      elementId
    );


  if (color) {

    swatch.style.background =
      color;

  } else {

    swatch.style.background =
      "#242429";

  }

}


/* -------------------------
   INPUT
------------------------- */

function getInputValue(
  elementId
) {

  return document
    .getElementById(
      elementId
    )
    .value
    .trim();

}


/* -------------------------
   HTML SAFETY
------------------------- */

function escapeHTML(
  value
) {

  const element =
    document.createElement(
      "div"
    );

  element.textContent =
    value;

  return element.innerHTML;

}


/* -------------------------
   FIRST RENDER
------------------------- */

renderCharacters();
