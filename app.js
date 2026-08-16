const STORAGE_KEY =
  "fantasyFamilyTreeCharacters";

const VANTAGE_KEY =
  "fantasyFamilyTreeVantage";

const RACE_LIBRARY_KEY =
  "fantasyFamilyTreeRaceLibrary";

const SPECIES_LIBRARY_KEY =
  "fantasyFamilyTreeSpeciesLibrary";


const COLOR_PRESETS =
  window.COLOR_PRESETS;


/* TREE */

const NODE_GAP_X = 235;
const GENERATION_GAP_Y = 235;
const WORLD_SIZE = 6000;

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;


/* DATA */

let characters =
  loadCharacters();

let vantageCharacterId =
  loadVantage();

let raceLibrary =
  loadLibrary(
    RACE_LIBRARY_KEY
  );

let speciesLibrary =
  loadLibrary(
    SPECIES_LIBRARY_KEY
  );

let selectedCharacterId =
  null;


/* VIEW */

let viewX = 0;
let viewY = 0;
let zoom = 1;

let isPanning = false;

let panStartX = 0;
let panStartY = 0;

let startViewX = 0;
let startViewY = 0;

let pinchStartDistance = 0;
let pinchStartZoom = 1;

let pinchWorldX = 0;
let pinchWorldY = 0;

let lastLayout = null;


/* PORTRAIT */

let pendingPortraitData =
  null;


/* LIBRARY EDITING */

let activeLibraryType =
  "race";

let editingLibraryId =
  null;


/* CONFIRM */

let confirmAction =
  null;


/* ELEMENTS */

const treeCanvas =
  document.getElementById(
    "treeCanvas"
  );

const treeViewport =
  document.getElementById(
    "treeViewport"
  );

const treeLines =
  document.getElementById(
    "treeLines"
  );

const characterLayer =
  document.getElementById(
    "characterLayer"
  );

const emptyState =
  document.getElementById(
    "emptyState"
  );


const addCharacterButton =
  document.getElementById(
    "addCharacterButton"
  );

const addFirstCharacterButton =
  document.getElementById(
    "addFirstCharacterButton"
  );


const zoomInButton =
  document.getElementById(
    "zoomInButton"
  );

const zoomOutButton =
  document.getElementById(
    "zoomOutButton"
  );

const resetViewButton =
  document.getElementById(
    "resetViewButton"
  );

const zoomIndicator =
  document.getElementById(
    "zoomIndicator"
  );


/* SEARCH */

const searchButton =
  document.getElementById(
    "searchButton"
  );

const searchBackdrop =
  document.getElementById(
    "searchBackdrop"
  );

const searchPanel =
  document.getElementById(
    "searchPanel"
  );

const closeSearchButton =
  document.getElementById(
    "closeSearchButton"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

const searchResults =
  document.getElementById(
    "searchResults"
  );


/* WORLD */

const worldButton =
  document.getElementById(
    "worldButton"
  );

const worldBackdrop =
  document.getElementById(
    "worldBackdrop"
  );

const worldPanel =
  document.getElementById(
    "worldPanel"
  );

const closeWorldButton =
  document.getElementById(
    "closeWorldButton"
  );

const vantageSelect =
  document.getElementById(
    "vantageSelect"
  );

const vantageStatus =
  document.getElementById(
    "vantageStatus"
  );

const characterCount =
  document.getElementById(
    "characterCount"
  );

const worldVantageName =
  document.getElementById(
    "worldVantageName"
  );

const raceLibraryCount =
  document.getElementById(
    "raceLibraryCount"
  );

const speciesLibraryCount =
  document.getElementById(
    "speciesLibraryCount"
  );

const manageRacesButton =
  document.getElementById(
    "manageRacesButton"
  );

const manageSpeciesButton =
  document.getElementById(
    "manageSpeciesButton"
  );

const exportWorldButton =
  document.getElementById(
    "exportWorldButton"
  );

const importWorldButton =
  document.getElementById(
    "importWorldButton"
  );

const importWorldFile =
  document.getElementById(
    "importWorldFile"
  );


/* LIBRARY */

const libraryBackdrop =
  document.getElementById(
    "libraryBackdrop"
  );

const libraryPanel =
  document.getElementById(
    "libraryPanel"
  );

const libraryPanelTitle =
  document.getElementById(
    "libraryPanelTitle"
  );

const closeLibraryButton =
  document.getElementById(
    "closeLibraryButton"
  );

const addLibraryItemButton =
  document.getElementById(
    "addLibraryItemButton"
  );

const libraryList =
  document.getElementById(
    "libraryList"
  );


/* LIBRARY EDITOR */

const libraryEditorBackdrop =
  document.getElementById(
    "libraryEditorBackdrop"
  );

const libraryEditorPanel =
  document.getElementById(
    "libraryEditorPanel"
  );

const libraryEditorTitle =
  document.getElementById(
    "libraryEditorTitle"
  );

const closeLibraryEditorButton =
  document.getElementById(
    "closeLibraryEditorButton"
  );

const cancelLibraryEditorButton =
  document.getElementById(
    "cancelLibraryEditorButton"
  );

const saveLibraryItemButton =
  document.getElementById(
    "saveLibraryItemButton"
  );

const libraryNameInput =
  document.getElementById(
    "libraryNameInput"
  );

const hairDistributionEditor =
  document.getElementById(
    "hairDistributionEditor"
  );

const eyeDistributionEditor =
  document.getElementById(
    "eyeDistributionEditor"
  );

const skinDistributionEditor =
  document.getElementById(
    "skinDistributionEditor"
  );

const hairDistributionTotal =
  document.getElementById(
    "hairDistributionTotal"
  );

const eyeDistributionTotal =
  document.getElementById(
    "eyeDistributionTotal"
  );

const skinDistributionTotal =
  document.getElementById(
    "skinDistributionTotal"
  );


/* CREATE */

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

const deleteCharacterButton =
  document.getElementById(
    "deleteCharacterButton"
  );

const setVantageButton =
  document.getElementById(
    "setVantageButton"
  );

const profilePortrait =
  document.getElementById(
    "profilePortrait"
  );

const vantageRelation =
  document.getElementById(
    "vantageRelation"
  );

const vantageRelationLabel =
  document.getElementById(
    "vantageRelationLabel"
  );

const vantageRelationText =
  document.getElementById(
    "vantageRelationText"
  );


/* EDIT */

const editBackdrop =
  document.getElementById(
    "editBackdrop"
  );

const editPanel =
  document.getElementById(
    "editPanel"
  );

const editCharacterForm =
  document.getElementById(
    "editCharacterForm"
  );

const closeEditButton =
  document.getElementById(
    "closeEditButton"
  );

const cancelEditButton =
  document.getElementById(
    "cancelEditButton"
  );

const editPortraitFile =
  document.getElementById(
    "editPortraitFile"
  );

const editPortraitPreview =
  document.getElementById(
    "editPortraitPreview"
  );

const removePortraitButton =
  document.getElementById(
    "removePortraitButton"
  );


/* COLOR PRESET ELEMENTS */

const editHairPreset =
  document.getElementById(
    "editHairPreset"
  );

const editEyePreset =
  document.getElementById(
    "editEyePreset"
  );

const editSkinPreset =
  document.getElementById(
    "editSkinPreset"
  );

const editHairCustom =
  document.getElementById(
    "editHairCustom"
  );

const editEyeCustom =
  document.getElementById(
    "editEyeCustom"
  );

const editSkinCustom =
  document.getElementById(
    "editSkinCustom"
  );


/* CONFIRM */

const confirmBackdrop =
  document.getElementById(
    "confirmBackdrop"
  );

const confirmPanel =
  document.getElementById(
    "confirmPanel"
  );

const confirmTitle =
  document.getElementById(
    "confirmTitle"
  );

const confirmMessage =
  document.getElementById(
    "confirmMessage"
  );

const confirmCancelButton =
  document.getElementById(
    "confirmCancelButton"
  );

const confirmAcceptButton =
  document.getElementById(
    "confirmAcceptButton"
  );


/* TOAST */

const toast =
  document.getElementById(
    "toast"
  );

let toastTimer =
  null;


/* =========================================================
   STORAGE
========================================================= */

function loadCharacters() {

  try {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (!saved) {
      return [];
    }


    const parsed =
      JSON.parse(saved);


    if (!Array.isArray(parsed)) {
      return [];
    }


    return parsed.map(
      normalizeCharacter
    );

  } catch {

    return [];

  }

}


function saveCharacters() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(characters)
    );

  } catch {

    showToast(
      "Browser storage is full"
    );

  }

}


function loadLibrary(
  key
) {

  try {

    const saved =
      localStorage.getItem(
        key
      );


    if (!saved) {
      return [];
    }


    const parsed =
      JSON.parse(saved);


    return Array.isArray(parsed)
      ? parsed.map(
          normalizeLibraryItem
        )
      : [];

  } catch {

    return [];

  }

}


function saveLibraries() {

  localStorage.setItem(
    RACE_LIBRARY_KEY,
    JSON.stringify(
      raceLibrary
    )
  );


  localStorage.setItem(
    SPECIES_LIBRARY_KEY,
    JSON.stringify(
      speciesLibrary
    )
  );

}


function loadVantage() {

  const saved =
    localStorage.getItem(
      VANTAGE_KEY
    );


  if (!saved) {
    return null;
  }


  const number =
    Number(saved);


  return Number.isFinite(number)
    ? number
    : null;

}


function saveVantage() {

  if (
    vantageCharacterId === null
  ) {

    localStorage.removeItem(
      VANTAGE_KEY
    );

    return;

  }


  localStorage.setItem(
    VANTAGE_KEY,
    String(vantageCharacterId)
  );

}


/* =========================================================
   NORMALIZE
========================================================= */

function normalizeCharacter(
  character
) {

  const hair =
    migrateColor(
      "hair",
      character.hairColorId,
      character.hairColor
    );


  const eyes =
    migrateColor(
      "eyes",
      character.eyeColorId,
      character.eyeColor
    );


  const skin =
    migrateColor(
      "skin",
      character.skinColorId,
      character.skinColor
    );


  return {

    id:
      Number(character.id),

    title:
      character.title || "",

    givenName:
      character.givenName || "",

    aliases:
      Array.isArray(
        character.aliases
      )
        ? character.aliases
        : [],

    maidenName:
      character.maidenName || "",

    familyName:
      character.familyName || "",

    birthYear:
      character.birthYear || "",

    deathYear:
      character.deathYear || "",

    race:
      character.race || "",

    motherId:
      normalizeId(
        character.motherId
      ),

    fatherId:
      normalizeId(
        character.fatherId
      ),

    spouseIds:
      normalizeIdArray(
        character.spouseIds
      ),

    loverIds:
      normalizeIdArray(
        character.loverIds
      ),

    hairColorId:
      hair.id,

    hairColor:
      hair.hex,

    eyeColorId:
      eyes.id,

    eyeColor:
      eyes.hex,

    skinColorId:
      skin.id,

    skinColor:
      skin.hex,

    physicalFeature:
      character.physicalFeature || "",

    achievements:
      character.achievements || "",

    life:
      character.life || "",

    portraitData:
      character.portraitData || ""

  };

}


function normalizeLibraryItem(
  item
) {

  return {

    id:
      item.id ||
      createLibraryId(),

    name:
      item.name || "",

    hairDistribution:
      normalizeDistribution(
        item.hairDistribution
      ),

    eyeDistribution:
      normalizeDistribution(
        item.eyeDistribution
      ),

    skinDistribution:
      normalizeDistribution(
        item.skinDistribution
      )

  };

}


function normalizeDistribution(
  distribution
) {

  if (
    !Array.isArray(
      distribution
    )
  ) {

    return [];

  }


  return distribution
    .map(
      entry => ({

        colorId:
          String(
            entry.colorId || ""
          ),

        percent:
          Number(
            entry.percent
          ) || 0

      })
    )
    .filter(
      entry =>
        entry.colorId &&
        entry.percent > 0
    );

}


function normalizeId(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return null;

  }


  const number =
    Number(value);


  return Number.isFinite(number)
    ? number
    : null;

}


function normalizeIdArray(
  values
) {

  if (!Array.isArray(values)) {
    return [];
  }


  return values
    .map(Number)
    .filter(Number.isFinite);

}


/* =========================================================
   COLOR PRESETS
========================================================= */

function migrateColor(
  trait,
  existingId,
  existingHex
) {

  if (
    existingId &&
    findColorPreset(
      trait,
      existingId
    )
  ) {

    const preset =
      findColorPreset(
        trait,
        existingId
      );


    return {
      id:
        preset.id,

      hex:
        preset.hex
    };

  }


  if (existingHex) {

    const matching =
      COLOR_PRESETS[trait]
        .find(
          preset =>
            preset.hex
              .toLowerCase()
            ===
            existingHex
              .toLowerCase()
        );


    if (matching) {

      return {
        id:
          matching.id,

        hex:
          matching.hex
      };

    }


    return {
      id:
        "custom",

      hex:
        existingHex
    };

  }


  return {
    id: "",
    hex: ""
  };

}


function findColorPreset(
  trait,
  id
) {

  return COLOR_PRESETS[trait]
    .find(
      preset =>
        preset.id === id
    );

}


function getColorName(
  trait,
  id
) {

  if (!id) {
    return "—";
  }


  if (
    id === "custom"
  ) {

    return "Custom";

  }


  const preset =
    findColorPreset(
      trait,
      id
    );


  return preset
    ? preset.name
    : "Custom";

}


function populateCharacterColorSelect(
  select,
  trait
) {

  select.innerHTML =
    "";


  const blank =
    document.createElement(
      "option"
    );


  blank.value =
    "";


  blank.textContent =
    "— Not Set —";


  select.appendChild(
    blank
  );


  COLOR_PRESETS[trait]
    .forEach(
      preset => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          preset.id;


        option.textContent =
          preset.name;


        select.appendChild(
          option
        );

      }
    );


  const custom =
    document.createElement(
      "option"
    );


  custom.value =
    "custom";


  custom.textContent =
    "Custom Color…";


  select.appendChild(
    custom
  );

}


/* =========================================================
   CHARACTER COLOR EDITOR
========================================================= */

function setupCharacterColorEditors() {

  populateCharacterColorSelect(
    editHairPreset,
    "hair"
  );


  populateCharacterColorSelect(
    editEyePreset,
    "eyes"
  );


  populateCharacterColorSelect(
    editSkinPreset,
    "skin"
  );


  setupOneColorEditor(
    "hair",
    editHairPreset,
    editHairCustom,
    "editHairCustomWrap",
    "editHairPresetSwatch",
    "editHairPresetName"
  );


  setupOneColorEditor(
    "eyes",
    editEyePreset,
    editEyeCustom,
    "editEyeCustomWrap",
    "editEyePresetSwatch",
    "editEyePresetName"
  );


  setupOneColorEditor(
    "skin",
    editSkinPreset,
    editSkinCustom,
    "editSkinCustomWrap",
    "editSkinPresetSwatch",
    "editSkinPresetName"
  );

}


function setupOneColorEditor(
  trait,
  select,
  customInput,
  customWrapId,
  swatchId,
  nameId
) {

  function refresh() {

    const value =
      select.value;


    const customWrap =
      document.getElementById(
        customWrapId
      );


    const swatch =
      document.getElementById(
        swatchId
      );


    const name =
      document.getElementById(
        nameId
      );


    if (!value) {

      customWrap.classList.add(
        "hidden"
      );


      swatch.style.background =
        "#242429";


      name.textContent =
        "Not Set";


      return;

    }


    if (
      value === "custom"
    ) {

      customWrap.classList.remove(
        "hidden"
      );


      swatch.style.background =
        customInput.value;


      name.textContent =
        "Custom";


      return;

    }


    customWrap.classList.add(
      "hidden"
    );


    const preset =
      findColorPreset(
        trait,
        value
      );


    if (!preset) {
      return;
    }


    swatch.style.background =
      preset.hex;


    name.textContent =
      preset.name;

  }


  select.addEventListener(
    "change",
    refresh
  );


  customInput.addEventListener(
    "input",
    refresh
  );

}


/* =========================================================
   LIBRARY MANAGEMENT
========================================================= */

manageRacesButton.addEventListener(
  "click",

  function() {

    openLibrary(
      "race"
    );

  }
);


manageSpeciesButton.addEventListener(
  "click",

  function() {

    openLibrary(
      "species"
    );

  }
);


function openLibrary(
  type
) {

  activeLibraryType =
    type;


  libraryPanelTitle.textContent =
    type === "race"
      ? "Races"
      : "Species";


  addLibraryItemButton.textContent =
    type === "race"
      ? "+ Add Race"
      : "+ Add Species";


  worldBackdrop.classList.add(
    "hidden"
  );


  worldPanel.classList.add(
    "hidden"
  );


  libraryBackdrop.classList.remove(
    "hidden"
  );


  libraryPanel.classList.remove(
    "hidden"
  );


  renderLibraryList();

}


function closeLibrary() {

  libraryBackdrop.classList.add(
    "hidden"
  );


  libraryPanel.classList.add(
    "hidden"
  );


  openWorldPanel();

}


closeLibraryButton.addEventListener(
  "click",
  closeLibrary
);


libraryBackdrop.addEventListener(
  "click",
  closeLibrary
);


function getActiveLibrary() {

  return activeLibraryType === "race"
    ? raceLibrary
    : speciesLibrary;

}


function renderLibraryList() {

  const library =
    getActiveLibrary();


  libraryList.innerHTML =
    "";


  if (
    library.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );


    empty.className =
      "library-empty";


    empty.textContent =
      activeLibraryType === "race"
        ? "No Races created yet."
        : "No Species created yet.";


    libraryList.appendChild(
      empty
    );


    return;

  }


  [...library]
    .sort(
      (a,b) =>
        a.name.localeCompare(
          b.name
        )
    )
    .forEach(
      item => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "library-card";


        const summary =
          [
            makeDistributionSummary(
              item.hairDistribution,
              "hair"
            ),

            makeDistributionSummary(
              item.eyeDistribution,
              "eyes"
            ),

            makeDistributionSummary(
              item.skinDistribution,
              "skin"
            )
          ]
            .filter(Boolean)
            .join(" · ");


        card.innerHTML = `

          <div class="library-card-header">

            <strong class="library-card-name">
              ${escapeHTML(item.name)}
            </strong>

            <div class="library-card-actions">

              <button
                class="library-mini-button edit-library-item"
                type="button"
              >
                Edit
              </button>

              <button
                class="library-mini-button delete-library-item"
                type="button"
              >
                Delete
              </button>

            </div>

          </div>

          <div class="library-summary">
            ${
              summary ||
              "No base appearance probabilities yet."
            }
          </div>

        `;


        card
          .querySelector(
            ".edit-library-item"
          )
          .addEventListener(
            "click",

            function() {

              openLibraryEditor(
                item.id
              );

            }
          );


        card
          .querySelector(
            ".delete-library-item"
          )
          .addEventListener(
            "click",

            function() {

              openConfirmation(
                `Delete ${item.name}?`,
                "This removes the preset from your library. Characters are not deleted.",
                function() {

                  deleteLibraryItem(
                    item.id
                  );

                },
                "Delete"
              );

            }
          );


        libraryList.appendChild(
          card
        );

      }
    );

}


function makeDistributionSummary(
  distribution,
  trait
) {

  if (!distribution.length) {
    return "";
  }


  return `${capitalize(trait)} ${distribution.length}`;

}


addLibraryItemButton.addEventListener(
  "click",

  function() {

    openLibraryEditor(
      null
    );

  }
);


function openLibraryEditor(
  itemId
) {

  editingLibraryId =
    itemId;


  const library =
    getActiveLibrary();


  const item =
    itemId
      ? library.find(
          entry =>
            entry.id ===
            itemId
        )
      : null;


  libraryEditorTitle.textContent =
    item
      ? `Edit ${item.name}`
      : activeLibraryType === "race"
        ? "New Race"
        : "New Species";


  libraryNameInput.value =
    item
      ? item.name
      : "";


  hairDistributionEditor.innerHTML =
    "";

  eyeDistributionEditor.innerHTML =
    "";

  skinDistributionEditor.innerHTML =
    "";


  if (item) {

    item.hairDistribution.forEach(
      entry =>
        addDistributionRow(
          "hair",
          entry
        )
    );


    item.eyeDistribution.forEach(
      entry =>
        addDistributionRow(
          "eyes",
          entry
        )
    );


    item.skinDistribution.forEach(
      entry =>
        addDistributionRow(
          "skin",
          entry
        )
    );

  }


  updateAllDistributionTotals();


  libraryBackdrop.classList.add(
    "hidden"
  );


  libraryPanel.classList.add(
    "hidden"
  );


  libraryEditorBackdrop.classList.remove(
    "hidden"
  );


  libraryEditorPanel.classList.remove(
    "hidden"
  );

}


function closeLibraryEditor() {

  libraryEditorBackdrop.classList.add(
    "hidden"
  );


  libraryEditorPanel.classList.add(
    "hidden"
  );


  libraryBackdrop.classList.remove(
    "hidden"
  );


  libraryPanel.classList.remove(
    "hidden"
  );


  renderLibraryList();

}


closeLibraryEditorButton.addEventListener(
  "click",
  closeLibraryEditor
);


cancelLibraryEditorButton.addEventListener(
  "click",
  closeLibraryEditor
);


libraryEditorBackdrop.addEventListener(
  "click",
  closeLibraryEditor
);


document
  .querySelectorAll(
    ".add-distribution-button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",

        function() {

          addDistributionRow(
            button.dataset.trait
          );

        }
      );

    }
  );


function addDistributionRow(
  trait,
  entry = null
) {

  const container =
    getDistributionContainer(
      trait
    );


  const row =
    document.createElement(
      "div"
    );


  row.className =
    "distribution-row";


  const select =
    document.createElement(
      "select"
    );


  COLOR_PRESETS[trait]
    .forEach(
      preset => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          preset.id;


        option.textContent =
          preset.name;


        select.appendChild(
          option
        );

      }
    );


  if (
    entry &&
    entry.colorId
  ) {

    select.value =
      entry.colorId;

  }


  const percent =
    document.createElement(
      "input"
    );


  percent.type =
    "number";


  percent.min =
    "0";


  percent.max =
    "100";


  percent.step =
    "0.1";


  percent.inputMode =
    "decimal";


  percent.value =
    entry
      ? entry.percent
      : "";


  const remove =
    document.createElement(
      "button"
    );


  remove.type =
    "button";


  remove.className =
    "remove-distribution-button";


  remove.textContent =
    "×";


  remove.addEventListener(
    "click",

    function() {

      row.remove();


      updateAllDistributionTotals();

    }
  );


  percent.addEventListener(
    "input",
    updateAllDistributionTotals
  );


  row.appendChild(
    select
  );


  row.appendChild(
    percent
  );


  row.appendChild(
    remove
  );


  container.appendChild(
    row
  );


  updateAllDistributionTotals();

}


function getDistributionContainer(
  trait
) {

  if (
    trait === "hair"
  ) {
    return hairDistributionEditor;
  }


  if (
    trait === "eyes"
  ) {
    return eyeDistributionEditor;
  }


  return skinDistributionEditor;

}


function readDistribution(
  trait
) {

  const container =
    getDistributionContainer(
      trait
    );


  const rows =
    Array.from(
      container.querySelectorAll(
        ".distribution-row"
      )
    );


  return rows
    .map(
      row => {

        const select =
          row.querySelector(
            "select"
          );


        const input =
          row.querySelector(
            "input"
          );


        return {

          colorId:
            select.value,

          percent:
            Number(
              input.value
            ) || 0

        };

      }
    )
    .filter(
      entry =>
        entry.percent > 0
    );

}


function distributionTotal(
  distribution
) {

  return distribution.reduce(
    (total,entry) =>
      total +
      Number(
        entry.percent
      ),
    0
  );

}


function updateAllDistributionTotals() {

  updateDistributionTotalDisplay(
    "hair",
    hairDistributionTotal
  );


  updateDistributionTotalDisplay(
    "eyes",
    eyeDistributionTotal
  );


  updateDistributionTotalDisplay(
    "skin",
    skinDistributionTotal
  );

}


function updateDistributionTotalDisplay(
  trait,
  element
) {

  const distribution =
    readDistribution(
      trait
    );


  const total =
    distributionTotal(
      distribution
    );


  element.textContent =
    `Total: ${roundNumber(total)}%`;


  element.classList.remove(
    "valid",
    "invalid"
  );


  if (
    distribution.length === 0
  ) {
    return;
  }


  if (
    approximately100(
      total
    )
  ) {

    element.classList.add(
      "valid"
    );

  } else {

    element.classList.add(
      "invalid"
    );

  }

}


saveLibraryItemButton.addEventListener(
  "click",
  saveLibraryItem
);


function saveLibraryItem() {

  const name =
    libraryNameInput.value
      .trim();


  if (!name) {

    showToast(
      "Give it a name first"
    );

    return;

  }


  const hairDistribution =
    readDistribution(
      "hair"
    );


  const eyeDistribution =
    readDistribution(
      "eyes"
    );


  const skinDistribution =
    readDistribution(
      "skin"
    );


  const distributions =
    [
      hairDistribution,
      eyeDistribution,
      skinDistribution
    ];


  const invalid =
    distributions.some(
      distribution =>
        distribution.length > 0 &&
        !approximately100(
          distributionTotal(
            distribution
          )
        )
    );


  if (invalid) {

    showToast(
      "Each used probability list must total 100%"
    );

    return;

  }


  if (
    hasDuplicateColors(
      hairDistribution
    )
    ||
    hasDuplicateColors(
      eyeDistribution
    )
    ||
    hasDuplicateColors(
      skinDistribution
    )
  ) {

    showToast(
      "A color can only appear once per list"
    );

    return;

  }


  const library =
    getActiveLibrary();


  if (
    editingLibraryId
  ) {

    const item =
      library.find(
        entry =>
          entry.id ===
          editingLibraryId
      );


    if (!item) {
      return;
    }


    item.name =
      name;


    item.hairDistribution =
      hairDistribution;


    item.eyeDistribution =
      eyeDistribution;


    item.skinDistribution =
      skinDistribution;

  } else {

    library.push({

      id:
        createLibraryId(),

      name,

      hairDistribution,

      eyeDistribution,

      skinDistribution

    });

  }


  saveLibraries();


  closeLibraryEditor();


  showToast(
    `${name} saved`
  );

}


function hasDuplicateColors(
  distribution
) {

  const ids =
    distribution.map(
      entry =>
        entry.colorId
    );


  return (
    new Set(ids).size !==
    ids.length
  );

}


function approximately100(
  number
) {

  return (
    Math.abs(
      number - 100
    ) < 0.01
  );

}


function deleteLibraryItem(
  id
) {

  if (
    activeLibraryType === "race"
  ) {

    raceLibrary =
      raceLibrary.filter(
        item =>
          item.id !== id
      );

  } else {

    speciesLibrary =
      speciesLibrary.filter(
        item =>
          item.id !== id
      );

  }


  saveLibraries();


  renderLibraryList();


  updateWorldStats();


  showToast(
    "Library item deleted"
  );

}


function createLibraryId() {

  return (
    "lib_" +
    Date.now() +
    "_" +
    Math.random()
      .toString(36)
      .slice(2,8)
  );

}


/* =========================================================
   WORLD PANEL
========================================================= */

worldButton.addEventListener(
  "click",
  openWorldPanel
);


closeWorldButton.addEventListener(
  "click",
  closeWorldPanel
);


worldBackdrop.addEventListener(
  "click",
  closeWorldPanel
);


function openWorldPanel() {

  populateVantageSelect();


  updateWorldStats();


  worldBackdrop.classList.remove(
    "hidden"
  );


  worldPanel.classList.remove(
    "hidden"
  );

}


function closeWorldPanel() {

  worldBackdrop.classList.add(
    "hidden"
  );


  worldPanel.classList.add(
    "hidden"
  );

}


function updateWorldStats() {

  characterCount.textContent =
    characters.length;


  raceLibraryCount.textContent =
    raceLibrary.length;


  speciesLibraryCount.textContent =
    speciesLibrary.length;


  const vantage =
    getCharacter(
      vantageCharacterId
    );


  worldVantageName.textContent =
    vantage
      ? getTreeName(vantage)
      : "None";

}


function populateVantageSelect() {

  vantageSelect.innerHTML =
    "";


  const none =
    document.createElement(
      "option"
    );


  none.value =
    "";


  none.textContent =
    "— No Vantage Point —";


  vantageSelect.appendChild(
    none
  );


  [...characters]
    .sort(
      compareCharacterNames
    )
    .forEach(
      character => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          character.id;


        option.textContent =
          getTreeName(
            character
          );


        option.selected =
          character.id ===
          vantageCharacterId;


        vantageSelect.appendChild(
          option
        );

      }
    );


  updateVantageStatus();

}


vantageSelect.addEventListener(
  "change",

  function() {

    vantageCharacterId =
      vantageSelect.value
        ? Number(
            vantageSelect.value
          )
        : null;


    saveVantage();


    updateVantageStatus();

    updateWorldStats();

    renderTree();


    showToast(
      "Vantage point changed"
    );

  }
);


function updateVantageStatus() {

  const person =
    getCharacter(
      vantageCharacterId
    );


  vantageStatus.textContent =
    person
      ? `Perspective: ${getTreeName(person)}`
      : "No vantage point selected.";

}


/* =========================================================
   BACKUP
========================================================= */

exportWorldButton.addEventListener(
  "click",
  exportWorld
);


function exportWorld() {

  const backup = {

    app:
      "Fantasy Family Tree",

    version:
      3,

    exportedAt:
      new Date().toISOString(),

    vantageCharacterId,

    characters,

    raceLibrary,

    speciesLibrary

  };


  const blob =
    new Blob(
      [
        JSON.stringify(
          backup,
          null,
          2
        )
      ],
      {
        type:
          "application/json"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `fantasy-world-${
      new Date()
        .toISOString()
        .slice(0,10)
    }.json`;


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();


  URL.revokeObjectURL(
    url
  );


  showToast(
    "World backup exported"
  );

}


importWorldButton.addEventListener(
  "click",

  function() {

    importWorldFile.value =
      "";


    importWorldFile.click();

  }
);


importWorldFile.addEventListener(
  "change",

  async function() {

    const file =
      importWorldFile.files[0];


    if (!file) {
      return;
    }


    try {

      const data =
        JSON.parse(
          await file.text()
        );


      const importedCharacters =
        Array.isArray(data)
          ? data
          : data.characters;


      if (
        !Array.isArray(
          importedCharacters
        )
      ) {

        throw new Error();

      }


      openConfirmation(
        "Restore this world?",
        "Your current browser world will be replaced by this backup.",
        function() {

          characters =
            importedCharacters
              .map(
                normalizeCharacter
              );


          raceLibrary =
            Array.isArray(
              data.raceLibrary
            )
              ? data.raceLibrary
                  .map(
                    normalizeLibraryItem
                  )
              : [];


          speciesLibrary =
            Array.isArray(
              data.speciesLibrary
            )
              ? data.speciesLibrary
                  .map(
                    normalizeLibraryItem
                  )
              : [];


          vantageCharacterId =
            normalizeId(
              data.vantageCharacterId
            );


          cleanBrokenRelationships();


          saveCharacters();

          saveLibraries();

          saveVantage();


          renderTree();


          closeWorldPanel();


          setTimeout(
            centerTree,
            80
          );


          showToast(
            `${characters.length} characters restored`
          );

        },
        "Restore"
      );

    } catch {

      showToast(
        "That is not a valid world backup"
      );

    }

  }
);


/* =========================================================
   SEARCH
========================================================= */

searchButton.addEventListener(
  "click",
  openSearch
);


closeSearchButton.addEventListener(
  "click",
  closeSearch
);


searchBackdrop.addEventListener(
  "click",
  closeSearch
);


function openSearch() {

  searchBackdrop.classList.remove(
    "hidden"
  );


  searchPanel.classList.remove(
    "hidden"
  );


  searchInput.value =
    "";


  renderSearchResults(
    characters
  );

}


function closeSearch() {

  searchBackdrop.classList.add(
    "hidden"
  );


  searchPanel.classList.add(
    "hidden"
  );

}


searchInput.addEventListener(
  "input",

  function() {

    const query =
      searchInput.value
        .trim()
        .toLowerCase();


    const matches =
      characters.filter(
        character => {

          const text =
            [
              character.title,
              character.givenName,
              character.familyName,
              character.maidenName,
              character.race,
              ...character.aliases
            ]
              .join(" ")
              .toLowerCase();


          return text.includes(
            query
          );

        }
      );


    renderSearchResults(
      matches
    );

  }
);


function renderSearchResults(
  people
) {

  searchResults.innerHTML =
    "";


  if (!people.length) {

    searchResults.textContent =
      "No characters found.";

    return;

  }


  [...people]
    .sort(
      compareCharacterNames
    )
    .forEach(
      person => {

        const button =
          document.createElement(
            "button"
          );


        button.className =
          "search-result";


        button.type =
          "button";


        button.innerHTML = `

          <span class="search-result-circle">

            ${
              person.portraitData

                ? `<img src="${person.portraitData}" alt="">`

                : escapeHTML(
                    getInitial(person)
                  )
            }

          </span>

          <span>

            <span class="search-result-name">
              ${escapeHTML(
                getTreeName(person)
              )}
            </span>

            <span class="search-result-meta">
              ${escapeHTML(
                makeYearText(person)
              )}
            </span>

          </span>

        `;


        button.addEventListener(
          "click",

          function() {

            closeSearch();


            focusCharacter(
              person.id
            );

          }
        );


        searchResults.appendChild(
          button
        );

      }
    );

}


/* =========================================================
   PAN / ZOOM
========================================================= */

function applyViewTransform() {

  treeViewport.style.transform =
    `translate(${viewX}px, ${viewY}px) scale(${zoom})`;


  zoomIndicator.textContent =
    `${Math.round(zoom * 100)}%`;


  treeCanvas.classList.toggle(
    "zoomed-far",
    zoom < 0.58
  );


  treeCanvas.classList.toggle(
    "zoomed-very-far",
    zoom < 0.36
  );

}


function centerTree() {

  const layout =
    lastLayout ||
    calculateTreeLayout();


  const rect =
    treeCanvas.getBoundingClientRect();


  zoom =
    Math.min(
      1,
      Math.max(
        MIN_ZOOM,

        Math.min(
          rect.width /
          Math.max(
            layout.contentWidth,
            600
          ),

          rect.height /
          Math.max(
            layout.contentHeight,
            500
          )
        ) * 0.82
      )
    );


  viewX =
    rect.width / 2 -
    layout.centerX * zoom;


  viewY =
    Math.max(
      40,
      rect.height * 0.12 -
      layout.topY * zoom
    );


  applyViewTransform();

}


function zoomAtPoint(
  newZoom,
  x,
  y
) {

  const worldX =
    (x - viewX) /
    zoom;


  const worldY =
    (y - viewY) /
    zoom;


  zoom =
    Math.max(
      MIN_ZOOM,
      Math.min(
        MAX_ZOOM,
        newZoom
      )
    );


  viewX =
    x -
    worldX * zoom;


  viewY =
    y -
    worldY * zoom;


  applyViewTransform();

}


zoomInButton.addEventListener(
  "click",

  function() {

    const rect =
      treeCanvas.getBoundingClientRect();


    zoomAtPoint(
      zoom + ZOOM_STEP,
      rect.width / 2,
      rect.height / 2
    );

  }
);


zoomOutButton.addEventListener(
  "click",

  function() {

    const rect =
      treeCanvas.getBoundingClientRect();


    zoomAtPoint(
      zoom - ZOOM_STEP,
      rect.width / 2,
      rect.height / 2
    );

  }
);


resetViewButton.addEventListener(
  "click",
  centerTree
);


treeCanvas.addEventListener(
  "touchstart",

  function(event) {

    if (
      event.touches.length === 1
    ) {

      const touch =
        event.touches[0];


      panStartX =
        touch.clientX;

      panStartY =
        touch.clientY;


      startViewX =
        viewX;

      startViewY =
        viewY;


      isPanning =
        !event.target.closest(
          ".character-node"
        );

    }


    if (
      event.touches.length === 2
    ) {

      isPanning =
        false;


      const first =
        event.touches[0];

      const second =
        event.touches[1];


      pinchStartDistance =
        Math.hypot(
          second.clientX -
          first.clientX,

          second.clientY -
          first.clientY
        );


      pinchStartZoom =
        zoom;


      const midpoint = {

        x:
          (
            first.clientX +
            second.clientX
          ) / 2,

        y:
          (
            first.clientY +
            second.clientY
          ) / 2

      };


      pinchWorldX =
        (
          midpoint.x -
          viewX
        ) / zoom;


      pinchWorldY =
        (
          midpoint.y -
          viewY
        ) / zoom;

    }

  },
  {
    passive: false
  }
);


treeCanvas.addEventListener(
  "touchmove",

  function(event) {

    event.preventDefault();


    if (
      event.touches.length === 1 &&
      isPanning
    ) {

      const touch =
        event.touches[0];


      viewX =
        startViewX +
        touch.clientX -
        panStartX;


      viewY =
        startViewY +
        touch.clientY -
        panStartY;


      applyViewTransform();

    }


    if (
      event.touches.length === 2
    ) {

      const first =
        event.touches[0];

      const second =
        event.touches[1];


      const distance =
        Math.hypot(
          second.clientX -
          first.clientX,

          second.clientY -
          first.clientY
        );


      zoom =
        Math.max(
          MIN_ZOOM,
          Math.min(
            MAX_ZOOM,
            pinchStartZoom *
            (
              distance /
              pinchStartDistance
            )
          )
        );


      const midpoint = {

        x:
          (
            first.clientX +
            second.clientX
          ) / 2,

        y:
          (
            first.clientY +
            second.clientY
          ) / 2

      };


      viewX =
        midpoint.x -
        pinchWorldX *
        zoom;


      viewY =
        midpoint.y -
        pinchWorldY *
        zoom;


      applyViewTransform();

    }

  },
  {
    passive: false
  }
);


treeCanvas.addEventListener(
  "touchend",

  function() {

    isPanning =
      false;

  }
);


/* =========================================================
   CREATE CHARACTER
========================================================= */

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


characterForm.addEventListener(
  "submit",

  function(event) {

    event.preventDefault();


    const character =
      normalizeCharacter({

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
          makeAliasArray(
            getInputValue(
              "aliases"
            )
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
          )

      });


    characters.push(
      character
    );


    saveCharacters();

    renderTree();

    closeCharacterForm();


    showToast(
      "Character added"
    );

  }
);


/* =========================================================
   TREE LAYOUT
========================================================= */

function renderTree() {

  characterLayer.innerHTML =
    "";


  treeLines.innerHTML =
    "";


  if (!characters.length) {

    emptyState.classList.remove(
      "hidden"
    );


    lastLayout =
      calculateTreeLayout();


    return;

  }


  emptyState.classList.add(
    "hidden"
  );


  const layout =
    calculateTreeLayout();


  lastLayout =
    layout;


  drawRelationshipLines(
    layout.positions
  );


  characters.forEach(
    character => {

      const position =
        layout.positions.get(
          character.id
        );


      if (!position) {
        return;
      }


      renderCharacterNode(
        character,
        position
      );

    }
  );

}


function calculateTreeLayout() {

  const generations =
    calculateAllGenerations();


  const rows =
    new Map();


  characters.forEach(
    character => {

      const generation =
        generations.get(
          character.id
        ) || 0;


      if (
        !rows.has(
          generation
        )
      ) {

        rows.set(
          generation,
          []
        );

      }


      rows
        .get(generation)
        .push(character);

    }
  );


  const sorted =
    Array.from(
      rows.keys()
    )
      .sort(
        (a,b) =>
          a - b
      );


  const positions =
    new Map();


  const center =
    WORLD_SIZE / 2;


  let minX = center;
  let maxX = center;
  let minY = center;
  let maxY = center;


  sorted.forEach(
    generation => {

      const row =
        clusterSpouses(
          rows.get(
            generation
          )
        );


      const width =
        (
          row.length - 1
        ) *
        NODE_GAP_X;


      const startX =
        center -
        width / 2;


      const y =
        center -
        650 +
        generation *
        GENERATION_GAP_Y;


      row.forEach(
        (character,index) => {

          const x =
            startX +
            index *
            NODE_GAP_X;


          positions.set(
            character.id,
            {
              x,
              y
            }
          );


          minX =
            Math.min(
              minX,
              x
            );


          maxX =
            Math.max(
              maxX,
              x
            );


          minY =
            Math.min(
              minY,
              y
            );


          maxY =
            Math.max(
              maxY,
              y
            );

        }
      );

    }
  );


  return {

    positions,

    centerX:
      (
        minX +
        maxX
      ) / 2,

    topY:
      minY,

    contentWidth:
      Math.max(
        maxX -
        minX +
        340,
        620
      ),

    contentHeight:
      Math.max(
        maxY -
        minY +
        390,
        520
      )

  };

}


function calculateAllGenerations() {

  const memo =
    new Map();


  characters.forEach(
    character => {

      calculateGeneration(
        character.id,
        memo,
        new Set()
      );

    }
  );


  return memo;

}


function calculateGeneration(
  id,
  memo,
  visiting
) {

  if (
    memo.has(id)
  ) {
    return memo.get(id);
  }


  if (
    visiting.has(id)
  ) {
    return 0;
  }


  const person =
    getCharacter(id);


  if (!person) {
    return 0;
  }


  visiting.add(id);


  const parents =
    [
      person.motherId,
      person.fatherId
    ]
      .filter(Boolean);


  if (!parents.length) {

    memo.set(
      id,
      0
    );


    return 0;

  }


  const level =
    Math.max(
      ...parents.map(
        parentId =>
          calculateGeneration(
            parentId,
            memo,
            visiting
          )
      )
    ) + 1;


  memo.set(
    id,
    level
  );


  visiting.delete(id);


  return level;

}


function clusterSpouses(
  row
) {

  const result =
    [];


  const visited =
    new Set();


  row.forEach(
    person => {

      if (
        visited.has(
          person.id
        )
      ) {
        return;
      }


      result.push(
        person
      );


      visited.add(
        person.id
      );


      person.spouseIds
        .forEach(
          spouseId => {

            const spouse =
              row.find(
                entry =>
                  entry.id ===
                  spouseId
              );


            if (
              spouse &&
              !visited.has(
                spouse.id
              )
            ) {

              result.push(
                spouse
              );


              visited.add(
                spouse.id
              );

            }

          }
        );

    }
  );


  return result;

}


function renderCharacterNode(
  character,
  position
) {

  const node =
    document.createElement(
      "button"
    );


  node.className =
    "character-node";


  if (
    character.id ===
    vantageCharacterId
  ) {

    node.classList.add(
      "vantage-node"
    );

  }


  node.style.left =
    `${position.x}px`;


  node.style.top =
    `${position.y}px`;


  node.innerHTML = `

    <div class="character-circle">

      ${
        character.portraitData

          ? `<img class="character-portrait" src="${character.portraitData}" alt="">`

          : escapeHTML(
              getInitial(
                character
              )
            )
      }

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

      openProfile(
        character.id
      );

    }
  );


  characterLayer.appendChild(
    node
  );

}


/* =========================================================
   LINES
========================================================= */

function drawRelationshipLines(
  positions
) {

  drawPartnerLines(
    positions,
    "spouseIds",
    "tree-line partner-line"
  );


  drawPartnerLines(
    positions,
    "loverIds",
    "tree-line lover-line"
  );


  characters.forEach(
    child => {

      const childPosition =
        positions.get(
          child.id
        );


      if (!childPosition) {
        return;
      }


      const parents =
        [
          child.motherId,
          child.fatherId
        ]
          .filter(Boolean)
          .map(
            id =>
              positions.get(id)
          )
          .filter(Boolean);


      parents.forEach(
        parent => {

          addSvgLine(
            parent.x,
            parent.y + 42,

            childPosition.x,
            childPosition.y,

            "tree-line"
          );

        }
      );

    }
  );

}


function drawPartnerLines(
  positions,
  field,
  className
) {

  const drawn =
    new Set();


  characters.forEach(
    person => {

      person[field].forEach(
        otherId => {

          const key =
            [
              person.id,
              otherId
            ]
              .sort()
              .join("-");


          if (
            drawn.has(key)
          ) {
            return;
          }


          drawn.add(key);


          const first =
            positions.get(
              person.id
            );


          const second =
            positions.get(
              otherId
            );


          if (
            first &&
            second
          ) {

            addSvgLine(
              first.x,
              first.y + 42,

              second.x,
              second.y + 42,

              className
            );

          }

        }
      );

    }
  );

}


function addSvgLine(
  x1,
  y1,
  x2,
  y2,
  className
) {

  const line =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );


  line.setAttribute(
    "x1",
    x1
  );


  line.setAttribute(
    "y1",
    y1
  );


  line.setAttribute(
    "x2",
    x2
  );


  line.setAttribute(
    "y2",
    y2
  );


  line.setAttribute(
    "class",
    className
  );


  treeLines.appendChild(
    line
  );

}


/* =========================================================
   PROFILE
========================================================= */

function openProfile(
  id
) {

  const character =
    getCharacter(id);


  if (!character) {
    return;
  }


  selectedCharacterId =
    id;


  setProfileText(
    "profileTitle",
    character.title
  );


  setProfileText(
    "profileTitleHero",
    character.title
  );


  document.getElementById(
    "profileFullName"
  ).textContent =
    getProfileName(
      character
    );


  document.getElementById(
    "profileYearsTop"
  ).textContent =
    makeYearText(
      character
    );


  setProfileText(
    "profileAliases",
    character.aliases.join(
      "\n"
    )
  );


  setProfileText(
    "profileRace",
    character.race
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


  document.getElementById(
    "profileHairColor"
  ).textContent =
    getColorName(
      "hair",
      character.hairColorId
    );


  document.getElementById(
    "profileEyeColor"
  ).textContent =
    getColorName(
      "eyes",
      character.eyeColorId
    );


  document.getElementById(
    "profileSkinColor"
  ).textContent =
    getColorName(
      "skin",
      character.skinColorId
    );


  renderProfilePortrait(
    character
  );


  renderRelationshipProfile(
    character
  );


  renderVantageRelation(
    character
  );


  setVantageButton.textContent =
    id ===
    vantageCharacterId
      ? "Current Vantage"
      : "Set as Vantage";


  profileBackdrop.classList.remove(
    "hidden"
  );


  profilePanel.classList.remove(
    "hidden"
  );

}


function renderProfilePortrait(
  character
) {

  profilePortrait.innerHTML =
    "";


  if (
    character.portraitData
  ) {

    const image =
      document.createElement(
        "img"
      );


    image.src =
      character.portraitData;


    profilePortrait.appendChild(
      image
    );

  } else {

    profilePortrait.textContent =
      getInitial(
        character
      );

  }

}


/* =========================================================
   VANTAGE
========================================================= */

setVantageButton.addEventListener(
  "click",

  function() {

    vantageCharacterId =
      selectedCharacterId;


    saveVantage();

    renderTree();

    openProfile(
      selectedCharacterId
    );


    showToast(
      "Vantage point changed"
    );

  }
);


function renderVantageRelation(
  subject
) {

  const vantage =
    getCharacter(
      vantageCharacterId
    );


  if (!vantage) {

    vantageRelation.classList.add(
      "hidden"
    );

    return;

  }


  vantageRelation.classList.remove(
    "hidden"
  );


  vantageRelationLabel.textContent =
    `Relation to ${getTreeName(vantage)}`;


  vantageRelationText.textContent =
    describeRelationship(
      vantage.id,
      subject.id
    );

}


/* Same genealogy logic */

function describeRelationship(
  vantageId,
  subjectId
) {

  if (
    vantageId === subjectId
  ) {

    return "Vantage Point";

  }


  const vantage =
    getCharacter(
      vantageId
    );


  const subject =
    getCharacter(
      subjectId
    );


  if (
    !vantage ||
    !subject
  ) {

    return "Unknown";

  }


  if (
    vantage.spouseIds.includes(
      subject.id
    )
  ) {

    return "Spouse";

  }


  if (
    vantage.loverIds.includes(
      subject.id
    )
  ) {

    return "Lover";

  }


  const ancestor =
    getAncestorDepth(
      vantage.id,
      subject.id
    );


  if (
    ancestor !== null
  ) {

    return makeAncestorTerm(
      subject,
      ancestor
    );

  }


  const descendant =
    getAncestorDepth(
      subject.id,
      vantage.id
    );


  if (
    descendant !== null
  ) {

    return makeDescendantTerm(
      descendant
    );

  }


  const sameMother =
    vantage.motherId &&
    vantage.motherId ===
    subject.motherId;


  const sameFather =
    vantage.fatherId &&
    vantage.fatherId ===
    subject.fatherId;


  if (
    sameMother &&
    sameFather
  ) {

    return "Sibling";

  }


  if (
    sameMother ||
    sameFather
  ) {

    return "Half-Sibling";

  }


  const firstAncestors =
    getAncestorMap(
      vantage.id
    );


  const secondAncestors =
    getAncestorMap(
      subject.id
    );


  const common =
    [];


  firstAncestors.forEach(
    (firstDepth,id) => {

      if (
        secondAncestors.has(id)
      ) {

        common.push({

          firstDepth,

          secondDepth:
            secondAncestors.get(id)

        });

      }

    }
  );


  if (!common.length) {

    return "No known relation";

  }


  common.sort(
    (a,b) =>
      Math.max(
        a.firstDepth,
        a.secondDepth
      )
      -
      Math.max(
        b.firstDepth,
        b.secondDepth
      )
  );


  const nearest =
    common[0];


  if (
    nearest.firstDepth >= 2 &&
    nearest.secondDepth >= 2
  ) {

    const degree =
      Math.min(
        nearest.firstDepth,
        nearest.secondDepth
      ) - 1;


    const removed =
      Math.abs(
        nearest.firstDepth -
        nearest.secondDepth
      );


    let result =
      `${ordinal(degree)} Cousin`;


    if (removed) {

      result +=
        ` ${removed} ${
          removed === 1
            ? "Time"
            : "Times"
        } Removed`;

    }


    return result;

  }


  return "Extended Family";

}


function getAncestorMap(
  id
) {

  const result =
    new Map();


  const queue =
    [
      {
        id,
        depth: 0
      }
    ];


  while (
    queue.length
  ) {

    const current =
      queue.shift();


    const person =
      getCharacter(
        current.id
      );


    if (!person) {
      continue;
    }


    [
      person.motherId,
      person.fatherId
    ]
      .filter(Boolean)
      .forEach(
        parentId => {

          const depth =
            current.depth + 1;


          if (
            !result.has(
              parentId
            )
            ||
            depth <
            result.get(
              parentId
            )
          ) {

            result.set(
              parentId,
              depth
            );


            queue.push({

              id:
                parentId,

              depth

            });

          }

        }
      );

  }


  return result;

}


function getAncestorDepth(
  personId,
  ancestorId
) {

  const map =
    getAncestorMap(
      personId
    );


  return map.has(
    ancestorId
  )
    ? map.get(
        ancestorId
      )
    : null;

}


function makeAncestorTerm(
  person,
  depth
) {

  const role =
    inferParentRole(
      person.id
    );


  if (
    depth === 1
  ) {

    return role === "mother"
      ? "Mother"
      : role === "father"
        ? "Father"
        : "Parent";

  }


  if (
    depth === 2
  ) {

    return role === "mother"
      ? "Grandmother"
      : role === "father"
        ? "Grandfather"
        : "Grandparent";

  }


  const great =
    ordinal(
      depth - 2
    );


  return role === "mother"
    ? `${great} Great Grandmother`
    : role === "father"
      ? `${great} Great Grandfather`
      : `${great} Great Grandparent`;

}


function makeDescendantTerm(
  depth
) {

  if (
    depth === 1
  ) {
    return "Child";
  }


  if (
    depth === 2
  ) {
    return "Grandchild";
  }


  return `${
    ordinal(
      depth - 2
    )
  } Great Grandchild`;

}


function inferParentRole(
  id
) {

  let mother =
    false;


  let father =
    false;


  characters.forEach(
    character => {

      if (
        character.motherId === id
      ) {
        mother = true;
      }


      if (
        character.fatherId === id
      ) {
        father = true;
      }

    }
  );


  if (
    mother &&
    !father
  ) {
    return "mother";
  }


  if (
    father &&
    !mother
  ) {
    return "father";
  }


  return "unknown";

}


function ordinal(
  number
) {

  const hundred =
    number % 100;


  if (
    hundred >= 11 &&
    hundred <= 13
  ) {
    return `${number}th`;
  }


  switch (
    number % 10
  ) {

    case 1:
      return `${number}st`;

    case 2:
      return `${number}nd`;

    case 3:
      return `${number}rd`;

    default:
      return `${number}th`;

  }

}


/* =========================================================
   RELATIVES
========================================================= */

function renderRelationshipProfile(
  character
) {

  renderRelationshipButtons(
    "profileMother",
    character.motherId
      ? [
          getCharacter(
            character.motherId
          )
        ].filter(Boolean)
      : []
  );


  renderRelationshipButtons(
    "profileFather",
    character.fatherId
      ? [
          getCharacter(
            character.fatherId
          )
        ].filter(Boolean)
      : []
  );


  renderRelationshipButtons(
    "profileSiblings",
    getSiblings(
      character.id
    )
  );


  renderRelationshipButtons(
    "profileSpouses",
    getCharactersFromIds(
      character.spouseIds
    )
  );


  renderRelationshipButtons(
    "profileLovers",
    getCharactersFromIds(
      character.loverIds
    )
  );


  renderRelationshipButtons(
    "profileChildren",
    getChildren(
      character.id
    )
  );

}


function renderRelationshipButtons(
  id,
  people
) {

  const container =
    document.getElementById(
      id
    );


  container.innerHTML =
    "";


  if (!people.length) {

    container.textContent =
      "—";

    return;

  }


  people.forEach(
    person => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "relationship-button";


      button.type =
        "button";


      button.textContent =
        getTreeName(
          person
        );


      button.addEventListener(
        "click",

        function() {

          openProfile(
            person.id
          );

        }
      );


      container.appendChild(
        button
      );

    }
  );

}


function getChildren(
  parentId
) {

  return characters.filter(
    character =>
      character.motherId ===
        parentId
      ||
      character.fatherId ===
        parentId
  );

}


function getSiblings(
  id
) {

  const person =
    getCharacter(id);


  if (!person) {
    return [];
  }


  return characters.filter(
    other =>
      other.id !== id
      &&
      (
        (
          person.motherId &&
          other.motherId ===
          person.motherId
        )
        ||
        (
          person.fatherId &&
          other.fatherId ===
          person.fatherId
        )
      )
  );

}


/* =========================================================
   PROFILE BUTTONS
========================================================= */

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


/* DELETE */

deleteCharacterButton.addEventListener(
  "click",

  function() {

    const person =
      getCharacter(
        selectedCharacterId
      );


    if (!person) {
      return;
    }


    openConfirmation(
      `Delete ${getTreeName(person)}?`,
      "Their character record and relationship links will be removed.",
      function() {

        characters =
          characters.filter(
            character =>
              character.id !==
              person.id
          );


        characters.forEach(
          character => {

            if (
              character.motherId ===
              person.id
            ) {
              character.motherId =
                null;
            }


            if (
              character.fatherId ===
              person.id
            ) {
              character.fatherId =
                null;
            }


            character.spouseIds =
              character.spouseIds
                .filter(
                  id =>
                    id !==
                    person.id
                );


            character.loverIds =
              character.loverIds
                .filter(
                  id =>
                    id !==
                    person.id
                );

          }
        );


        saveCharacters();

        closeProfile();

        renderTree();

        showToast(
          "Character deleted"
        );

      },
      "Delete"
    );

  }
);


/* =========================================================
   EDIT CHARACTER
========================================================= */

editCharacterButton.addEventListener(
  "click",
  openEditor
);


function openEditor() {

  const character =
    getCharacter(
      selectedCharacterId
    );


  if (!character) {
    return;
  }


  pendingPortraitData =
    character.portraitData;


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
    character.aliases.join(
      ", "
    );


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


  setCharacterColorEditorValue(
    "hair",
    character
  );


  setCharacterColorEditorValue(
    "eyes",
    character
  );


  setCharacterColorEditorValue(
    "skin",
    character
  );


  renderEditPortrait(
    character
  );


  populateRelationshipSelectors(
    character
  );


  profileBackdrop.classList.add(
    "hidden"
  );


  profilePanel.classList.add(
    "hidden"
  );


  editBackdrop.classList.remove(
    "hidden"
  );


  editPanel.classList.remove(
    "hidden"
  );

}


function setCharacterColorEditorValue(
  trait,
  character
) {

  let select;
  let custom;


  if (
    trait === "hair"
  ) {

    select =
      editHairPreset;

    custom =
      editHairCustom;


    select.value =
      character.hairColorId || "";


    custom.value =
      isHexColor(
        character.hairColor
      )
        ? character.hairColor
        : "#242429";

  }


  if (
    trait === "eyes"
  ) {

    select =
      editEyePreset;

    custom =
      editEyeCustom;


    select.value =
      character.eyeColorId || "";


    custom.value =
      isHexColor(
        character.eyeColor
      )
        ? character.eyeColor
        : "#242429";

  }


  if (
    trait === "skin"
  ) {

    select =
      editSkinPreset;

    custom =
      editSkinCustom;


    select.value =
      character.skinColorId || "";


    custom.value =
      isHexColor(
        character.skinColor
      )
        ? character.skinColor
        : "#F3D2BF";

  }


  select.dispatchEvent(
    new Event(
      "change"
    )
  );

}


/* RELATIONSHIP SELECTS */

function populateRelationshipSelectors(
  character
) {

  populateSingleSelect(
    "editMother",
    character.id,
    character.motherId
  );


  populateSingleSelect(
    "editFather",
    character.id,
    character.fatherId
  );


  populateMultiSelect(
    "editSpouses",
    character.id,
    character.spouseIds
  );


  populateMultiSelect(
    "editLovers",
    character.id,
    character.loverIds
  );

}


function populateSingleSelect(
  id,
  currentId,
  selectedId
) {

  const select =
    document.getElementById(
      id
    );


  select.innerHTML =
    `<option value="">— None —</option>`;


  [...characters]
    .sort(
      compareCharacterNames
    )
    .forEach(
      person => {

        if (
          person.id ===
          currentId
        ) {
          return;
        }


        const option =
          document.createElement(
            "option"
          );


        option.value =
          person.id;


        option.textContent =
          getTreeName(
            person
          );


        option.selected =
          person.id ===
          selectedId;


        select.appendChild(
          option
        );

      }
    );

}


function populateMultiSelect(
  id,
  currentId,
  selectedIds
) {

  const select =
    document.getElementById(
      id
    );


  select.innerHTML =
    "";


  [...characters]
    .sort(
      compareCharacterNames
    )
    .forEach(
      person => {

        if (
          person.id ===
          currentId
        ) {
          return;
        }


        const option =
          document.createElement(
            "option"
          );


        option.value =
          person.id;


        option.textContent =
          getTreeName(
            person
          );


        option.selected =
          selectedIds.includes(
            person.id
          );


        select.appendChild(
          option
        );

      }
    );

}


/* SAVE EDIT */

editCharacterForm.addEventListener(
  "submit",

  function(event) {

    event.preventDefault();


    const character =
      getCharacter(
        selectedCharacterId
      );


    if (!character) {
      return;
    }


    const oldSpouses =
      [...character.spouseIds];


    const oldLovers =
      [...character.loverIds];


    character.title =
      getInputValue(
        "editTitle"
      );


    character.givenName =
      getInputValue(
        "editGivenName"
      );


    character.aliases =
      makeAliasArray(
        getInputValue(
          "editAliases"
        )
      );


    character.maidenName =
      getInputValue(
        "editMaidenName"
      );


    character.familyName =
      getInputValue(
        "editFamilyName"
      );


    character.birthYear =
      getInputValue(
        "editBirthYear"
      );


    character.deathYear =
      getInputValue(
        "editDeathYear"
      );


    character.race =
      getInputValue(
        "editRace"
      );


    character.motherId =
      getSelectedSingleId(
        "editMother"
      );


    character.fatherId =
      getSelectedSingleId(
        "editFather"
      );


    character.spouseIds =
      getSelectedMultipleIds(
        "editSpouses"
      );


    character.loverIds =
      getSelectedMultipleIds(
        "editLovers"
      );


    applyCharacterColorFromEditor(
      character,
      "hair"
    );


    applyCharacterColorFromEditor(
      character,
      "eyes"
    );


    applyCharacterColorFromEditor(
      character,
      "skin"
    );


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


    character.portraitData =
      pendingPortraitData || "";


    syncTwoWay(
      character.id,
      oldSpouses,
      character.spouseIds,
      "spouseIds"
    );


    syncTwoWay(
      character.id,
      oldLovers,
      character.loverIds,
      "loverIds"
    );


    saveCharacters();

    renderTree();


    editBackdrop.classList.add(
      "hidden"
    );


    editPanel.classList.add(
      "hidden"
    );


    openProfile(
      character.id
    );


    showToast(
      "Character saved"
    );

  }
);


function applyCharacterColorFromEditor(
  character,
  trait
) {

  let select;
  let custom;


  if (
    trait === "hair"
  ) {

    select =
      editHairPreset;

    custom =
      editHairCustom;

  }


  if (
    trait === "eyes"
  ) {

    select =
      editEyePreset;

    custom =
      editEyeCustom;

  }


  if (
    trait === "skin"
  ) {

    select =
      editSkinPreset;

    custom =
      editSkinCustom;

  }


  const id =
    select.value;


  let hex =
    "";


  if (
    id === "custom"
  ) {

    hex =
      custom.value;

  }
  else if (id) {

    const preset =
      findColorPreset(
        trait,
        id
      );


    hex =
      preset
        ? preset.hex
        : "";

  }


  if (
    trait === "hair"
  ) {

    character.hairColorId =
      id;

    character.hairColor =
      hex;

  }


  if (
    trait === "eyes"
  ) {

    character.eyeColorId =
      id;

    character.eyeColor =
      hex;

  }


  if (
    trait === "skin"
  ) {

    character.skinColorId =
      id;

    character.skinColor =
      hex;

  }

}


/* CANCEL EDIT */

function cancelEditor() {

  editBackdrop.classList.add(
    "hidden"
  );


  editPanel.classList.add(
    "hidden"
  );


  if (
    selectedCharacterId
  ) {

    openProfile(
      selectedCharacterId
    );

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


/* =========================================================
   PORTRAITS
========================================================= */

editPortraitFile.addEventListener(
  "change",

  async function() {

    const file =
      editPortraitFile.files[0];


    if (!file) {
      return;
    }


    pendingPortraitData =
      await compressPortrait(
        file
      );


    renderEditPortrait({

      givenName:
        getInputValue(
          "editGivenName"
        ),

      portraitData:
        pendingPortraitData

    });

  }
);


removePortraitButton.addEventListener(
  "click",

  function() {

    pendingPortraitData =
      "";


    renderEditPortrait({

      givenName:
        getInputValue(
          "editGivenName"
        ),

      portraitData: ""

    });

  }
);


function renderEditPortrait(
  character
) {

  editPortraitPreview.innerHTML =
    "";


  if (
    character.portraitData
  ) {

    const image =
      document.createElement(
        "img"
      );


    image.src =
      character.portraitData;


    editPortraitPreview.appendChild(
      image
    );

  } else {

    editPortraitPreview.textContent =
      getInitial(
        character
      );

  }

}


async function compressPortrait(
  file
) {

  const source =
    await readFile(
      file
    );


  const image =
    await loadImage(
      source
    );


  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    320;

  canvas.height =
    320;


  const context =
    canvas.getContext(
      "2d"
    );


  const size =
    Math.min(
      image.width,
      image.height
    );


  context.drawImage(
    image,

    (
      image.width -
      size
    ) / 2,

    (
      image.height -
      size
    ) / 2,

    size,
    size,

    0,
    0,
    320,
    320
  );


  return canvas.toDataURL(
    "image/jpeg",
    0.78
  );

}


function readFile(
  file
) {

  return new Promise(
    resolve => {

      const reader =
        new FileReader();


      reader.onload =
        () =>
          resolve(
            reader.result
          );


      reader.readAsDataURL(
        file
      );

    }
  );

}


function loadImage(
  source
) {

  return new Promise(
    resolve => {

      const image =
        new Image();


      image.onload =
        () =>
          resolve(
            image
          );


      image.src =
        source;

    }
  );

}


/* =========================================================
   TWO-WAY RELATIONSHIPS
========================================================= */

function syncTwoWay(
  characterId,
  oldIds,
  newIds,
  field
) {

  oldIds.forEach(
    id => {

      if (
        newIds.includes(id)
      ) {
        return;
      }


      const other =
        getCharacter(id);


      if (other) {

        other[field] =
          other[field].filter(
            value =>
              value !==
              characterId
          );

      }

    }
  );


  newIds.forEach(
    id => {

      const other =
        getCharacter(id);


      if (
        other &&
        !other[field].includes(
          characterId
        )
      ) {

        other[field].push(
          characterId
        );

      }

    }
  );

}


/* =========================================================
   CONFIRM
========================================================= */

function openConfirmation(
  title,
  message,
  action,
  buttonText
) {

  confirmTitle.textContent =
    title;


  confirmMessage.textContent =
    message;


  confirmAcceptButton.textContent =
    buttonText;


  confirmAction =
    action;


  confirmBackdrop.classList.remove(
    "hidden"
  );


  confirmPanel.classList.remove(
    "hidden"
  );

}


function closeConfirmation() {

  confirmBackdrop.classList.add(
    "hidden"
  );


  confirmPanel.classList.add(
    "hidden"
  );


  confirmAction =
    null;

}


confirmCancelButton.addEventListener(
  "click",
  closeConfirmation
);


confirmAcceptButton.addEventListener(
  "click",

  function() {

    const action =
      confirmAction;


    closeConfirmation();


    if (action) {
      action();
    }

  }
);


/* =========================================================
   HELPERS
========================================================= */

function getCharacter(
  id
) {

  return characters.find(
    character =>
      character.id === id
  );

}


function getCharactersFromIds(
  ids
) {

  return ids
    .map(
      getCharacter
    )
    .filter(Boolean);

}


function getSelectedSingleId(
  id
) {

  const value =
    document.getElementById(
      id
    ).value;


  return value
    ? Number(value)
    : null;

}


function getSelectedMultipleIds(
  id
) {

  return Array.from(
    document.getElementById(
      id
    ).selectedOptions
  )
    .map(
      option =>
        Number(
          option.value
        )
    );

}


function makeAliasArray(
  value
) {

  return value
    .split(",")
    .map(
      item =>
        item.trim()
    )
    .filter(Boolean);

}


function getTreeName(
  character
) {

  return `
    ${character.givenName || ""}
    ${character.familyName || ""}
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

  const maiden =
    character.maidenName
      ? `(${character.maidenName})`
      : "";


  return `
    ${character.givenName}
    ${maiden}
    ${character.familyName}
  `
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


function getInitial(
  character
) {

  return (
    character.givenName ||
    "?"
  )
    .charAt(0)
    .toUpperCase();

}


function compareCharacterNames(
  a,
  b
) {

  return getTreeName(a)
    .localeCompare(
      getTreeName(b)
    );

}


function makeYearText(
  character
) {

  if (
    character.birthYear &&
    character.deathYear
  ) {

    return `${character.birthYear} – ${character.deathYear}`;

  }


  if (
    character.birthYear
  ) {

    return `${character.birthYear} –`;

  }


  if (
    character.deathYear
  ) {

    return `? – ${character.deathYear}`;

  }


  return "Unknown";

}


function setProfileText(
  id,
  value
) {

  document.getElementById(
    id
  ).textContent =
    value || "—";

}


function setColorSwatch(
  id,
  color
) {

  document.getElementById(
    id
  ).style.background =
    color || "#242429";

}


function isHexColor(
  value
) {

  return /^#[0-9A-Fa-f]{6}$/.test(
    value || ""
  );

}


function getInputValue(
  id
) {

  return document
    .getElementById(id)
    .value
    .trim();

}


function escapeHTML(
  value
) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    value || "";


  return div.innerHTML;

}


function capitalize(
  value
) {

  if (
    value === "eyes"
  ) {
    return "Eyes";
  }


  return value
    .charAt(0)
    .toUpperCase()
    +
    value.slice(1);

}


function roundNumber(
  number
) {

  return Math.round(
    number * 100
  ) / 100;

}


function cleanBrokenRelationships() {

  const ids =
    new Set(
      characters.map(
        character =>
          character.id
      )
    );


  characters.forEach(
    character => {

      if (
        !ids.has(
          character.motherId
        )
      ) {
        character.motherId =
          null;
      }


      if (
        !ids.has(
          character.fatherId
        )
      ) {
        character.fatherId =
          null;
      }


      character.spouseIds =
        character.spouseIds.filter(
          id =>
            ids.has(id)
        );


      character.loverIds =
        character.loverIds.filter(
          id =>
            ids.has(id)
        );

    }
  );

}


function showToast(
  message
) {

  clearTimeout(
    toastTimer
  );


  toast.textContent =
    message;


  toast.classList.remove(
    "hidden"
  );


  toastTimer =
    setTimeout(
      function() {

        toast.classList.add(
          "hidden"
        );

      },
      2200
    );

}


function focusCharacter(
  id
) {

  const position =
    lastLayout
      ? lastLayout.positions.get(id)
      : null;


  if (position) {

    const rect =
      treeCanvas.getBoundingClientRect();


    zoom =
      Math.max(
        0.9,
        Math.min(
          zoom,
          1.15
        )
      );


    viewX =
      rect.width / 2 -
      position.x * zoom;


    viewY =
      rect.height / 2 -
      position.y * zoom;


    applyViewTransform();

  }


  setTimeout(
    function() {

      openProfile(id);

    },
    180
  );

}


/* =========================================================
   START
========================================================= */

setupCharacterColorEditors();

cleanBrokenRelationships();

saveCharacters();

saveLibraries();

renderTree();

applyViewTransform();


setTimeout(
  centerTree,
  100
);
