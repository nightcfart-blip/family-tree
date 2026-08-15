const STORAGE_KEY =
  "fantasyFamilyTreeCharacters";


/* -------------------------
   TREE SETTINGS
------------------------- */

const NODE_WIDTH = 180;

const NODE_CIRCLE_SIZE = 82;

const NODE_GAP_X = 230;

const GENERATION_GAP_Y = 230;

const TREE_PADDING_X = 180;

const TREE_PADDING_TOP = 100;


/* -------------------------
   MAIN ELEMENTS
------------------------- */

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

const treeWorld =
  document.getElementById(
    "treeWorld"
  );

const treeLines =
  document.getElementById(
    "treeLines"
  );

const characterLayer =
  document.getElementById(
    "characterLayer"
  );


/* -------------------------
   CREATE
------------------------- */

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


/* -------------------------
   PROFILE
------------------------- */

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


/* -------------------------
   EDITOR
------------------------- */

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

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(characters)
    );

  } catch (error) {

    console.error(
      "Could not save characters:",
      error
    );

  }

}


/* -------------------------
   OLD CHARACTER COMPATIBILITY
------------------------- */

function normalizeCharacter(
  character
) {

  return {

    id:
      character.id,

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
      character.motherId || null,

    fatherId:
      character.fatherId || null,

    spouseIds:
      Array.isArray(
        character.spouseIds
      )
        ? character.spouseIds
        : [],

    loverIds:
      Array.isArray(
        character.loverIds
      )
        ? character.loverIds
        : []

  };

}


/* -------------------------
   CREATE CHARACTER
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
   FAMILY TREE LAYOUT
========================================================= */


/* -------------------------
   RENDER ENTIRE TREE
------------------------- */

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

    treeWorld.style.width =
      "100%";

    treeWorld.style.height =
      "100%";

    return;

  }


  emptyState.classList.add(
    "hidden"
  );


  const layout =
    calculateTreeLayout();


  treeWorld.style.width =
    `${layout.width}px`;

  treeWorld.style.height =
    `${layout.height}px`;


  treeLines.setAttribute(
    "viewBox",
    `0 0 ${layout.width} ${layout.height}`
  );


  treeLines.setAttribute(
    "width",
    layout.width
  );

  treeLines.setAttribute(
    "height",
    layout.height
  );


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


/* -------------------------
   GENERATION CALCULATION
------------------------- */

function calculateGeneration(
  characterId,
  memo = new Map(),
  visiting = new Set()
) {

  if (
    memo.has(characterId)
  ) {

    return memo.get(
      characterId
    );

  }


  if (
    visiting.has(characterId)
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


/* -------------------------
   FULL LAYOUT
------------------------- */

function calculateTreeLayout() {

  const generationMemo =
    new Map();


  const generationMap =
    new Map();


  characters.forEach(
    character => {

      const generation =
        calculateGeneration(
          character.id,
          generationMemo
        );


      generationMap.set(
        character.id,
        generation
      );

    }
  );


  /*
    Keep spouses on the same
    visual generation whenever possible.
  */

  for (
    let pass = 0;
    pass < 4;
    pass++
  ) {

    characters.forEach(
      character => {

        character.spouseIds.forEach(
          spouseId => {

            if (
              !generationMap.has(
                spouseId
              )
            ) {
              return;
            }


            const currentGeneration =
              generationMap.get(
                character.id
              );


            const spouseGeneration =
              generationMap.get(
                spouseId
              );


            const sharedGeneration =
              Math.max(
                currentGeneration,
                spouseGeneration
              );


            generationMap.set(
              character.id,
              sharedGeneration
            );

            generationMap.set(
              spouseId,
              sharedGeneration
            );

          }
        );

      }
    );

  }


  /*
    A child must always be
    below their parents.
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


        const parentGenerations =
          parentIds
            .map(
              id =>
                generationMap.get(id)
            )
            .filter(
              value =>
                value !== undefined
            );


        if (
          parentGenerations.length === 0
        ) {
          return;
        }


        const requiredGeneration =
          Math.max(
            ...parentGenerations
          ) + 1;


        if (
          generationMap.get(
            character.id
          ) <
          requiredGeneration
        ) {

          generationMap.set(
            character.id,
            requiredGeneration
          );

        }

      }
    );

  }


  const rows =
    new Map();


  characters.forEach(
    character => {

      const generation =
        generationMap.get(
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


  const generations =
    Array.from(
      rows.keys()
    )
      .sort(
        (a,b) => a - b
      );


  /*
    Arrange each generation
    based on parent positions.
  */

  const orderIndex =
    new Map();


  generations.forEach(
    generation => {

      const row =
        rows.get(
          generation
        );


      if (
        generation ===
        generations[0]
      ) {

        row.sort(
          compareCharacterNames
        );

      } else {

        row.sort(
          (a,b) => {

            const aParentScore =
              getParentOrderScore(
                a,
                orderIndex
              );

            const bParentScore =
              getParentOrderScore(
                b,
                orderIndex
              );


            if (
              aParentScore !==
              bParentScore
            ) {

              return (
                aParentScore -
                bParentScore
              );

            }


            return compareCharacterNames(
              a,
              b
            );

          }
        );

      }


      const clusteredRow =
        clusterSpouses(
          row
        );


      rows.set(
        generation,
        clusteredRow
      );


      clusteredRow.forEach(
        (character,index) => {

          orderIndex.set(
            character.id,
            index
          );

        }
      );

    }
  );


  const longestRow =
    Math.max(
      ...Array.from(
        rows.values()
      )
        .map(
          row => row.length
        ),
      1
    );


  const contentWidth =
    (
      longestRow - 1
    ) *
    NODE_GAP_X;


  const width =
    Math.max(
      window.innerWidth,
      contentWidth +
      TREE_PADDING_X * 2
    );


  const maxGeneration =
    Math.max(
      ...generations,
      0
    );


  const height =
    Math.max(
      window.innerHeight - 86,
      TREE_PADDING_TOP +
      maxGeneration *
      GENERATION_GAP_Y +
      260
    );


  const positions =
    new Map();


  generations.forEach(
    generation => {

      const row =
        rows.get(
          generation
        );


      const rowWidth =
        (
          row.length - 1
        ) *
        NODE_GAP_X;


      const rowStartX =
        width / 2 -
        rowWidth / 2;


      row.forEach(
        (character,index) => {

          positions.set(
            character.id,
            {

              x:
                rowStartX +
                index *
                NODE_GAP_X,

              y:
                TREE_PADDING_TOP +
                generation *
                GENERATION_GAP_Y,

              generation

            }
          );

        }
      );

    }
  );


  return {
    positions,
    width,
    height
  };

}


/* -------------------------
   PARENT ORDERING
------------------------- */

function getParentOrderScore(
  character,
  orderIndex
) {

  const scores =
    [
      character.motherId,
      character.fatherId
    ]
      .filter(Boolean)
      .map(
        id =>
          orderIndex.get(id)
      )
      .filter(
        value =>
          value !== undefined
      );


  if (
    scores.length === 0
  ) {

    return 999999;

  }


  return (
    scores.reduce(
      (total,value) =>
        total + value,
      0
    )
    /
    scores.length
  );

}


/* -------------------------
   KEEP SPOUSES TOGETHER
------------------------- */

function clusterSpouses(
  row
) {

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


/* -------------------------
   RENDER NODE
------------------------- */

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
   TREE CONNECTION LINES
========================================================= */


/* -------------------------
   DRAW ALL LINES
------------------------- */

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


/* -------------------------
   SPOUSE LINES
------------------------- */

function drawSpouseLines(
  positions
) {

  const drawnPairs =
    new Set();


  characters.forEach(
    character => {

      character.spouseIds.forEach(
        spouseId => {

          const pairKey =
            [
              character.id,
              spouseId
            ]
              .sort(
                (a,b) => a - b
              )
              .join("-");


          if (
            drawnPairs.has(
              pairKey
            )
          ) {
            return;
          }


          drawnPairs.add(
            pairKey
          );


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


          const y =
            first.y +
            NODE_CIRCLE_SIZE / 2;


          addSvgLine(
            first.x,
            y,
            second.x,
            y,
            "tree-line partner-line"
          );

        }
      );

    }
  );

}


/* -------------------------
   GROUP CHILDREN BY PARENTS
------------------------- */

function buildParentChildGroups() {

  const groups =
    new Map();


  characters.forEach(
    child => {

      if (
        !child.motherId &&
        !child.fatherId
      ) {
        return;
      }


      const parentIds =
        [
          child.motherId,
          child.fatherId
        ]
          .filter(Boolean)
          .sort(
            (a,b) => a - b
          );


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


/* -------------------------
   DRAW A FAMILY BRANCH
------------------------- */

function drawParentChildGroup(
  group,
  positions
) {

  const parentPositions =
    group.parentIds
      .map(
        id =>
          positions.get(id)
      )
      .filter(Boolean);


  const childPositions =
    group.children
      .map(
        child =>
          positions.get(
            child.id
          )
      )
      .filter(Boolean);


  if (
    parentPositions.length === 0 ||
    childPositions.length === 0
  ) {
    return;
  }


  const parentCircleY =
    Math.max(
      ...parentPositions.map(
        position =>
          position.y +
          NODE_CIRCLE_SIZE / 2
      )
    );


  let sourceX;


  if (
    parentPositions.length === 2
  ) {

    const first =
      parentPositions[0];

    const second =
      parentPositions[1];


    sourceX =
      (
        first.x +
        second.x
      ) / 2;


    /*
      Parent-to-parent connection.
      It is drawn even if they are
      not marked as spouses.
    */

    addSvgLine(
      first.x,
      parentCircleY,
      second.x,
      parentCircleY,
      "tree-line"
    );

  } else {

    sourceX =
      parentPositions[0].x;

  }


  const childTopY =
    Math.min(
      ...childPositions.map(
        position =>
          position.y
      )
    );


  const branchY =
    childTopY - 45;


  addSvgLine(
    sourceX,
    parentCircleY,
    sourceX,
    branchY,
    "tree-line"
  );


  const childXs =
    childPositions.map(
      position =>
        position.x
    );


  const minimumX =
    Math.min(
      ...childXs
    );


  const maximumX =
    Math.max(
      ...childXs
    );


  if (
    childPositions.length > 1
  ) {

    addSvgLine(
      minimumX,
      branchY,
      maximumX,
      branchY,
      "tree-line"
    );

  }


  childPositions.forEach(
    position => {

      addSvgLine(
        position.x,
        branchY,
        position.x,
        position.y,
        "tree-line"
      );

    }
  );

}


/* -------------------------
   SVG LINE
------------------------- */

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


/* -------------------------
   CLICKABLE RELATIVES
------------------------- */

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


  const siblings =
    getSiblings(
      character.id
    );


  const spouses =
    getCharactersFromIds(
      character.spouseIds
    );


  const lovers =
    getCharactersFromIds(
      character.loverIds
    );


  const children =
    getChildren(
      character.id
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
    siblings
  );


  renderRelationshipButtons(
    "profileSpouses",
    spouses
  );


  renderRelationshipButtons(
    "profileLovers",
    lovers
  );


  renderRelationshipButtons(
    "profileChildren",
    children
  );

}


/* -------------------------
   CREATE RELATIVE BUTTONS
------------------------- */

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


/* -------------------------
   CHILDREN
------------------------- */

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


/* -------------------------
   SIBLINGS
------------------------- */

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


/* -------------------------
   RELATIONSHIP SELECTS
------------------------- */

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


/* -------------------------
   CANCEL EDIT
------------------------- */

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


/* -------------------------
   SAVE EDIT
------------------------- */

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


/* -------------------------
   TWO-WAY RELATIONSHIPS
------------------------- */

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
   REDRAW ON SCREEN ROTATION
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
