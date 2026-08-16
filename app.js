const STORAGE_KEY =
  "fantasyFamilyTreeCharacters";

const VANTAGE_KEY =
  "fantasyFamilyTreeVantage";


/* TREE SETTINGS */

const NODE_GAP_X = 230;
const GENERATION_GAP_Y = 230;
const WORLD_SIZE = 4000;

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;


/* CANVAS */

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


/* MAIN ELEMENTS */

const treeCanvas =
  document.getElementById("treeCanvas");

const treeViewport =
  document.getElementById("treeViewport");

const treeLines =
  document.getElementById("treeLines");

const characterLayer =
  document.getElementById("characterLayer");

const emptyState =
  document.getElementById("emptyState");

const addCharacterButton =
  document.getElementById("addCharacterButton");

const addFirstCharacterButton =
  document.getElementById("addFirstCharacterButton");

const zoomInButton =
  document.getElementById("zoomInButton");

const zoomOutButton =
  document.getElementById("zoomOutButton");

const resetViewButton =
  document.getElementById("resetViewButton");

const zoomIndicator =
  document.getElementById("zoomIndicator");


/* SEARCH */

const searchButton =
  document.getElementById("searchButton");

const searchBackdrop =
  document.getElementById("searchBackdrop");

const searchPanel =
  document.getElementById("searchPanel");

const closeSearchButton =
  document.getElementById("closeSearchButton");

const searchInput =
  document.getElementById("searchInput");

const searchResults =
  document.getElementById("searchResults");


/* WORLD */

const worldButton =
  document.getElementById("worldButton");

const worldBackdrop =
  document.getElementById("worldBackdrop");

const worldPanel =
  document.getElementById("worldPanel");

const closeWorldButton =
  document.getElementById("closeWorldButton");

const vantageSelect =
  document.getElementById("vantageSelect");

const vantageStatus =
  document.getElementById("vantageStatus");

const exportWorldButton =
  document.getElementById("exportWorldButton");

const importWorldButton =
  document.getElementById("importWorldButton");

const importWorldFile =
  document.getElementById("importWorldFile");


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

const deleteCharacterButton =
  document.getElementById("deleteCharacterButton");

const vantageRelation =
  document.getElementById("vantageRelation");

const vantageRelationLabel =
  document.getElementById("vantageRelationLabel");

const vantageRelationText =
  document.getElementById("vantageRelationText");


/* EDIT */

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


/* DATA */

let characters =
  loadCharacters();

let selectedCharacterId =
  null;

let vantageCharacterId =
  loadVantage();


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

  } catch (error) {

    console.error(
      "Could not load characters:",
      error
    );

    return [];

  }

}


function saveCharacters() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(characters)
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


  const id =
    Number(saved);


  return Number.isFinite(id)
    ? id
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


function normalizeCharacter(
  character
) {

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

    eyeColor:
      character.eyeColor || "",

    hairColor:
      character.hairColor || "",

    skinColor:
      character.skinColor || "",

    physicalFeature:
      character.physicalFeature || "",

    life:
      character.life || "",

    achievements:
      character.achievements || "",

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
      )

  };

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
   WORLD PANEL
========================================================= */

function openWorldPanel() {

  populateVantageSelect();


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


/* -------------------------
   VANTAGE SELECTION
------------------------- */

function populateVantageSelect() {

  vantageSelect.innerHTML =
    "";


  const noneOption =
    document.createElement(
      "option"
    );


  noneOption.value =
    "";


  noneOption.textContent =
    "— No Vantage Point —";


  vantageSelect.appendChild(
    noneOption
  );


  const sorted =
    [...characters]
      .sort(
        (a,b) =>
          getTreeName(a)
            .localeCompare(
              getTreeName(b)
            )
      );


  sorted.forEach(
    character => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        String(
          character.id
        );


      option.textContent =
        getTreeName(
          character
        );


      if (
        character.id ===
        vantageCharacterId
      ) {

        option.selected =
          true;

      }


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

    const value =
      vantageSelect.value;


    vantageCharacterId =
      value
        ? Number(value)
        : null;


    saveVantage();

    updateVantageStatus();


    if (
      selectedCharacterId &&
      !profilePanel.classList.contains(
        "hidden"
      )
    ) {

      renderVantageRelation(
        getCharacter(
          selectedCharacterId
        )
      );

    }

  }
);


function updateVantageStatus() {

  const person =
    getCharacter(
      vantageCharacterId
    );


  if (!person) {

    vantageStatus.textContent =
      "No vantage point selected.";

    return;

  }


  vantageStatus.textContent =
    `Current center: ${getTreeName(person)}`;

}


/* =========================================================
   BACKUP EXPORT
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
      1,

    exportedAt:
      new Date().toISOString(),

    vantageCharacterId:
      vantageCharacterId,

    characters:
      characters

  };


  const json =
    JSON.stringify(
      backup,
      null,
      2
    );


  const blob =
    new Blob(
      [json],
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


  const date =
    new Date()
      .toISOString()
      .slice(0,10);


  link.href =
    url;


  link.download =
    `fantasy-world-${date}.json`;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  setTimeout(
    function() {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );

}


/* =========================================================
   BACKUP IMPORT
========================================================= */

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

      const text =
        await file.text();


      const data =
        JSON.parse(text);


      const importedCharacters =
        Array.isArray(data)
          ? data
          : data.characters;


      if (
        !Array.isArray(
          importedCharacters
        )
      ) {

        throw new Error(
          "No character list found."
        );

      }


      const confirmed =
        confirm(
          "Import this world?\n\nYour current browser world will be replaced by the backup."
        );


      if (!confirmed) {
        return;
      }


      characters =
        importedCharacters
          .map(
            normalizeCharacter
          )
          .filter(
            character =>
              Number.isFinite(
                character.id
              )
          );


      const importedVantage =
        Array.isArray(data)
          ? null
          : normalizeId(
              data.vantageCharacterId
            );


      vantageCharacterId =
        characters.some(
          character =>
            character.id ===
            importedVantage
        )
          ? importedVantage
          : null;


      cleanBrokenRelationships();


      saveCharacters();

      saveVantage();


      selectedCharacterId =
        null;


      renderTree();

      populateVantageSelect();

      closeWorldPanel();


      setTimeout(
        centerTree,
        80
      );


      alert(
        `World restored. ${characters.length} characters imported.`
      );

    } catch (error) {

      console.error(error);


      alert(
        "That file could not be imported as a valid world backup."
      );

    }

  }
);


/* =========================================================
   SEARCH
========================================================= */

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


  setTimeout(
    () =>
      searchInput.focus(),
    100
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


searchInput.addEventListener(
  "input",

  function() {

    const query =
      searchInput.value
        .trim()
        .toLowerCase();


    if (!query) {

      renderSearchResults(
        characters
      );

      return;

    }


    const matches =
      characters.filter(
        character => {

          const searchable =
            [
              character.title,
              character.givenName,
              character.familyName,
              character.maidenName,
              ...character.aliases
            ]
              .join(" ")
              .toLowerCase();


          return searchable.includes(
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
    people.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );


    empty.className =
      "search-empty";


    empty.textContent =
      "No characters found.";


    searchResults.appendChild(
      empty
    );


    return;

  }


  [...people]
    .sort(
      (a,b) =>
        getTreeName(a)
          .localeCompare(
            getTreeName(b)
          )
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
          "search-result";


        const initial =
          person.givenName
            .charAt(0)
            .toUpperCase();


        button.innerHTML = `

          <span class="search-result-circle">
            ${escapeHTML(initial)}
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
   CANVAS
========================================================= */

function applyViewTransform() {

  treeViewport.style.transform =
    `translate(${viewX}px, ${viewY}px) scale(${zoom})`;


  zoomIndicator.textContent =
    `${Math.round(zoom * 100)}%`;

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


function focusCharacter(
  characterId
) {

  const position =
    lastLayout
      ? lastLayout.positions.get(
          characterId
        )
      : null;


  if (!position) {

    openProfile(
      characterId
    );

    return;

  }


  const rect =
    treeCanvas.getBoundingClientRect();


  zoom =
    Math.max(
      0.85,
      Math.min(
        1.25,
        zoom
      )
    );


  viewX =
    rect.width / 2 -
    position.x * zoom;


  viewY =
    rect.height / 2 -
    position.y * zoom;


  applyViewTransform();


  setTimeout(
    function() {

      openProfile(
        characterId
      );

    },
    180
  );

}


function zoomAtPoint(
  newZoom,
  screenX,
  screenY
) {

  newZoom =
    Math.max(
      MIN_ZOOM,
      Math.min(
        MAX_ZOOM,
        newZoom
      )
    );


  const worldX =
    (screenX - viewX) /
    zoom;


  const worldY =
    (screenY - viewY) /
    zoom;


  zoom =
    newZoom;


  viewX =
    screenX -
    worldX * zoom;


  viewY =
    screenY -
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


/* POINTER PAN */

treeCanvas.addEventListener(
  "pointerdown",

  function(event) {

    if (
      event.target.closest(
        ".character-node"
      )
    ) {
      return;
    }


    if (
      event.pointerType ===
      "touch"
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

  }
);


treeCanvas.addEventListener(
  "pointermove",

  function(event) {

    if (!isPanning) {
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


treeCanvas.addEventListener(
  "pointercancel",

  function() {

    isPanning =
      false;

  }
);


/* TOUCH */

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
        getTouchDistance(
          first,
          second
        );


      pinchStartZoom =
        zoom;


      const midpoint =
        getTouchMidpoint(
          first,
          second
        );


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
        getTouchDistance(
          first,
          second
        );


      const newZoom =
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


      const midpoint =
        getTouchMidpoint(
          first,
          second
        );


      zoom =
        newZoom;


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

  function(event) {

    if (
      event.touches.length === 0
    ) {

      isPanning =
        false;

    }

  }
);


function getTouchDistance(
  first,
  second
) {

  return Math.hypot(
    second.clientX -
    first.clientX,

    second.clientY -
    first.clientY
  );

}


function getTouchMidpoint(
  first,
  second
) {

  return {

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

}


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
        ),

      race: "",

      eyeColor: "",

      hairColor: "",

      skinColor: "",

      physicalFeature: "",

      life: "",

      achievements: "",

      motherId: null,

      fatherId: null,

      spouseIds: [],

      loverIds: []

    };


    characters.push(
      character
    );


    saveCharacters();

    renderTree();

    closeCharacterForm();

  }
);


/* =========================================================
   TREE
========================================================= */

function renderTree() {

  characterLayer.innerHTML =
    "";

  treeLines.innerHTML =
    "";


  cleanInvalidVantage();


  if (
    characters.length === 0
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


  const sortedGenerations =
    Array.from(
      rows.keys()
    )
      .sort(
        (a,b) =>
          a - b
      );


  const positions =
    new Map();


  const worldCenter =
    WORLD_SIZE / 2;


  let minX =
    worldCenter;

  let maxX =
    worldCenter;

  let minY =
    worldCenter;

  let maxY =
    worldCenter;


  sortedGenerations.forEach(
    generation => {

      let row =
        rows.get(
          generation
        );


      row =
        clusterSpouses(
          row
        );


      const rowWidth =
        (
          row.length - 1
        ) *
        NODE_GAP_X;


      const startX =
        worldCenter -
        rowWidth / 2;


      const y =
        worldCenter -
        500 +
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
        300,
        600
      ),

    contentHeight:
      Math.max(
        maxY -
        minY +
        350,
        500
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


  for (
    let pass = 0;
    pass < 5;
    pass++
  ) {

    characters.forEach(
      character => {

        character.spouseIds.forEach(
          spouseId => {

            if (
              !memo.has(
                spouseId
              )
            ) {
              return;
            }


            const shared =
              Math.max(
                memo.get(
                  character.id
                ) || 0,

                memo.get(
                  spouseId
                ) || 0
              );


            memo.set(
              character.id,
              shared
            );


            memo.set(
              spouseId,
              shared
            );

          }
        );

      }
    );

  }


  for (
    let pass = 0;
    pass < characters.length;
    pass++
  ) {

    characters.forEach(
      character => {

        const parentIds =
          [
            character.motherId,
            character.fatherId
          ]
            .filter(Boolean);


        if (
          parentIds.length === 0
        ) {
          return;
        }


        const parentLevels =
          parentIds
            .map(
              id =>
                memo.get(id)
            )
            .filter(
              level =>
                level !==
                undefined
            );


        if (
          parentLevels.length === 0
        ) {
          return;
        }


        const minimum =
          Math.max(
            ...parentLevels
          ) + 1;


        if (
          (
            memo.get(
              character.id
            ) || 0
          ) <
          minimum
        ) {

          memo.set(
            character.id,
            minimum
          );

        }

      }
    );

  }


  return memo;

}


function calculateGeneration(
  characterId,
  memo,
  visiting
) {

  if (
    memo.has(
      characterId
    )
  ) {

    return memo.get(
      characterId
    );

  }


  if (
    visiting.has(
      characterId
    )
  ) {

    return 0;

  }


  const character =
    getCharacter(
      characterId
    );


  if (!character) {
    return 0;
  }


  visiting.add(
    characterId
  );


  const parentIds =
    [
      character.motherId,
      character.fatherId
    ]
      .filter(Boolean);


  if (
    parentIds.length === 0
  ) {

    memo.set(
      characterId,
      0
    );


    visiting.delete(
      characterId
    );


    return 0;

  }


  const parentGenerations =
    parentIds.map(
      parentId =>
        calculateGeneration(
          parentId,
          memo,
          visiting
        )
    );


  const generation =
    Math.max(
      ...parentGenerations
    ) + 1;


  memo.set(
    characterId,
    generation
  );


  visiting.delete(
    characterId
  );


  return generation;

}


function clusterSpouses(
  row
) {

  const rowIds =
    new Set(
      row.map(
        person =>
          person.id
      )
    );


  const visited =
    new Set();


  const groups =
    [];


  row.forEach(
    person => {

      if (
        visited.has(
          person.id
        )
      ) {
        return;
      }


      const group =
        [];


      const queue =
        [person];


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


        group.push(
          current
        );


        current.spouseIds.forEach(
          spouseId => {

            if (
              !rowIds.has(
                spouseId
              )
            ) {
              return;
            }


            const spouse =
              getCharacter(
                spouseId
              );


            if (
              spouse &&
              !visited.has(
                spouse.id
              )
            ) {

              queue.push(
                spouse
              );

            }

          }
        );

      }


      groups.push(
        group
      );

    }
  );


  return groups.flat();

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


  node.type =
    "button";


  node.style.left =
    `${position.x}px`;


  node.style.top =
    `${position.y}px`;


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

    function(event) {

      event.stopPropagation();


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
   TREE LINES
========================================================= */

function drawRelationshipLines(
  positions
) {

  drawSpouseLines(
    positions
  );


  buildParentChildGroups()
    .forEach(
      group => {

        drawParentChildGroup(
          group,
          positions
        );

      }
    );

}


function drawSpouseLines(
  positions
) {

  const drawn =
    new Set();


  characters.forEach(
    character => {

      character.spouseIds.forEach(
        spouseId => {

          const key =
            [
              character.id,
              spouseId
            ]
              .sort(
                (a,b) =>
                  a - b
              )
              .join("-");


          if (
            drawn.has(key)
          ) {
            return;
          }


          drawn.add(key);


          const first =
            positions.get(
              character.id
            );


          const second =
            positions.get(
              spouseId
            );


          if (
            !first ||
            !second
          ) {
            return;
          }


          addSvgLine(
            first.x,
            first.y + 41,

            second.x,
            second.y + 41,

            "tree-line partner-line"
          );

        }
      );

    }
  );

}


function buildParentChildGroups() {

  const groups =
    new Map();


  characters.forEach(
    child => {

      const parentIds =
        [
          child.motherId,
          child.fatherId
        ]
          .filter(Boolean)
          .sort(
            (a,b) =>
              a - b
          );


      if (
        parentIds.length === 0
      ) {
        return;
      }


      const key =
        parentIds.join("-");


      if (
        !groups.has(key)
      ) {

        groups.set(
          key,
          {
            parentIds,
            children: []
          }
        );

      }


      groups
        .get(key)
        .children
        .push(child);

    }
  );


  return Array.from(
    groups.values()
  );

}


function drawParentChildGroup(
  group,
  positions
) {

  const parents =
    group.parentIds
      .map(
        id =>
          positions.get(id)
      )
      .filter(Boolean);


  const children =
    group.children
      .map(
        child =>
          positions.get(
            child.id
          )
      )
      .filter(Boolean);


  if (
    parents.length === 0 ||
    children.length === 0
  ) {
    return;
  }


  const parentY =
    Math.max(
      ...parents.map(
        parent =>
          parent.y + 41
      )
    );


  const sourceX =
    parents.reduce(
      (sum,parent) =>
        sum + parent.x,
      0
    )
    /
    parents.length;


  if (
    parents.length === 2
  ) {

    addSvgLine(
      parents[0].x,
      parentY,

      parents[1].x,
      parentY,

      "tree-line"
    );

  }


  const branchY =
    Math.min(
      ...children.map(
        child =>
          child.y
      )
    ) - 45;


  addSvgLine(
    sourceX,
    parentY,

    sourceX,
    branchY,

    "tree-line"
  );


  const childXs =
    children.map(
      child =>
        child.x
    );


  if (
    children.length > 1
  ) {

    addSvgLine(
      Math.min(
        ...childXs
      ),

      branchY,

      Math.max(
        ...childXs
      ),

      branchY,

      "tree-line"
    );

  }


  children.forEach(
    child => {

      addSvgLine(
        child.x,
        branchY,

        child.x,
        child.y,

        "tree-line"
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
  characterId
) {

  const character =
    getCharacter(
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


  renderRelationshipProfile(
    character
  );


  renderVantageRelation(
    character
  );


  profileBackdrop.classList.remove(
    "hidden"
  );


  profilePanel.classList.remove(
    "hidden"
  );

}


/* =========================================================
   VANTAGE RELATIONSHIP
========================================================= */

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


/*
  IMPORTANT:

  This describes SUBJECT
  in relation to VANTAGE.

  Example:

  vantage = Alice
  subject = Alice's grandmother

  result = Grandmother
*/

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


  const bloodRelation =
    describeBloodRelationship(
      vantage,
      subject
    );


  const extras =
    [];


  if (
    vantage.spouseIds.includes(
      subject.id
    )
  ) {

    extras.push(
      "Spouse"
    );

  }


  if (
    vantage.loverIds.includes(
      subject.id
    )
  ) {

    extras.push(
      "Lover"
    );

  }


  if (
    bloodRelation &&
    extras.length
  ) {

    return `${extras.join(" · ")} · ${bloodRelation}`;

  }


  if (
    extras.length
  ) {

    return extras.join(
      " · "
    );

  }


  return bloodRelation ||
    "No known relation";

}


/* -------------------------
   BLOOD RELATIONSHIP
------------------------- */

function describeBloodRelationship(
  vantage,
  subject
) {

  /*
    Is subject an ancestor
    of vantage?
  */

  const subjectAncestorDepth =
    getAncestorDepth(
      vantage.id,
      subject.id
    );


  if (
    subjectAncestorDepth !== null
  ) {

    return makeAncestorTerm(
      subject,
      subjectAncestorDepth
    );

  }


  /*
    Is subject a descendant
    of vantage?
  */

  const subjectDescendantDepth =
    getAncestorDepth(
      subject.id,
      vantage.id
    );


  if (
    subjectDescendantDepth !== null
  ) {

    return makeDescendantTerm(
      subjectDescendantDepth
    );

  }


  /*
    Full / half siblings.
  */

  const sharedParents =
    [
      vantage.motherId,
      vantage.fatherId
    ]
      .filter(Boolean)
      .filter(
        parentId =>
          parentId ===
          subject.motherId ||
          parentId ===
          subject.fatherId
      );


  if (
    sharedParents.length >= 2
  ) {

    return "Sibling";

  }


  if (
    sharedParents.length === 1
  ) {

    return "Half-Sibling";

  }


  /*
    Find nearest common ancestor.
  */

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
    (vantageDepth, ancestorId) => {

      if (
        !subjectAncestors.has(
          ancestorId
        )
      ) {
        return;
      }


      common.push({

        ancestorId,

        vantageDepth,

        subjectDepth:
          subjectAncestors.get(
            ancestorId
          )

      });

    }
  );


  if (
    common.length === 0
  ) {

    return null;

  }


  common.sort(
    (a,b) => {

      const aMax =
        Math.max(
          a.vantageDepth,
          a.subjectDepth
        );


      const bMax =
        Math.max(
          b.vantageDepth,
          b.subjectDepth
        );


      if (
        aMax !== bMax
      ) {

        return aMax - bMax;

      }


      return (
        a.vantageDepth +
        a.subjectDepth
      )
      -
      (
        b.vantageDepth +
        b.subjectDepth
      );

    }
  );


  const nearest =
    common[0];


  const a =
    nearest.vantageDepth;


  const b =
    nearest.subjectDepth;


  /*
    Subject is aunt/uncle.
  */

  if (
    b === 1 &&
    a >= 2
  ) {

    return makeAuntUncleTerm(
      subject,
      a - 2
    );

  }


  /*
    Subject is niece/nephew.
  */

  if (
    a === 1 &&
    b >= 2
  ) {

    return makeNieceNephewTerm(
      subject,
      b - 2
    );

  }


  /*
    Cousins.
  */

  if (
    a >= 2 &&
    b >= 2
  ) {

    const degree =
      Math.min(
        a,
        b
      ) - 1;


    const removed =
      Math.abs(
        a - b
      );


    let text =
      `${ordinal(degree)} Cousin`;


    if (
      removed > 0
    ) {

      text +=
        ` ${removed} ${removed === 1 ? "Time" : "Times"} Removed`;

    }


    return text;

  }


  return null;

}


/* -------------------------
   ANCESTOR MAP
------------------------- */

function getAncestorMap(
  personId
) {

  const result =
    new Map();


  const queue =
    [
      {
        id:
          personId,

        depth:
          0
      }
    ];


  const visited =
    new Set(
      [personId]
    );


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


    const parents =
      [
        person.motherId,
        person.fatherId
      ]
        .filter(Boolean);


    parents.forEach(
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

        }


        if (
          !visited.has(
            parentId
          )
        ) {

          visited.add(
            parentId
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


  if (
    !map.has(
      ancestorId
    )
  ) {

    return null;

  }


  return map.get(
    ancestorId
  );

}


/* -------------------------
   FAMILY TERM HELPERS
------------------------- */

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

    if (
      role === "mother"
    ) {
      return "Mother";
    }


    if (
      role === "father"
    ) {
      return "Father";
    }


    return "Parent";

  }


  if (
    depth === 2
  ) {

    if (
      role === "mother"
    ) {
      return "Grandmother";
    }


    if (
      role === "father"
    ) {
      return "Grandfather";
    }


    return "Grandparent";

  }


  const greats =
    depth - 2;


  if (
    role === "mother"
  ) {

    return `${ordinal(greats)} Great Grandmother`;

  }


  if (
    role === "father"
  ) {

    return `${ordinal(greats)} Great Grandfather`;

  }


  return `${ordinal(greats)} Great Grandparent`;

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


  return `${ordinal(depth - 2)} Great Grandchild`;

}


function makeAuntUncleTerm(
  person,
  greatCount
) {

  const role =
    inferParentRole(
      person.id
    );


  let base;


  if (
    role === "mother"
  ) {
    base = "Aunt";
  }
  else if (
    role === "father"
  ) {
    base = "Uncle";
  }
  else {
    base = "Aunt/Uncle";
  }


  if (
    greatCount === 0
  ) {
    return base;
  }


  return `${ordinal(greatCount)} Great ${base}`;

}


function makeNieceNephewTerm(
  person,
  greatCount
) {

  const role =
    inferParentRole(
      person.id
    );


  let base;


  if (
    role === "mother"
  ) {
    base = "Niece";
  }
  else if (
    role === "father"
  ) {
    base = "Nephew";
  }
  else {
    base = "Niece/Nephew";
  }


  if (
    greatCount === 0
  ) {
    return base;
  }


  return `${ordinal(greatCount)} Great ${base}`;

}


/*
  Since we do not have a separate
  gender field, this infers a role
  from whether the person is used
  as Mother or Father anywhere.
*/

function inferParentRole(
  personId
) {

  let usedAsMother =
    false;


  let usedAsFather =
    false;


  characters.forEach(
    character => {

      if (
        character.motherId ===
        personId
      ) {

        usedAsMother =
          true;

      }


      if (
        character.fatherId ===
        personId
      ) {

        usedAsFather =
          true;

      }

    }
  );


  if (
    usedAsMother &&
    !usedAsFather
  ) {

    return "mother";

  }


  if (
    usedAsFather &&
    !usedAsMother
  ) {

    return "father";

  }


  return "unknown";

}


function ordinal(
  number
) {

  const remainder100 =
    number % 100;


  if (
    remainder100 >= 11 &&
    remainder100 <= 13
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
   PROFILE FAMILY
========================================================= */

function renderRelationshipProfile(
  character
) {

  const mother =
    getCharacter(
      character.motherId
    );


  const father =
    getCharacter(
      character.fatherId
    );


  renderRelationshipButtons(
    "profileMother",
    mother
      ? [mother]
      : []
  );


  renderRelationshipButtons(
    "profileFather",
    father
      ? [father]
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


  if (
    people.length === 0
  ) {

    const empty =
      document.createElement(
        "span"
      );


    empty.className =
      "relationship-empty";


    empty.textContent =
      "—";


    container.appendChild(
      empty
    );


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
  characterId
) {

  const character =
    getCharacter(
      characterId
    );


  if (!character) {
    return [];
  }


  return characters.filter(
    other => {

      if (
        other.id ===
        character.id
      ) {
        return false;
      }


      const sameMother =
        character.motherId &&
        other.motherId ===
        character.motherId;


      const sameFather =
        character.fatherId &&
        other.fatherId ===
        character.fatherId;


      return Boolean(
        sameMother ||
        sameFather
      );

    }
  );

}


/* PROFILE CLOSE */

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


/* =========================================================
   DELETE
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


    const confirmed =
      confirm(
        `Delete ${getTreeName(character)}?\n\nThis cannot be undone.`
      );


    if (!confirmed) {
      return;
    }


    deleteCharacter(
      character.id
    );

  }
);


function deleteCharacter(
  characterId
) {

  characters =
    characters.filter(
      character =>
        character.id !==
        characterId
    );


  characters.forEach(
    character => {

      if (
        character.motherId ===
        characterId
      ) {

        character.motherId =
          null;

      }


      if (
        character.fatherId ===
        characterId
      ) {

        character.fatherId =
          null;

      }


      character.spouseIds =
        character.spouseIds
          .filter(
            id =>
              id !==
              characterId
          );


      character.loverIds =
        character.loverIds
          .filter(
            id =>
              id !==
              characterId
          );

    }
  );


  if (
    vantageCharacterId ===
    characterId
  ) {

    vantageCharacterId =
      null;

    saveVantage();

  }


  saveCharacters();


  profileBackdrop.classList.add(
    "hidden"
  );

  profilePanel.classList.add(
    "hidden"
  );


  selectedCharacterId =
    null;


  renderTree();


  setTimeout(
    centerTree,
    50
  );

}


/* =========================================================
   EDITOR
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


  populateRelationshipSelectors(
    character
  );


  profilePanel.classList.add(
    "hidden"
  );

  profileBackdrop.classList.add(
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
  selectId,
  currentCharacterId,
  selectedId
) {

  const select =
    document.getElementById(
      selectId
    );


  select.innerHTML =
    `<option value="">— None —</option>`;


  characters.forEach(
    character => {

      if (
        character.id ===
        currentCharacterId
      ) {
        return;
      }


      const option =
        document.createElement(
          "option"
        );


      option.value =
        String(
          character.id
        );


      option.textContent =
        getTreeName(
          character
        );


      if (
        character.id ===
        selectedId
      ) {

        option.selected =
          true;

      }


      select.appendChild(
        option
      );

    }
  );

}


function populateMultiSelect(
  selectId,
  currentCharacterId,
  selectedIds
) {

  const select =
    document.getElementById(
      selectId
    );


  select.innerHTML =
    "";


  characters.forEach(
    character => {

      if (
        character.id ===
        currentCharacterId
      ) {
        return;
      }


      const option =
        document.createElement(
          "option"
        );


      option.value =
        String(
          character.id
        );


      option.textContent =
        getTreeName(
          character
        );


      option.selected =
        selectedIds.includes(
          character.id
        );


      select.appendChild(
        option
      );

    }
  );

}


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

editBackdrop.addEventListener(
  "click",
  cancelEditor
);


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


    const oldSpouseIds =
      [...character.spouseIds];


    const oldLoverIds =
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


    character.race =
      getInputValue(
        "editRace"
      );


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


    syncTwoWayRelationship(
      character.id,
      oldSpouseIds,
      character.spouseIds,
      "spouseIds"
    );


    syncTwoWayRelationship(
      character.id,
      oldLoverIds,
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

  }
);


function syncTwoWayRelationship(
  characterId,
  oldIds,
  newIds,
  fieldName
) {

  oldIds.forEach(
    otherId => {

      if (
        newIds.includes(
          otherId
        )
      ) {
        return;
      }


      const other =
        getCharacter(
          otherId
        );


      if (!other) {
        return;
      }


      other[fieldName] =
        other[fieldName]
          .filter(
            id =>
              id !==
              characterId
          );

    }
  );


  newIds.forEach(
    otherId => {

      const other =
        getCharacter(
          otherId
        );


      if (!other) {
        return;
      }


      if (
        !other[fieldName]
          .includes(
            characterId
          )
      ) {

        other[fieldName]
          .push(
            characterId
          );

      }

    }
  );

}


/* =========================================================
   COLORS
========================================================= */

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
    document.getElementById(
      inputId
    );


  const label =
    document.getElementById(
      labelId
    );


  input.addEventListener(
    "input",

    function() {

      label.textContent =
        input.value.toUpperCase();

    }
  );

}


/* =========================================================
   CLEANUP
========================================================= */

function cleanBrokenRelationships() {

  const validIds =
    new Set(
      characters.map(
        character =>
          character.id
      )
    );


  characters.forEach(
    character => {

      if (
        !validIds.has(
          character.motherId
        )
      ) {

        character.motherId =
          null;

      }


      if (
        !validIds.has(
          character.fatherId
        )
      ) {

        character.fatherId =
          null;

      }


      character.spouseIds =
        character.spouseIds
          .filter(
            id =>
              validIds.has(id)
          );


      character.loverIds =
        character.loverIds
          .filter(
            id =>
              validIds.has(id)
          );

    }
  );

}


function cleanInvalidVantage() {

  if (
    vantageCharacterId === null
  ) {
    return;
  }


  if (
    !getCharacter(
      vantageCharacterId
    )
  ) {

    vantageCharacterId =
      null;

    saveVantage();

  }

}


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
      id =>
        getCharacter(id)
    )
    .filter(Boolean);

}


function getSelectedSingleId(
  selectId
) {

  const value =
    document.getElementById(
      selectId
    ).value;


  return value
    ? Number(value)
    : null;

}


function getSelectedMultipleIds(
  selectId
) {

  return Array.from(
    document.getElementById(
      selectId
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
      alias =>
        alias.trim()
    )
    .filter(
      alias =>
        alias !== ""
    );

}


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

  document.getElementById(
    elementId
  ).style.background =
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


function isHexColor(
  value
) {

  return /^#[0-9A-Fa-f]{6}$/.test(
    value
  );

}


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


/* RESIZE */

window.addEventListener(
  "resize",

  function() {

    renderTree();

  }
);


/* START */

cleanBrokenRelationships();

cleanInvalidVantage();

renderTree();


setTimeout(
  centerTree,
  100
);
