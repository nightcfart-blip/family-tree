const addCharacterButton =
  document.getElementById("addCharacterButton");

const addFirstCharacterButton =
  document.getElementById("addFirstCharacterButton");

const emptyState =
  document.getElementById("emptyState");

const characterLayer =
  document.getElementById("characterLayer");


/* CREATE */

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


/* PROFILE */

const profileBackdrop =
  document.getElementById("profileBackdrop");

const profilePanel =
  document.getElementById("profilePanel");

const closeProfileButton =
  document.getElementById("closeProfileButton");

const closeProfileFooterButton =
  document.getElementById("closeProfileFooterButton");

const editCharacterButton =
  document.getElementById("editCharacterButton");


/* EDITOR */

const editBackdrop =
  document.getElementById("editBackdrop");

const editPanel =
  document.getElementById("editPanel");

const editCharacterForm =
  document.getElementById("editCharacterForm");

const closeEditButton =
  document.getElementById("closeEditButton");

const cancelEditButton =
  document.getElementById("cancelEditButton");


let characters = [];

let selectedCharacterId = null;


/* -------------------------
   ADD CHARACTER
------------------------- */

function openCharacterForm() {

  characterForm.reset();

  formBackdrop.classList.remove("hidden");

  characterFormPanel.classList.remove("hidden");

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
        getInputValue("title"),

      givenName:
        getInputValue("givenName"),

      aliases:
        makeAliasArray(
          getInputValue("aliases")
        ),

      maidenName:
        getInputValue("maidenName"),

      familyName:
        getInputValue("familyName"),

      birthYear:
        getInputValue("birthYear"),

      deathYear:
        getInputValue("deathYear"),

      race: "",

      eyeColor: "",

      hairColor: "",

      skinColor: "",

      physicalFeature: "",

      life: "",

      achievements: ""

    };


    characters.push(character);

    renderCharacters();

    closeCharacterForm();

  }
);


/* -------------------------
   TREE
------------------------- */

function renderCharacters() {

  characterLayer.innerHTML = "";


  if (characters.length === 0) {

    emptyState.classList.remove("hidden");

    return;

  }


  emptyState.classList.add("hidden");


  characters.forEach(
    function(character, index) {

      const node =
        document.createElement("button");


      node.className =
        "character-node";

      node.type =
        "button";


      const column =
        index % 3;

      const row =
        Math.floor(index / 3);


      node.style.left =
        `${25 + column * 25}%`;


      node.style.top =
        `${120 + row * 170}px`;


      const initial =
        character.givenName
          .charAt(0)
          .toUpperCase();


      node.innerHTML = `

        <div class="character-circle">
          ${escapeHTML(initial)}
        </div>

        <div class="character-name">
          ${escapeHTML(
            getTreeName(character)
          )}
        </div>

        <div class="character-years">
          ${escapeHTML(
            makeYearText(character)
          )}
        </div>

      `;


      node.addEventListener(
        "click",

        function() {

          openProfile(character.id);

        }
      );


      characterLayer.appendChild(node);

    }
  );

}


/* -------------------------
   PROFILE
------------------------- */

function openProfile(characterId) {

  const character =
    getCharacter(characterId);


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
    getProfileName(character)
  );


  setProfileText(
    "profileYearsTop",
    makeYearText(character)
  );


  setProfileText(
    "profileAliases",

    character.aliases.length
      ? character.aliases.join("\n")
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


  profileBackdrop.classList.remove("hidden");

  profilePanel.classList.remove("hidden");

}


/* -------------------------
   CLOSE PROFILE
------------------------- */

function closeProfile() {

  profileBackdrop.classList.add("hidden");

  profilePanel.classList.add("hidden");

  selectedCharacterId = null;

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
   OPEN EDITOR
------------------------- */

editCharacterButton.addEventListener(
  "click",
  openEditor
);


function openEditor() {

  const character =
    getCharacter(selectedCharacterId);


  if (!character) {
    return;
  }


  document.getElementById(
    "editTitle"
  ).value =
    character.title;


  document.getElementById(
    "editGivenName"
  ).value =
    character.givenName;


  document.getElementById(
    "editAliases"
  ).value =
    character.aliases.join(", ");


  document.getElementById(
    "editMaidenName"
  ).value =
    character.maidenName;


  document.getElementById(
    "editFamilyName"
  ).value =
    character.familyName;


  document.getElementById(
    "editBirthYear"
  ).value =
    character.birthYear;


  document.getElementById(
    "editDeathYear"
  ).value =
    character.deathYear;


  document.getElementById(
    "editRace"
  ).value =
    character.race;


  document.getElementById(
    "editPhysicalFeature"
  ).value =
    character.physicalFeature;


  document.getElementById(
    "editAchievements"
  ).value =
    character.achievements;


  document.getElementById(
    "editLife"
  ).value =
    character.life;


  setEditColor(
    "editHairColor",
    "editHairColorValue",
    character.hairColor
  );


  setEditColor(
    "editEyeColor",
    "editEyeColorValue",
    character.eyeColor
  );


  setEditColor(
    "editSkinColor",
    "editSkinColorValue",
    character.skinColor
  );


  profilePanel.classList.add("hidden");

  profileBackdrop.classList.add("hidden");


  editBackdrop.classList.remove("hidden");

  editPanel.classList.remove("hidden");

}


/* -------------------------
   CANCEL EDITOR
------------------------- */

function cancelEditor() {

  editBackdrop.classList.add("hidden");

  editPanel.classList.add("hidden");


  if (selectedCharacterId) {

    openProfile(selectedCharacterId);

  }

}


closeEditButton.addEventListener(
  "click",
  cancelEditor
);

cancelEditButton.addEventListener(
  "click",
  cancelEditor
);

editBackdrop.addEventListener(
  "click",
  cancelEditor
);


/* -------------------------
   SAVE EDITS
------------------------- */

editCharacterForm.addEventListener(
  "submit",

  function(event) {

    event.preventDefault();


    const character =
      getCharacter(selectedCharacterId);


    if (!character) {
      return;
    }


    character.title =
      getInputValue("editTitle");


    character.givenName =
      getInputValue("editGivenName");


    character.aliases =
      makeAliasArray(
        getInputValue("editAliases")
      );


    character.maidenName =
      getInputValue("editMaidenName");


    character.familyName =
      getInputValue("editFamilyName");


    character.birthYear =
      getInputValue("editBirthYear");


    character.deathYear =
      getInputValue("editDeathYear");


    character.race =
      getInputValue("editRace");


    character.hairColor =
      document.getElementById(
        "editHairColor"
      ).value;


    character.eyeColor =
      document.getElementById(
        "editEyeColor"
      ).value;


    character.skinColor =
      document.getElementById(
        "editSkinColor"
      ).value;


    character.physicalFeature =
      getInputValue(
        "editPhysicalFeature"
      );


    character.achievements =
      getInputValue(
        "editAchievements"
      );


    character.life =
      getInputValue(
        "editLife"
      );


    renderCharacters();


    editBackdrop.classList.add("hidden");

    editPanel.classList.add("hidden");


    openProfile(
      character.id
    );

  }
);


/* -------------------------
   LIVE COLOR HEX
------------------------- */

setupColorInput(
  "editHairColor",
  "editHairColorValue"
);

setupColorInput(
  "editEyeColor",
  "editEyeColorValue"
);

setupColorInput(
  "editSkinColor",
  "editSkinColorValue"
);


function setupColorInput(
  inputId,
  labelId
) {

  const input =
    document.getElementById(inputId);

  const label =
    document.getElementById(labelId);


  input.addEventListener(
    "input",

    function() {

      label.textContent =
        input.value.toUpperCase();

    }
  );

}


/* -------------------------
   HELPERS
------------------------- */

function getCharacter(id) {

  return characters.find(
    character =>
      character.id === id
  );

}


function makeAliasArray(value) {

  return value
    .split(",")
    .map(
      alias =>
        alias.trim()
    )
    .filter(
      alias =>
        alias !== ""
    );

}


function getTreeName(character) {

  return `
    ${character.givenName}
    ${character.familyName}
  `
    .replace(/\s+/g, " ")
    .trim();

}


function getProfileName(character) {

  const maiden =
    character.maidenName
      ? `(${character.maidenName})`
      : "";


  return `
    ${character.givenName}
    ${maiden}
    ${character.familyName}
  `
    .replace(/\s+/g, " ")
    .trim();

}


function makeYearText(character) {

  const birth =
    character.birthYear;

  const death =
    character.deathYear;


  if (birth && death) {

    return `${birth} – ${death}`;

  }


  if (birth) {

    return `${birth} –`;

  }


  if (death) {

    return `? – ${death}`;

  }


  return "Unknown";

}


function setProfileText(
  elementId,
  value
) {

  document.getElementById(
    elementId
  ).textContent =
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


  swatch.style.background =
    color || "#242429";

}


function setEditColor(
  inputId,
  labelId,
  color
) {

  const safeColor =
    isHexColor(color)
      ? color
      : "#242429";


  document.getElementById(
    inputId
  ).value =
    safeColor;


  document.getElementById(
    labelId
  ).textContent =
    safeColor.toUpperCase();

}


function isHexColor(value) {

  return /^#[0-9A-Fa-f]{6}$/.test(
    value
  );

}


function getInputValue(
  elementId
) {

  return document
    .getElementById(elementId)
    .value
    .trim();

}


function escapeHTML(value) {

  const element =
    document.createElement("div");

  element.textContent =
    value;

  return element.innerHTML;

}


/* FIRST RENDER */

renderCharacters();
