import editIcon from "./icons/edit.svg";
import cancelIcon from "./icons/cancel.svg";
import deleteIcon from "./icons/delete.svg"
import sidebarIcon from "./icons/sidebar.svg"
import addIcon from "./icons/add.svg"
const body = document.querySelector("body");

// navigation
const nav = document.createElement("nav");
nav.classList.add("navigation");

const sideBtn = document.createElement("button");
sideBtn.classList.add("side-btn", "btn", "svg");
sideBtn.title="Toggle sidebar";
sideBtn.ariaLabel="Toggle sidebar";
const sideIcon = document.createElement("img");
sideIcon.src=sidebarIcon;
sideBtn.append(sideIcon)

const logoContainer = document.createElement("header");
logoContainer.classList.add("logo-container");

const logoImg = document.createElement("img");
logoImg.classList.add("logo-img", "svg")

const logoText = document.createElement("div");
logoText.classList.add("logo-text");
logoText.textContent="Todo code";

logoContainer.append(logoImg, logoText);
nav.append(sideBtn, logoContainer);


// main
const main = document.createElement("main");
main.classList.add("content-container");

// content
const todoContainer = document.createElement("div");
todoContainer.classList.add("todo-container");

const headerRow = document.createElement("header");
headerRow.classList.add("header-row");
const spaceIcon = document.createElement("img");
spaceIcon.classList.add("space-icon", "svg")
const spaceHeader = document.createElement("h1");
spaceHeader.classList.add("space-header")
headerRow.append(spaceIcon, spaceHeader)

const taskRow1 = document.createElement("div");
taskRow1.classList.add("task-row", "first");
const tasksCounterContainer = document.createElement("div");
tasksCounterContainer.classList.add("counter-container");
const tasksCounterHead = document.createElement

const tasksCounter = document.createElement("span");
tasksCounter.classList.add("tasks-counter");
tasksCounter.textContent="0";

tasksCounterContainer.appendChild(tasksCounter);
taskRow1.appendChild(tasksCounterContainer);

const tasksContainer = document.createElement("div");
tasksContainer.classList.add("tasks-container");

const addTaskBtn = document.createElement("button");
addTaskBtn.classList.add("add-task", "btn", "svg");
addTaskBtn.ariaLabel="Add New Task";
addTaskBtn.title = "Add New Task";
const addTaskSVG = document.createElement("img");
addTaskSVG.src = addIcon;
addTaskBtn.append(addTaskSVG)

todoContainer.append(headerRow, taskRow1, tasksContainer, addTaskBtn)

// sidebar
const sidebar = document.createElement("aside");
sidebar.classList.add("sidebar");

const filteredSpaces = document.createElement("div");
filteredSpaces.classList.add("space-container")
const customSpaces = document.createElement("div");
customSpaces.classList.add("space-container");

sidebar.append(filteredSpaces, customSpaces);

main.append(sidebar, todoContainer)
body.append(nav, main)

// task info dialog
const taskCard = document.createElement("dialog");
    taskCard.classList.add("task-card");
    const taskContent = document.createElement("div");
    taskContent.classList.add("dialog-content");
    
    const taskHeader = document.createElement("header");
    taskHeader.classList.add("card-header")
    const spaceTitle = document.createElement("h2");
 
    const taskBtns = document.createElement("div");
    taskBtns.classList.add("card-btns")
    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("edit-task", "svg","btn");
    editTaskBtn.ariaLabel="Edit Task";
    editTaskBtn.title = "Edit Task";
    const editTaskIcon = document.createElement("img");
    editTaskIcon.src= editIcon;
    editTaskBtn.append(editTaskIcon);
    
    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task", "svg","btn");
    deleteTaskBtn.ariaLabel="Delete Task";
    deleteTaskBtn.title = "Delete Task";
    const deleteTaskIcon = document.createElement("img");
    deleteTaskIcon.src= deleteIcon;
    deleteTaskBtn.append(deleteTaskIcon);
    
    const closeTaskInfoBtn = document.createElement("button");
    closeTaskInfoBtn.classList.add("close-info", "svg","btn");
    closeTaskInfoBtn.ariaLabel="Hide Task Details";
    closeTaskInfoBtn.title = "Hide Task Details";
    const closeTaskInfoIcon = document.createElement("img");
    closeTaskInfoIcon.src = cancelIcon;
    closeTaskInfoBtn.append(closeTaskInfoIcon);
    // close card on click
    closeTaskInfoBtn.addEventListener("click", () => {
        taskCard.close();
    }
    )
    // close card on blur
    taskCard.addEventListener('click', () => taskCard.close());
    taskContent.addEventListener('click', (event) => event.stopPropagation());
    
    taskBtns.append(editTaskBtn, deleteTaskBtn, closeTaskInfoBtn)
    taskHeader.append(spaceTitle, taskBtns)
    
    const taskMain = document.createElement("main");
    taskMain.classList.add("card-main");
    const taskHeadline = document.createElement("div");
    taskHeadline.classList.add("card-task-info")
    const rightSide = document.createElement("div");
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    const taskTitle = document.createElement("h1");
   
    rightSide.append(doneBtn, taskTitle);
    
    const leftSide = document.createElement("div");
    const taskPriority = document.createElement("div");
    
    const taskDueDate = document.createElement("div");
    
    leftSide.append(taskPriority, taskDueDate)
    
    const taskDescription = document.createElement("div");
    taskDescription.classList.add("card-task-description")
    
    taskHeadline.append(rightSide, leftSide)
    taskMain.append(taskHeadline, taskDescription)
    taskContent.append(taskHeader, taskMain)
    taskCard.append(taskContent)
    body.append(taskCard);

function getTaskCardElements(){
    return {taskCard, spaceTitle, taskTitle, taskPriority, taskDueDate, taskDescription};
}
export {filteredSpaces, customSpaces, tasksContainer, getTaskCardElements}

