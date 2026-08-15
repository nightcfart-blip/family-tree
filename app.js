const addCharacterButton =
  document.getElementById("addCharacterButton");

const addFirstCharacterButton =
  document.getElementById("addFirstCharacterButton");

const emptyState =
  document.getElementById("emptyState");

const characterLayer =
  document.getElementById("characterLayer");


/* CREATE FORM */

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


let characters = [];
let selectedCharacterId = null;


/* -------------------------
   CREATE FORM
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
          .trim(),


      /*
        These fields are ready for
        Step 4: Editing.
      */

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
   RENDER TREE
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


      const column = index % 3;

      const row =
        Math.floor(index / 3);


      node.style.left =
        `${25 + (column * 25)}%`;

      node.style.top =
        `${120 + (row * 170)}px`;


      const initial =
        character.givenName
          .charAt(0)
          .toUpperCase();


      const fullName =
        getFullName(character);


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
    characters.find(
      person => person.id === characterId
    );


  if (!character) {
    return;
  }


  selectedCharacterId =
    character.id;


  document
    .getElementById("profileTitleTop")
    .textContent =
      character.title || "Person";


  document
    .getElementById("profileFullName")
    .textContent =
      getFullName(character);


  document
    .getElementById("profileYearsTop")
    .textContent =
      makeYearText(character);


  setProfileText(
    "profileTitle",
    character.title
  );

  setProfileText(
    "profileGivenName",
    character.givenName
  );

  setProfileText(
    "profileAliases",
    character.aliases.length
      ? character.aliases.join(", ")
      : ""
  );

  setProfileText(
    "profileMaidenName",
    character.maidenName
  );

  setProfileText(
    "profileFamilyName",
    character.familyName
  );

  setProfileText(
    "profileBirthYear",
    character.birthYear
  );

  setProfileText(
    "profileDeathYear",
    character.deathYear
  );

  setProfileText(
    "profileRace",
    character.race
  );

  setProfileText(
    "profileEyeColor",
    character.eyeColor
  );

  setProfileText(
    "profileHairColor",
    character.hairColor
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
    "profileLife",
    character.life
  );

  setProfileText(
    "profileAchievements",
    character.achievements
  );


  setColorSwatch(
    "eyeColorSwatch",
    character.eyeColor
  );

  setColorSwatch(
    "hairColorSwatch",
    character.hairColor
  );

  setColorSwatch(
    "skinColorSwatch",
    character.skinColor
  );


  profileBackdrop.classList.remove("hidden");

  profilePanel.classList.remove("hidden");

}


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
   EDIT BUTTON
------------------------- */

editCharacterButton.addEventListener(
  "click",
  function () {

    if (!selectedCharacterId) {
      return;
    }


    alert(
      "Editing comes in Step 4."
    );

  }
);


/* -------------------------
   HELPERS
------------------------- */

function getFullName(character) {

  return `${character.givenName} ${character.familyName}`
    .trim();

}


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


function setProfileText(
  elementId,
  value
) {

  const element =
    document.getElementById(elementId);

  element.textContent =
    value || "—";

}


function setColorSwatch(
  elementId,
  color
) {

  const swatch =
    document.getElementById(elementId);


  if (color) {

    swatch.style.background = color;

  } else {

    swatch.style.background =
      "transparent";

  }

}


function escapeHTML(value) {

  const element =
    document.createElement("div");

  element.textContent = value;

  return element.innerHTML;

}


/* FIRST RENDER */

renderCharacters();
