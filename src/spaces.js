import {getObjectId, getFromLocalStorage, saveToLocalStorage} from "./viewer-functions.js"

const Spaces = [];
function Space(spaceTitle, spaceIcon, isSelectLabel, isCustom, id = false){
    console.log(id)
    this.title = spaceTitle; // string
    this.icon = spaceIcon; // emoji 
    this.isSelectLabel = isSelectLabel ? true : false;
    this.isCustom = isCustom ? true : false;
    // this.tasks = []; // array with tasks id
    this.id = id ? id : generateSpaceId(); // id
}
function getSpacesObj(){
    return Spaces;
}

function createSpaceObject(spaceTitle, spaceIcon, isSelectLabel, isCustom, id){
    const newSpace = new Space(spaceTitle, spaceIcon, isSelectLabel, isCustom, id);
    addSpaceToSpaces(newSpace)
    return newSpace;
}

function addSpaceToSpaces(space){
    Spaces.push(space);
}

let currentSpaceId = 0;
function initializeSpaceId() {
    // const savedId = getFromLocalStorage("current-space", false); // old
    const savedId = getFromLocalStorage("space-id", false);
    const spaces = getSpacesObj();
    let highestId = 0;
    
    if (spaces) {
      Object.values(spaces).forEach(space => {
        if (space.id > highestId) {
          highestId = Number(space.id);
        }
      });
    }
    currentSpaceId = Math.max(
      savedId ? Number(savedId) : 0,
      highestId
    );
  }

function getCurrentSpaceId(){
    return currentSpaceId;
}

function generateSpaceId(){
    currentSpaceId+=1;
    // saveToLocalStorage("current-space", currentSpaceId, false) // old
    saveToLocalStorage("space-id", currentSpaceId, false)
    return currentSpaceId;
}


function getSpaceIndex(e){
    const spaceId = getObjectId(e);
    const spaces = getSpacesObj();
    const index = spaces.findIndex(space => 
        Number(space.id) === Number(spaceId)
      );
      if (index === -1){
        return "no match"
      }
      return index;
}

function getSpaceByIndex(index){
    const spaces = getSpacesObj();
    return spaces[index];
}

function getSpaceById(id){
  const spaces = getSpacesObj();
    return spaces.find(space => 
        Number(space.id) === Number(id)
      );
}

function deleteSpaceObj(e){
    const spaceIndex = getSpaceIndex(e)
    const spaces = getSpacesObj();
    if (spaceIndex !== "no match"){
    spaces.splice(spaceIndex, 1);
    }
}

function editSpaceObj(e, newTitle, newIcon){
    const spaceIndex = getSpaceIndex(e);
    const thisSpace = getSpaceByIndex(spaceIndex);
    thisSpace.title = newTitle;
    thisSpace.icon = newIcon;
}

export {createSpaceObject, addSpaceToSpaces, deleteSpaceObj, getSpacesObj, getSpaceByIndex, getSpaceIndex, editSpaceObj, getCurrentSpaceId, initializeSpaceId, getSpaceById}