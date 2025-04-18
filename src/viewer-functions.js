function getTargetParentWithDataId(e){
        let currentNode = e.target;
        while (currentNode && !currentNode.hasAttribute('data-id')) {
          currentNode = currentNode.parentNode;
        }
       return(currentNode)
    }

function getObjectId(e){
   const parentNode = getTargetParentWithDataId(e);
   const id = parentNode.getAttribute('data-id');
    return id;
}

let openedSpaceId = 1;
function getOpenedSpaceId(){
  return openedSpaceId;
}

function updateOpenedSpaceId(e, idOfNotOpenedSpace = false){
  let clickedSpaceId;
  if (idOfNotOpenedSpace !== false){
    clickedSpaceId = idOfNotOpenedSpace;
  } else {
    clickedSpaceId = getObjectId(e);
  }
  openedSpaceId = clickedSpaceId;
  saveToLocalStorage("current-space", openedSpaceId, false)
  return openedSpaceId;
}

let infoMode = "add";
function getInfoMode(){
  return infoMode;
}

function setInfoMode(mode){
 infoMode = mode;
}

let numberOfTasks = 0;
function getNumberOfTasks(){
  return numberOfTasks;
}

function setNumberOfTasks(number){
  numberOfTasks = Number(number);
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

function saveToLocalStorage(key, dataToStore, needsJSONConversion){
  if (needsJSONConversion){
    localStorage.setItem(`${key}`, JSON.stringify(dataToStore));
  } else{
    localStorage.setItem(`${key}`, dataToStore)
  }
}

function getFromLocalStorage(key, needsJSONConversion){
  if (needsJSONConversion){
    const data = JSON.parse(localStorage.getItem(`${key}`));
    return data;
  } else{
    const data = localStorage.getItem(`${key}`);
    return data;
  }
}

export {getObjectId, getOpenedSpaceId, updateOpenedSpaceId, getInfoMode, setInfoMode, getNumberOfTasks, setNumberOfTasks, storageAvailable, saveToLocalStorage, getFromLocalStorage}