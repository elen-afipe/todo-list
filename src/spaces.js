import {getObjectId} from "./viewer-functions.js"

const Spaces = [];
function Space(spaceTitle, spaceIcon, isSelectLabel, isCustom){
    this.title = spaceTitle; // string
    this.icon = spaceIcon; // emoji 
    this.isSelectLabel = isSelectLabel ? true : false;
    this.isCustom = isCustom ? true : false;
    // this.tasks = []; // array with tasks id
    this.id = generateSpaceId(); // id
}
function getSpacesObj(){
    return Spaces;
}

function createSpaceObject(spaceTitle, spaceIcon, isSelectLabel, isCustom){
    const newSpace = new Space(spaceTitle, spaceIcon, isSelectLabel, isCustom);
    addSpaceToSpaces(newSpace)
    return newSpace;
}

function addSpaceToSpaces(space){
    Spaces.push(space);
}

let currentSpaceId = 0;
function generateSpaceId(){
    currentSpaceId+=1;
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

export {createSpaceObject, addSpaceToSpaces, deleteSpaceObj, getSpacesObj, getSpaceByIndex, getSpaceIndex, editSpaceObj}