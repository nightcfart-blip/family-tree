const STORAGE_KEY =
  "fantasyFamilyTreeCharacters";

const VANTAGE_KEY =
  "fantasyFamilyTreeVantage";

const RACE_LIBRARY_KEY =
  "fantasyFamilyTreeRaceLibrary";

const SPECIES_LIBRARY_KEY =
  "fantasyFamilyTreeSpeciesLibrary";

const GENETIC_MODEL_KEY =
  "fantasyFamilyTreeGeneticModel";

const UNKNOWN_ANCESTRY_ID =
  "__unknown__";

const COLOR_PRESETS =
  window.COLOR_PRESETS;


/*
  FANTASY GENETIC MODEL

  Final child probability:

  70% family
  20% Race
  10% Species

  Family:
  35% Mother
  35% Father

  Parent genetic contribution:
  60% parent's inherited possibilities
  40% parent's actual phenotype

  Earlier ancestors survive recursively
  through the parent's inherited
  possibility distribution.
*/

const DEFAULT_GENETIC_MODEL = {

  family:
    70,

  race:
    20,

  species:
    10,

  parentGenetic:
    60,

  parentActual:
    40

};


let geneticModel =
  loadGeneticModel();


/* TREE */

const NODE_GAP_X =
  235;

const GENERATION_GAP_Y =
  235;

const WORLD_SIZE =
  6000;

const MIN_ZOOM =
  0.2;

const MAX_ZOOM =
  2.5;

const ZOOM_STEP =
  0.15;


/* DATA */

let raceLibrary =
  loadLibrary(
    RACE_LIBRARY_KEY
  );

let speciesLibrary =
  loadLibrary(
    SPECIES_LIBRARY_KEY
  );

let characters =
  loadCharacters();

let vantageCharacterId =
  loadVantage();

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


/* TEMP */

let pendingPortraitData =
  null;

let activeLibraryType =
  "race";

let editingLibraryId =
  null;

let confirmAction =
  null;

let toastTimer =
  null;


/* =========================================================
   ELEMENTS
========================================================= */

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

/* GENETIC MODEL SETTINGS */

const familyWeightInput =
  document.getElementById(
    "familyWeightInput"
  );

const raceWeightInput =
  document.getElementById(
    "raceWeightInput"
  );

const speciesWeightInput =
  document.getElementById(
    "speciesWeightInput"
  );

const parentGeneticWeightInput =
  document.getElementById(
    "parentGeneticWeightInput"
  );

const parentActualWeightInput =
  document.getElementById(
    "parentActualWeightInput"
  );

const overallWeightTotal =
  document.getElementById(
    "overallWeightTotal"
  );

const parentWeightTotal =
  document.getElementById(
    "parentWeightTotal"
  );

const saveGeneticModelButton =
  document.getElementById(
    "saveGeneticModelButton"
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

const libraryInfoInput =
  document.getElementById(
    "libraryInfoInput"
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


/* CHARACTER EDIT */

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

const editMother =
  document.getElementById(
    "editMother"
  );

const editFather =
  document.getElementById(
    "editFather"
  );

const editAncestryOverride =
  document.getElementById(
    "editAncestryOverride"
  );

const ancestryOverrideWrap =
  document.getElementById(
    "ancestryOverrideWrap"
  );

const ancestryModeTitle =
  document.getElementById(
    "ancestryModeTitle"
  );

const ancestryModeDescription =
  document.getElementById(
    "ancestryModeDescription"
  );

const automaticAncestryPreview =
  document.getElementById(
    "automaticAncestryPreview"
  );

const automaticRacePreview =
  document.getElementById(
    "automaticRacePreview"
  );

const automaticSpeciesPreview =
  document.getElementById(
    "automaticSpeciesPreview"
  );

const manualAncestryEditor =
  document.getElementById(
    "manualAncestryEditor"
  );

const raceAncestryRows =
  document.getElementById(
    "raceAncestryRows"
  );

const speciesAncestryRows =
  document.getElementById(
    "speciesAncestryRows"
  );

const raceAncestryTotal =
  document.getElementById(
    "raceAncestryTotal"
  );

const speciesAncestryTotal =
  document.getElementById(
    "speciesAncestryTotal"
  );

const addRaceAncestryButton =
  document.getElementById(
    "addRaceAncestryButton"
  );

const addSpeciesAncestryButton =
  document.getElementById(
    "addSpeciesAncestryButton"
  );


/* PORTRAIT */

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


/* COLORS */

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


/* =========================================================
   STORAGE
========================================================= */

function loadGeneticModel() {

  try {

    const saved =
      localStorage.getItem(
        GENETIC_MODEL_KEY
      );


    if (!saved) {

      return {
        ...DEFAULT_GENETIC_MODEL
      };

    }


    const parsed =
      JSON.parse(saved);


    return {

      family:
        safeWeight(
          parsed.family,
          DEFAULT_GENETIC_MODEL.family
        ),

      race:
        safeWeight(
          parsed.race,
          DEFAULT_GENETIC_MODEL.race
        ),

      species:
        safeWeight(
          parsed.species,
          DEFAULT_GENETIC_MODEL.species
        ),

      parentGenetic:
        safeWeight(
          parsed.parentGenetic,
          DEFAULT_GENETIC_MODEL.parentGenetic
        ),

      parentActual:
        safeWeight(
          parsed.parentActual,
          DEFAULT_GENETIC_MODEL.parentActual
        )

    };

  } catch {

    return {
      ...DEFAULT_GENETIC_MODEL
    };

  }

}


function saveGeneticModel() {

  localStorage.setItem(
    GENETIC_MODEL_KEY,
    JSON.stringify(
      geneticModel
    )
  );

}


function safeWeight(
  value,
  fallback
) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {

    return fallback;

  }


  return Math.max(
    0,
    Math.min(
      100,
      number
    )
  );

}


function populateGeneticModelInputs() {

  familyWeightInput.value =
    geneticModel.family;


  raceWeightInput.value =
    geneticModel.race;


  speciesWeightInput.value =
    geneticModel.species;


  parentGeneticWeightInput.value =
    geneticModel.parentGenetic;


  parentActualWeightInput.value =
    geneticModel.parentActual;


  updateGeneticModelTotals();

}


function updateGeneticModelTotals() {

  const overall =
    getModelInputNumber(
      familyWeightInput
    )
    +
    getModelInputNumber(
      raceWeightInput
    )
    +
    getModelInputNumber(
      speciesWeightInput
    );


  const parent =
    getModelInputNumber(
      parentGeneticWeightInput
    )
    +
    getModelInputNumber(
      parentActualWeightInput
    );


  overallWeightTotal.textContent =
    `Total: ${formatPercent(overall)}%`;


  parentWeightTotal.textContent =
    `Total: ${formatPercent(parent)}%`;


  setTotalValidity(
    overallWeightTotal,
    overall
  );


  setTotalValidity(
    parentWeightTotal,
    parent
  );

}


function getModelInputNumber(
  input
) {

  return Number(
    input.value
  ) || 0;

}


function setTotalValidity(
  element,
  total
) {

  element.classList.remove(
    "valid",
    "invalid"
  );


  element.classList.add(
    approximately100(total)
      ? "valid"
      : "invalid"
  );

}


[
  familyWeightInput,
  raceWeightInput,
  speciesWeightInput,
  parentGeneticWeightInput,
  parentActualWeightInput
]
  .forEach(
    input => {

      input.addEventListener(
        "input",
        updateGeneticModelTotals
      );

    }
  );


saveGeneticModelButton.addEventListener(
  "click",

  function() {

    const family =
      getModelInputNumber(
        familyWeightInput
      );


    const race =
      getModelInputNumber(
        raceWeightInput
      );


    const species =
      getModelInputNumber(
        speciesWeightInput
      );


    const parentGenetic =
      getModelInputNumber(
        parentGeneticWeightInput
      );


    const parentActual =
      getModelInputNumber(
        parentActualWeightInput
      );


    if (
      !approximately100(
        family +
        race +
        species
      )
    ) {

      showToast(
        "Family + Race + Species must total 100%"
      );

      return;

    }


    if (
      !approximately100(
        parentGenetic +
        parentActual
      )
    ) {

      showToast(
        "Parent Genetics + Actual Appearance must total 100%"
      );

      return;

    }


    geneticModel = {

      family,

      race,

      species,

      parentGenetic,

      parentActual

    };


    saveGeneticModel();


    showToast(
      "Genetic model saved"
    );


    /*
      Nothing needs to be stored
      on individual characters.

      Their probabilities are
      recalculated from this model
      whenever profiles are opened.
    */

  }
);

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
    String(
      vantageCharacterId
    )
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

    raceAncestry:
      normalizeAncestry(
        character.raceAncestry
      ),

    speciesAncestry:
      normalizeAncestry(
        character.speciesAncestry
      ),

    ancestryOverride:
      Boolean(
        character.ancestryOverride
      ),

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

    info:
      item.info || "",

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


function normalizeAncestry(
  values
) {

  if (!Array.isArray(values)) {
    return [];
  }


  return values
    .map(
      entry => ({

        id:
          String(
            entry.id || ""
          ),

        percent:
          Number(
            entry.percent
          ) || 0

      })
    )
    .filter(
      entry =>
        entry.id &&
        entry.percent > 0
    );

}


function normalizeDistribution(
  values
) {

  if (!Array.isArray(values)) {
    return [];
  }


  return values
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

  return Array.isArray(values)
    ? values
        .map(Number)
        .filter(Number.isFinite)
    : [];

}


/* =========================================================
   OLD RACE MIGRATION
========================================================= */

function migrateLegacyRaceFields() {

  let changed =
    false;


  characters.forEach(
    character => {

      if (
        character.raceAncestry.length
      ) {
        return;
      }


      const oldRace =
        character.race.trim();


      if (!oldRace) {
        return;
      }


      let item =
        raceLibrary.find(
          race =>
            race.name
              .toLowerCase()
            ===
            oldRace
              .toLowerCase()
        );


      if (!item) {

        item = {

          id:
            createLibraryId(),

          name:
            oldRace,

          info: "",

          hairDistribution: [],

          eyeDistribution: [],

          skinDistribution: []

        };


        raceLibrary.push(
          item
        );

      }


      character.raceAncestry =
        [
          {
            id:
              item.id,

            percent:
              100
          }
        ];


      changed =
        true;

    }
  );


  if (changed) {

    saveLibraries();

    saveCharacters();

  }

}


/* =========================================================
   COLOR PRESETS
========================================================= */

function migrateColor(
  trait,
  id,
  hex
) {

  if (
    id &&
    findColorPreset(
      trait,
      id
    )
  ) {

    const preset =
      findColorPreset(
        trait,
        id
      );


    return {
      id:
        preset.id,

      hex:
        preset.hex
    };

  }


  if (hex) {

    const match =
      COLOR_PRESETS[trait]
        .find(
          preset =>
            preset.hex
              .toLowerCase()
            ===
            hex
              .toLowerCase()
        );


    if (match) {

      return {
        id:
          match.id,

        hex:
          match.hex
      };

    }


    return {
      id:
        "custom",

      hex
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


/* =========================================================
   ANCESTRY
========================================================= */

function usesManualAncestry(
  character
) {

  if (!character) {
    return true;
  }


  const hasParents =
    Boolean(
      character.motherId ||
      character.fatherId
    );


  return (
    !hasParents ||
    character.ancestryOverride
  );

}


function calculateAncestry(
  characterId,
  kind
) {

  return calculateAncestryInternal(
    characterId,
    kind,
    new Map(),
    new Set()
  );

}


function calculateAncestryInternal(
  characterId,
  kind,
  memo,
  visiting
) {

  const key =
    `${kind}:${characterId}`;


  if (memo.has(key)) {

    return cloneEntries(
      memo.get(key)
    );

  }


  if (visiting.has(key)) {

    return [
      {
        id:
          UNKNOWN_ANCESTRY_ID,

        percent:
          100
      }
    ];

  }


  const character =
    getCharacter(
      characterId
    );


  if (!character) {

    return [
      {
        id:
          UNKNOWN_ANCESTRY_ID,

        percent:
          100
      }
    ];

  }


  visiting.add(key);


  if (
    usesManualAncestry(
      character
    )
  ) {

    const source =
      kind === "race"
        ? character.raceAncestry
        : character.speciesAncestry;


    const result =
      ancestryWithUnknown(
        source
      );


    memo.set(
      key,
      result
    );


    visiting.delete(key);


    return cloneEntries(
      result
    );

  }


  const map =
    new Map();


  addParentAncestry(
    character.motherId,
    kind,
    map,
    memo,
    visiting
  );


  addParentAncestry(
    character.fatherId,
    kind,
    map,
    memo,
    visiting
  );


  const result =
    mapToEntries(
      map
    );


  memo.set(
    key,
    result
  );


  visiting.delete(key);


  return cloneEntries(
    result
  );

}


function addParentAncestry(
  parentId,
  kind,
  map,
  memo,
  visiting
) {

  if (!parentId) {

    addMapValue(
      map,
      UNKNOWN_ANCESTRY_ID,
      50
    );

    return;

  }


  const parent =
    getCharacter(
      parentId
    );


  if (!parent) {

    addMapValue(
      map,
      UNKNOWN_ANCESTRY_ID,
      50
    );

    return;

  }


  const ancestry =
    calculateAncestryInternal(
      parent.id,
      kind,
      memo,
      visiting
    );


  ancestry.forEach(
    entry => {

      addMapValue(
        map,
        entry.id,
        entry.percent * 0.5
      );

    }
  );

}


function ancestryWithUnknown(
  ancestry
) {

  const map =
    new Map();


  ancestry.forEach(
    entry => {

      addMapValue(
        map,
        entry.id,
        entry.percent
      );

    }
  );


  const total =
    sumMap(
      map
    );


  if (
    total < 100
  ) {

    addMapValue(
      map,
      UNKNOWN_ANCESTRY_ID,
      100 - total
    );

  }


  return mapToEntries(
    map
  );

}


/* =========================================================
   GENETIC APPEARANCE ENGINE
========================================================= */

function calculateTraitProbabilities(
  characterId,
  trait
) {

  return calculateTraitInternal(
    characterId,
    trait,
    new Map(),
    new Set()
  );

}


function calculateTraitInternal(
  characterId,
  trait,
  memo,
  visiting
) {

  const key =
    `${trait}:${characterId}`;


  if (memo.has(key)) {

    return cloneEntries(
      memo.get(key)
    );

  }


  if (visiting.has(key)) {
    return [];
  }


  const character =
    getCharacter(
      characterId
    );


  if (!character) {
    return [];
  }


  visiting.add(key);


  const raceBaseline =
    calculateAncestryTraitBaseline(
      character.id,
      "race",
      trait
    );


  const speciesBaseline =
    calculateAncestryTraitBaseline(
      character.id,
      "species",
      trait
    );


  const background =
    combineBackgroundBaselines(
      raceBaseline,
      speciesBaseline
    );


  const hasMother =
    Boolean(
      getCharacter(
        character.motherId
      )
    );


  const hasFather =
    Boolean(
      getCharacter(
        character.fatherId
      )
    );


  /*
    FOUNDERS

    No parents:
    background genetics.

    If no background exists,
    actual phenotype becomes 100%.
  */

  if (
    !hasMother &&
    !hasFather
  ) {

    let founder =
      background;


    if (!founder.length) {

      founder =
        actualColorDistribution(
          character,
          trait
        );

    }


    founder =
      normalizeProbabilityEntries(
        founder
      );


    memo.set(
      key,
      founder
    );


    visiting.delete(key);


    return cloneEntries(
      founder
    );

  }


  const finalMap =
    new Map();


  /*
    FAMILY — 70%
  */

const perParentWeight =
  (
    geneticModel.family /
    100
  ) / 2;


  addFamilyContribution(
    character.motherId,
    character,
    trait,
    perParentWeight,
    background,
    finalMap,
    memo,
    visiting
  );


  addFamilyContribution(
    character.fatherId,
    character,
    trait,
    perParentWeight,
    background,
    finalMap,
    memo,
    visiting
  );


  /*
    RACE — 20%
  */

addWeightedEntries(
  finalMap,
  raceBaseline,
  geneticModel.race / 100
);

  /*
    SPECIES — 10%
  */

addWeightedEntries(
  finalMap,
  speciesBaseline,
  geneticModel.species / 100
);


  /*
    If Race or Species had no
    distribution, their missing
    weight is redistributed over
    everything that did contribute.
  */

  let result =
    mapToEntries(
      finalMap
    );


  if (!result.length) {

    result =
      actualColorDistribution(
        character,
        trait
      );

  }


  result =
    normalizeProbabilityEntries(
      result
    );


  memo.set(
    key,
    result
  );


  visiting.delete(key);


  return cloneEntries(
    result
  );

}


function addFamilyContribution(
  parentId,
  child,
  trait,
  totalWeight,
  fallbackBackground,
  finalMap,
  memo,
  visiting
) {

  const parent =
    getCharacter(
      parentId
    );


  /*
    Unknown parent:
    use child's ancestry baseline.
  */

  if (!parent) {

    addWeightedEntries(
      finalMap,
      fallbackBackground,
      totalWeight
    );

    return;

  }


  const parentGenetics =
    calculateTraitInternal(
      parent.id,
      trait,
      memo,
      visiting
    );


  const parentActual =
    actualColorDistribution(
      parent,
      trait
    );


  const parentMap =
    new Map();


  /*
    60% parent's inherited genetics
  */

  addWeightedEntries(
  parentMap,
  parentGenetics,
  geneticModel.parentGenetic / 100
);


  /*
    40% parent's actual appearance
  */

addWeightedEntries(
  parentMap,
  parentActual,
  geneticModel.parentActual / 100
);


  let parentBlend =
    mapToEntries(
      parentMap
    );


  if (!parentBlend.length) {

    parentBlend =
      fallbackBackground;

  }


  parentBlend =
    normalizeProbabilityEntries(
      parentBlend
    );


  addWeightedEntries(
    finalMap,
    parentBlend,
    totalWeight
  );

}


/* =========================================================
   RACE / SPECIES BASELINE
========================================================= */

function calculateAncestryTraitBaseline(
  characterId,
  kind,
  trait
) {

  const ancestry =
    calculateAncestry(
      characterId,
      kind
    );


  const library =
    kind === "race"
      ? raceLibrary
      : speciesLibrary;


  const map =
    new Map();


  let usableAncestryWeight =
    0;


  ancestry.forEach(
    ancestryEntry => {

      if (
        ancestryEntry.id ===
        UNKNOWN_ANCESTRY_ID
      ) {
        return;
      }


      const item =
        library.find(
          entry =>
            entry.id ===
            ancestryEntry.id
        );


      if (!item) {
        return;
      }


      const distribution =
        getLibraryTraitDistribution(
          item,
          trait
        );


      if (!distribution.length) {
        return;
      }


      const ancestryWeight =
        ancestryEntry.percent / 100;


      usableAncestryWeight +=
        ancestryWeight;


      distribution.forEach(
        colorEntry => {

          addMapValue(
            map,
            colorEntry.colorId,
            ancestryWeight *
            colorEntry.percent /
            100
          );

        }
      );

    }
  );


  if (
    usableAncestryWeight <= 0
  ) {
    return [];
  }


  return normalizeProbabilityEntries(
    mapToEntries(
      map
    )
  );

}


function getLibraryTraitDistribution(
  item,
  trait
) {

  if (
    trait === "hair"
  ) {
    return item.hairDistribution;
  }


  if (
    trait === "eyes"
  ) {
    return item.eyeDistribution;
  }


  return item.skinDistribution;

}


function combineBackgroundBaselines(
  race,
  species
) {

  const map =
    new Map();


  if (
    race.length &&
    species.length
  ) {

    addWeightedEntries(
      map,
      race,
      2 / 3
    );


    addWeightedEntries(
      map,
      species,
      1 / 3
    );

  }
  else if (
    race.length
  ) {

    addWeightedEntries(
      map,
      race,
      1
    );

  }
  else if (
    species.length
  ) {

    addWeightedEntries(
      map,
      species,
      1
    );

  }


  return normalizeProbabilityEntries(
    mapToEntries(
      map
    )
  );

}


/* =========================================================
   ACTUAL PHENOTYPE CONTRIBUTION
========================================================= */

function actualColorDistribution(
  character,
  trait
) {

  let id = "";
  let hex = "";


  if (
    trait === "hair"
  ) {

    id =
      character.hairColorId;

    hex =
      character.hairColor;

  }


  if (
    trait === "eyes"
  ) {

    id =
      character.eyeColorId;

    hex =
      character.eyeColor;

  }


  if (
    trait === "skin"
  ) {

    id =
      character.skinColorId;

    hex =
      character.skinColor;

  }


  if (!id && !hex) {
    return [];
  }


  /*
    Standard preset.
  */

  if (
    id &&
    id !== "custom" &&
    findColorPreset(
      trait,
      id
    )
  ) {

    return [
      {
        id,
        percent:
          100
      }
    ];

  }


  /*
    Custom colors are approximated
    to the nearest standard preset
    ONLY for genetic calculation.

    Their displayed actual color
    remains custom.
  */

  if (
    hex &&
    isHexColor(hex)
  ) {

    const nearest =
      findNearestPreset(
        trait,
        hex
      );


    if (nearest) {

      return [
        {
          id:
            nearest.id,

          percent:
            100
        }
      ];

    }

  }


  return [];

}


function findNearestPreset(
  trait,
  hex
) {

  const source =
    hexToRgb(
      hex
    );


  if (!source) {
    return null;
  }


  let best =
    null;

  let bestDistance =
    Infinity;


  COLOR_PRESETS[trait]
    .forEach(
      preset => {

        const rgb =
          hexToRgb(
            preset.hex
          );


        if (!rgb) {
          return;
        }


        const distance =
          Math.pow(
            source.r - rgb.r,
            2
          )
          +
          Math.pow(
            source.g - rgb.g,
            2
          )
          +
          Math.pow(
            source.b - rgb.b,
            2
          );


        if (
          distance <
          bestDistance
        ) {

          bestDistance =
            distance;

          best =
            preset;

        }

      }
    );


  return best;

}


function hexToRgb(
  hex
) {

  const match =
    /^#([0-9A-Fa-f]{6})$/
      .exec(
        hex || ""
      );


  if (!match) {
    return null;
  }


  const value =
    parseInt(
      match[1],
      16
    );


  return {

    r:
      (
        value >> 16
      ) & 255,

    g:
      (
        value >> 8
      ) & 255,

    b:
      value & 255

  };

}


/* =========================================================
   PROBABILITY HELPERS
========================================================= */

function addWeightedEntries(
  map,
  entries,
  weight
) {

  if (
    !entries ||
    !entries.length ||
    weight <= 0
  ) {
    return;
  }


  entries.forEach(
    entry => {

      addMapValue(
        map,
        entry.id,
        (
          entry.percent /
          100
        ) * weight
      );

    }
  );

}


function normalizeProbabilityEntries(
  entries
) {

  if (!entries.length) {
    return [];
  }


  const total =
    entries.reduce(
      (sum,entry) =>
        sum +
        Number(
          entry.percent
        ),
      0
    );


  if (
    total <= 0
  ) {
    return [];
  }


  return entries
    .map(
      entry => ({

        id:
          entry.id,

        percent:
          (
            Number(
              entry.percent
            ) /
            total
          ) * 100

      })
    )
    .filter(
      entry =>
        entry.percent >
        0.000001
    )
    .sort(
      (a,b) =>
        b.percent -
        a.percent
    );

}


function mapToEntries(
  map
) {

  return Array.from(
    map.entries()
  )
    .map(
      ([id,percent]) => ({
        id,
        percent
      })
    )
    .filter(
      entry =>
        entry.percent >
        0.00000001
    );

}


function cloneEntries(
  entries
) {

  return entries.map(
    entry => ({
      ...entry
    })
  );

}


function addMapValue(
  map,
  id,
  amount
) {

  if (
    !id ||
    !Number.isFinite(amount)
  ) {
    return;
  }


  map.set(
    id,
    (
      map.get(id) || 0
    ) + amount
  );

}


function sumMap(
  map
) {

  return Array.from(
    map.values()
  )
    .reduce(
      (sum,value) =>
        sum + value,
      0
    );

}


/* =========================================================
   GENETIC PROFILE DISPLAY
========================================================= */

function renderGeneticProbabilities(
  character
) {

  renderProbabilityList(
    document.getElementById(
      "profileHairProbabilities"
    ),
    "hair",
    calculateTraitProbabilities(
      character.id,
      "hair"
    ),
    character.hairColorId,
    character.hairColor
  );


  renderProbabilityList(
    document.getElementById(
      "profileEyeProbabilities"
    ),
    "eyes",
    calculateTraitProbabilities(
      character.id,
      "eyes"
    ),
    character.eyeColorId,
    character.eyeColor
  );


  renderProbabilityList(
    document.getElementById(
      "profileSkinProbabilities"
    ),
    "skin",
    calculateTraitProbabilities(
      character.id,
      "skin"
    ),
    character.skinColorId,
    character.skinColor
  );

}


function renderProbabilityList(
  container,
  trait,
  probabilities,
  actualId,
  actualHex
) {

  container.innerHTML =
    "";


  if (!probabilities.length) {

    const empty =
      document.createElement(
        "div"
      );


    empty.className =
      "probability-empty";


    empty.textContent =
      "Not enough genetic information yet. Add Race/Species base probabilities or family appearance data.";


    container.appendChild(
      empty
    );


    return;

  }


  let actualGeneticId =
    actualId;


  if (
    actualId === "custom" &&
    actualHex
  ) {

    const nearest =
      findNearestPreset(
        trait,
        actualHex
      );


    actualGeneticId =
      nearest
        ? nearest.id
        : "";

  }


  probabilities.forEach(
    entry => {

      const preset =
        findColorPreset(
          trait,
          entry.id
        );


      if (!preset) {
        return;
      }


      const row =
        document.createElement(
          "div"
        );


      row.className =
        "probability-row";


      const swatch =
        document.createElement(
          "div"
        );


      swatch.className =
        "probability-swatch";


      swatch.style.background =
        preset.hex;


      const name =
        document.createElement(
          "div"
        );


      name.className =
        "probability-name";


      name.textContent =
        preset.name;


      if (
        entry.id ===
        actualGeneticId
      ) {

        name.classList.add(
          "probability-actual"
        );

      }


      const percent =
        document.createElement(
          "div"
        );


      percent.className =
        "probability-percent";


      percent.textContent =
        `${formatProbability(
          entry.percent
        )}%`;


      row.appendChild(
        swatch
      );


      row.appendChild(
        name
      );


      row.appendChild(
        percent
      );


      container.appendChild(
        row
      );

    }
  );

}


function formatProbability(
  value
) {

  if (
    value >= 10
  ) {

    return value
      .toFixed(1)
      .replace(
        /\.0$/,
        ""
      );

  }


  if (
    value >= 1
  ) {

    return value
      .toFixed(2)
      .replace(
        /0+$/,
        ""
      )
      .replace(
        /\.$/,
        ""
      );

  }


  if (
    value >= 0.01
  ) {

    return value
      .toFixed(3)
      .replace(
        /0+$/,
        ""
      )
      .replace(
        /\.$/,
        ""
      );

  }


  return value
    .toFixed(5)
    .replace(
      /0+$/,
      ""
    )
    .replace(
      /\.$/,
      ""
    );

}


/* =========================================================
   ANCESTRY DISPLAY
========================================================= */

function getAncestryLibrary(
  kind
) {

  return kind === "race"
    ? raceLibrary
    : speciesLibrary;

}


function getAncestryName(
  kind,
  id
) {

  if (
    id ===
    UNKNOWN_ANCESTRY_ID
  ) {

    return "Unknown";

  }


  const item =
    getAncestryLibrary(
      kind
    )
      .find(
        entry =>
          entry.id === id
      );


  return item
    ? item.name
    : "Unknown";

}


function renderAncestryList(
  container,
  ancestry,
  kind
) {

  container.innerHTML =
    "";


  ancestry.forEach(
    entry => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "ancestry-profile-row";


      if (
        entry.id ===
        UNKNOWN_ANCESTRY_ID
      ) {

        row.classList.add(
          "ancestry-unknown"
        );

      }


      const name =
        document.createElement(
          "span"
        );


      name.textContent =
        getAncestryName(
          kind,
          entry.id
        );


      const percent =
        document.createElement(
          "strong"
        );


      percent.textContent =
        `${formatPercent(
          entry.percent
        )}%`;


      row.appendChild(
        name
      );


      row.appendChild(
        percent
      );


      container.appendChild(
        row
      );

    }
  );

}


/* =========================================================
   MANUAL ANCESTRY EDITOR
========================================================= */

function populateManualAncestryEditor(
  character
) {

  raceAncestryRows.innerHTML =
    "";

  speciesAncestryRows.innerHTML =
    "";


  character.raceAncestry.forEach(
    entry =>
      addAncestryEditorRow(
        "race",
        entry
      )
  );


  character.speciesAncestry.forEach(
    entry =>
      addAncestryEditorRow(
        "species",
        entry
      )
  );


  updateAncestryTotals();

}


function addAncestryEditorRow(
  kind,
  entry = null
) {

  const library =
    getAncestryLibrary(
      kind
    );


  if (!library.length) {

    showToast(
      kind === "race"
        ? "Create a Race first"
        : "Create a Species first"
    );

    return;

  }


  const container =
    kind === "race"
      ? raceAncestryRows
      : speciesAncestryRows;


  const row =
    document.createElement(
      "div"
    );


  row.className =
    "ancestry-editor-row";


  const select =
    document.createElement(
      "select"
    );


  [...library]
    .sort(
      (a,b) =>
        a.name.localeCompare(
          b.name
        )
    )
    .forEach(
      item => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          item.id;


        option.textContent =
          item.name;


        select.appendChild(
          option
        );

      }
    );


  if (entry) {

    select.value =
      entry.id;

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
    "0.01";

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

      updateAncestryTotals();

      refreshAncestryMode();

    }
  );


  percent.addEventListener(
    "input",

    function() {

      updateAncestryTotals();

      refreshAncestryMode();

    }
  );


  select.addEventListener(
    "change",
    refreshAncestryMode
  );


  row.appendChild(select);
  row.appendChild(percent);
  row.appendChild(remove);

  container.appendChild(row);

  updateAncestryTotals();

}


addRaceAncestryButton.addEventListener(
  "click",

  function() {

    addAncestryEditorRow(
      "race"
    );

  }
);


addSpeciesAncestryButton.addEventListener(
  "click",

  function() {

    addAncestryEditorRow(
      "species"
    );

  }
);


function readManualAncestry(
  kind
) {

  const container =
    kind === "race"
      ? raceAncestryRows
      : speciesAncestryRows;


  return Array.from(
    container.querySelectorAll(
      ".ancestry-editor-row"
    )
  )
    .map(
      row => ({

        id:
          row.querySelector(
            "select"
          ).value,

        percent:
          Number(
            row.querySelector(
              "input"
            ).value
          ) || 0

      })
    )
    .filter(
      entry =>
        entry.id &&
        entry.percent > 0
    );

}


function updateAncestryTotals() {

  updateOneAncestryTotal(
    "race",
    raceAncestryTotal
  );


  updateOneAncestryTotal(
    "species",
    speciesAncestryTotal
  );

}


function updateOneAncestryTotal(
  kind,
  element
) {

  const ancestry =
    readManualAncestry(
      kind
    );


  const total =
    ancestry.reduce(
      (sum,entry) =>
        sum + entry.percent,
      0
    );


  element.textContent =
    `Total: ${formatPercent(total)}%`;


  element.classList.remove(
    "valid",
    "invalid"
  );


  if (!ancestry.length) {
    return;
  }


  element.classList.add(
    approximately100(total)
      ? "valid"
      : "invalid"
  );

}


/* =========================================================
   ANCESTRY MODE
========================================================= */

editMother.addEventListener(
  "change",
  refreshAncestryMode
);


editFather.addEventListener(
  "change",
  refreshAncestryMode
);


editAncestryOverride.addEventListener(
  "change",
  refreshAncestryMode
);


function refreshAncestryMode() {

  if (!selectedCharacterId) {
    return;
  }


  const motherId =
    getSelectedSingleId(
      "editMother"
    );


  const fatherId =
    getSelectedSingleId(
      "editFather"
    );


  const hasParents =
    Boolean(
      motherId ||
      fatherId
    );


  if (!hasParents) {

    ancestryModeTitle.textContent =
      "Founder Ancestry";


    ancestryModeDescription.textContent =
      "No parents are assigned. Race and Species are entered manually.";


    ancestryOverrideWrap.classList.add(
      "hidden"
    );


    editAncestryOverride.checked =
      false;


    automaticAncestryPreview.classList.add(
      "hidden"
    );


    manualAncestryEditor.classList.remove(
      "hidden"
    );


    return;

  }


  ancestryOverrideWrap.classList.remove(
    "hidden"
  );


  if (
    editAncestryOverride.checked
  ) {

    ancestryModeTitle.textContent =
      "Manual Ancestry Override";


    ancestryModeDescription.textContent =
      "Parents remain linked, but Race and Species are being entered manually.";


    automaticAncestryPreview.classList.add(
      "hidden"
    );


    manualAncestryEditor.classList.remove(
      "hidden"
    );


    return;

  }


  ancestryModeTitle.textContent =
    "Inherited Automatically";


  ancestryModeDescription.textContent =
    "Each parent contributes 50%. A missing parent appears as Unknown ancestry.";


  manualAncestryEditor.classList.add(
    "hidden"
  );


  automaticAncestryPreview.classList.remove(
    "hidden"
  );


  renderAncestryList(
    automaticRacePreview,
    calculateEditorPreviewAncestry(
      motherId,
      fatherId,
      "race"
    ),
    "race"
  );


  renderAncestryList(
    automaticSpeciesPreview,
    calculateEditorPreviewAncestry(
      motherId,
      fatherId,
      "species"
    ),
    "species"
  );

}


function calculateEditorPreviewAncestry(
  motherId,
  fatherId,
  kind
) {

  const map =
    new Map();


  [
    motherId,
    fatherId
  ]
    .forEach(
      parentId => {

        if (!parentId) {

          addMapValue(
            map,
            UNKNOWN_ANCESTRY_ID,
            50
          );

          return;

        }


        calculateAncestry(
          parentId,
          kind
        )
          .forEach(
            entry => {

              addMapValue(
                map,
                entry.id,
                entry.percent * 0.5
              );

            }
          );

      }
    );


  return mapToEntries(
    map
  )
    .sort(
      (a,b) =>
        b.percent -
        a.percent
    );

}


/* =========================================================
   COLOR EDITOR
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


    const wrap =
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

      wrap.classList.add(
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

      wrap.classList.remove(
        "hidden"
      );


      swatch.style.background =
        customInput.value;


      name.textContent =
        "Custom";


      return;

    }


    wrap.classList.add(
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
   LIBRARIES
========================================================= */

manageRacesButton.addEventListener(
  "click",
  () =>
    openLibrary(
      "race"
    )
);


manageSpeciesButton.addEventListener(
  "click",
  () =>
    openLibrary(
      "species"
    )
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


  closeWorldPanel();


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


  if (!library.length) {

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

          ${
            item.info
              ? `
                <div class="library-info">
                  ${escapeHTML(item.info)}
                </div>
              `
              : ""
          }

          <div class="library-summary">

            Hair:
            ${item.hairDistribution.length}

            · Eyes:
            ${item.eyeDistribution.length}

            · Skin:
            ${item.skinDistribution.length}

          </div>

        `;


        card
          .querySelector(
            ".edit-library-item"
          )
          .addEventListener(
            "click",

            () =>
              openLibraryEditor(
                item.id
              )
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
                "This removes it from the library. Character records will remain.",
                () =>
                  deleteLibraryItem(
                    item.id
                  ),
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


addLibraryItemButton.addEventListener(
  "click",
  () =>
    openLibraryEditor(
      null
    )
);


function openLibraryEditor(
  id
) {

  editingLibraryId =
    id;


  const library =
    getActiveLibrary();


  const item =
    id
      ? library.find(
          entry =>
            entry.id === id
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


  libraryInfoInput.value =
    item
      ? item.info
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


document
  .querySelectorAll(
    ".add-distribution-button[data-trait]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",

        () =>
          addDistributionRow(
            button.dataset.trait
          )
      );

    }
  );


function addDistributionRow(
  trait,
  entry = null
) {

  const container =
    trait === "hair"
      ? hairDistributionEditor
      : trait === "eyes"
        ? eyeDistributionEditor
        : skinDistributionEditor;


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


  if (entry) {

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


  row.appendChild(select);
  row.appendChild(percent);
  row.appendChild(remove);

  container.appendChild(row);

  updateAllDistributionTotals();

}


function readDistribution(
  trait
) {

  const container =
    trait === "hair"
      ? hairDistributionEditor
      : trait === "eyes"
        ? eyeDistributionEditor
        : skinDistributionEditor;


  return Array.from(
    container.querySelectorAll(
      ".distribution-row"
    )
  )
    .map(
      row => ({

        colorId:
          row.querySelector(
            "select"
          ).value,

        percent:
          Number(
            row.querySelector(
              "input"
            ).value
          ) || 0

      })
    )
    .filter(
      entry =>
        entry.percent > 0
    );

}


function updateAllDistributionTotals() {

  updateDistributionTotal(
    "hair",
    hairDistributionTotal
  );


  updateDistributionTotal(
    "eyes",
    eyeDistributionTotal
  );


  updateDistributionTotal(
    "skin",
    skinDistributionTotal
  );

}


function updateDistributionTotal(
  trait,
  element
) {

  const values =
    readDistribution(
      trait
    );


  const total =
    values.reduce(
      (sum,item) =>
        sum + item.percent,
      0
    );


  element.textContent =
    `Total: ${formatPercent(total)}%`;


  element.classList.remove(
    "valid",
    "invalid"
  );


  if (!values.length) {
    return;
  }


  element.classList.add(
    approximately100(total)
      ? "valid"
      : "invalid"
  );

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


  const hair =
    readDistribution(
      "hair"
    );

  const eyes =
    readDistribution(
      "eyes"
    );

  const skin =
    readDistribution(
      "skin"
    );


  for (
    const distribution of
    [
      hair,
      eyes,
      skin
    ]
  ) {

    const total =
      distribution.reduce(
        (sum,item) =>
          sum + item.percent,
        0
      );


    if (
      distribution.length &&
      !approximately100(total)
    ) {

      showToast(
        "Each used probability list must total 100%"
      );

      return;

    }


    const ids =
      distribution.map(
        item =>
          item.colorId
      );


    if (
      new Set(ids).size !==
      ids.length
    ) {

      showToast(
        "A color can only appear once per list"
      );

      return;

    }

  }


  const library =
    getActiveLibrary();


  if (editingLibraryId) {

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


    item.info =
      libraryInfoInput.value
        .trim();


    item.hairDistribution =
      hair;


    item.eyeDistribution =
      eyes;


    item.skinDistribution =
      skin;

  } else {

    library.push({

      id:
        createLibraryId(),

      name,

      info:
        libraryInfoInput.value
          .trim(),

      hairDistribution:
        hair,

      eyeDistribution:
        eyes,

      skinDistribution:
        skin

    });

  }


  saveLibraries();

  closeLibraryEditor();

  showToast(
    `${name} saved`
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

}


/* =========================================================
   WORLD
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

  populateGeneticModelInputs();


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
    `<option value="">— No Vantage Point —</option>`;


  [...characters]
    .sort(
      compareCharacterNames
    )
    .forEach(
      person => {

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

  function() {

    const backup = {

      app:
        "Fantasy Family Tree",

      version:
        5,

      exportedAt:
        new Date().toISOString(),

vantageCharacterId,

geneticModel,

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


    setTimeout(
      () =>
        URL.revokeObjectURL(
          url
        ),
      1000
    );


    showToast(
      "World backup exported"
    );

  }
);


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


      if (
        !Array.isArray(
          data.characters
        )
      ) {
        throw new Error();
      }


      openConfirmation(
        "Restore this world?",
        "Your current browser world will be replaced by the backup.",
        function() {

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


          characters =
            data.characters
              .map(
                normalizeCharacter
              );


          vantageCharacterId =
            normalizeId(
              data.vantageCharacterId
            );

          geneticModel = {

  family:
    safeWeight(
      data.geneticModel?.family,
      DEFAULT_GENETIC_MODEL.family
    ),

  race:
    safeWeight(
      data.geneticModel?.race,
      DEFAULT_GENETIC_MODEL.race
    ),

  species:
    safeWeight(
      data.geneticModel?.species,
      DEFAULT_GENETIC_MODEL.species
    ),

  parentGenetic:
    safeWeight(
      data.geneticModel?.parentGenetic,
      DEFAULT_GENETIC_MODEL.parentGenetic
    ),

  parentActual:
    safeWeight(
      data.geneticModel?.parentActual,
      DEFAULT_GENETIC_MODEL.parentActual
    )

};


if (
  !approximately100(
    geneticModel.family +
    geneticModel.race +
    geneticModel.species
  )
) {

  geneticModel.family =
    DEFAULT_GENETIC_MODEL.family;

  geneticModel.race =
    DEFAULT_GENETIC_MODEL.race;

  geneticModel.species =
    DEFAULT_GENETIC_MODEL.species;

}


if (
  !approximately100(
    geneticModel.parentGenetic +
    geneticModel.parentActual
  )
) {

  geneticModel.parentGenetic =
    DEFAULT_GENETIC_MODEL.parentGenetic;

  geneticModel.parentActual =
    DEFAULT_GENETIC_MODEL.parentActual;

}


saveGeneticModel();

          cleanBrokenRelationships();

          migrateLegacyRaceFields();


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
            "World restored"
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

  function() {

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
);


function closeSearch() {

  searchBackdrop.classList.add(
    "hidden"
  );


  searchPanel.classList.add(
    "hidden"
  );

}


closeSearchButton.addEventListener(
  "click",
  closeSearch
);


searchBackdrop.addEventListener(
  "click",
  closeSearch
);


searchInput.addEventListener(
  "input",

  function() {

    const query =
      searchInput.value
        .trim()
        .toLowerCase();


    const matches =
      characters.filter(
        person => {

          const text =
            [
              person.title,
              person.givenName,
              person.familyName,
              person.maidenName,
              ...person.aliases
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
    treeCanvas
      .getBoundingClientRect();


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
      treeCanvas
        .getBoundingClientRect();


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
      treeCanvas
        .getBoundingClientRect();


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


      const midpointX =
        (
          first.clientX +
          second.clientX
        ) / 2;


      const midpointY =
        (
          first.clientY +
          second.clientY
        ) / 2;


      pinchWorldX =
        (
          midpointX -
          viewX
        ) / zoom;


      pinchWorldY =
        (
          midpointY -
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


      const midpointX =
        (
          first.clientX +
          second.clientX
        ) / 2;


      const midpointY =
        (
          first.clientY +
          second.clientY
        ) / 2;


      viewX =
        midpointX -
        pinchWorldX *
        zoom;


      viewY =
        midpointY -
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


formBackdrop.addEventListener(
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


      if (position) {

        renderCharacterNode(
          character,
          position
        );

      }

    }
  );

}


function calculateTreeLayout() {

  const generations =
    calculateAllGenerations();


  const rows =
    new Map();


  characters.forEach(
    person => {

      const generation =
        generations.get(
          person.id
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
        .push(person);

    }
  );


  const positions =
    new Map();


  const center =
    WORLD_SIZE / 2;


  let minX = center;
  let maxX = center;
  let minY = center;
  let maxY = center;


  Array.from(
    rows.keys()
  )
    .sort(
      (a,b) =>
        a - b
    )
    .forEach(
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
          (person,index) => {

            const x =
              startX +
              index *
              NODE_GAP_X;


            positions.set(
              person.id,
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
    person => {

      calculateGeneration(
        person.id,
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

  if (memo.has(id)) {
    return memo.get(id);
  }


  if (visiting.has(id)) {
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


    visiting.delete(id);

    return 0;

  }


  const generation =
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
    generation
  );


  visiting.delete(id);


  return generation;

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


      result.push(person);

      visited.add(
        person.id
      );


      person.spouseIds.forEach(
        spouseId => {

          const spouse =
            row.find(
              item =>
                item.id ===
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


  node.type =
    "button";


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
              getInitial(character)
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

    () =>
      openProfile(
        character.id
      )
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


      [
        child.motherId,
        child.fatherId
      ]
        .filter(Boolean)
        .forEach(
          parentId => {

            const parent =
              positions.get(
                parentId
              );


            if (!parent) {
              return;
            }


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
              .sort(
                (a,b) =>
                  a - b
              )
              .join("-");


          if (drawn.has(key)) {
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


  renderAncestryList(
    document.getElementById(
      "profileRaceAncestry"
    ),
    calculateAncestry(
      character.id,
      "race"
    ),
    "race"
  );


  renderAncestryList(
    document.getElementById(
      "profileSpeciesAncestry"
    ),
    calculateAncestry(
      character.id,
      "species"
    ),
    "species"
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


  renderGeneticProbabilities(
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
  containerId,
  people
) {

  const container =
    document.getElementById(
      containerId
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


      button.type =
        "button";


      button.className =
        "relationship-button";


      button.textContent =
        getTreeName(
          person
        );


      button.addEventListener(
        "click",

        () =>
          openProfile(
            person.id
          )
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
    person =>
      person.motherId ===
        parentId
      ||
      person.fatherId ===
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
          person.motherId ===
          other.motherId
        )
        ||
        (
          person.fatherId &&
          person.fatherId ===
          other.fatherId
        )
      )
  );

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


  const ancestorDepth =
    getAncestorDepth(
      vantage.id,
      subject.id
    );


  if (
    ancestorDepth !== null
  ) {

    return makeAncestorTerm(
      subject,
      ancestorDepth
    );

  }


  const descendantDepth =
    getAncestorDepth(
      subject.id,
      vantage.id
    );


  if (
    descendantDepth !== null
  ) {

    return makeDescendantTerm(
      descendantDepth
    );

  }


  const a =
    getAncestorMap(
      vantage.id
    );


  const b =
    getAncestorMap(
      subject.id
    );


  const common =
    [];


  a.forEach(
    (aDepth,id) => {

      if (b.has(id)) {

        common.push({

          a:
            aDepth,

          b:
            b.get(id)

        });

      }

    }
  );


  if (!common.length) {
    return "No known relation";
  }


  common.sort(
    (first,second) =>
      Math.max(
        first.a,
        first.b
      )
      -
      Math.max(
        second.a,
        second.b
      )
  );


  const nearest =
    common[0];


  if (
    nearest.a === 1 &&
    nearest.b === 1
  ) {
    return "Sibling";
  }


  if (
    nearest.a >= 2 &&
    nearest.b >= 2
  ) {

    const degree =
      Math.min(
        nearest.a,
        nearest.b
      ) - 1;


    const removed =
      Math.abs(
        nearest.a -
        nearest.b
      );


    let text =
      `${ordinal(degree)} Cousin`;


    if (removed) {

      text +=
        ` ${removed} ${
          removed === 1
            ? "Time"
            : "Times"
        } Removed`;

    }


    return text;

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


  const visited =
    new Map();


  while (queue.length) {

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
            visited.has(parentId) &&
            visited.get(parentId) <=
            depth
          ) {
            return;
          }


          visited.set(
            parentId,
            depth
          );


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


  if (depth === 1) {

    return role === "mother"
      ? "Mother"
      : role === "father"
        ? "Father"
        : "Parent";

  }


  if (depth === 2) {

    return role === "mother"
      ? "Grandmother"
      : role === "father"
        ? "Grandfather"
        : "Grandparent";

  }


  return `${ordinal(
    depth - 2
  )} Great ${
    role === "mother"
      ? "Grandmother"
      : role === "father"
        ? "Grandfather"
        : "Grandparent"
  }`;

}


function makeDescendantTerm(
  depth
) {

  if (depth === 1) {
    return "Child";
  }


  if (depth === 2) {
    return "Grandchild";
  }


  return `${ordinal(
    depth - 2
  )} Great Grandchild`;

}


function inferParentRole(
  id
) {

  let mother =
    false;

  let father =
    false;


  characters.forEach(
    person => {

      if (
        person.motherId === id
      ) {
        mother = true;
      }


      if (
        person.fatherId === id
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


/* =========================================================
   EDIT PROFILE
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


  setInputValue(
    "editTitle",
    character.title
  );


  setInputValue(
    "editGivenName",
    character.givenName
  );


  setInputValue(
    "editAliases",
    character.aliases.join(
      ", "
    )
  );


  setInputValue(
    "editMaidenName",
    character.maidenName
  );


  setInputValue(
    "editFamilyName",
    character.familyName
  );


  setInputValue(
    "editBirthYear",
    character.birthYear
  );


  setInputValue(
    "editDeathYear",
    character.deathYear
  );


  setInputValue(
    "editPhysicalFeature",
    character.physicalFeature
  );


  setInputValue(
    "editAchievements",
    character.achievements
  );


  setInputValue(
    "editLife",
    character.life
  );


  populateRelationshipSelectors(
    character
  );


  populateManualAncestryEditor(
    character
  );


  editAncestryOverride.checked =
    character.ancestryOverride;


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


  refreshAncestryMode();


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


    const motherId =
      getSelectedSingleId(
        "editMother"
      );


    const fatherId =
      getSelectedSingleId(
        "editFather"
      );


    if (
      motherId &&
      fatherId &&
      motherId === fatherId
    ) {

      showToast(
        "Mother and Father cannot be the same character"
      );

      return;

    }


    const hasParents =
      Boolean(
        motherId ||
        fatherId
      );


    const override =
      hasParents
        ? editAncestryOverride.checked
        : false;


    const manualMode =
      !hasParents ||
      override;


    const raceAncestry =
      readManualAncestry(
        "race"
      );


    const speciesAncestry =
      readManualAncestry(
        "species"
      );


    if (manualMode) {

      if (
        raceAncestry.length &&
        !approximately100(
          sumPercent(
            raceAncestry
          )
        )
      ) {

        showToast(
          "Race percentages must total 100%"
        );

        return;

      }


      if (
        speciesAncestry.length &&
        !approximately100(
          sumPercent(
            speciesAncestry
          )
        )
      ) {

        showToast(
          "Species percentages must total 100%"
        );

        return;

      }

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


    character.motherId =
      motherId;


    character.fatherId =
      fatherId;


    character.spouseIds =
      getSelectedMultipleIds(
        "editSpouses"
      );


    character.loverIds =
      getSelectedMultipleIds(
        "editLovers"
      );


    character.ancestryOverride =
      override;


    character.raceAncestry =
      raceAncestry;


    character.speciesAncestry =
      speciesAncestry;


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


/* COLOR SAVE */

function setCharacterColorEditorValue(
  trait,
  character
) {

  let select;
  let custom;
  let id;
  let hex;


  if (
    trait === "hair"
  ) {

    select =
      editHairPreset;

    custom =
      editHairCustom;

    id =
      character.hairColorId;

    hex =
      character.hairColor;

  }


  if (
    trait === "eyes"
  ) {

    select =
      editEyePreset;

    custom =
      editEyeCustom;

    id =
      character.eyeColorId;

    hex =
      character.eyeColor;

  }


  if (
    trait === "skin"
  ) {

    select =
      editSkinPreset;

    custom =
      editSkinCustom;

    id =
      character.skinColorId;

    hex =
      character.skinColor;

  }


  select.value =
    id || "";


  custom.value =
    isHexColor(hex)
      ? hex
      : "#777777";


  select.dispatchEvent(
    new Event(
      "change"
    )
  );

}


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


/* =========================================================
   PORTRAIT
========================================================= */

editPortraitFile.addEventListener(
  "change",

  async function() {

    const file =
      editPortraitFile.files[0];


    if (!file) {
      return;
    }


    try {

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

    } catch {

      showToast(
        "That image could not be used"
      );

    }

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
    function(
      resolve,
      reject
    ) {

      const reader =
        new FileReader();


      reader.onload =
        () =>
          resolve(
            reader.result
          );


      reader.onerror =
        reject;


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
    function(
      resolve,
      reject
    ) {

      const image =
        new Image();


      image.onload =
        () =>
          resolve(
            image
          );


      image.onerror =
        reject;


      image.src =
        source;

    }
  );

}


/* =========================================================
   RELATIONSHIP SYNC
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
          other[field]
            .filter(
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
   CLOSE / DELETE
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


deleteCharacterButton.addEventListener(
  "click",

  function() {

    const character =
      getCharacter(
        selectedCharacterId
      );


    if (!character) {
      return;
    }


    openConfirmation(
      `Delete ${getTreeName(character)}?`,
      "Their record and relationship links will be removed.",
      function() {

        const id =
          character.id;


        characters =
          characters.filter(
            person =>
              person.id !== id
          );


        characters.forEach(
          person => {

            if (
              person.motherId === id
            ) {
              person.motherId =
                null;
            }


            if (
              person.fatherId === id
            ) {
              person.fatherId =
                null;
            }


            person.spouseIds =
              person.spouseIds
                .filter(
                  value =>
                    value !== id
                );


            person.loverIds =
              person.loverIds
                .filter(
                  value =>
                    value !== id
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


confirmBackdrop.addEventListener(
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
    person =>
      person.id === id
  );

}


function getCharactersFromIds(
  ids
) {

  return ids
    .map(
      id =>
        getCharacter(id)
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


function setInputValue(
  id,
  value
) {

  document.getElementById(
    id
  ).value =
    value || "";

}


function getInputValue(
  id
) {

  return document
    .getElementById(id)
    .value
    .trim();

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
    ${character.givenName || ""}
    ${maiden}
    ${character.familyName || ""}
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
  first,
  second
) {

  return getTreeName(first)
    .localeCompare(
      getTreeName(second)
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


function escapeHTML(
  value
) {

  const element =
    document.createElement(
      "div"
    );


  element.textContent =
    value || "";


  return element.innerHTML;

}


function sumPercent(
  entries
) {

  return entries.reduce(
    (sum,item) =>
      sum +
      Number(
        item.percent
      ),
    0
  );

}


function approximately100(
  value
) {

  return Math.abs(
    value - 100
  ) < 0.01;

}


function formatPercent(
  value
) {

  return Number(value)
    .toFixed(4)
    .replace(
      /0+$/,
      ""
    )
    .replace(
      /\.$/,
      ""
    );

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


function cleanBrokenRelationships() {

  const valid =
    new Set(
      characters.map(
        person =>
          person.id
      )
    );


  characters.forEach(
    person => {

      if (
        !valid.has(
          person.motherId
        )
      ) {
        person.motherId =
          null;
      }


      if (
        !valid.has(
          person.fatherId
        )
      ) {
        person.fatherId =
          null;
      }


      person.spouseIds =
        person.spouseIds
          .filter(
            id =>
              valid.has(id)
          );


      person.loverIds =
        person.loverIds
          .filter(
            id =>
              valid.has(id)
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
      ? lastLayout.positions.get(
          id
        )
      : null;


  if (position) {

    const rect =
      treeCanvas
        .getBoundingClientRect();


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
    () =>
      openProfile(id),
    180
  );

}


/* =========================================================
   START
========================================================= */

setupCharacterColorEditors();

cleanBrokenRelationships();

migrateLegacyRaceFields();

saveCharacters();

saveLibraries();

renderTree();

applyViewTransform();


setTimeout(
  centerTree,
  100
);
