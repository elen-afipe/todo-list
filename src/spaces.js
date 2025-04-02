import {getObjectId} from "./viewer-functions.js"

const Spaces = [];
function Space(spaceName, spaceIcon, spaceTasks){
    this.name = spaceName; // string
    this.icon = spaceIcon; // emoji or svg or number 
    this.tasks = []; // array with tasks id
    this.id = generateSpaceId(); // id
}
function getSpacesObj(){
    return Spaces;
}

function createSpaceObject(spaceName, spaceIcon){
    const newSpace = new Space(spaceName, spaceIcon);
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

function deleteSpaceObj(e){
    const spaceIndex = getSpaceIndex(e)
    const spaces = getSpacesObj();
    if (spaceIndex !== "no match"){
    spaces.splice(spaceIndex, 1);
    }
}

export {createSpaceObject, addSpaceToSpaces, deleteSpaceObj}