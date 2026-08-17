/* =========================================================
   FANTASY FAMILY TREE
   15D — TREE PRESENTATION & LAYOUT
========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

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

const TREE_SETTINGS_KEY =
  "fantasyFamilyTreeTreeSettings";



/* =========================================================
   CONSTANTS
========================================================= */

const UNKNOWN_ANCESTRY_ID =
  "__unknown__";


const WORLD_SIZE =
  6000;


const WORLD_CENTER =
  WORLD_SIZE / 2;


const GRID_SIZE =
  30;


const NODE_GAP_X =
  240;


const GENERATION_GAP_Y =
  255;


const NODE_WIDTH =
  194;


const NODE_HALF_WIDTH =
  NODE_WIDTH / 2;


const NODE_CIRCLE_DIAMETER =
  84;


const NODE_CIRCLE_RADIUS =
  NODE_CIRCLE_DIAMETER / 2;


const NODE_CIRCLE_TOP_OFFSET =
  7;


const NODE_CIRCLE_CENTER_OFFSET_Y =
  NODE_CIRCLE_TOP_OFFSET +
  NODE_CIRCLE_RADIUS;


const NODE_BANNER_TOP_OFFSET =
  99;


const NODE_BANNER_HEIGHT =
  54;


const NODE_TOTAL_HEIGHT =
  158;


const ROUTE_CLEARANCE =
  20;


const ROUTE_LANE_STEP =
  28;


const MIN_ZOOM =
  0.2;


const MAX_ZOOM =
  2.5;


const ZOOM_STEP =
  0.15;



/* =========================================================
   COLOR PRESETS
========================================================= */

const COLOR_PRESETS =
  window.COLOR_PRESETS || {
    hair: [],
    eyes: [],
    skin: []
  };



/* =========================================================
   DEFAULT GENETIC MODEL
========================================================= */

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



/* =========================================================
   DEFAULT TREE SETTINGS
========================================================= */

const DEFAULT_TREE_SETTINGS = {

  showParentLines:
    true,

  showSpouseLines:
    true,

  showLoverLines:
    true,

  showSiblingLines:
    true

};



/* =========================================================
   GLOBAL STATE
========================================================= */

let geneticModel =
  loadGeneticModel();


let treeSettings =
  loadTreeSettings();


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

let viewX =
  0;


let viewY =
  0;


let zoom =
  1;


let lastLayout =
  null;



/* PANNING */

let isPanning =
  false;


let panStartX =
  0;


let panStartY =
  0;


let startViewX =
  0;


let startViewY =
  0;



/* PINCH */

let pinchStartDistance =
  0;


let pinchStartZoom =
  1;


let pinchWorldX =
  0;


let pinchWorldY =
  0;



/* ARRANGE MODE */

let arrangeMode =
  false;


let draggedCharacterId =
  null;


let dragPointerId =
  null;


let dragStartClientX =
  0;


let dragStartClientY =
  0;


let dragStartWorldX =
  0;


let dragStartWorldY =
  0;


let dragMoved =
  false;



/* FOCUS */

let focusState = {

  distances:
    new Map(),

  directAncestors:
    new Set()

};



/* PORTRAIT */

let pendingPortraitData =
  null;



/* LIBRARY */

let activeLibraryType =
  "race";


let editingLibraryId =
  null;



/* CONFIRM */

let confirmAction =
  null;



/* TOAST */

let toastTimer =
  null;



/* WHEEL */

let activeWheelTrait =
  null;


let activeWheelProbabilities =
  [];


let activeWheelResult =
  null;


let wheelRotation =
  0;


let wheelIsSpinning =
  false;



/* =========================================================
   ELEMENT HELPERS
========================================================= */

function byId(id) {

  return document.getElementById(
    id
  );

}



/* =========================================================
   CORE ELEMENTS
========================================================= */

const treeCanvas =
  byId("treeCanvas");


const treeViewport =
  byId("treeViewport");


const treeLines =
  byId("treeLines");


const relationshipLineLayer =
  byId("relationshipLineLayer");


const relationshipMarkerLayer =
  byId("relationshipMarkerLayer");


const characterLayer =
  byId("characterLayer");


const emptyState =
  byId("emptyState");


const addCharacterButton =
  byId("addCharacterButton");


const addFirstCharacterButton =
  byId("addFirstCharacterButton");


const zoomInButton =
  byId("zoomInButton");


const zoomOutButton =
  byId("zoomOutButton");


const resetViewButton =
  byId("resetViewButton");


const zoomIndicator =
  byId("zoomIndicator");



/* =========================================================
   ARRANGE ELEMENTS
========================================================= */

const arrangeModeButton =
  byId("arrangeModeButton");


const enterArrangeModeButton =
  byId("enterArrangeModeButton");


const arrangeToolbar =
  byId("arrangeToolbar");


const finishArrangeButton =
  byId("finishArrangeButton");


const resetLayoutButton =
  byId("resetLayoutButton");


const resetWorldLayoutButton =
  byId("resetWorldLayoutButton");



/* =========================================================
   SEARCH ELEMENTS
========================================================= */

const searchButton =
  byId("searchButton");


const searchBackdrop =
  byId("searchBackdrop");


const searchPanel =
  byId("searchPanel");


const closeSearchButton =
  byId("closeSearchButton");


const searchInput =
  byId("searchInput");


const searchResults =
  byId("searchResults");



/* =========================================================
   WORLD ELEMENTS
========================================================= */

const worldButton =
  byId("worldButton");


const worldBackdrop =
  byId("worldBackdrop");


const worldPanel =
  byId("worldPanel");


const closeWorldButton =
  byId("closeWorldButton");


const vantageSelect =
  byId("vantageSelect");


const vantageStatus =
  byId("vantageStatus");


const characterCount =
  byId("characterCount");


const worldVantageName =
  byId("worldVantageName");


const raceLibraryCount =
  byId("raceLibraryCount");


const speciesLibraryCount =
  byId("speciesLibraryCount");


const manageRacesButton =
  byId("manageRacesButton");


const manageSpeciesButton =
  byId("manageSpeciesButton");


const exportWorldButton =
  byId("exportWorldButton");


const importWorldButton =
  byId("importWorldButton");


const importWorldFile =
  byId("importWorldFile");



/* RELATIONSHIP LAYERS */

const showParentLinesToggle =
  byId("showParentLinesToggle");


const showSpouseLinesToggle =
  byId("showSpouseLinesToggle");


const showLoverLinesToggle =
  byId("showLoverLinesToggle");


const showSiblingLinesToggle =
  byId("showSiblingLinesToggle");



/* =========================================================
   GENETIC MODEL ELEMENTS
========================================================= */

const familyWeightInput =
  byId("familyWeightInput");


const raceWeightInput =
  byId("raceWeightInput");


const speciesWeightInput =
  byId("speciesWeightInput");


const parentGeneticWeightInput =
  byId("parentGeneticWeightInput");


const parentActualWeightInput =
  byId("parentActualWeightInput");


const overallWeightTotal =
  byId("overallWeightTotal");


const parentWeightTotal =
  byId("parentWeightTotal");


const saveGeneticModelButton =
  byId("saveGeneticModelButton");



/* =========================================================
   LIBRARY ELEMENTS
========================================================= */

const libraryBackdrop =
  byId("libraryBackdrop");


const libraryPanel =
  byId("libraryPanel");


const libraryPanelTitle =
  byId("libraryPanelTitle");


const closeLibraryButton =
  byId("closeLibraryButton");


const addLibraryItemButton =
  byId("addLibraryItemButton");


const libraryList =
  byId("libraryList");



/* LIBRARY EDITOR */

const libraryEditorBackdrop =
  byId("libraryEditorBackdrop");


const libraryEditorPanel =
  byId("libraryEditorPanel");


const libraryEditorTitle =
  byId("libraryEditorTitle");


const closeLibraryEditorButton =
  byId("closeLibraryEditorButton");


const cancelLibraryEditorButton =
  byId("cancelLibraryEditorButton");


const saveLibraryItemButton =
  byId("saveLibraryItemButton");


const libraryNameInput =
  byId("libraryNameInput");


const libraryInfoInput =
  byId("libraryInfoInput");


const hairDistributionEditor =
  byId("hairDistributionEditor");


const eyeDistributionEditor =
  byId("eyeDistributionEditor");


const skinDistributionEditor =
  byId("skinDistributionEditor");


const hairDistributionTotal =
  byId("hairDistributionTotal");


const eyeDistributionTotal =
  byId("eyeDistributionTotal");


const skinDistributionTotal =
  byId("skinDistributionTotal");


const resetAllDistributionsEqualButton =
  byId("resetAllDistributionsEqualButton");


const setHairEqualButton =
  byId("setHairEqualButton");


const setEyeEqualButton =
  byId("setEyeEqualButton");


const setSkinEqualButton =
  byId("setSkinEqualButton");



/* =========================================================
   CREATE CHARACTER ELEMENTS
========================================================= */

const formBackdrop =
  byId("formBackdrop");


const characterFormPanel =
  byId("characterFormPanel");


const closeFormButton =
  byId("closeFormButton");


const cancelFormButton =
  byId("cancelFormButton");


const characterForm =
  byId("characterForm");



/* =========================================================
   PROFILE ELEMENTS
========================================================= */

const profileBackdrop =
  byId("profileBackdrop");


const profilePanel =
  byId("profilePanel");


const closeProfileButton =
  byId("closeProfileButton");


const closeProfileFooterButton =
  byId("closeProfileFooterButton");


const editCharacterButton =
  byId("editCharacterButton");


const deleteCharacterButton =
  byId("deleteCharacterButton");


const setVantageButton =
  byId("setVantageButton");


const profilePortrait =
  byId("profilePortrait");


const profilePortraitWrap =
  byId("profilePortraitWrap");


const profileAdornment =
  byId("profileAdornment");


const profileAdornmentName =
  byId("profileAdornmentName");


const vantageRelation =
  byId("vantageRelation");


const vantageRelationLabel =
  byId("vantageRelationLabel");


const vantageRelationText =
  byId("vantageRelationText");



/* =========================================================
   EDIT ELEMENTS
========================================================= */

const editBackdrop =
  byId("editBackdrop");


const editPanel =
  byId("editPanel");


const editCharacterForm =
  byId("editCharacterForm");


const closeEditButton =
  byId("closeEditButton");


const cancelEditButton =
  byId("cancelEditButton");


const editMother =
  byId("editMother");


const editFather =
  byId("editFather");


const editSiblings =
  byId("editSiblings");


const editSpouses =
  byId("editSpouses");


const editLovers =
  byId("editLovers");


const editAncestryOverride =
  byId("editAncestryOverride");


const ancestryOverrideWrap =
  byId("ancestryOverrideWrap");


const ancestryModeTitle =
  byId("ancestryModeTitle");


const ancestryModeDescription =
  byId("ancestryModeDescription");


const automaticAncestryPreview =
  byId("automaticAncestryPreview");


const automaticRacePreview =
  byId("automaticRacePreview");


const automaticSpeciesPreview =
  byId("automaticSpeciesPreview");


const manualAncestryEditor =
  byId("manualAncestryEditor");


const raceAncestryRows =
  byId("raceAncestryRows");


const speciesAncestryRows =
  byId("speciesAncestryRows");


const raceAncestryTotal =
  byId("raceAncestryTotal");


const speciesAncestryTotal =
  byId("speciesAncestryTotal");


const addRaceAncestryButton =
  byId("addRaceAncestryButton");


const addSpeciesAncestryButton =
  byId("addSpeciesAncestryButton");



/* TREE STYLE */

const editAdornment =
  byId("editAdornment");


const editDivineGlow =
  byId("editDivineGlow");


const adornmentPreview =
  byId("adornmentPreview");


const adornmentPreviewDecoration =
  byId("adornmentPreviewDecoration");


const editPositionLocked =
  byId("editPositionLocked");


const resetCharacterPositionButton =
  byId("resetCharacterPositionButton");



/* PORTRAIT */

const editPortraitFile =
  byId("editPortraitFile");


const editPortraitPreview =
  byId("editPortraitPreview");


const removePortraitButton =
  byId("removePortraitButton");



/* COLORS */

const editHairPreset =
  byId("editHairPreset");


const editEyePreset =
  byId("editEyePreset");


const editSkinPreset =
  byId("editSkinPreset");


const editHairCustom =
  byId("editHairCustom");


const editEyeCustom =
  byId("editEyeCustom");


const editSkinCustom =
  byId("editSkinCustom");



/* GENETIC PROBABILITIES */

const editHairProbabilities =
  byId("editHairProbabilities");


const editEyeProbabilities =
  byId("editEyeProbabilities");


const editSkinProbabilities =
  byId("editSkinProbabilities");


const spinHairButton =
  byId("spinHairButton");


const spinEyeButton =
  byId("spinEyeButton");


const spinSkinButton =
  byId("spinSkinButton");



/* =========================================================
   WHEEL ELEMENTS
========================================================= */

const probabilityWheelBackdrop =
  byId("probabilityWheelBackdrop");


const probabilityWheelPanel =
  byId("probabilityWheelPanel");


const probabilityWheelTitle =
  byId("probabilityWheelTitle");


const closeProbabilityWheelButton =
  byId("closeProbabilityWheelButton");


const probabilityWheel =
  byId("probabilityWheel");


const probabilityWheelLegend =
  byId("probabilityWheelLegend");


const probabilityWheelResult =
  byId("probabilityWheelResult");


const probabilityWheelResultSwatch =
  byId("probabilityWheelResultSwatch");


const probabilityWheelResultName =
  byId("probabilityWheelResultName");


const probabilityWheelResultChance =
  byId("probabilityWheelResultChance");


const spinAgainButton =
  byId("spinAgainButton");


const applyWheelResultButton =
  byId("applyWheelResultButton");



/* =========================================================
   CONFIRM / TOAST
========================================================= */

const confirmBackdrop =
  byId("confirmBackdrop");


const confirmPanel =
  byId("confirmPanel");


const confirmTitle =
  byId("confirmTitle");


const confirmMessage =
  byId("confirmMessage");


const confirmCancelButton =
  byId("confirmCancelButton");


const confirmAcceptButton =
  byId("confirmAcceptButton");


const toast =
  byId("toast");



/* =========================================================
   NORMALIZATION
========================================================= */

function normalizeId(value) {

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



function normalizeIdArray(values) {

  if (
    !Array.isArray(values)
  ) {

    return [];

  }


  return [
    ...new Set(
      values
        .map(Number)
        .filter(Number.isFinite)
    )
  ];

}



function normalizeGender(value) {

  const gender =
    String(
      value || ""
    ).toLowerCase();


  if (
    gender === "female" ||
    gender === "male" ||
    gender === "nonbinary"
  ) {

    return gender;

  }


  return "unknown";

}



function normalizeAdornment(value) {

  const valid =
    [
      "none",
      "halo",
      "crown",
      "laurel",
      "horns",
      "arcane",
      "star",
      "mourning"
    ];


  return valid.includes(value)
    ? value
    : "none";

}



function normalizeAncestry(values) {

  if (
    !Array.isArray(values)
  ) {

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



function normalizeDistribution(values) {

  if (
    !Array.isArray(values)
  ) {

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



function normalizeCharacter(character) {

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
      Number(
        character.id
      ),

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

    gender:
      normalizeGender(
        character.gender
      ),

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

    siblingIds:
      normalizeIdArray(
        character.siblingIds
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
      character.portraitData || "",


    /* 15D */

    treeX:
      Number.isFinite(
        Number(
          character.treeX
        )
      )
        ? Number(
            character.treeX
          )
        : null,

    treeY:
      Number.isFinite(
        Number(
          character.treeY
        )
      )
        ? Number(
            character.treeY
          )
        : null,

    positionLocked:
      Boolean(
        character.positionLocked
      ),

    adornment:
      normalizeAdornment(
        character.adornment
      ),

    divineGlow:
      Boolean(
        character.divineGlow
      )

  };

}



function normalizeLibraryItem(item) {

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


    if (
      !Array.isArray(parsed)
    ) {

      return [];

    }


    return parsed.map(
      normalizeCharacter
    );

  }
  catch {

    return [];

  }

}



function saveCharacters() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        characters
      )
    );

  }
  catch {

    showToast(
      "Browser storage is full"
    );

  }

}



function loadLibrary(key) {

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

  }
  catch {

    return [];

  }

}



function saveLibraries() {

  try {

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
  catch {

    showToast(
      "Browser storage is full"
    );

  }

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


    return normalizeGeneticModel(
      JSON.parse(saved)
    );

  }
  catch {

    return {
      ...DEFAULT_GENETIC_MODEL
    };

  }

}



function saveGeneticModel() {

  try {

    localStorage.setItem(
      GENETIC_MODEL_KEY,
      JSON.stringify(
        geneticModel
      )
    );

  }
  catch {

    showToast(
      "Browser storage is full"
    );

  }

}



function loadTreeSettings() {

  try {

    const saved =
      localStorage.getItem(
        TREE_SETTINGS_KEY
      );


    if (!saved) {

      return {
        ...DEFAULT_TREE_SETTINGS
      };

    }


    const parsed =
      JSON.parse(saved);


    return {

      showParentLines:
        parsed.showParentLines !== false,

      showSpouseLines:
        parsed.showSpouseLines !== false,

      showLoverLines:
        parsed.showLoverLines !== false,

      showSiblingLines:
        parsed.showSiblingLines !== false

    };

  }
  catch {

    return {
      ...DEFAULT_TREE_SETTINGS
    };

  }

}



function saveTreeSettings() {

  localStorage.setItem(
    TREE_SETTINGS_KEY,
    JSON.stringify(
      treeSettings
    )
  );

}



/* =========================================================
   GENETIC MODEL
========================================================= */

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



function normalizeGeneticModel(model) {

  const result = {

    family:
      safeWeight(
        model?.family,
        DEFAULT_GENETIC_MODEL.family
      ),

    race:
      safeWeight(
        model?.race,
        DEFAULT_GENETIC_MODEL.race
      ),

    species:
      safeWeight(
        model?.species,
        DEFAULT_GENETIC_MODEL.species
      ),

    parentGenetic:
      safeWeight(
        model?.parentGenetic,
        DEFAULT_GENETIC_MODEL.parentGenetic
      ),

    parentActual:
      safeWeight(
        model?.parentActual,
        DEFAULT_GENETIC_MODEL.parentActual
      )

  };


  if (
    !approximately100(
      result.family +
      result.race +
      result.species
    )
  ) {

    result.family =
      DEFAULT_GENETIC_MODEL.family;

    result.race =
      DEFAULT_GENETIC_MODEL.race;

    result.species =
      DEFAULT_GENETIC_MODEL.species;

  }


  if (
    !approximately100(
      result.parentGenetic +
      result.parentActual
    )
  ) {

    result.parentGenetic =
      DEFAULT_GENETIC_MODEL.parentGenetic;

    result.parentActual =
      DEFAULT_GENETIC_MODEL.parentActual;

  }


  return result;

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



function getModelInputNumber(input) {

  return Number(
    input.value
  ) || 0;

}



function updateGeneticModelTotals() {

  const overall =
    getModelInputNumber(
      familyWeightInput
    ) +
    getModelInputNumber(
      raceWeightInput
    ) +
    getModelInputNumber(
      speciesWeightInput
    );


  const parent =
    getModelInputNumber(
      parentGeneticWeightInput
    ) +
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
        "Inherited Genetics + Actual Appearance must total 100%"
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

  }
);



/* =========================================================
   COLOR HELPERS
========================================================= */

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
            String(hex)
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

    id:
      "",

    hex:
      ""

  };

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
   EQUAL DISTRIBUTIONS
========================================================= */

function makeEqualDistribution(
  trait
) {

  const presets =
    COLOR_PRESETS[trait];


  if (
    !presets.length
  ) {

    return [];

  }


  const equal =
    100 /
    presets.length;


  return presets.map(
    preset => ({

      colorId:
        preset.id,

      percent:
        equal

    })
  );

}



function setDistributionEqual(
  trait
) {

  const container =
    getDistributionContainer(
      trait
    );


  container.innerHTML =
    "";


  makeEqualDistribution(
    trait
  )
    .forEach(
      entry => {

        addDistributionRow(
          trait,
          entry
        );

      }
    );


  updateAllDistributionTotals();

}



function setAllDistributionsEqual() {

  setDistributionEqual(
    "hair"
  );


  setDistributionEqual(
    "eyes"
  );


  setDistributionEqual(
    "skin"
  );


  showToast(
    "All colors equalized"
  );

}



resetAllDistributionsEqualButton.addEventListener(
  "click",
  setAllDistributionsEqual
);


setHairEqualButton.addEventListener(
  "click",
  () =>
    setDistributionEqual(
      "hair"
    )
);


setEyeEqualButton.addEventListener(
  "click",
  () =>
    setDistributionEqual(
      "eyes"
    )
);


setSkinEqualButton.addEventListener(
  "click",
  () =>
    setDistributionEqual(
      "skin"
    )
);



/* =========================================================
   LIBRARY
========================================================= */

function createLibraryId() {

  return (
    "lib_" +
    Date.now() +
    "_" +
    Math.random()
      .toString(36)
      .slice(2, 8)
  );

}



function getActiveLibrary() {

  return activeLibraryType === "race"
    ? raceLibrary
    : speciesLibrary;

}



function getAncestryLibrary(kind) {

  return kind === "race"
    ? raceLibrary
    : speciesLibrary;

}



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



function openLibrary(type) {

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



function renderLibraryList() {

  const library =
    getActiveLibrary();


  libraryList.innerHTML =
    "";


  if (
    !library.length
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
      (a, b) =>
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


        const header =
          document.createElement(
            "div"
          );


        header.className =
          "library-card-header";


        const name =
          document.createElement(
            "strong"
          );


        name.className =
          "library-card-name";


        name.textContent =
          item.name;


        const actions =
          document.createElement(
            "div"
          );


        actions.className =
          "library-card-actions";


        const edit =
          document.createElement(
            "button"
          );


        edit.className =
          "library-mini-button";


        edit.type =
          "button";


        edit.textContent =
          "Edit";


        edit.addEventListener(
          "click",
          () =>
            openLibraryEditor(
              item.id
            )
        );


        const remove =
          document.createElement(
            "button"
          );


        remove.className =
          "library-mini-button";


        remove.type =
          "button";


        remove.textContent =
          "Delete";


        remove.addEventListener(
          "click",
          () => {

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


        actions.appendChild(
          edit
        );


        actions.appendChild(
          remove
        );


        header.appendChild(
          name
        );


        header.appendChild(
          actions
        );


        card.appendChild(
          header
        );


        if (
          item.info
        ) {

          const info =
            document.createElement(
              "div"
            );


          info.className =
            "library-info";


          info.textContent =
            item.info;


          card.appendChild(
            info
          );

        }


        const summary =
          document.createElement(
            "div"
          );


        summary.className =
          "library-summary";


        summary.textContent =
          `Hair: ${item.hairDistribution.length} · Eyes: ${item.eyeDistribution.length} · Skin: ${item.skinDistribution.length}`;


        card.appendChild(
          summary
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



function openLibraryEditor(id) {

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

    item.hairDistribution
      .forEach(
        entry =>
          addDistributionRow(
            "hair",
            entry
          )
      );


    item.eyeDistribution
      .forEach(
        entry =>
          addDistributionRow(
            "eyes",
            entry
          )
      );


    item.skinDistribution
      .forEach(
        entry =>
          addDistributionRow(
            "skin",
            entry
          )
      );

  }
  else {

    /*
      NEW RACES / SPECIES:
      all colors begin equally likely.
    */

    setDistributionEqual(
      "hair"
    );


    setDistributionEqual(
      "eyes"
    );


    setDistributionEqual(
      "skin"
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
    "0.000001";


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



function readDistribution(trait) {

  const container =
    getDistributionContainer(
      trait
    );


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
      (sum, item) =>
        sum +
        item.percent,
      0
    );


  element.textContent =
    `Total: ${formatPercent(total)}%`;


  element.classList.remove(
    "valid",
    "invalid"
  );


  if (
    !values.length
  ) {

    return;

  }


  element.classList.add(
    approximately100(total)
      ? "valid"
      : "invalid"
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


  const all =
    [
      hair,
      eyes,
      skin
    ];


  for (
    const distribution
    of all
  ) {

    const total =
      distribution.reduce(
        (sum, item) =>
          sum +
          item.percent,
        0
      );


    if (
      distribution.length &&
      !approximately100(
        total
      )
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


    item.info =
      libraryInfoInput.value
        .trim();


    item.hairDistribution =
      hair;


    item.eyeDistribution =
      eyes;


    item.skinDistribution =
      skin;

  }
  else {

    library.push({

      id:
        createLibraryId(),

      name,

      info:
        libraryInfoInput.value
          .trim(),

      hairDistribution:
        hair.length
          ? hair
          : makeEqualDistribution(
              "hair"
            ),

      eyeDistribution:
        eyes.length
          ? eyes
          : makeEqualDistribution(
              "eyes"
            ),

      skinDistribution:
        skin.length
          ? skin
          : makeEqualDistribution(
              "skin"
            )

    });

  }


  saveLibraries();


  closeLibraryEditor();


  showToast(
    `${name} saved`
  );

}



function deleteLibraryItem(id) {

  if (
    activeLibraryType === "race"
  ) {

    raceLibrary =
      raceLibrary.filter(
        item =>
          item.id !== id
      );

  }
  else {

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
   TREE SETTINGS / LINE TOGGLES
========================================================= */

function populateTreeSettingsControls() {

  showParentLinesToggle.checked =
    treeSettings.showParentLines;


  showSpouseLinesToggle.checked =
    treeSettings.showSpouseLines;


  showLoverLinesToggle.checked =
    treeSettings.showLoverLines;


  showSiblingLinesToggle.checked =
    treeSettings.showSiblingLines;

}



function bindTreeSettingToggle(
  element,
  key
) {

  element.addEventListener(
    "change",
    function() {

      treeSettings[key] =
        element.checked;


      saveTreeSettings();


      renderTree();

    }
  );

}



bindTreeSettingToggle(
  showParentLinesToggle,
  "showParentLines"
);


bindTreeSettingToggle(
  showSpouseLinesToggle,
  "showSpouseLines"
);


bindTreeSettingToggle(
  showLoverLinesToggle,
  "showLoverLines"
);


bindTreeSettingToggle(
  showSiblingLinesToggle,
  "showSiblingLines"
);



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


  populateGeneticModelInputs();


  populateTreeSettingsControls();


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
      ? getTreeName(
          vantage
        )
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

        gender:
          byId(
            "gender"
          ).value,

        birthYear:
          getInputValue(
            "birthYear"
          ),

        deathYear:
          getInputValue(
            "deathYear"
          ),

        adornment:
          "none",

        divineGlow:
          false,

        treeX:
          null,

        treeY:
          null,

        positionLocked:
          false

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
   GENERATIONS
========================================================= */

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
    getCharacter(
      id
    );


  if (!person) {

    return 0;

  }


  visiting.add(
    id
  );


  const parents =
    [
      person.motherId,
      person.fatherId
    ]
      .filter(Boolean);


  if (
    !parents.length
  ) {

    memo.set(
      id,
      0
    );


    visiting.delete(
      id
    );


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
    ) +
    1;


  memo.set(
    id,
    generation
  );


  visiting.delete(
    id
  );


  return generation;

}



/* =========================================================
   AUTO LAYOUT
========================================================= */

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
        .get(
          generation
        )
        .push(
          person
        );

    }
  );


  const autoPositions =
    new Map();


  const baseTop =
    WORLD_CENTER -
    750;


  Array.from(
    rows.keys()
  )
    .sort(
      (a, b) =>
        a - b
    )
    .forEach(
      generation => {

        const row =
          clusterPartners(
            rows.get(
              generation
            )
          );


        const rowWidth =
          Math.max(
            0,
            (
              row.length -
              1
            ) *
            NODE_GAP_X
          );


        const startX =
          WORLD_CENTER -
          rowWidth / 2;


        const y =
          baseTop +
          generation *
          GENERATION_GAP_Y;


        row.forEach(
          (person, index) => {

            autoPositions.set(
              person.id,
              {

                x:
                  startX +
                  index *
                  NODE_GAP_X,

                y

              }
            );

          }
        );

      }
    );


  const positions =
    new Map();


  characters.forEach(
    person => {

      const automatic =
        autoPositions.get(
          person.id
        ) || {

          x:
            WORLD_CENTER,

          y:
            WORLD_CENTER

        };


      const hasManual =
        Number.isFinite(
          person.treeX
        ) &&
        Number.isFinite(
          person.treeY
        );


      positions.set(
        person.id,
        hasManual
          ? {

              x:
                person.treeX,

              y:
                person.treeY

            }
          : automatic
      );

    }
  );


  const values =
    Array.from(
      positions.values()
    );


  const minX =
    values.length
      ? Math.min(
          ...values.map(
            item =>
              item.x
          )
        )
      : WORLD_CENTER;


  const maxX =
    values.length
      ? Math.max(
          ...values.map(
            item =>
              item.x
          )
        )
      : WORLD_CENTER;


  const minY =
    values.length
      ? Math.min(
          ...values.map(
            item =>
              item.y
          )
        )
      : WORLD_CENTER;


  const maxY =
    values.length
      ? Math.max(
          ...values.map(
            item =>
              item.y
          )
        )
      : WORLD_CENTER;


  return {

    positions,

    autoPositions,

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
        420,
        650
      ),

    contentHeight:
      Math.max(
        maxY -
        minY +
        470,
        550
      )

  };

}



function clusterPartners(row) {

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


      const partnerIds =
        [
          ...person.spouseIds,
          ...person.loverIds
        ];


      partnerIds.forEach(
        partnerId => {

          const partner =
            row.find(
              item =>
                item.id ===
                partnerId
            );


          if (
            partner &&
            !visited.has(
              partner.id
            )
          ) {

            result.push(
              partner
            );


            visited.add(
              partner.id
            );

          }

        }
      );

    }
  );


  return result;

}



/* =========================================================
   TREE RENDER
========================================================= */

function renderTree() {

  characterLayer.innerHTML =
    "";


  relationshipLineLayer.innerHTML =
    "";


  relationshipMarkerLayer.innerHTML =
    "";


  focusState =
    buildFocusState();


  if (
    !characters.length
  ) {

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


  drawRelationshipLines(
    layout.positions
  );

}



/* =========================================================
   CHARACTER NODE
========================================================= */

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


  node.dataset.characterId =
    String(
      character.id
    );


  node.type =
    "button";


  node.style.left =
    `${position.x}px`;


  node.style.top =
    `${position.y}px`;


  node.classList.add(
    getFocusClass(
      character.id
    )
  );


  if (
    character.id ===
    vantageCharacterId
  ) {

    node.classList.add(
      "vantage-node"
    );

  }


  if (
    focusState
      .directAncestors
      .has(
        character.id
      )
  ) {

    node.classList.add(
      "direct-ancestor-node"
    );

  }


  if (
    character.positionLocked
  ) {

    node.classList.add(
      "position-locked"
    );

  }


  const circleWrap =
    document.createElement(
      "div"
    );


  circleWrap.className =
    "character-circle-wrap";


  if (
    character.divineGlow
  ) {

    circleWrap.classList.add(
      "divine-glow"
    );

  }


  const adornment =
    document.createElement(
      "div"
    );


  adornment.className =
    "node-adornment";


  applyAdornmentClass(
    adornment,
    character.adornment
  );


  const circle =
    document.createElement(
      "div"
    );


  circle.className =
    "character-circle";


  if (
    character.portraitData
  ) {

    const image =
      document.createElement(
        "img"
      );


    image.className =
      "character-portrait";


    image.src =
      character.portraitData;


    image.alt =
      "";


    circle.appendChild(
      image
    );

  }
  else {

    circle.textContent =
      getInitial(
        character
      );

  }


  circleWrap.appendChild(
    adornment
  );


  circleWrap.appendChild(
    circle
  );


  const banner =
    document.createElement(
      "div"
    );


  banner.className =
    "character-banner";


  const name =
    document.createElement(
      "span"
    );


  name.className =
    "character-name";


  name.textContent =
    getTreeName(
      character
    );


  const years =
    document.createElement(
      "span"
    );


  years.className =
    "character-years";


  years.textContent =
    makeYearText(
      character
    );


  banner.appendChild(
    name
  );


  banner.appendChild(
    years
  );


  node.appendChild(
    circleWrap
  );


  node.appendChild(
    banner
  );


  node.addEventListener(
    "click",
    function(event) {

      if (
        arrangeMode
      ) {

        event.preventDefault();

        return;

      }


      openProfile(
        character.id
      );

    }
  );


  node.addEventListener(
    "pointerdown",
    event =>
      beginNodeDrag(
        event,
        character.id
      )
  );


  characterLayer.appendChild(
    node
  );

}



/* =========================================================
   ADORNMENTS
========================================================= */

function applyAdornmentClass(
  element,
  adornment
) {

  [
    "adornment-halo",
    "adornment-crown",
    "adornment-laurel",
    "adornment-horns",
    "adornment-arcane",
    "adornment-star",
    "adornment-mourning"
  ]
    .forEach(
      className =>
        element.classList.remove(
          className
        )
    );


  if (
    !adornment ||
    adornment === "none"
  ) {

    return;

  }


  element.classList.add(
    `adornment-${adornment}`
  );

}



function getAdornmentName(value) {

  switch (value) {

    case "halo":
      return "Halo";

    case "crown":
      return "Crown";

    case "laurel":
      return "Laurel";

    case "horns":
      return "Horns";

    case "arcane":
      return "Arcane Ring";

    case "star":
      return "Chosen Star";

    case "mourning":
      return "Mourning Ring";

    default:
      return "None";

  }

}



/* =========================================================
   ARRANGE MODE
========================================================= */

arrangeModeButton.addEventListener(
  "click",
  toggleArrangeMode
);


enterArrangeModeButton.addEventListener(
  "click",
  function() {

    closeWorldPanel();


    setArrangeMode(
      true
    );

  }
);


finishArrangeButton.addEventListener(
  "click",
  () =>
    setArrangeMode(
      false
    )
);


resetLayoutButton.addEventListener(
  "click",
  requestResetAllPositions
);


resetWorldLayoutButton.addEventListener(
  "click",
  requestResetAllPositions
);



function toggleArrangeMode() {

  setArrangeMode(
    !arrangeMode
  );

}



function setArrangeMode(enabled) {

  arrangeMode =
    Boolean(
      enabled
    );


  treeCanvas.classList.toggle(
    "arrange-mode",
    arrangeMode
  );


  arrangeModeButton.classList.toggle(
    "active",
    arrangeMode
  );


  arrangeToolbar.classList.toggle(
    "hidden",
    !arrangeMode
  );


  if (
    arrangeMode
  ) {

    showToast(
      "Drag characters to arrange them"
    );

  }

}



function requestResetAllPositions() {

  openConfirmation(

    "Reset tree positions?",

    "All manual placements will be removed and the automatic family layout will return.",

    function() {

      characters.forEach(
        person => {

          person.treeX =
            null;


          person.treeY =
            null;


          person.positionLocked =
            false;

        }
      );


      saveCharacters();


      renderTree();


      setTimeout(
        centerTree,
        80
      );


      showToast(
        "Tree layout reset"
      );

    },

    "Reset"

  );

}



/* =========================================================
   NODE DRAGGING
========================================================= */

function beginNodeDrag(
  event,
  characterId
) {

  if (
    !arrangeMode
  ) {

    return;

  }


  if (
    event.pointerType === "mouse" &&
    event.button !== 0
  ) {

    return;

  }


  const character =
    getCharacter(
      characterId
    );


  if (!character) {

    return;

  }


  /*
    Locked nodes may still be dragged deliberately.
    Their lock means auto-layout won't move them.
  */


  event.preventDefault();


  event.stopPropagation();


  draggedCharacterId =
    characterId;


  dragPointerId =
    event.pointerId;


  dragStartClientX =
    event.clientX;


  dragStartClientY =
    event.clientY;


  const current =
    lastLayout?.positions.get(
      characterId
    );


  if (!current) {

    return;

  }


  dragStartWorldX =
    current.x;


  dragStartWorldY =
    current.y;


  dragMoved =
    false;


  const node =
    getNodeElement(
      characterId
    );


  node?.classList.add(
    "dragging-node"
  );


  node?.setPointerCapture?.(
    event.pointerId
  );

}



document.addEventListener(
  "pointermove",
  function(event) {

    if (
      draggedCharacterId === null ||
      event.pointerId !== dragPointerId
    ) {

      return;

    }


    event.preventDefault();


    const dx =
      (
        event.clientX -
        dragStartClientX
      ) /
      zoom;


    const dy =
      (
        event.clientY -
        dragStartClientY
      ) /
      zoom;


    if (
      Math.abs(dx) > 2 ||
      Math.abs(dy) > 2
    ) {

      dragMoved =
        true;

    }


    const rawX =
      dragStartWorldX +
      dx;


    const rawY =
      dragStartWorldY +
      dy;


    const snappedX =
      snapToGrid(
        rawX
      );


    const snappedY =
      snapToGrid(
        rawY
      );


    const character =
      getCharacter(
        draggedCharacterId
      );


    if (!character) {

      return;

    }


    character.treeX =
      snappedX;


    character.treeY =
      snappedY;


    const node =
      getNodeElement(
        draggedCharacterId
      );


    if (node) {

      node.style.left =
        `${snappedX}px`;


      node.style.top =
        `${snappedY}px`;

    }


    /*
      Redraw routes while dragging.
    */

    if (
      lastLayout
    ) {

      const temporaryPositions =
        new Map(
          lastLayout.positions
        );


      temporaryPositions.set(
        draggedCharacterId,
        {

          x:
            snappedX,

          y:
            snappedY

        }
      );


      relationshipLineLayer.innerHTML =
        "";


      relationshipMarkerLayer.innerHTML =
        "";


      drawRelationshipLines(
        temporaryPositions
      );

    }

  },
  {
    passive:
      false
  }
);



document.addEventListener(
  "pointerup",
  finishNodeDrag
);


document.addEventListener(
  "pointercancel",
  finishNodeDrag
);



function finishNodeDrag(event) {

  if (
    draggedCharacterId === null
  ) {

    return;

  }


  if (
    event.pointerId !==
    dragPointerId
  ) {

    return;

  }


  const id =
    draggedCharacterId;


  const node =
    getNodeElement(
      id
    );


  node?.classList.remove(
    "dragging-node"
  );


  draggedCharacterId =
    null;


  dragPointerId =
    null;


  if (
    dragMoved
  ) {

    saveCharacters();


    renderTree();

  }

}



function getNodeElement(id) {

  return characterLayer
    .querySelector(
      `[data-character-id="${id}"]`
    );

}



function snapToGrid(value) {

  return Math.round(
    value /
    GRID_SIZE
  ) *
  GRID_SIZE;

}



/* =========================================================
   NODE OBSTACLES
========================================================= */

function makeNodeObstacle(
  id,
  position
) {

  return {

    id,

    left:
      position.x -
      NODE_HALF_WIDTH -
      ROUTE_CLEARANCE,

    right:
      position.x +
      NODE_HALF_WIDTH +
      ROUTE_CLEARANCE,

    top:
      position.y -
      ROUTE_CLEARANCE,

    bottom:
      position.y +
      NODE_TOTAL_HEIGHT +
      ROUTE_CLEARANCE

  };

}



function getAllNodeObstacles(
  positions
) {

  return Array.from(
    positions.entries()
  )
    .map(
      ([id, position]) =>
        makeNodeObstacle(
          id,
          position
        )
    );

}



/* =========================================================
   CONNECTION ANCHORS
========================================================= */

function getCircleCenter(
  position
) {

  return {

    x:
      position.x,

    y:
      position.y +
      NODE_CIRCLE_CENTER_OFFSET_Y

  };

}



function getTopAnchor(
  position
) {

  return {

    x:
      position.x,

    y:
      position.y +
      NODE_CIRCLE_TOP_OFFSET

  };

}



function getBottomAnchor(
  position
) {

  return {

    x:
      position.x,

    y:
      position.y +
      NODE_CIRCLE_TOP_OFFSET +
      NODE_CIRCLE_DIAMETER

  };

}



function getLeftAnchor(
  position
) {

  const center =
    getCircleCenter(
      position
    );


  return {

    x:
      center.x -
      NODE_CIRCLE_RADIUS,

    y:
      center.y

  };

}



function getRightAnchor(
  position
) {

  const center =
    getCircleCenter(
      position
    );


  return {

    x:
      center.x +
      NODE_CIRCLE_RADIUS,

    y:
      center.y

  };

}



/* =========================================================
   SMART ROUTE HELPERS
========================================================= */

function segmentIntersectsObstacle(
  first,
  second,
  obstacle
) {

  /*
    Vertical segment.
  */

  if (
    first.x === second.x
  ) {

    const minY =
      Math.min(
        first.y,
        second.y
      );


    const maxY =
      Math.max(
        first.y,
        second.y
      );


    return (
      first.x >= obstacle.left &&
      first.x <= obstacle.right &&
      maxY >= obstacle.top &&
      minY <= obstacle.bottom
    );

  }


  /*
    Horizontal segment.
  */

  if (
    first.y === second.y
  ) {

    const minX =
      Math.min(
        first.x,
        second.x
      );


    const maxX =
      Math.max(
        first.x,
        second.x
      );


    return (
      first.y >= obstacle.top &&
      first.y <= obstacle.bottom &&
      maxX >= obstacle.left &&
      minX <= obstacle.right
    );

  }


  return false;

}



function routeHitsObstacle(
  points,
  obstacles,
  ignoredIds = []
) {

  const ignored =
    new Set(
      ignoredIds
    );


  const relevant =
    obstacles.filter(
      obstacle =>
        !ignored.has(
          obstacle.id
        )
    );


  for (
    let index = 0;
    index < points.length - 1;
    index++
  ) {

    const first =
      points[index];


    const second =
      points[index + 1];


    if (
      relevant.some(
        obstacle =>
          segmentIntersectsObstacle(
            first,
            second,
            obstacle
          )
      )
    ) {

      return true;

    }

  }


  return false;

}



/* =========================================================
   ORTHOGONAL ROUTER
========================================================= */

function findOrthogonalRoute(
  start,
  end,
  obstacles,
  ignoredIds = [],
  preferred = "vertical"
) {

  /*
    Candidate 1:
    vertical → horizontal → vertical
  */

  const midpointY =
    snapToGrid(
      (
        start.y +
        end.y
      ) / 2
    );


  const candidateVertical =
    [

      start,

      {
        x:
          start.x,

        y:
          midpointY
      },

      {
        x:
          end.x,

        y:
          midpointY
      },

      end

    ];


  /*
    Candidate 2:
    horizontal → vertical → horizontal
  */

  const midpointX =
    snapToGrid(
      (
        start.x +
        end.x
      ) / 2
    );


  const candidateHorizontal =
    [

      start,

      {
        x:
          midpointX,

        y:
          start.y
      },

      {
        x:
          midpointX,

        y:
          end.y
      },

      end

    ];


  const firstCandidate =
    preferred === "horizontal"
      ? candidateHorizontal
      : candidateVertical;


  const secondCandidate =
    preferred === "horizontal"
      ? candidateVertical
      : candidateHorizontal;


  if (
    !routeHitsObstacle(
      firstCandidate,
      obstacles,
      ignoredIds
    )
  ) {

    return simplifyRoute(
      firstCandidate
    );

  }


  if (
    !routeHitsObstacle(
      secondCandidate,
      obstacles,
      ignoredIds
    )
  ) {

    return simplifyRoute(
      secondCandidate
    );

  }


  /*
    Try alternate lanes moving outward.
  */

  for (
    let step = 1;
    step <= 12;
    step++
  ) {

    const offsets =
      [
        step,
        -step
      ];


    for (
      const direction
      of offsets
    ) {

      const laneY =
        midpointY +
        direction *
        ROUTE_LANE_STEP;


      const candidate =
        [

          start,

          {
            x:
              start.x,

            y:
              laneY
          },

          {
            x:
              end.x,

            y:
              laneY
          },

          end

        ];


      if (
        !routeHitsObstacle(
          candidate,
          obstacles,
          ignoredIds
        )
      ) {

        return simplifyRoute(
          candidate
        );

      }

    }

  }


  /*
    Try alternate vertical lanes.
  */

  for (
    let step = 1;
    step <= 12;
    step++
  ) {

    const offsets =
      [
        step,
        -step
      ];


    for (
      const direction
      of offsets
    ) {

      const laneX =
        midpointX +
        direction *
        ROUTE_LANE_STEP;


      const candidate =
        [

          start,

          {
            x:
              laneX,

            y:
              start.y
          },

          {
            x:
              laneX,

            y:
              end.y
          },

          end

        ];


      if (
        !routeHitsObstacle(
          candidate,
          obstacles,
          ignoredIds
        )
      ) {

        return simplifyRoute(
          candidate
        );

      }

    }

  }


  /*
    Last fallback.
  */

  return simplifyRoute(
    firstCandidate
  );

}



function simplifyRoute(points) {

  if (
    points.length <= 2
  ) {

    return points;

  }


  const result =
    [
      points[0]
    ];


  for (
    let i = 1;
    i < points.length - 1;
    i++
  ) {

    const previous =
      result[
        result.length - 1
      ];


    const current =
      points[i];


    const next =
      points[i + 1];


    const vertical =
      previous.x === current.x &&
      current.x === next.x;


    const horizontal =
      previous.y === current.y &&
      current.y === next.y;


    if (
      vertical ||
      horizontal
    ) {

      continue;

    }


    if (
      previous.x === current.x &&
      previous.y === current.y
    ) {

      continue;

    }


    result.push(
      current
    );

  }


  result.push(
    points[
      points.length - 1
    ]
  );


  return result;

}



/* =========================================================
   SVG PATH
========================================================= */

function pointsToPath(points) {

  if (
    !points.length
  ) {

    return "";

  }


  let path =
    `M ${points[0].x} ${points[0].y}`;


  for (
    let i = 1;
    i < points.length;
    i++
  ) {

    path +=
      ` L ${points[i].x} ${points[i].y}`;

  }


  return path;

}



function addSvgPath(
  points,
  className
) {

  const path =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );


  path.setAttribute(
    "d",
    pointsToPath(
      points
    )
  );


  path.setAttribute(
    "class",
    className
  );


  relationshipLineLayer.appendChild(
    path
  );


  return path;

}



/* =========================================================
   RELATIONSHIP LINES
========================================================= */

function drawRelationshipLines(
  positions
) {

  const obstacles =
    getAllNodeObstacles(
      positions
    );


  if (
    treeSettings.showSpouseLines
  ) {

    drawPartnerRelationships(
      positions,
      obstacles,
      "spouse"
    );

  }


  if (
    treeSettings.showLoverLines
  ) {

    drawPartnerRelationships(
      positions,
      obstacles,
      "lover"
    );

  }


  if (
    treeSettings.showSiblingLines
  ) {

    drawManualSiblingRelationships(
      positions,
      obstacles
    );

  }


  if (
    treeSettings.showParentLines
  ) {

    drawChildRelationships(
      positions,
      obstacles
    );

  }

}



/* =========================================================
   SPOUSES / LOVERS
========================================================= */

function drawPartnerRelationships(
  positions,
  obstacles,
  type
) {

  const drawn =
    new Set();


  const field =
    type === "spouse"
      ? "spouseIds"
      : "loverIds";


  characters.forEach(
    person => {

      person[field]
        .forEach(
          otherId => {

            const key =
              [
                person.id,
                otherId
              ]
                .sort(
                  (a, b) =>
                    a - b
                )
                .join("-");


            if (
              drawn.has(
                key
              )
            ) {

              return;

            }


            drawn.add(
              key
            );


            const first =
              positions.get(
                person.id
              );


            const second =
              positions.get(
                otherId
              );


            if (
              !first ||
              !second
            ) {

              return;

            }


            drawPartnerRoute(

              person.id,
              otherId,

              first,
              second,

              positions,
              obstacles,

              type

            );

          }
        );

    }
  );

}



function drawPartnerRoute(
  firstId,
  secondId,
  firstPosition,
  secondPosition,
  positions,
  obstacles,
  type
) {

  const firstCenter =
    getCircleCenter(
      firstPosition
    );


  const secondCenter =
    getCircleCenter(
      secondPosition
    );


  const mostlyHorizontal =
    Math.abs(
      secondCenter.x -
      firstCenter.x
    )
    >=
    Math.abs(
      secondCenter.y -
      firstCenter.y
    );


  let start;
  let end;


  if (
    mostlyHorizontal
  ) {

    if (
      firstCenter.x <=
      secondCenter.x
    ) {

      start =
        getRightAnchor(
          firstPosition
        );


      end =
        getLeftAnchor(
          secondPosition
        );

    }
    else {

      start =
        getLeftAnchor(
          firstPosition
        );


      end =
        getRightAnchor(
          secondPosition
        );

    }

  }
  else {

    if (
      firstCenter.y <=
      secondCenter.y
    ) {

      start =
        getBottomAnchor(
          firstPosition
        );


      end =
        getTopAnchor(
          secondPosition
        );

    }
    else {

      start =
        getTopAnchor(
          firstPosition
        );


      end =
        getBottomAnchor(
          secondPosition
        );

    }

  }


  const route =
    findOrthogonalRoute(

      start,
      end,

      obstacles,

      [
        firstId,
        secondId
      ],

      mostlyHorizontal
        ? "horizontal"
        : "vertical"

    );


  const focusClass =
    getLineFocusClass(
      [
        firstId,
        secondId
      ]
    );


  if (
    type === "spouse"
  ) {

    /*
      Double line effect:
      broad gold stroke + dark inner stroke.
    */

    addSvgPath(
      route,
      `tree-line spouse-line-outer ${focusClass}`
    );


    addSvgPath(
      route,
      `tree-line spouse-line-inner ${focusClass}`
    );


    addUnionMarker(
      getRouteMidpoint(
        route
      ),
      focusClass
    );

  }
  else {

    addSvgPath(
      route,
      `tree-line lover-line ${focusClass}`
    );

  }

}



/* =========================================================
   UNION MARKER
========================================================= */

function addUnionMarker(
  point,
  focusClass = ""
) {

  const circle =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );


  circle.setAttribute(
    "cx",
    point.x
  );


  circle.setAttribute(
    "cy",
    point.y
  );


  circle.setAttribute(
    "r",
    10
  );


  circle.setAttribute(
    "class",
    `relationship-union-marker ${focusClass}`
  );


  relationshipMarkerLayer.appendChild(
    circle
  );


  const text =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );


  text.setAttribute(
    "x",
    point.x
  );


  text.setAttribute(
    "y",
    point.y + 0.5
  );


  text.setAttribute(
    "class",
    "relationship-union-symbol"
  );


  text.textContent =
    "◌";


  relationshipMarkerLayer.appendChild(
    text
  );

}



function getRouteMidpoint(points) {

  if (
    points.length < 2
  ) {

    return points[0];

  }


  let total =
    0;


  const lengths =
    [];


  for (
    let i = 0;
    i < points.length - 1;
    i++
  ) {

    const first =
      points[i];


    const second =
      points[i + 1];


    const length =
      Math.abs(
        second.x -
        first.x
      ) +
      Math.abs(
        second.y -
        first.y
      );


    lengths.push(
      length
    );


    total +=
      length;

  }


  const target =
    total / 2;


  let cursor =
    0;


  for (
    let i = 0;
    i < lengths.length;
    i++
  ) {

    const length =
      lengths[i];


    if (
      cursor +
      length >=
      target
    ) {

      const remaining =
        target -
        cursor;


      const first =
        points[i];


      const second =
        points[i + 1];


      if (
        first.x === second.x
      ) {

        return {

          x:
            first.x,

          y:
            first.y +
            Math.sign(
              second.y -
              first.y
            ) *
            remaining

        };

      }


      return {

        x:
          first.x +
          Math.sign(
            second.x -
            first.x
          ) *
          remaining,

        y:
          first.y

      };

    }


    cursor +=
      length;

  }


  return points[
    points.length - 1
  ];

}



/* =========================================================
   CHILD GROUPS
========================================================= */

function buildChildGroups() {

  const groups =
    new Map();


  characters.forEach(
    child => {

      const motherId =
        getCharacter(
          child.motherId
        )
          ? child.motherId
          : null;


      const fatherId =
        getCharacter(
          child.fatherId
        )
          ? child.fatherId
          : null;


      if (
        !motherId &&
        !fatherId
      ) {

        return;

      }


      let key;


      if (
        motherId &&
        fatherId
      ) {

        const pair =
          [
            motherId,
            fatherId
          ]
            .sort(
              (a, b) =>
                a - b
            );


        key =
          `pair:${pair[0]}:${pair[1]}`;

      }
      else {

        key =
          `single:${motherId || fatherId}`;

      }


      if (
        !groups.has(
          key
        )
      ) {

        groups.set(
          key,
          {

            motherId,
            fatherId,
            children:
              []

          }
        );

      }


      groups
        .get(key)
        .children
        .push(
          child
        );

    }
  );


  return Array.from(
    groups.values()
  );

}



function drawChildRelationships(
  positions,
  obstacles
) {

  buildChildGroups()
    .forEach(
      group => {

        drawChildGroup(
          group,
          positions,
          obstacles
        );

      }
    );

}



/* =========================================================
   CHILD BRANCH ROUTING
========================================================= */

function drawChildGroup(
  group,
  positions,
  obstacles
) {

  const children =
    group.children
      .map(
        child => ({

          child,

          position:
            positions.get(
              child.id
            )

        })
      )
      .filter(
        entry =>
          entry.position
      );


  if (
    !children.length
  ) {

    return;

  }


  const motherPosition =
    group.motherId
      ? positions.get(
          group.motherId
        )
      : null;


  const fatherPosition =
    group.fatherId
      ? positions.get(
          group.fatherId
        )
      : null;


  let unionPoint;


  const parentIds =
    [
      group.motherId,
      group.fatherId
    ]
      .filter(Boolean);


  /*
    TWO KNOWN PARENTS
  */

  if (
    motherPosition &&
    fatherPosition
  ) {

    unionPoint =
      calculateParentUnionPoint(
        motherPosition,
        fatherPosition
      );


    drawParentUnionBond(

      group.motherId,
      group.fatherId,

      motherPosition,
      fatherPosition,

      unionPoint,

      obstacles

    );

  }


  /*
    ONE KNOWN PARENT
  */

  else {

    const parentPosition =
      motherPosition ||
      fatherPosition;


    if (!parentPosition) {

      return;

    }


    const parentId =
      group.motherId ||
      group.fatherId;


    const anchor =
      getBottomAnchor(
        parentPosition
      );


    unionPoint = {

      x:
        anchor.x,

      y:
        anchor.y +
        28

    };


    addSvgPath(

      [
        anchor,
        unionPoint
      ],

      makeChildLineClass(
        null,
        [
          parentId
        ]
      )

    );

  }


  /*
    Horizontal sibling branch.
  */

  const childCenters =
    children.map(
      entry => ({
        x:
          entry.position.x,
        y:
          entry.position.y
      })
    );


  const highestChildTop =
    Math.min(
      ...children.map(
        entry =>
          getTopAnchor(
            entry.position
          ).y
      )
    );


  let branchY =
    snapToGrid(
      highestChildTop -
      58
    );


  if (
    branchY <=
    unionPoint.y +
    18
  ) {

    branchY =
      snapToGrid(
        unionPoint.y +
        55
      );

  }


  /*
    Shift branch lane if it intersects another node.
  */

  branchY =
    findSafeHorizontalBranchY(

      unionPoint,

      children,

      branchY,

      obstacles,

      [
        ...parentIds,
        ...children.map(
          entry =>
            entry.child.id
        )
      ]

    );


  const childIds =
    children.map(
      entry =>
        entry.child.id
    );


  const trunkClass =
    makeChildGroupTrunkClass(
      parentIds,
      childIds
    );


  /*
    Union down to sibling bar.
  */

  addSvgPath(

    [
      unionPoint,

      {
        x:
          unionPoint.x,

        y:
          branchY
      }
    ],

    trunkClass

  );


  /*
    One child.
  */

  if (
    children.length === 1
  ) {

    const entry =
      children[0];


    const top =
      getTopAnchor(
        entry.position
      );


    const route =
      [

        {
          x:
            unionPoint.x,

          y:
            branchY
        },

        {
          x:
            top.x,

          y:
            branchY
        },

        top

      ];


    addSvgPath(
      simplifyRoute(
        route
      ),
      makeChildLineClass(
        entry.child.id,
        parentIds
      )
    );


    return;

  }


  const minX =
    Math.min(
      ...children.map(
        entry =>
          entry.position.x
      ),
      unionPoint.x
    );


  const maxX =
    Math.max(
      ...children.map(
        entry =>
          entry.position.x
      ),
      unionPoint.x
    );


  addSvgPath(

    [
      {
        x:
          minX,

        y:
          branchY
      },

      {
        x:
          maxX,

        y:
          branchY
      }
    ],

    trunkClass

  );


  children.forEach(
    entry => {

      const top =
        getTopAnchor(
          entry.position
        );


      addSvgPath(

        [
          {
            x:
              top.x,

            y:
              branchY
          },

          top
        ],

        makeChildLineClass(
          entry.child.id,
          parentIds
        )

      );

    }
  );

}



/* =========================================================
   PARENT UNION
========================================================= */

function calculateParentUnionPoint(
  firstPosition,
  secondPosition
) {

  const firstCenter =
    getCircleCenter(
      firstPosition
    );


  const secondCenter =
    getCircleCenter(
      secondPosition
    );


  return {

    x:
      snapToGrid(
        (
          firstCenter.x +
          secondCenter.x
        ) / 2
      ),

    y:
      snapToGrid(
        (
          firstCenter.y +
          secondCenter.y
        ) / 2
      )

  };

}



function drawParentUnionBond(
  firstId,
  secondId,
  firstPosition,
  secondPosition,
  unionPoint,
  obstacles
) {

  const firstCenter =
    getCircleCenter(
      firstPosition
    );


  const secondCenter =
    getCircleCenter(
      secondPosition
    );


  const mostlyHorizontal =
    Math.abs(
      firstCenter.x -
      secondCenter.x
    )
    >
    Math.abs(
      firstCenter.y -
      secondCenter.y
    );


  let firstAnchor;
  let secondAnchor;


  if (
    mostlyHorizontal
  ) {

    if (
      firstCenter.x <
      secondCenter.x
    ) {

      firstAnchor =
        getRightAnchor(
          firstPosition
        );


      secondAnchor =
        getLeftAnchor(
          secondPosition
        );

    }
    else {

      firstAnchor =
        getLeftAnchor(
          firstPosition
        );


      secondAnchor =
        getRightAnchor(
          secondPosition
        );

    }

  }
  else {

    if (
      firstCenter.y <
      secondCenter.y
    ) {

      firstAnchor =
        getBottomAnchor(
          firstPosition
        );


      secondAnchor =
        getTopAnchor(
          secondPosition
        );

    }
    else {

      firstAnchor =
        getTopAnchor(
          firstPosition
        );


      secondAnchor =
        getBottomAnchor(
          secondPosition
        );

    }

  }


  const firstRoute =
    findOrthogonalRoute(

      firstAnchor,
      unionPoint,

      obstacles,

      [
        firstId,
        secondId
      ],

      mostlyHorizontal
        ? "horizontal"
        : "vertical"

    );


  const secondRoute =
    findOrthogonalRoute(

      secondAnchor,
      unionPoint,

      obstacles,

      [
        firstId,
        secondId
      ],

      mostlyHorizontal
        ? "horizontal"
        : "vertical"

    );


  const focus =
    getLineFocusClass(
      [
        firstId,
        secondId
      ]
    );


  addSvgPath(
    firstRoute,
    `tree-line parent-bond-line ${focus}`
  );


  addSvgPath(
    secondRoute,
    `tree-line parent-bond-line ${focus}`
  );


  addUnionMarker(
    unionPoint,
    focus
  );

}



/* =========================================================
   SAFE BRANCH LANE
========================================================= */

function findSafeHorizontalBranchY(
  unionPoint,
  children,
  initialY,
  obstacles,
  ignoredIds
) {

  const minX =
    Math.min(
      unionPoint.x,
      ...children.map(
        entry =>
          entry.position.x
      )
    );


  const maxX =
    Math.max(
      unionPoint.x,
      ...children.map(
        entry =>
          entry.position.x
      )
    );


  for (
    let step = 0;
    step <= 12;
    step++
  ) {

    const candidateY =
      initialY +
      step *
      ROUTE_LANE_STEP;


    const points =
      [

        {
          x:
            minX,

          y:
            candidateY
        },

        {
          x:
            maxX,

          y:
            candidateY
        }

      ];


    if (
      !routeHitsObstacle(
        points,
        obstacles,
        ignoredIds
      )
    ) {

      return candidateY;

    }

  }


  return initialY;

}



/* =========================================================
   CHILD LINE STYLES
========================================================= */

function makeChildGroupTrunkClass(
  parentIds,
  childIds
) {

  const direct =
    childIds.some(
      childId => {

        return parentIds.some(
          parentId =>
            isDirectAncestorEdge(
              parentId,
              childId
            )
        );

      }
    );


  if (direct) {

    return "tree-line parent-child-line focus-clear direct-ancestor-line";

  }


  return `tree-line parent-child-line ${
    getLineFocusClass(
      [
        ...parentIds,
        ...childIds
      ]
    )
  }`;

}



function makeChildLineClass(
  childId,
  parentIds
) {

  if (
    childId !== null
  ) {

    const direct =
      parentIds.some(
        parentId =>
          isDirectAncestorEdge(
            parentId,
            childId
          )
      );


    if (direct) {

      return "tree-line parent-child-line focus-clear direct-ancestor-line";

    }

  }


  return `tree-line parent-child-line ${
    getLineFocusClass(
      [
        childId,
        ...parentIds
      ]
        .filter(Boolean)
    )
  }`;

}



/* =========================================================
   MANUAL SIBLING LINES
========================================================= */

function drawManualSiblingRelationships(
  positions,
  obstacles
) {

  const drawn =
    new Set();


  characters.forEach(
    person => {

      person.siblingIds
        .forEach(
          siblingId => {

            const sibling =
              getCharacter(
                siblingId
              );


            if (!sibling) {

              return;

            }


            /*
              If known parents already explain the sibling
              relationship, don't add another dotted line.
            */

            if (
              shareKnownParent(
                person,
                sibling
              )
            ) {

              return;

            }


            const key =
              [
                person.id,
                sibling.id
              ]
                .sort(
                  (a, b) =>
                    a - b
                )
                .join("-");


            if (
              drawn.has(
                key
              )
            ) {

              return;

            }


            drawn.add(
              key
            );


            const first =
              positions.get(
                person.id
              );


            const second =
              positions.get(
                sibling.id
              );


            if (
              !first ||
              !second
            ) {

              return;

            }


            const start =
              first.x < second.x
                ? getRightAnchor(
                    first
                  )
                : getLeftAnchor(
                    first
                  );


            const end =
              first.x < second.x
                ? getLeftAnchor(
                    second
                  )
                : getRightAnchor(
                    second
                  );


            const route =
              findOrthogonalRoute(

                start,
                end,

                obstacles,

                [
                  person.id,
                  sibling.id
                ],

                "horizontal"

              );


            addSvgPath(

              route,

              `tree-line sibling-line ${
                getLineFocusClass(
                  [
                    person.id,
                    sibling.id
                  ]
                )
              }`

            );

          }
        );

    }
  );

}



/* =========================================================
   VANTAGE FOCUS
========================================================= */

function buildFocusState() {

  const distances =
    new Map();


  const directAncestors =
    new Set();


  const vantage =
    getCharacter(
      vantageCharacterId
    );


  if (!vantage) {

    characters.forEach(
      person => {

        distances.set(
          person.id,
          0
        );

      }
    );


    return {

      distances,
      directAncestors

    };

  }


  collectDirectAncestors(

    vantage.id,

    directAncestors,

    new Set()

  );


  const graph =
    buildRelationshipGraph();


  const queue =
    [
      {

        id:
          vantage.id,

        distance:
          0

      }
    ];


  distances.set(
    vantage.id,
    0
  );


  while (
    queue.length
  ) {

    const current =
      queue.shift();


    const neighbours =
      graph.get(
        current.id
      ) ||
      new Set();


    neighbours.forEach(
      id => {

        if (
          distances.has(
            id
          )
        ) {

          return;

        }


        const distance =
          current.distance +
          1;


        distances.set(
          id,
          distance
        );


        queue.push({

          id,
          distance

        });

      }
    );

  }


  return {

    distances,
    directAncestors

  };

}



function collectDirectAncestors(
  id,
  result,
  visiting
) {

  if (
    visiting.has(id)
  ) {

    return;

  }


  visiting.add(
    id
  );


  const person =
    getCharacter(
      id
    );


  if (!person) {

    return;

  }


  [
    person.motherId,
    person.fatherId
  ]
    .filter(Boolean)
    .forEach(
      parentId => {

        result.add(
          parentId
        );


        collectDirectAncestors(

          parentId,

          result,

          visiting

        );

      }
    );


  visiting.delete(
    id
  );

}



function buildRelationshipGraph() {

  const graph =
    new Map();


  function ensure(id) {

    if (
      !graph.has(id)
    ) {

      graph.set(
        id,
        new Set()
      );

    }


    return graph.get(
      id
    );

  }


  function connect(
    first,
    second
  ) {

    if (
      !first ||
      !second ||
      first === second
    ) {

      return;

    }


    ensure(first)
      .add(second);


    ensure(second)
      .add(first);

  }


  characters.forEach(
    person => {

      ensure(
        person.id
      );


      connect(
        person.id,
        person.motherId
      );


      connect(
        person.id,
        person.fatherId
      );


      getSiblings(
        person.id
      )
        .forEach(
          sibling => {

            connect(
              person.id,
              sibling.id
            );

          }
        );


      person.spouseIds
        .forEach(
          id =>
            connect(
              person.id,
              id
            )
        );


      person.loverIds
        .forEach(
          id =>
            connect(
              person.id,
              id
            )
        );

    }
  );


  return graph;

}



function getFocusClass(id) {

  if (
    !vantageCharacterId
  ) {

    return "focus-clear";

  }


  if (
    id === vantageCharacterId
  ) {

    return "focus-clear";

  }


  if (
    focusState
      .directAncestors
      .has(id)
  ) {

    return "focus-clear";

  }


  const distance =
    focusState
      .distances
      .get(id);


  if (
    distance === undefined
  ) {

    return "focus-remote";

  }


  if (
    distance <= 3
  ) {

    return "focus-clear";

  }


  if (
    distance === 4
  ) {

    return "focus-near";

  }


  if (
    distance <= 6
  ) {

    return "focus-distant";

  }


  return "focus-remote";

}



function focusRank(className) {

  if (
    className === "focus-clear"
  ) {

    return 0;

  }


  if (
    className === "focus-near"
  ) {

    return 1;

  }


  if (
    className === "focus-distant"
  ) {

    return 2;

  }


  return 3;

}



function getLineFocusClass(ids) {

  const validIds =
    ids.filter(Boolean);


  if (
    !vantageCharacterId ||
    !validIds.length
  ) {

    return "focus-clear";

  }


  let worst =
    0;


  validIds.forEach(
    id => {

      worst =
        Math.max(

          worst,

          focusRank(
            getFocusClass(
              id
            )
          )

        );

    }
  );


  if (
    worst === 0
  ) {

    return "focus-clear";

  }


  if (
    worst === 1
  ) {

    return "focus-near";

  }


  if (
    worst === 2
  ) {

    return "focus-distant";

  }


  return "focus-remote";

}



function isDirectAncestorEdge(
  firstId,
  secondId
) {

  if (
    !vantageCharacterId
  ) {

    return false;

  }


  const spine =
    new Set([

      vantageCharacterId,

      ...focusState
        .directAncestors

    ]);


  if (
    !spine.has(
      firstId
    ) ||
    !spine.has(
      secondId
    )
  ) {

    return false;

  }


  const first =
    getCharacter(
      firstId
    );


  const second =
    getCharacter(
      secondId
    );


  if (
    !first ||
    !second
  ) {

    return false;

  }


  return (
    first.motherId === secondId ||
    first.fatherId === secondId ||
    second.motherId === firstId ||
    second.fatherId === firstId
  );

}



/* =========================================================
   PAN / ZOOM
========================================================= */

function applyViewTransform() {

  treeViewport.style.transform =
    `translate(${viewX}px, ${viewY}px) scale(${zoom})`;


  zoomIndicator.textContent =
    `${Math.round(
      zoom * 100
    )}%`;


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

        ) *
        0.82

      )

    );


  viewX =
    rect.width /
    2 -
    layout.centerX *
    zoom;


  viewY =
    Math.max(

      40,

      rect.height *
      0.12 -
      layout.topY *
      zoom

    );


  applyViewTransform();

}



function zoomAtPoint(
  newZoom,
  x,
  y
) {

  const worldX =
    (
      x -
      viewX
    ) /
    zoom;


  const worldY =
    (
      y -
      viewY
    ) /
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
    worldX *
    zoom;


  viewY =
    y -
    worldY *
    zoom;


  applyViewTransform();

}



zoomInButton.addEventListener(
  "click",
  function() {

    const rect =
      treeCanvas
        .getBoundingClientRect();


    zoomAtPoint(

      zoom +
      ZOOM_STEP,

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

      zoom -
      ZOOM_STEP,

      rect.width / 2,

      rect.height / 2

    );

  }
);


resetViewButton.addEventListener(
  "click",
  centerTree
);



/* =========================================================
   TOUCH PAN + PINCH
========================================================= */

treeCanvas.addEventListener(
  "touchstart",
  function(event) {

    if (
      arrangeMode &&
      event.target.closest(
        ".character-node"
      )
    ) {

      return;

    }


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
    passive:
      false
  }
);



treeCanvas.addEventListener(
  "touchmove",
  function(event) {

    if (
      draggedCharacterId !== null
    ) {

      return;

    }


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
    passive:
      false
  }
);



treeCanvas.addEventListener(
  "touchend",
  function() {

    isPanning =
      false;

  }
);



/* DESKTOP PAN */

treeCanvas.addEventListener(
  "pointerdown",
  function(event) {

    if (
      event.pointerType === "touch"
    ) {

      return;

    }


    if (
      arrangeMode &&
      event.target.closest(
        ".character-node"
      )
    ) {

      return;

    }


    if (
      event.target.closest(
        ".character-node"
      )
    ) {

      return;

    }


    isPanning =
      true;


    panStartX =
      event.clientX;


    panStartY =
      event.clientY;


    startViewX =
      viewX;


    startViewY =
      viewY;


    treeCanvas
      .setPointerCapture?.(
        event.pointerId
      );

  }
);



treeCanvas.addEventListener(
  "pointermove",
  function(event) {

    if (
      event.pointerType === "touch" ||
      !isPanning
    ) {

      return;

    }


    viewX =
      startViewX +
      event.clientX -
      panStartX;


    viewY =
      startViewY +
      event.clientY -
      panStartY;


    applyViewTransform();

  }
);



treeCanvas.addEventListener(
  "pointerup",
  function() {

    isPanning =
      false;

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

          const raceNames =
            calculateAncestry(
              person.id,
              "race"
            )
              .map(
                entry =>
                  getAncestryName(
                    "race",
                    entry.id
                  )
              );


          const speciesNames =
            calculateAncestry(
              person.id,
              "species"
            )
              .map(
                entry =>
                  getAncestryName(
                    "species",
                    entry.id
                  )
              );


          const text =
            [

              person.title,

              person.givenName,

              person.familyName,

              person.maidenName,

              formatGender(
                person.gender
              ),

              getAdornmentName(
                person.adornment
              ),

              ...person.aliases,

              ...raceNames,

              ...speciesNames

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


  if (
    !people.length
  ) {

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


        const circle =
          document.createElement(
            "span"
          );


        circle.className =
          "search-result-circle";


        if (
          person.portraitData
        ) {

          const image =
            document.createElement(
              "img"
            );


          image.src =
            person.portraitData;


          image.alt =
            "";


          circle.appendChild(
            image
          );

        }
        else {

          circle.textContent =
            getInitial(
              person
            );

        }


        const info =
          document.createElement(
            "span"
          );


        const name =
          document.createElement(
            "span"
          );


        name.className =
          "search-result-name";


        name.textContent =
          getTreeName(
            person
          );


        const meta =
          document.createElement(
            "span"
          );


        meta.className =
          "search-result-meta";


        meta.textContent =
          `${makeYearText(person)} · ${formatGender(person.gender)}`;


        info.appendChild(
          name
        );


        info.appendChild(
          meta
        );


        button.appendChild(
          circle
        );


        button.appendChild(
          info
        );


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
   PROFILE
========================================================= */

function openProfile(id) {

  const character =
    getCharacter(
      id
    );


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


  byId(
    "profileFullName"
  ).textContent =
    getProfileName(
      character
    );


  byId(
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
    "profileGender",
    formatGender(
      character.gender
    )
  );


  setProfileText(
    "profileAdornmentName",
    character.divineGlow
      ? `${getAdornmentName(character.adornment)} · Luminous`
      : getAdornmentName(
          character.adornment
        )
  );


  renderAncestryList(

    byId(
      "profileRaceAncestry"
    ),

    calculateAncestry(
      character.id,
      "race"
    ),

    "race"

  );


  renderAncestryList(

    byId(
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


  byId(
    "profileHairColor"
  ).textContent =
    getColorName(
      "hair",
      character.hairColorId
    );


  byId(
    "profileEyeColor"
  ).textContent =
    getColorName(
      "eyes",
      character.eyeColorId
    );


  byId(
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
    id === vantageCharacterId
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


  profilePortraitWrap.classList.toggle(
    "divine-glow",
    character.divineGlow
  );


  applyAdornmentClass(
    profileAdornment,
    character.adornment
  );


  if (
    character.portraitData
  ) {

    const image =
      document.createElement(
        "img"
      );


    image.src =
      character.portraitData;


    image.alt =
      "";


    profilePortrait.appendChild(
      image
    );

  }
  else {

    profilePortrait.textContent =
      getInitial(
        character
      );

  }

}



/* =========================================================
   RELATIVE PROFILE
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
        ]
          .filter(Boolean)
      : []

  );


  renderRelationshipButtons(

    "profileFather",

    character.fatherId
      ? [
          getCharacter(
            character.fatherId
          )
        ]
          .filter(Boolean)
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
    byId(
      containerId
    );


  container.innerHTML =
    "";


  if (
    !people.length
  ) {

    container.textContent =
      "—";


    return;

  }


  people
    .slice()
    .sort(
      compareCharacterNames
    )
    .forEach(
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


  byId(
    "editGender"
  ).value =
    normalizeGender(
      character.gender
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


  editAdornment.value =
    character.adornment;


  editDivineGlow.checked =
    character.divineGlow;


  editPositionLocked.checked =
    character.positionLocked;


  refreshAdornmentPreview();


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


  renderEditGenetics();


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



/* =========================================================
   ADORNMENT EDITOR
========================================================= */

editAdornment.addEventListener(
  "change",
  refreshAdornmentPreview
);


editDivineGlow.addEventListener(
  "change",
  refreshAdornmentPreview
);



function refreshAdornmentPreview() {

  applyAdornmentClass(

    adornmentPreviewDecoration,

    editAdornment.value

  );


  adornmentPreview.classList.toggle(

    "divine-glow",

    editDivineGlow.checked

  );

}



/* =========================================================
   RESET ONE CHARACTER POSITION
========================================================= */

resetCharacterPositionButton.addEventListener(
  "click",
  function() {

    const character =
      getCharacter(
        selectedCharacterId
      );


    if (!character) {

      return;

    }


    character.treeX =
      null;


    character.treeY =
      null;


    character.positionLocked =
      false;


    editPositionLocked.checked =
      false;


    saveCharacters();


    renderTree();


    showToast(
      "Character position reset"
    );

  }
);



/* =========================================================
   RELATIONSHIP SELECTORS
========================================================= */

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

    "editSiblings",

    character.id,

    character.siblingIds

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
    byId(
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
    byId(
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



/* =========================================================
   SAVE EDIT
========================================================= */

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


    if (
      manualMode
    ) {

      if (
        hasDuplicateAncestry(
          raceAncestry
        )
      ) {

        showToast(
          "Each Race can only appear once"
        );


        return;

      }


      if (
        hasDuplicateAncestry(
          speciesAncestry
        )
      ) {

        showToast(
          "Each Species can only appear once"
        );


        return;

      }


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


    const oldSiblings =
      [
        ...character.siblingIds
      ];


    const oldSpouses =
      [
        ...character.spouseIds
      ];


    const oldLovers =
      [
        ...character.loverIds
      ];


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


    character.gender =
      byId(
        "editGender"
      ).value;


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


    character.siblingIds =
      getSelectedMultipleIds(
        "editSiblings"
      );


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


    character.adornment =
      normalizeAdornment(
        editAdornment.value
      );


    character.divineGlow =
      editDivineGlow.checked;


    character.positionLocked =
      editPositionLocked.checked;


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
      pendingPortraitData ||
      "";


    syncTwoWay(

      character.id,

      oldSiblings,

      character.siblingIds,

      "siblingIds"

    );


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



function hasDuplicateAncestry(entries) {

  const ids =
    entries.map(
      entry =>
        entry.id
    );


  return (
    new Set(ids).size !==
    ids.length
  );

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

    }
    catch {

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

      portraitData:
        ""

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

  }
  else {

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



function readFile(file) {

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



function loadImage(source) {

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
   COLOR EDITOR
========================================================= */

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


    const wrap =
      byId(
        customWrapId
      );


    const swatch =
      byId(
        swatchId
      );


    const name =
      byId(
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


      renderEditGenetics();


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


      renderEditGenetics();


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


    renderEditGenetics();

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
    id ||
    "";


  custom.value =
    isHexColor(
      hex
    )
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
  else if (
    id
  ) {

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
   ANCESTRY
========================================================= */

function usesManualAncestry(character) {

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



function getAncestryName(
  kind,
  id
) {

  if (
    id === UNKNOWN_ANCESTRY_ID
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

      100 -
      total

    );

  }


  return mapToEntries(
    map
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


  if (
    memo.has(key)
  ) {

    return cloneEntries(
      memo.get(key)
    );

  }


  if (
    visiting.has(key)
  ) {

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


  visiting.add(
    key
  );


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


    visiting.delete(
      key
    );


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


  visiting.delete(
    key
  );


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


  calculateAncestryInternal(

    parent.id,

    kind,

    memo,

    visiting

  )
    .forEach(
      entry => {

        addMapValue(

          map,

          entry.id,

          entry.percent *
          0.5

        );

      }
    );

}



/* =========================================================
   ANCESTRY RENDER
========================================================= */

function renderAncestryList(
  container,
  ancestry,
  kind
) {

  container.innerHTML =
    "";


  ancestry
    .slice()
    .sort(
      (a, b) =>
        b.percent -
        a.percent
    )
    .forEach(
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


  character.raceAncestry
    .forEach(
      entry =>
        addAncestryEditorRow(
          "race",
          entry
        )
    );


  character.speciesAncestry
    .forEach(
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


  if (
    !library.length
  ) {

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
      (a, b) =>
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


  updateAncestryTotals();

}



addRaceAncestryButton.addEventListener(
  "click",
  () =>
    addAncestryEditorRow(
      "race"
    )
);


addSpeciesAncestryButton.addEventListener(
  "click",
  () =>
    addAncestryEditorRow(
      "species"
    )
);



function readManualAncestry(kind) {

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
    sumPercent(
      ancestry
    );


  element.textContent =
    `Total: ${formatPercent(total)}%`;


  element.classList.remove(
    "valid",
    "invalid"
  );


  if (
    !ancestry.length
  ) {

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

  if (
    !selectedCharacterId
  ) {

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


  if (
    !hasParents
  ) {

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


    renderEditGenetics();


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


    renderEditGenetics();


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


  renderEditGenetics();

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

                entry.percent *
                0.5

              );

            }
          );

      }
    );


  return mapToEntries(
    map
  )
    .sort(
      (a, b) =>
        b.percent -
        a.percent
    );

}



/* =========================================================
   GENETIC APPEARANCE
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


  if (
    memo.has(key)
  ) {

    return cloneEntries(
      memo.get(key)
    );

  }


  if (
    visiting.has(key)
  ) {

    return [];

  }


  const character =
    getCharacter(
      characterId
    );


  if (!character) {

    return [];

  }


  visiting.add(
    key
  );


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


  if (
    !hasMother &&
    !hasFather
  ) {

    let founder =
      background;


    if (
      !founder.length
    ) {

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


    visiting.delete(
      key
    );


    return cloneEntries(
      founder
    );

  }


  const finalMap =
    new Map();


  const perParentWeight =
    (
      geneticModel.family /
      100
    ) / 2;


  addFamilyContribution(

    character.motherId,

    trait,

    perParentWeight,

    background,

    finalMap,

    memo,

    visiting

  );


  addFamilyContribution(

    character.fatherId,

    trait,

    perParentWeight,

    background,

    finalMap,

    memo,

    visiting

  );


  addWeightedEntries(

    finalMap,

    raceBaseline,

    geneticModel.race /
    100

  );


  addWeightedEntries(

    finalMap,

    speciesBaseline,

    geneticModel.species /
    100

  );


  let result =
    mapToEntries(
      finalMap
    );


  if (
    !result.length
  ) {

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


  visiting.delete(
    key
  );


  return cloneEntries(
    result
  );

}



function addFamilyContribution(
  parentId,
  trait,
  totalWeight,
  fallbackBackground,
  finalMap,
  memo,
  visiting
) {

  if (
    totalWeight <= 0
  ) {

    return;

  }


  const parent =
    getCharacter(
      parentId
    );


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


  addWeightedEntries(

    parentMap,

    parentGenetics,

    geneticModel.parentGenetic /
    100

  );


  addWeightedEntries(

    parentMap,

    parentActual,

    geneticModel.parentActual /
    100

  );


  let parentBlend =
    mapToEntries(
      parentMap
    );


  if (
    !parentBlend.length
  ) {

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


      if (
        !distribution.length
      ) {

        return;

      }


      const ancestryWeight =
        ancestryEntry.percent /
        100;


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

    let raceWeight =
      geneticModel.race;


    let speciesWeight =
      geneticModel.species;


    const total =
      raceWeight +
      speciesWeight;


    if (
      total > 0
    ) {

      raceWeight /=
        total;


      speciesWeight /=
        total;

    }
    else {

      raceWeight =
        0.5;


      speciesWeight =
        0.5;

    }


    addWeightedEntries(

      map,

      race,

      raceWeight

    );


    addWeightedEntries(

      map,

      species,

      speciesWeight

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
   ACTUAL COLOR CONTRIBUTION
========================================================= */

function actualColorDistribution(
  character,
  trait
) {

  let id =
    "";


  let hex =
    "";


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


  if (
    !id &&
    !hex
  ) {

    return [];

  }


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


  if (
    hex &&
    isHexColor(
      hex
    )
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
            source.r -
            rgb.r,
            2
          ) +
          Math.pow(
            source.g -
            rgb.g,
            2
          ) +
          Math.pow(
            source.b -
            rgb.b,
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



function hexToRgb(hex) {

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
        ) *
        weight

      );

    }
  );

}



function normalizeProbabilityEntries(
  entries
) {

  if (
    !entries.length
  ) {

    return [];

  }


  const total =
    entries.reduce(
      (sum, entry) =>
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
          ) *
          100

      })
    )
    .filter(
      entry =>
        entry.percent >
        0.000001
    )
    .sort(
      (a, b) =>
        b.percent -
        a.percent
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
      map.get(id) ||
      0
    ) +
    amount

  );

}



function mapToEntries(map) {

  return Array.from(
    map.entries()
  )
    .map(
      ([id, percent]) => ({

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



function cloneEntries(entries) {

  return entries.map(
    entry => ({
      ...entry
    })
  );

}



function sumMap(map) {

  return Array.from(
    map.values()
  )
    .reduce(
      (sum, value) =>
        sum +
        value,
      0
    );

}



/* =========================================================
   EDIT GENETICS
========================================================= */

function renderEditGenetics() {

  const character =
    getCharacter(
      selectedCharacterId
    );


  if (!character) {

    return;

  }


  const hair =
    calculateTraitProbabilities(

      character.id,

      "hair"

    );


  const eyes =
    calculateTraitProbabilities(

      character.id,

      "eyes"

    );


  const skin =
    calculateTraitProbabilities(

      character.id,

      "skin"

    );


  renderEditProbabilityList(

    editHairProbabilities,

    "hair",

    hair,

    editHairPreset.value

  );


  renderEditProbabilityList(

    editEyeProbabilities,

    "eyes",

    eyes,

    editEyePreset.value

  );


  renderEditProbabilityList(

    editSkinProbabilities,

    "skin",

    skin,

    editSkinPreset.value

  );


  spinHairButton.disabled =
    !hair.length;


  spinEyeButton.disabled =
    !eyes.length;


  spinSkinButton.disabled =
    !skin.length;

}



function renderEditProbabilityList(
  container,
  trait,
  probabilities,
  actualId
) {

  container.innerHTML =
    "";


  if (
    !probabilities.length
  ) {

    const empty =
      document.createElement(
        "div"
      );


    empty.className =
      "probability-empty";


    empty.textContent =
      "Not enough genetic information yet.";


    container.appendChild(
      empty
    );


    return;

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
        entry.id === actualId
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



/* =========================================================
   PROBABILITY WHEEL
========================================================= */

spinHairButton.addEventListener(
  "click",
  () =>
    openProbabilityWheel(
      "hair"
    )
);


spinEyeButton.addEventListener(
  "click",
  () =>
    openProbabilityWheel(
      "eyes"
    )
);


spinSkinButton.addEventListener(
  "click",
  () =>
    openProbabilityWheel(
      "skin"
    )
);



function openProbabilityWheel(
  trait
) {

  const character =
    getCharacter(
      selectedCharacterId
    );


  if (!character) {

    return;

  }


  const probabilities =
    calculateTraitProbabilities(

      character.id,

      trait

    )
      .filter(
        entry =>
          findColorPreset(
            trait,
            entry.id
          )
      );


  if (
    !probabilities.length
  ) {

    showToast(
      "No genetic probabilities available yet"
    );


    return;

  }


  activeWheelTrait =
    trait;


  activeWheelProbabilities =
    normalizeProbabilityEntries(
      probabilities
    );


  activeWheelResult =
    null;


  wheelIsSpinning =
    false;


  probabilityWheelTitle.textContent =
    `${getTraitLabel(trait)} Probability Wheel`;


  probabilityWheelResult.classList.add(
    "hidden"
  );


  applyWheelResultButton.disabled =
    true;


  buildProbabilityWheel();


  renderProbabilityWheelLegend();


  probabilityWheelBackdrop.classList.remove(
    "hidden"
  );


  probabilityWheelPanel.classList.remove(
    "hidden"
  );

}



function closeProbabilityWheel() {

  if (
    wheelIsSpinning
  ) {

    return;

  }


  probabilityWheelBackdrop.classList.add(
    "hidden"
  );


  probabilityWheelPanel.classList.add(
    "hidden"
  );


  activeWheelTrait =
    null;


  activeWheelProbabilities =
    [];


  activeWheelResult =
    null;

}



closeProbabilityWheelButton.addEventListener(
  "click",
  closeProbabilityWheel
);


probabilityWheelBackdrop.addEventListener(
  "click",
  closeProbabilityWheel
);



function getTraitLabel(trait) {

  if (
    trait === "hair"
  ) {

    return "Hair";

  }


  if (
    trait === "eyes"
  ) {

    return "Eye";

  }


  return "Skin";

}



function buildProbabilityWheel() {

  let cursor =
    0;


  const segments =
    [];


  activeWheelProbabilities.forEach(
    entry => {

      const preset =
        findColorPreset(
          activeWheelTrait,
          entry.id
        );


      if (!preset) {

        return;

      }


      const start =
        cursor;


      const end =
        cursor +
        (
          entry.percent /
          100
        ) *
        360;


      segments.push(
        `${preset.hex} ${start}deg ${end}deg`
      );


      cursor =
        end;

    }
  );


  probabilityWheel.style.background =
    `conic-gradient(${segments.join(",")})`;

}



function renderProbabilityWheelLegend() {

  probabilityWheelLegend.innerHTML =
    "";


  activeWheelProbabilities.forEach(
    entry => {

      const preset =
        findColorPreset(
          activeWheelTrait,
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
        "wheel-legend-row";


      const swatch =
        document.createElement(
          "div"
        );


      swatch.className =
        "wheel-legend-swatch";


      swatch.style.background =
        preset.hex;


      const name =
        document.createElement(
          "div"
        );


      name.className =
        "wheel-legend-name";


      name.textContent =
        preset.name;


      const percent =
        document.createElement(
          "div"
        );


      percent.className =
        "wheel-legend-percent";


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


      probabilityWheelLegend.appendChild(
        row
      );

    }
  );

}



spinAgainButton.addEventListener(
  "click",
  spinProbabilityWheel
);



function spinProbabilityWheel() {

  if (
    wheelIsSpinning ||
    !activeWheelProbabilities.length
  ) {

    return;

  }


  wheelIsSpinning =
    true;


  applyWheelResultButton.disabled =
    true;


  probabilityWheelResult.classList.add(
    "hidden"
  );


  activeWheelResult =
    chooseWeightedResult(
      activeWheelProbabilities
    );


  if (
    !activeWheelResult
  ) {

    wheelIsSpinning =
      false;


    return;

  }


  const targetCenter =
    getWheelSegmentCenter(
      activeWheelResult.id
    );


  const fullTurns =
    5 +
    Math.floor(
      Math.random() *
      3
    );


  const targetRotation =
    fullTurns *
    360 +
    (
      360 -
      targetCenter
    );


  wheelRotation +=
    targetRotation;


  probabilityWheel.style.transform =
    `rotate(${wheelRotation}deg)`;


  setTimeout(
    function() {

      wheelIsSpinning =
        false;


      showWheelResult(
        activeWheelResult
      );


      applyWheelResultButton.disabled =
        false;

    },
    3250
  );

}



function chooseWeightedResult(
  probabilities
) {

  const roll =
    Math.random() *
    100;


  let cursor =
    0;


  for (
    const entry
    of probabilities
  ) {

    cursor +=
      entry.percent;


    if (
      roll <= cursor
    ) {

      return {
        ...entry
      };

    }

  }


  return probabilities.length
    ? {
        ...probabilities[
          probabilities.length - 1
        ]
      }
    : null;

}



function getWheelSegmentCenter(
  colorId
) {

  let cursor =
    0;


  for (
    const entry
    of activeWheelProbabilities
  ) {

    const start =
      cursor;


    const size =
      (
        entry.percent /
        100
      ) *
      360;


    const end =
      start +
      size;


    if (
      entry.id === colorId
    ) {

      return (
        start +
        end
      ) / 2;

    }


    cursor =
      end;

  }


  return 0;

}



function showWheelResult(
  result
) {

  const preset =
    findColorPreset(

      activeWheelTrait,

      result.id

    );


  if (!preset) {

    return;

  }


  probabilityWheelResultSwatch.style.background =
    preset.hex;


  probabilityWheelResultName.textContent =
    preset.name;


  probabilityWheelResultChance.textContent =
    `${formatProbability(result.percent)}% genetic probability`;


  probabilityWheelResult.classList.remove(
    "hidden"
  );

}



applyWheelResultButton.addEventListener(
  "click",
  function() {

    if (
      !activeWheelResult ||
      !activeWheelTrait
    ) {

      return;

    }


    applyWheelColorToEditor(

      activeWheelTrait,

      activeWheelResult.id

    );


    closeProbabilityWheel();


    renderEditGenetics();


    showToast(
      "Wheel result applied"
    );

  }
);



function applyWheelColorToEditor(
  trait,
  colorId
) {

  let select;


  if (
    trait === "hair"
  ) {

    select =
      editHairPreset;

  }


  if (
    trait === "eyes"
  ) {

    select =
      editEyePreset;

  }


  if (
    trait === "skin"
  ) {

    select =
      editSkinPreset;

  }


  if (!select) {

    return;

  }


  select.value =
    colorId;


  select.dispatchEvent(
    new Event(
      "change"
    )
  );

}



/* =========================================================
   FAMILY RELATIONSHIPS
========================================================= */

function getChildren(
  parentId
) {

  return characters.filter(
    person =>
      person.motherId === parentId ||
      person.fatherId === parentId
  );

}



function getAutomaticSiblings(id) {

  const person =
    getCharacter(
      id
    );


  if (!person) {

    return [];

  }


  return characters.filter(
    other =>
      other.id !== id &&
      shareKnownParent(
        person,
        other
      )
  );

}



function getSiblings(id) {

  const person =
    getCharacter(
      id
    );


  if (!person) {

    return [];

  }


  const result =
    new Map();


  getAutomaticSiblings(
    id
  )
    .forEach(
      sibling => {

        result.set(
          sibling.id,
          sibling
        );

      }
    );


  person.siblingIds
    .forEach(
      siblingId => {

        const sibling =
          getCharacter(
            siblingId
          );


        if (sibling) {

          result.set(
            sibling.id,
            sibling
          );

        }

      }
    );


  return Array.from(
    result.values()
  );

}



function shareKnownParent(
  first,
  second
) {

  if (
    !first ||
    !second
  ) {

    return false;

  }


  const firstParents =
    [
      first.motherId,
      first.fatherId
    ]
      .filter(Boolean);


  const secondParents =
    new Set(
      [
        second.motherId,
        second.fatherId
      ]
        .filter(Boolean)
    );


  return firstParents.some(
    id =>
      secondParents.has(
        id
      )
  );

}



function sharedParentCount(
  first,
  second
) {

  if (
    !first ||
    !second
  ) {

    return 0;

  }


  const secondParents =
    new Set(
      [
        second.motherId,
        second.fatherId
      ]
        .filter(Boolean)
    );


  return [
    first.motherId,
    first.fatherId
  ]
    .filter(Boolean)
    .filter(
      id =>
        secondParents.has(
          id
        )
    )
    .length;

}



function areSiblings(
  firstId,
  secondId
) {

  if (
    firstId === secondId
  ) {

    return false;

  }


  return getSiblings(
    firstId
  )
    .some(
      sibling =>
        sibling.id === secondId
    );

}



function getParents(id) {

  const person =
    getCharacter(
      id
    );


  if (!person) {

    return [];

  }


  return [
    person.motherId,
    person.fatherId
  ]
    .filter(Boolean)
    .map(
      parentId =>
        getCharacter(
          parentId
        )
    )
    .filter(Boolean);

}



/* =========================================================
   RECIPROCAL RELATIONSHIPS
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
        newIds.includes(
          id
        )
      ) {

        return;

      }


      const other =
        getCharacter(
          id
        );


      if (other) {

        other[field] =
          other[field]
            .filter(
              value =>
                value !== characterId
            );

      }

    }
  );


  newIds.forEach(
    id => {

      const other =
        getCharacter(
          id
        );


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



function makeReciprocalRelationships() {

  characters.forEach(
    person => {

      [
        "siblingIds",
        "spouseIds",
        "loverIds"
      ]
        .forEach(
          field => {

            person[field]
              .forEach(
                otherId => {

                  const other =
                    getCharacter(
                      otherId
                    );


                  if (
                    other &&
                    !other[field]
                      .includes(
                        person.id
                      )
                  ) {

                    other[field].push(
                      person.id
                    );

                  }

                }
              );

          }
        );

    }
  );

}



/* =========================================================
   VANTAGE RELATION
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



/* =========================================================
   RELATIONSHIP DESCRIPTION
========================================================= */

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


  if (
    areSiblings(
      vantage.id,
      subject.id
    )
  ) {

    const shared =
      sharedParentCount(
        vantage,
        subject
      );


    const base =
      genderedTerm(

        subject,

        "Sister",

        "Brother",

        "Sibling"

      );


    if (
      shared === 1
    ) {

      return `Half ${base}`;

    }


    return base;

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

      subject,

      descendantDepth

    );

  }


  /*
    Parent's sibling.
  */

  for (
    const parent
    of getParents(
      vantage.id
    )
  ) {

    if (
      areSiblings(
        parent.id,
        subject.id
      )
    ) {

      return genderedTerm(

        subject,

        "Aunt",

        "Uncle",

        "Aunt/Uncle"

      );

    }

  }


  /*
    Sibling's child.
  */

  for (
    const sibling
    of getSiblings(
      vantage.id
    )
  ) {

    if (
      subject.motherId === sibling.id ||
      subject.fatherId === sibling.id
    ) {

      return genderedTerm(

        subject,

        "Niece",

        "Nephew",

        "Niece/Nephew"

      );

    }

  }


  const ancestorSiblingRelation =
    findAncestorSiblingRelation(

      vantage.id,

      subject.id

    );


  if (
    ancestorSiblingRelation
  ) {

    return makeAncestorSiblingTerm(

      subject,

      ancestorSiblingRelation.depth

    );

  }


  const siblingDescendant =
    findSiblingDescendantRelation(

      vantage.id,

      subject.id

    );


  if (
    siblingDescendant
  ) {

    return makeSiblingDescendantTerm(

      subject,

      siblingDescendant.depth

    );

  }


  const vantageAncestors =
    getAncestorMap(
      vantage.id
    );


  const subjectAncestors =
    getAncestorMap(
      subject.id
    );


  const common =
    [];


  vantageAncestors.forEach(
    (vantageDepth, id) => {

      if (
        subjectAncestors.has(
          id
        )
      ) {

        common.push({

          vantageDepth,

          subjectDepth:
            subjectAncestors.get(
              id
            )

        });

      }

    }
  );


  if (
    !common.length
  ) {

    return "No known relation";

  }


  common.sort(
    (first, second) => {

      const firstMax =
        Math.max(

          first.vantageDepth,

          first.subjectDepth

        );


      const secondMax =
        Math.max(

          second.vantageDepth,

          second.subjectDepth

        );


      if (
        firstMax !== secondMax
      ) {

        return firstMax -
          secondMax;

      }


      return (

        first.vantageDepth +
        first.subjectDepth

      ) -
      (

        second.vantageDepth +
        second.subjectDepth

      );

    }
  );


  const nearest =
    common[0];


  if (
    nearest.vantageDepth === 2 &&
    nearest.subjectDepth === 1
  ) {

    return genderedTerm(

      subject,

      "Aunt",

      "Uncle",

      "Aunt/Uncle"

    );

  }


  if (
    nearest.vantageDepth === 1 &&
    nearest.subjectDepth === 2
  ) {

    return genderedTerm(

      subject,

      "Niece",

      "Nephew",

      "Niece/Nephew"

    );

  }


  if (
    nearest.vantageDepth >= 2 &&
    nearest.subjectDepth >= 2
  ) {

    const degree =
      Math.min(

        nearest.vantageDepth,

        nearest.subjectDepth

      ) -
      1;


    const removed =
      Math.abs(

        nearest.vantageDepth -

        nearest.subjectDepth

      );


    let text =
      `${ordinal(degree)} Cousin`;


    if (
      removed
    ) {

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



/* =========================================================
   EXTENDED SIBLING KINSHIP
========================================================= */

function findAncestorSiblingRelation(
  vantageId,
  subjectId
) {

  const queue =
    getParents(
      vantageId
    )
      .map(
        parent => ({

          person:
            parent,

          depth:
            1

        })
      );


  const visited =
    new Set();


  while (
    queue.length
  ) {

    const current =
      queue.shift();


    if (
      visited.has(
        current.person.id
      )
    ) {

      continue;

    }


    visited.add(
      current.person.id
    );


    if (
      areSiblings(

        current.person.id,

        subjectId

      )
    ) {

      return {

        depth:
          current.depth

      };

    }


    getParents(
      current.person.id
    )
      .forEach(
        parent => {

          queue.push({

            person:
              parent,

            depth:
              current.depth +
              1

          });

        }
      );

  }


  return null;

}



function makeAncestorSiblingTerm(
  subject,
  ancestorDepth
) {

  if (
    ancestorDepth <= 1
  ) {

    return genderedTerm(

      subject,

      "Aunt",

      "Uncle",

      "Aunt/Uncle"

    );

  }


  const greatCount =
    ancestorDepth -
    1;


  const greatText =
    greatCount === 1
      ? "Great"
      : `${greatCount}× Great`;


  return genderedTerm(

    subject,

    `${greatText} Aunt`,

    `${greatText} Uncle`,

    `${greatText} Aunt/Uncle`

  );

}



function findSiblingDescendantRelation(
  vantageId,
  subjectId
) {

  const siblings =
    getSiblings(
      vantageId
    );


  for (
    const sibling
    of siblings
  ) {

    const depth =
      getDescendantDepthFrom(

        sibling.id,

        subjectId

      );


    if (
      depth !== null
    ) {

      return {

        depth

      };

    }

  }


  return null;

}



function getDescendantDepthFrom(
  ancestorId,
  descendantId
) {

  const queue =
    [
      {

        id:
          ancestorId,

        depth:
          0

      }
    ];


  const visited =
    new Set();


  while (
    queue.length
  ) {

    const current =
      queue.shift();


    if (
      visited.has(
        current.id
      )
    ) {

      continue;

    }


    visited.add(
      current.id
    );


    const children =
      getChildren(
        current.id
      );


    for (
      const child
      of children
    ) {

      const depth =
        current.depth +
        1;


      if (
        child.id ===
        descendantId
      ) {

        return depth;

      }


      queue.push({

        id:
          child.id,

        depth

      });

    }

  }


  return null;

}



function makeSiblingDescendantTerm(
  subject,
  depth
) {

  if (
    depth <= 1
  ) {

    return genderedTerm(

      subject,

      "Niece",

      "Nephew",

      "Niece/Nephew"

    );

  }


  const greatCount =
    depth -
    1;


  const greatText =
    greatCount === 1
      ? "Great"
      : `${greatCount}× Great`;


  return genderedTerm(

    subject,

    `${greatText} Niece`,

    `${greatText} Nephew`,

    `${greatText} Niece/Nephew`

  );

}



/* =========================================================
   ANCESTOR HELPERS
========================================================= */

function getAncestorMap(id) {

  const result =
    new Map();


  const queue =
    [
      {

        id,

        depth:
          0

      }
    ];


  const visited =
    new Map();


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
            current.depth +
            1;


          if (
            visited.has(
              parentId
            ) &&
            visited.get(
              parentId
            ) <= depth
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

  if (
    depth === 1
  ) {

    return genderedTerm(

      person,

      "Mother",

      "Father",

      "Parent"

    );

  }


  if (
    depth === 2
  ) {

    return genderedTerm(

      person,

      "Grandmother",

      "Grandfather",

      "Grandparent"

    );

  }


  const greatCount =
    depth -
    2;


  const greatText =
    greatCount === 1
      ? "Great"
      : `${greatCount}× Great`;


  return genderedTerm(

    person,

    `${greatText} Grandmother`,

    `${greatText} Grandfather`,

    `${greatText} Grandparent`

  );

}



function makeDescendantTerm(
  person,
  depth
) {

  if (
    depth === 1
  ) {

    return genderedTerm(

      person,

      "Daughter",

      "Son",

      "Child"

    );

  }


  if (
    depth === 2
  ) {

    return genderedTerm(

      person,

      "Granddaughter",

      "Grandson",

      "Grandchild"

    );

  }


  const greatCount =
    depth -
    2;


  const greatText =
    greatCount === 1
      ? "Great"
      : `${greatCount}× Great`;


  return genderedTerm(

    person,

    `${greatText} Granddaughter`,

    `${greatText} Grandson`,

    `${greatText} Grandchild`

  );

}



/* =========================================================
   CLOSE PROFILE / EDIT
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



/* =========================================================
   DELETE CHARACTER
========================================================= */

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


            person.siblingIds =
              person.siblingIds
                .filter(
                  value =>
                    value !== id
                );


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


        if (
          vantageCharacterId === id
        ) {

          vantageCharacterId =
            null;


          saveVantage();

        }


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
   BACKUP
========================================================= */

exportWorldButton.addEventListener(
  "click",
  function() {

    const backup = {

      app:
        "Fantasy Family Tree",

      version:
        9,

      exportedAt:
        new Date()
          .toISOString(),

      vantageCharacterId,

      geneticModel,

      treeSettings,

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
          .slice(0, 10)
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

      const parsed =
        JSON.parse(
          await file.text()
        );


      const importedCharacters =
        Array.isArray(parsed)
          ? parsed
          : parsed.characters;


      if (
        !Array.isArray(
          importedCharacters
        )
      ) {

        throw new Error();

      }


      openConfirmation(

        "Restore this world?",

        "Your current browser world will be replaced by the backup.",

        function() {

          raceLibrary =
            !Array.isArray(parsed) &&
            Array.isArray(
              parsed.raceLibrary
            )
              ? parsed.raceLibrary
                  .map(
                    normalizeLibraryItem
                  )
              : [];


          speciesLibrary =
            !Array.isArray(parsed) &&
            Array.isArray(
              parsed.speciesLibrary
            )
              ? parsed.speciesLibrary
                  .map(
                    normalizeLibraryItem
                  )
              : [];


          characters =
            importedCharacters
              .map(
                normalizeCharacter
              );


          vantageCharacterId =
            !Array.isArray(parsed)
              ? normalizeId(
                  parsed.vantageCharacterId
                )
              : null;


          geneticModel =
            !Array.isArray(parsed)
              ? normalizeGeneticModel(
                  parsed.geneticModel
                )
              : {
                  ...DEFAULT_GENETIC_MODEL
                };


          treeSettings =
            !Array.isArray(parsed) &&
            parsed.treeSettings
              ? {

                  ...DEFAULT_TREE_SETTINGS,

                  ...parsed.treeSettings

                }
              : {
                  ...DEFAULT_TREE_SETTINGS
                };


          cleanBrokenRelationships();


          makeReciprocalRelationships();


          saveCharacters();


          saveLibraries();


          saveVantage();


          saveGeneticModel();


          saveTreeSettings();


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

    }
    catch {

      showToast(
        "That is not a valid world backup"
      );

    }

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
   BASIC HELPERS
========================================================= */

function getCharacter(id) {

  return characters.find(
    person =>
      person.id === id
  );

}



function getCharactersFromIds(ids) {

  return ids
    .map(
      id =>
        getCharacter(
          id
        )
    )
    .filter(Boolean);

}



function getSelectedSingleId(id) {

  const value =
    byId(
      id
    ).value;


  return value
    ? Number(value)
    : null;

}



function getSelectedMultipleIds(id) {

  return Array.from(
    byId(
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

  byId(
    id
  ).value =
    value ||
    "";

}



function getInputValue(id) {

  return byId(
    id
  )
    .value
    .trim();

}



function makeAliasArray(value) {

  return value
    .split(",")
    .map(
      item =>
        item.trim()
    )
    .filter(Boolean);

}



function getTreeName(character) {

  const name =
    `
      ${character.givenName || ""}
      ${character.familyName || ""}
    `
      .replace(
        /\s+/g,
        " "
      )
      .trim();


  return name ||
    "Unnamed";

}



function getProfileName(character) {

  const maiden =
    character.maidenName
      ? `(${character.maidenName})`
      : "";


  const name =
    `
      ${character.givenName || ""}
      ${maiden}
      ${character.familyName || ""}
    `
      .replace(
        /\s+/g,
        " "
      )
      .trim();


  return name ||
    "Unnamed";

}



function getInitial(character) {

  return (
    character.givenName ||
    character.familyName ||
    "?"
  )
    .charAt(0)
    .toUpperCase();

}



function compareCharacterNames(
  first,
  second
) {

  return getTreeName(
    first
  )
    .localeCompare(
      getTreeName(
        second
      )
    );

}



function makeYearText(character) {

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

  byId(
    id
  ).textContent =
    value ||
    "—";

}



function setColorSwatch(
  id,
  color
) {

  byId(
    id
  ).style.background =
    color ||
    "#242429";

}



function formatGender(gender) {

  switch (
    normalizeGender(
      gender
    )
  ) {

    case "female":
      return "Female";

    case "male":
      return "Male";

    case "nonbinary":
      return "Nonbinary";

    default:
      return "Unknown";

  }

}



function genderedTerm(
  person,
  femaleTerm,
  maleTerm,
  neutralTerm
) {

  const gender =
    normalizeGender(
      person?.gender
    );


  if (
    gender === "female"
  ) {

    return femaleTerm;

  }


  if (
    gender === "male"
  ) {

    return maleTerm;

  }


  return neutralTerm;

}



function sumPercent(entries) {

  return entries.reduce(
    (sum, item) =>
      sum +
      Number(
        item.percent
      ),
    0
  );

}



function approximately100(value) {

  return Math.abs(
    value -
    100
  ) <
  0.01;

}



function formatPercent(value) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {

    return "0";

  }


  if (
    Number.isInteger(number)
  ) {

    return String(
      number
    );

  }


  return number
    .toFixed(6)
    .replace(
      /0+$/,
      ""
    )
    .replace(
      /\.$/,
      ""
    );

}



function formatProbability(value) {

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


  return value
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



function isHexColor(value) {

  return /^#[0-9A-Fa-f]{6}$/
    .test(
      value ||
      ""
    );

}



function ordinal(number) {

  const hundred =
    number %
    100;


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
   CLEAN BROKEN LINKS
========================================================= */

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
        person.motherId !== null &&
        !valid.has(
          person.motherId
        )
      ) {

        person.motherId =
          null;

      }


      if (
        person.fatherId !== null &&
        !valid.has(
          person.fatherId
        )
      ) {

        person.fatherId =
          null;

      }


      person.siblingIds =
        person.siblingIds
          .filter(
            id =>
              id !== person.id &&
              valid.has(id)
          );


      person.spouseIds =
        person.spouseIds
          .filter(
            id =>
              id !== person.id &&
              valid.has(id)
          );


      person.loverIds =
        person.loverIds
          .filter(
            id =>
              id !== person.id &&
              valid.has(id)
          );

    }
  );


  if (
    vantageCharacterId !== null &&
    !valid.has(
      vantageCharacterId
    )
  ) {

    vantageCharacterId =
      null;


    saveVantage();

  }

}



/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

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



/* =========================================================
   FOCUS SEARCH RESULT
========================================================= */

function focusCharacter(id) {

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
      rect.width /
      2 -
      position.x *
      zoom;


    viewY =
      rect.height /
      2 -
      position.y *
      zoom;


    applyViewTransform();

  }


  setTimeout(
    () =>
      openProfile(
        id
      ),
    180
  );

}



/* =========================================================
   STARTUP
========================================================= */

setupCharacterColorEditors();


cleanBrokenRelationships();


makeReciprocalRelationships();


saveCharacters();


saveLibraries();


saveGeneticModel();


saveTreeSettings();


populateTreeSettingsControls();


renderTree();


applyViewTransform();


setTimeout(
  centerTree,
  100
);
