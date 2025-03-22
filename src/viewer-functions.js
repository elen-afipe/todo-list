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
export {getObjectId}