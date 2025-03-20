const Spaces = [];
function Space(spaceName, spaceIcon, spaceTasks){
    this.name = spaceName;
    this.icon = spaceIcon;
    this.tasks = spaceTasks;
}

function createSpaceObject(spaceName, spaceIcon){
    const newSpace = new Space(spaceName, spaceIcon);
    return newSpace;
}

function addSpaceToSpaces(space){
    Spaces.push(space);
}
export {createSpaceObject}