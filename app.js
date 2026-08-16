const STORAGE_KEY =
  "fantasyFamilyTreeCharacters";

const VANTAGE_KEY =
  "fantasyFamilyTreeVantage";


/* TREE */

const NODE_GAP_X = 235;
const GENERATION_GAP_Y = 235;
const WORLD_SIZE = 6000;

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;


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


/* PORTRAIT TEMP */

let pendingPortraitData = null;


/* CONFIRMATION */

let confirmAction = null;


/* MAIN */

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

const characterCount =
  document.getElementById("characterCount");

const worldVantageName =
  document.getElementById("worldVantageName");

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

const setVantageButton =
  document.getElementById("setVantageButton");

const profilePortrait =
  document.getElementById("profilePortrait");

const profilePortraitInitial =
  document.getElementById("profilePortraitInitial");

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

const editPortraitFile =
  document.getElementById("editPortraitFile");

const editPortraitPreview =
  document.getElementById("editPortraitPreview");

const editPortraitInitial =
  document.getElementById("editPortraitInitial");

const removePortraitButton =
  document.getElementById("removePortraitButton");


/* CONFIRM */

const confirmBackdrop =
  document.getElementById("confirmBackdrop");

const confirmPanel =
  document.getElementById("confirmPanel");

const confirmTitle =
  document.getElementById("confirmTitle");

const confirmMessage =
  document.getElementById("confirmMessage");

const confirmCancelButton =
  document.getElementById("confirmCancelButton");

const confirmAcceptButton =
  document.getElementById("confirmAcceptButton");


/* TOAST */

const toast =
  document.getElementById("toast");

let toastTimer = null;


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

    console.error(error);

    return [];

  }

}


function saveCharacters() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(characters)
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Browser storage is full. Try removing large portraits."
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
      Array.isArray(character.aliases)
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
      ),

    portraitData:
      character.portraitData || ""

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
   TOAST
========================================================= */

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
      2300
    );

}


/* =========================================================
   CUSTOM CONFIRMATION
========================================================= */

function openConfirmation(
  title,
  message,
  action,
  buttonText = "Confirm"
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
   WORLD
========================================================= */

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


function updateWorldStats() {

  characterCount.textContent =
    String(characters.length);


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
          String(
            character.id
          );


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

    const value =
      vantageSelect.value;


    vantageCharacterId =
      value
        ? Number(value)
        : null;


    saveVantage();


    updateVantageStatus();

    updateWorldStats();

    renderTree();


    if (
      selectedCharacterId &&
      !profilePanel.classList.contains(
        "hidden"
      )
    ) {

      openProfile(
        selectedCharacterId
      );

    }


    showToast(
      vantageCharacterId
        ? "Vantage point changed"
        : "Vantage point cleared"
    );

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
    `Perspective: ${getTreeName(person)}`;

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
      2,

    exportedAt:
      new Date().toISOString(),

    vantageCharacterId,

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
          "Invalid backup"
        );

      }


      openConfirmation(
        "Restore this world?",
        "Your current browser world will be replaced with the contents of this backup.",
        function() {

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

    } catch (error) {

      console.error(error);


      showToast(
        "That file is not a valid world backup"
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
    function() {

      searchInput.focus();

    },
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
              character.race,
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
          "search-result";


        const portrait =
          person.portraitData
            ? `<img src="${person.portraitData}" alt="">`
            : escapeHTML(
                getInitial(person)
              );


        const relation =
          vantageCharacterId
            ? describeRelationship(
                vantageCharacterId,
                person.id
              )
            : "";


        const metaParts =
          [
            makeYearText(person)
          ];


        if (
          relation &&
          relation !==
          "Vantage Point"
        ) {

          metaParts.push(
            relation
          );

        }


        button.innerHTML = `

          <span class="search-result-circle">
            ${portrait}
          </span>

          <span>

            <span class="search-result-name">
              ${escapeHTML(
                getTreeName(person)
              )}
            </span>

            <span class="search-result-meta">
              ${escapeHTML(
                metaParts.join(" · ")
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
    treeCanvas
      .getBoundingClientRect();


  zoom =
    Math.max(
      0.9,
      Math.min(
        1.15,
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
    230
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

      loverIds: [],

      portraitData: ""

    };


    characters.push(
      character
    );


    saveCharacters();


    renderTree();


    closeCharacterForm();


    showToast(
      `${getTreeName(character)} added`
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


  const accent =
    getFamilyAccent(
      character.familyName
    );


  node.style.setProperty(
    "--family-accent",
    accent.border
  );


  node.style.setProperty(
    "--family-glow",
    accent.glow
  );


  const circleContent =
    character.portraitData
      ? `
        <img
          class="character-portrait"
          src="${character.portraitData}"
          alt=""
        >
      `
      : escapeHTML(
          getInitial(character)
        );


  node.innerHTML = `

    <div class="character-circle">
      ${circleContent}
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
   FAMILY COLORS
========================================================= */

function getFamilyAccent(
  familyName
) {

  const text =
    familyName || "Unknown";


  let hash =
    0;


  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    hash =
      (
        hash * 31 +
        text.charCodeAt(i)
      )
      >>> 0;

  }


  const hue =
    28 +
    (
      hash %
      70
    );


  return {

    border:
      `hsla(${hue}, 32%, 67%, 0.72)`,

    glow:
      `hsla(${hue}, 45%, 55%, 0.12)`

  };

}


/* =========================================================
   LINES
========================================================= */

function drawRelationshipLines(
  positions
) {

  drawSpouseLines(
    positions
  );


  drawLoverLines(
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
            makePairKey(
              character.id,
              spouseId
            );


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
            first.y + 42,

            second.x,
            second.y + 42,

            "tree-line partner-line"
          );

        }
      );

    }
  );

}


function drawLoverLines(
  positions
) {

  const drawn =
    new Set();


  characters.forEach(
    character => {

      character.loverIds.forEach(
        loverId => {

          const key =
            makePairKey(
              character.id,
              loverId
            );


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
              loverId
            );


          if (
            !first ||
            !second
          ) {
            return;
          }


          addSvgLine(
            first.x,
            first.y + 49,

            second.x,
            second.y + 49,

            "tree-line lover-line"
          );

        }
      );

    }
  );

}


function makePairKey(
  firstId,
  secondId
) {

  return [
    firstId,
    secondId
  ]
    .sort(
      (a,b) =>
        a - b
    )
    .join("-");

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
          parent.y + 42
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
    ) - 46;


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


  renderProfilePortrait(
    character
  );


  renderRelationshipProfile(
    character
  );


  renderVantageRelation(
    character
  );


  const accent =
    getFamilyAccent(
      character.familyName
    );


  profilePanel.style.setProperty(
    "--profile-border",
    accent.border
  );


  profilePanel.style.setProperty(
    "--profile-accent",
    accent.glow
  );


  setVantageButton.textContent =
    character.id ===
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


    image.alt =
      "";


    profilePortrait.appendChild(
      image
    );


    return;

  }


  const span =
    document.createElement(
      "span"
    );


  span.textContent =
    getInitial(
      character
    );


  profilePortrait.appendChild(
    span
  );

}


/* SET VANTAGE FROM PROFILE */

setVantageButton.addEventListener(
  "click",

  function() {

    if (
      !selectedCharacterId
    ) {
      return;
    }


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


/* =========================================================
   VANTAGE RELATION
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


function describeRelationship(
  vantageId,
  subjectId
) {

  if (
    vantageId ===
    subjectId
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


  const blood =
    describeBloodRelationship(
      vantage,
      subject
    );


  const additional =
    [];


  if (
    vantage.spouseIds.includes(
      subject.id
    )
  ) {

    additional.push(
      "Spouse"
    );

  }


  if (
    vantage.loverIds.includes(
      subject.id
    )
  ) {

    additional.push(
      "Lover"
    );

  }


  if (
    additional.length &&
    blood
  ) {

    return `${additional.join(" · ")} · ${blood}`;

  }


  if (
    additional.length
  ) {

    return additional.join(
      " · "
    );

  }


  return blood ||
    "No known relation";

}


function describeBloodRelationship(
  vantage,
  subject
) {

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


  if (
    b === 1 &&
    a >= 2
  ) {

    return makeAuntUncleTerm(
      subject,
      a - 2
    );

  }


  if (
    a === 1 &&
    b >= 2
  ) {

    return makeNieceNephewTerm(
      subject,
      b - 2
    );

  }


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


    let result =
      `${ordinal(degree)} Cousin`;


    if (
      removed > 0
    ) {

      result +=
        ` ${removed} ${removed === 1 ? "Time" : "Times"} Removed`;

    }


    return result;

  }


  return null;

}


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


  let base =
    "Aunt/Uncle";


  if (
    role === "mother"
  ) {
    base = "Aunt";
  }


  if (
    role === "father"
  ) {
    base = "Uncle";
  }


  return greatCount === 0
    ? base
    : `${ordinal(greatCount)} Great ${base}`;

}


function makeNieceNephewTerm(
  person,
  greatCount
) {

  const role =
    inferParentRole(
      person.id
    );


  let base =
    "Niece/Nephew";


  if (
    role === "mother"
  ) {
    base = "Niece";
  }


  if (
    role === "father"
  ) {
    base = "Nephew";
  }


  return greatCount === 0
    ? base
    : `${ordinal(greatCount)} Great ${base}`;

}


function inferParentRole(
  personId
) {

  let mother =
    false;


  let father =
    false;


  characters.forEach(
    character => {

      if (
        character.motherId ===
        personId
      ) {

        mother = true;

      }


      if (
        character.fatherId ===
        personId
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

  const remainder =
    number % 100;


  if (
    remainder >= 11 &&
    remainder <= 13
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
   FAMILY PROFILE
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


/* CLOSE PROFILE */

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


    openConfirmation(
      `Delete ${getTreeName(character)}?`,
      "The character will be removed from the archive. Their children will remain, but any links to this person will be cleared.",
      function() {

        deleteCharacter(
          character.id
        );

      },
      "Delete"
    );

  }
);


function deleteCharacter(
  characterId
) {

  const deleted =
    getCharacter(
      characterId
    );


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


  showToast(
    deleted
      ? `${getTreeName(deleted)} deleted`
      : "Character deleted"
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


  pendingPortraitData =
    character.portraitData || "";


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


  renderEditPortrait(
    character
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


/* PORTRAITS */

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


      const character =
        getCharacter(
          selectedCharacterId
        );


      if (character) {

        renderEditPortrait(
          {
            ...character,
            portraitData:
              pendingPortraitData
          }
        );

      }


      showToast(
        "Portrait ready"
      );

    } catch (error) {

      console.error(error);


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


    const character =
      getCharacter(
        selectedCharacterId
      );


    if (character) {

      renderEditPortrait(
        {
          ...character,
          portraitData: ""
        }
      );

    }

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


    image.alt =
      "";


    editPortraitPreview.appendChild(
      image
    );


    return;

  }


  const span =
    document.createElement(
      "span"
    );


  span.textContent =
    getInitial(
      character
    );


  editPortraitPreview.appendChild(
    span
  );

}


async function compressPortrait(
  file
) {

  const dataUrl =
    await readFileAsDataURL(
      file
    );


  const image =
    await loadImage(
      dataUrl
    );


  const size =
    320;


  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    size;


  canvas.height =
    size;


  const context =
    canvas.getContext(
      "2d"
    );


  const sourceSize =
    Math.min(
      image.width,
      image.height
    );


  const sourceX =
    (
      image.width -
      sourceSize
    ) / 2;


  const sourceY =
    (
      image.height -
      sourceSize
    ) / 2;


  context.drawImage(
    image,

    sourceX,
    sourceY,
    sourceSize,
    sourceSize,

    0,
    0,
    size,
    size
  );


  return canvas.toDataURL(
    "image/jpeg",
    0.78
  );

}


function readFileAsDataURL(
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
        function() {

          resolve(
            reader.result
          );

        };


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
        function() {

          resolve(
            image
          );

        };


      image.onerror =
        reject;


      image.src =
        source;

    }
  );

}


/* RELATIONSHIP SELECTORS */

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
  currentId,
  selectedId
) {

  const select =
    document.getElementById(
      selectId
    );


  select.innerHTML =
    `<option value="">— None —</option>`;


  [...characters]
    .sort(
      compareCharacterNames
    )
    .forEach(
      character => {

        if (
          character.id ===
          currentId
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
          character.id ===
          selectedId;


        select.appendChild(
          option
        );

      }
    );

}


function populateMultiSelect(
  selectId,
  currentId,
  selectedIds
) {

  const select =
    document.getElementById(
      selectId
    );


  select.innerHTML =
    "";


  [...characters]
    .sort(
      compareCharacterNames
    )
    .forEach(
      character => {

        if (
          character.id ===
          currentId
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


  pendingPortraitData =
    null;


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


    character.portraitData =
      pendingPortraitData || "";


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


    pendingPortraitData =
      null;


    openProfile(
      character.id
    );


    showToast(
      "Character saved"
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
        input.value
          .toUpperCase();

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
    vantageCharacterId ===
    null
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


function getInitial(
  character
) {

  return character.givenName
    .charAt(0)
    .toUpperCase() || "?";

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

applyViewTransform();


setTimeout(
  centerTree,
  120
);
