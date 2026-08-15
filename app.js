const STORAGE_KEY =
  "fantasyFamilyTreeCharacters";


/* -------------------------
   TREE SETTINGS
------------------------- */

const NODE_GAP_X = 230;
const GENERATION_GAP_Y = 230;
const WORLD_SIZE = 4000;

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.15;


/* -------------------------
   CANVAS STATE
------------------------- */

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


/* -------------------------
   MAIN ELEMENTS
------------------------- */

const treeCanvas =
  document.getElementById("treeCanvas");

const treeViewport =
  document.getElementById("treeViewport");

const treeWorld =
  document.getElementById("treeWorld");

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


/* -------------------------
   CREATE
------------------------- */

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


/* -------------------------
   PROFILE
------------------------- */

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


/* -------------------------
   EDITOR
------------------------- */

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


/* -------------------------
   DATA
------------------------- */

let characters =
  loadCharacters();

let selectedCharacterId =
  null;


/* -------------------------
   STORAGE
------------------------- */

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


function normalizeCharacter(character) {

  return {

    id:
      character.id,

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
      character.motherId || null,

    fatherId:
      character.fatherId || null,

    spouseIds:
      Array.isArray(character.spouseIds)
        ? character.spouseIds
        : [],

    loverIds:
      Array.isArray(character.loverIds)
        ? character.loverIds
        : []

  };

}


/* =========================================================
   PAN + ZOOM
========================================================= */

function applyViewTransform() {

  treeViewport.style.transform =
    `translate(${viewX}px, ${viewY}px) scale(${zoom})`;


  zoomIndicator.textContent =
    `${Math.round(zoom * 100)}%`;

}


/* -------------------------
   CENTER TREE
------------------------- */

function centerTree() {

  const layout =
    calculateTreeLayout();


  const canvasRect =
    treeCanvas.getBoundingClientRect();


  zoom =
    Math.min(
      1,
      Math.max(
        MIN_ZOOM,
        Math.min(
          canvasRect.width /
            Math.max(layout.contentWidth, 600),

          canvasRect.height /
            Math.max(layout.contentHeight, 500)
        ) * 0.82
      )
    );


  viewX =
    canvasRect.width / 2
    -
    layout.centerX * zoom;


  viewY =
    Math.max(
      40,
      canvasRect.height * 0.12
      -
      layout.topY * zoom
    );


  applyViewTransform();

}


/* -------------------------
   ZOOM AROUND SCREEN POINT
------------------------- */

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


/* -------------------------
   BUTTON ZOOM
------------------------- */

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


/* -------------------------
   POINTER PAN
------------------------- */

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
      event.pointerType === "touch"
    ) {
      return;
    }


    isPanning = true;

    panStartX =
      event.clientX;

    panStartY =
      event.clientY;

    startViewX =
      viewX;

    startViewY =
      viewY;


    treeCanvas.setPointerCapture(
      event.pointerId
    );

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
      (
        event.clientX -
        panStartX
      );


    viewY =
      startViewY +
      (
        event.clientY -
        panStartY
      );


    applyViewTransform();

  }
);


treeCanvas.addEventListener(
  "pointerup",
  function() {

    isPanning = false;

  }
);


treeCanvas.addEventListener(
  "pointercancel",
  function() {

    isPanning = false;

  }
);


/* -------------------------
   TOUCH PAN + PINCH
------------------------- */

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
      event.touches.length === 1
      &&
      isPanning
    ) {

      const touch =
        event.touches[0];


      viewX =
        startViewX +
        (
          touch.clientX -
          panStartX
        );


      viewY =
        startViewY +
        (
          touch.clientY -
          panStartY
        );


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


      const scaleChange =
        distance /
        pinchStartDistance;


      const newZoom =
        Math.max(
          MIN_ZOOM,
          Math.min(
            MAX_ZOOM,
            pinchStartZoom *
            scaleChange
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
        true;

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
   CHARACTER CREATION
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
   TREE LAYOUT
========================================================= */

function renderTree() {

  characterLayer.innerHTML =
    "";

  treeLines.innerHTML =
    "";


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


  const layout =
    calculateTreeLayout();


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
        (a,b) => a - b
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


  /*
    Keep spouses visually
    on the same generation.
  */

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
              !memo.has(spouseId)
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


  /*
    Re-enforce child below parents.
  */

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
                level !== undefined
            );


        if (
          parentLevels.length === 0
        ) {
          return;
        }


        const minimumChildLevel =
          Math.max(
            ...parentLevels
          ) + 1;


        if (
          (
            memo.get(
              character.id
            ) || 0
          )
          <
          minimumChildLevel
        ) {

          memo.set(
            character.id,
            minimumChildLevel
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


function clusterSpouses(row) {

  const rowIds =
    new Set(
      row.map(
        character =>
          character.id
      )
    );


  const visited =
    new Set();


  const groups =
    [];


  row.forEach(
    character => {

      if (
        visited.has(
          character.id
        )
      ) {
        return;
      }


      const group =
        [];

      const queue =
        [character];


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
   CONNECTION LINES
========================================================= */

function drawRelationshipLines(
  positions
) {

  drawSpouseLines(
    positions
  );


  const familyGroups =
    buildParentChildGroups();


  familyGroups.forEach(
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
                (a,b) => a - b
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
            (a,b) => a - b
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
    parents.length === 0
    ||
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


  profileBackdrop.classList.remove(
    "hidden"
  );

  profilePanel.classList.remove(
    "hidden"
  );

}


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
    mother ? [mother] : []
  );


  renderRelationshipButtons(
    "profileFather",
    father ? [father] : []
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

      character.motherId === parentId
      ||
      character.fatherId === parentId
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
        character.motherId
        &&
        other.motherId ===
          character.motherId;


      const sameFather =
        character.fatherId
        &&
        other.fatherId ===
          character.fatherId;


      return Boolean(
        sameMother ||
        sameFather
      );

    }
  );

}


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
      getInputValue("editTitle");


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


/* -------------------------
   SELECT HELPERS
------------------------- */

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


/* -------------------------
   COLORS
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


/* -------------------------
   ROTATION / RESIZE
------------------------- */

window.addEventListener(
  "resize",

  function() {

    renderTree();

  }
);


/* -------------------------
   START
------------------------- */

renderTree();

setTimeout(
  centerTree,
  100
);
