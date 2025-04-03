import editIcon from "./icons/edit.svg";
import cancelIcon from "./icons/cancel.svg";
import infoIcon from "./icons/info.svg";
import deleteIcon from "./icons/delete.svg"
import {getObjectId} from "./viewer-functions.js"
import {getTasksObj, getTaskObjById, changeTaskDoneStatus, deleteTaskObj, getTaskPrioritySymbols} from "./tasks.js"
import { getSpacesObj, deleteSpaceObj } from "./spaces.js";
import {taskCardElements, taskSpaceSelect, tasksContainer} from "./dom-content.js"
const body = document.querySelector("body");

function DOMdisplayDefaultSpace(spaceObj, container){
    const spacesContainer = container;
    const newSpace = spaceObj;
    const spaceRow = document.createElement("div");
    spaceRow.classList.add("space-row");
    spaceRow.dataset.id = spaceObj.id;
    const spaceLogo = document.createElement("div");
    const spaceIcon = document.createElement("div");
    spaceIcon.classList.add("space-icon", "emoji");
    spaceIcon.textContent = newSpace.icon;
    const spaceTitle = document.createElement("div");
    spaceTitle.classList.add("space-name");
    spaceTitle.textContent= newSpace.title;
    spaceLogo.append(spaceIcon, spaceTitle)
    spaceRow.append(spaceLogo)
    spaceRow.onclick=DOMdisplayTasks;
    spacesContainer.append(spaceRow);
}

function DOMdisplayCustomSpace(spaceObj, container){
    const spacesContainer = container;
    const newSpace = spaceObj;
    const spaceRow = document.createElement("div");
    spaceRow.classList.add("space-row");

    const spaceLogo = document.createElement("div");
    const spaceIcon = document.createElement("div");
    spaceIcon.classList.add("space-icon", "emoji");
    spaceIcon.textContent = newSpace.icon;
    const spaceTitle = document.createElement("div");
    spaceTitle.classList.add("space-name");
    spaceTitle.textContent= newSpace.title;

    const spaceBtns = document.createElement("div");
    
    const editSpaceBtn = document.createElement("button");
    editSpaceBtn.classList.add("edit-space", "btn", "svg");
    editSpaceBtn.ariaLabel="Edit Space";
    editSpaceBtn.title = "Edit Space";
    const editSpaceIcon = document.createElement("img");
    editSpaceIcon.src= editIcon;
    editSpaceBtn.append(editSpaceIcon);
    // editSpaceBtn.addEventListener
    const deleteSpaceBtn = document.createElement("button");
    deleteSpaceBtn.classList.add("delete-space", "btn", "svg");
    deleteSpaceBtn.ariaLabel="Delete Space";
    deleteSpaceBtn.title = "Delete Space";
    deleteSpaceBtn.addEventListener("click", (e)=>{
        deleteSpace(e); 
        DOMdisplayTasks(e, 1);
    })
    const deleteSpaceIcon = document.createElement("img");
    deleteSpaceIcon.src= deleteIcon;
    deleteSpaceBtn.append(deleteSpaceIcon);

    spaceBtns.append(editSpaceBtn, deleteSpaceBtn)
    spaceLogo.append(spaceIcon, spaceTitle)
    spaceRow.append(spaceLogo, spaceBtns)
    spaceRow.dataset.id = spaceObj.id;
    spaceRow.onclick=DOMdisplayTasks;
    // spaceRow.addEventListener("click", 
    //     DOMdisplayTasks
    // //     ()=>{
    // //     tasksContainer.innerHTML="";
    // //    const tasks = getTasksObj();
    // // //    console.log(spaceRow.dataset.id)
    // //    tasks.forEach(task => {
    // //     if (Number(task.spaceId) === Number(spaceRow.dataset.id)){
    // //         DOMdisplayTaskRow(task, tasksContainer)
    // //         }
    // //     })
    // // }
    // )
    
    spacesContainer.append(spaceRow);
}
function DOMdisplayTaskInfo(e){
    e.stopPropagation();
   const taskId =  getObjectId(e);
   const thisTask = getTaskObjById(taskId);
   taskCardElements.spaceTitle.textContent = thisTask.spaceTitle;
   taskCardElements.taskTitle.textContent = thisTask.title;
   taskCardElements.taskPriority.textContent = getPriorityEmoji(thisTask);
   taskCardElements.taskDueDate.textContent = thisTask.dueDate;
   taskCardElements.taskDescription.textContent = thisTask.description;
   taskCardElements.taskCard.dataset.id = thisTask.id;
   taskCardElements.doneBtn.textContent = (thisTask.doneStatus === false) ? " " : "✓";
   taskCardElements.taskCard.showModal();
    }

function getPriorityEmoji(task){
    let priorityContent = "";
    const prioritySymbols = getTaskPrioritySymbols();
    if(task.priority === "low"){
        priorityContent = prioritySymbols.low;
    }
    else if(task.priority === "medium"){
        priorityContent = prioritySymbols.medium;
    }
    else if(task.priority === "high"){
        priorityContent = prioritySymbols.high;
    }
    return priorityContent;
}

function DOMdisplayTaskRow(taskObj, container){
    const tasksContainer = container;
    const newTask = taskObj;
    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");
    taskRow.onclick=DOMdisplayTaskInfo;

    const leftContainer = document.createElement("div");

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.onclick = handleTaskDoneClick;

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent= newTask.title;
    leftContainer.append(doneBtn, taskName);

    const rightContainer = document.createElement("div");

    const dueDate = document.createElement("div");
    dueDate.textContent = newTask.dueDate;
    dueDate.classList.add("task-date");

    const priority = document.createElement("div");
    priority.textContent = getPriorityEmoji(newTask);
    priority.classList.add("task-priority", "emoji");

    
    const taskBtns = document.createElement("div");
    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("edit-task", "svg","btn");
    editTaskBtn.ariaLabel="Edit Task";
    editTaskBtn.title = "Edit Task";
    const editTaskIcon = document.createElement("img");
    editTaskIcon.src= editIcon;
    editTaskBtn.append(editTaskIcon);

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task","svg","btn");
    deleteTaskBtn.ariaLabel="Delete Task";
    deleteTaskBtn.title = "Delete Task";
    deleteTaskBtn.onclick=deleteTask;
    const deleteTaskIcon = document.createElement("img");
    deleteTaskIcon.src= deleteIcon;
    deleteTaskBtn.append(deleteTaskIcon);

    const infoTaskBtn = document.createElement("button");
    infoTaskBtn.classList.add("info-task", "svg","btn");
    infoTaskBtn.ariaLabel="Show Task Details";
    infoTaskBtn.title = "Show Task Details";
    infoTaskBtn.onclick=DOMdisplayTaskInfo;
    const infoTaskIcon = document.createElement("img");
    infoTaskIcon.src= infoIcon;
    infoTaskBtn.append(infoTaskIcon);

    taskBtns.append(infoTaskBtn, editTaskBtn, deleteTaskBtn)
    rightContainer.append(dueDate, priority, taskBtns)
    taskRow.append(leftContainer, rightContainer)
    taskRow.dataset.id = taskObj.id;
    tasksContainer.append(taskRow);
}

function findRowTickContainer(tickContainer, taskId){
    // console.log(tickContainer.closest('.task-row') !== null)
    const isInTaskRow = tickContainer.closest('.task-row') !== null;
    if(isInTaskRow){
        // extraTickContainer = document.querySelector(`.task-card[data-id="${taskId}"] .done-btn`);
        return false;
    }else{
       const rowTickContainer = document.querySelector(`.task-row[data-id="${taskId}"] .done-btn`);
        return rowTickContainer;
    }

}
//add text crossed
function handleTaskDoneClick(e){
    e.stopPropagation();
    const clickedTickContainer = e.target;
    const taskId = getObjectId(e);
    const thisTask = getTaskObjById(taskId);
    const isThisTaskDone = thisTask.doneStatus;
    const rowTickContainer = findRowTickContainer(clickedTickContainer, taskId);
    const taskTitleDOM = document.querySelector(`.task-row[data-id="${taskId}"] .task-name`);
    if (isThisTaskDone){
        clickedTickContainer.textContent = " ";
        if(rowTickContainer){rowTickContainer.textContent = " "}
        taskTitleDOM.style.textDecoration = 'none';
        changeTaskDoneStatus(thisTask); 
    } else{
        clickedTickContainer.textContent = "✓";
        if(rowTickContainer){rowTickContainer.textContent = "✓"}
        taskTitleDOM.style.textDecoration = 'line-through';
        changeTaskDoneStatus(thisTask);
    }   
}

document.addEventListener('DOMContentLoaded', function() {
    const doneBtns = document.querySelectorAll(".done-btn");
    for (const doneBtn of doneBtns) {
      doneBtn.onclick = handleTaskDoneClick;
    }
  });
  

function deleteTaskFromDOM(e){
    e.stopPropagation();
    const taskId = getObjectId(e);
    const taskContainer = document.querySelector(`.task-row[data-id="${taskId}"]`)
    if (taskContainer){
    taskContainer.remove();
    }
}
function deleteTask(e){
    deleteTaskObj(e);
    deleteTaskFromDOM(e);
}

function deleteSpaceFromDOM(e){
    const spaceId = getObjectId(e);
    const spaceContainer = document.querySelector(`.space-row[data-id="${spaceId}"]`)
    if(spaceContainer){
    spaceContainer.remove();
    }
}
function deleteSpace(e){
    e.stopPropagation();
    deleteSpaceObj(e);
    deleteSpaceFromDOM(e);
    updateSpaceSelectOptions();
}

// function deleteSpaceTasks(){
//     const tasks = getTasksObj();
//     tasks.forEach(task => {
//         if (Number(task.spaceId) === Number(spaceId)){
//             DOMdisplayTaskRow(task, tasksContainer)
//             }
//         })
// }

function updateSpaceSelectOptions(){
    const spaces = getSpacesObj();
    const defaultOption = taskSpaceSelect.querySelector('option[disabled]');
    taskSpaceSelect.innerHTML = '';
    taskSpaceSelect.appendChild(defaultOption);
        spaces.forEach(space => {
            console.log(space.isSelectLabel)
            if (space.isSelectLabel === true){
                const taskSpace = document.createElement("option");
                taskSpace.textContent= `${space.icon} ${space.title}`;
                taskSpace.value = space.id;
                taskSpaceSelect.append(taskSpace);
            }
            })
}

function DOMdisplayTasks(e, spaceId = false){
    if(spaceId === false){
        spaceId = getObjectId(e);
    }
    tasksContainer.innerHTML="";
    const tasks = getTasksObj();
    const today = new Date;
    if(Number(spaceId) === 1){
        tasks.forEach(task => {DOMdisplayTaskRow(task, tasksContainer)})
    }
    else if(Number(spaceId) === 2){
        tasks.forEach(task => {
            if (String(task.date) === String(today)){
                DOMdisplayTaskRow(task, tasksContainer)
                }
            })
    }
    // else if(Number(spaceId) === 3){

    // }
    // else if(Number(spaceId) === 4){

    // }
    else{
        tasks.forEach(task => {
            if (Number(task.spaceId) === Number(spaceId)){
                DOMdisplayTaskRow(task, tasksContainer)
                }
            })
    }    
}
export {DOMdisplayDefaultSpace, DOMdisplayCustomSpace, DOMdisplayTaskRow, DOMdisplayTaskInfo, handleTaskDoneClick, deleteTask, deleteSpace, updateSpaceSelectOptions, DOMdisplayTasks}

