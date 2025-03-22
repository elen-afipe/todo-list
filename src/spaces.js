const Spaces = [];
function Space(spaceName, spaceIcon, spaceTasks){
    this.name = spaceName; // string
    this.icon = spaceIcon; // emoji or svg or number 
    this.tasks = spaceTasks; // array with tasks id
    this.id = generateSpaceId(); // id
}

function createSpaceObject(spaceName, spaceIcon){
    const newSpace = new Space(spaceName, spaceIcon);
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

export {createSpaceObject}