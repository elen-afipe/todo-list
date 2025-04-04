import editIcon from "./icons/edit.svg";
import cancelIcon from "./icons/cancel.svg";
import deleteIcon from "./icons/delete.svg"
import sidebarIcon from "./icons/sidebar.svg"
import addIcon from "./icons/add.svg";
import emojiIcon from "./icons/emoji.svg"
import { Picker } from 'emoji-picker-element';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis('Twemoji Mozilla');
// import {filteredSpaces, customSpaces, tasksContainer} from "./dom-content.js";
import {getOpenedSpaceId} from "./viewer-functions.js"
import { DOMdisplayCustomSpace, DOMdisplayDefaultSpace, DOMdisplayTaskRow, deleteTask, updateSpaceSelectOptions, DOMdisplayTasks} from "./dom-manipulation";
import { createSpaceObject } from "./spaces";
import { createTaskObject } from "./tasks";
import {getTaskPrioritySymbols} from "./tasks.js"
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
const spaceIcon = document.createElement("div");
spaceIcon.classList.add("space-icon", "emoji")
const spaceHeader = document.createElement("h1");
spaceHeader.classList.add("space-header")
headerRow.append(spaceIcon, spaceHeader)

const taskRow1 = document.createElement("div");
taskRow1.classList.add("task-row", "first");
const tasksCounterContainer = document.createElement("div");
tasksCounterContainer.classList.add("counter-container");
// const tasksCounterHead = document.createElement

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
addTaskBtn.append(addTaskSVG);
addTaskBtn.addEventListener("click", ()=> {taskDialog.showModal()})
todoContainer.append(headerRow, taskRow1, tasksContainer, addTaskBtn)

// sidebar
const sidebar = document.createElement("aside");
sidebar.classList.add("sidebar");

const filteredSpaces = document.createElement("div");
filteredSpaces.classList.add("space-container")
const customSpaces = document.createElement("div");
customSpaces.classList.add("space-container");

const addSpaceBtn = document.createElement("button");
addSpaceBtn.classList.add("add-space", "btn", "svg");
addSpaceBtn.ariaLabel="Add New Space";
addSpaceBtn.title = "Add New Space";
const addSpaceSVG = document.createElement("img");
addSpaceSVG.src = addIcon;
addSpaceBtn.append(addSpaceSVG)
addSpaceBtn.addEventListener("click", ()=> {spaceDialog.showModal()})
sidebar.append(filteredSpaces, customSpaces, addSpaceBtn);
main.append(sidebar, todoContainer)
body.append(nav, main)


const allSpace = createSpaceObject("All", "📚️", true);
const todaySpace = createSpaceObject("Today", "📝", false);
const weekSpace = createSpaceObject("Week", "📑", false);
const monthSpace = createSpaceObject("Month", "📆", false);
const doneSpace = createSpaceObject("Done", "✅️", false);
DOMdisplayDefaultSpace(allSpace, filteredSpaces);
DOMdisplayDefaultSpace(todaySpace, filteredSpaces);
DOMdisplayDefaultSpace(weekSpace, filteredSpaces);
DOMdisplayDefaultSpace(monthSpace, filteredSpaces);
DOMdisplayDefaultSpace(doneSpace, filteredSpaces);
const mySpace = createSpaceObject("My project", "👾", true);
DOMdisplayCustomSpace(mySpace, customSpaces);


const task0 = createTaskObject("MAKE CREATING TASKS WORK", "2025-04-02", "high", "Just another task", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
// DOMdisplayTaskRow(task0, tasksContainer)
const task1 = createTaskObject("Think of project logic", "2025-04-05", "high", "Just another project", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
// DOMdisplayTaskRow(task1, tasksContainer)
const task2 = createTaskObject("Gather assets", "2025-04-06", "medium", "Just another task", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
// DOMdisplayTaskRow(task2, tasksContainer)


// task info card dialog
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
    deleteTaskBtn.addEventListener("click", (e)=>{
        deleteTask(e);
        taskCard.close();
    })
    
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
    // taskBtns.append(closeTaskInfoBtn)
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
    return {taskCard, spaceTitle, taskTitle, taskPriority, taskDueDate, taskDescription, doneBtn};
}
const taskCardElements = getTaskCardElements();

// dialog form for creating and editing tasks
const taskDialog = document.createElement("dialog");
    taskDialog.classList.add("task-form");
    const taskFormContent = document.createElement("div");
    taskFormContent.classList.add("dialog-content");
    const taskFormCloseBtn = document.createElement("button");
    taskFormCloseBtn.classList.add("close-btn", "btn", "svg");
    taskFormCloseBtn.title="Close dialog";
    taskFormCloseBtn.ariaLabel="Close dialog";
    taskFormCloseBtn.addEventListener("click", ()=> {
        taskForm.reset();
        taskDialog.close();
    });
    taskDialog.addEventListener('click', ()=> taskDialog.close());
    taskFormContent.addEventListener('click', (event) => event.stopPropagation());

    const closeFormIcon = document.createElement("img");
    closeFormIcon.src=cancelIcon;
    taskFormCloseBtn.append(closeFormIcon);
    const taskForm = document.createElement("form");
    
    const taskFormLegend = document.createElement("legend");
    taskFormLegend.textContent = 'Create task';

    const taskFormRow1 = document.createElement("div");
    taskFormRow1.classList.add("form-row");

    const taskTitleLabel = document.createElement("label");
    taskTitleLabel.textContent='Task title';
    taskTitleLabel.for="task-title";
    const taskTitleInput = document.createElement("input");
    taskTitleInput.id="task-title";
    taskTitleInput.name="task-title";
    taskTitleInput.required="true";
    taskTitleInput.type="text";
    taskFormRow1.append(taskTitleLabel, taskTitleInput)

    const taskFormRow2 = document.createElement("div");
    taskFormRow2.classList.add("form-row");

    const taskDateLabel = document.createElement("label");
    taskDateLabel.textContent='Due to';
    taskDateLabel.for="task-date";
    const taskDateInput = document.createElement("input");
    taskDateInput.id="task-date";
    taskDateInput.name="task-date";
    taskDateInput.required="true";
    taskDateInput.type="date";
    taskFormRow2.append(taskDateLabel, taskDateInput)

    const taskFormRow3 = document.createElement("div");
    taskFormRow3.classList.add("form-row");

    const taskPrioritySymbols = getTaskPrioritySymbols();
    const taskPriorityLabel = document.createElement("label");
    taskPriorityLabel.textContent='Priority';
    taskPriorityLabel.for="task-date";
    const taskPrioritySelect = document.createElement("select");
    taskPrioritySelect.name="task-date"
    taskPrioritySelect.id="task-date"
    const taskPriorityDefault = document.createElement("option");
    taskPriorityDefault.textContent="Select priority";
    taskPriorityDefault.value="";
    taskPriorityDefault.disabled=true;
    taskPriorityDefault.setAttribute("selected", "");
    const taskPriorityLow = document.createElement("option");
    taskPriorityLow.textContent=`${taskPrioritySymbols.low} Low`;
    taskPriorityLow.value="low";
    const taskPriorityMed = document.createElement("option");
    taskPriorityMed.textContent=`${taskPrioritySymbols.medium} Medium`;
    taskPriorityMed.value="medium";
    const taskPriorityMax = document.createElement("option");
    taskPriorityMax.textContent=`${taskPrioritySymbols.high} High`;
    taskPriorityMax.value="high";
    taskPrioritySelect.append(taskPriorityDefault, taskPriorityLow, taskPriorityMed, taskPriorityMax)
    taskFormRow3.append(taskPriorityLabel, taskPrioritySelect)

    const taskFormRow4 = document.createElement("div");
    taskFormRow4.classList.add("form-row");

    const taskDescLabel = document.createElement("label");
    taskDescLabel.textContent='Description';
    taskDescLabel.for="task-description";
    const taskDescInput = document.createElement("textarea");
    taskDescInput.id="task-description";
    taskDescInput.name="task-description";
    taskFormRow4.append(taskDescLabel, taskDescInput)

    const taskFormRow5 = document.createElement("div");
    taskFormRow5.classList.add("form-row");

    const taskSpaceLabel = document.createElement("label");
    taskSpaceLabel.textContent='Space';
    taskSpaceLabel.for="task-space";
    const taskSpaceSelect = document.createElement("select");
    taskSpaceSelect.name="task-space"
    taskSpaceSelect.id="task-space"
    const taskSpaceDefault = document.createElement("option");
    taskSpaceDefault.textContent="Select space";
    taskSpaceDefault.value="";
    taskSpaceDefault.disabled=true;
    taskSpaceDefault.setAttribute("selected", "");
    taskSpaceSelect.append(taskSpaceDefault)
    taskFormRow5.append(taskSpaceLabel, taskSpaceSelect)
    updateSpaceSelectOptions();

    const taskFormBtn = document.createElement("button");
    taskFormBtn.classList.add("task-form-btn");
    taskFormBtn.textContent="Add task";
    taskFormBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        // console.log(taskPrioritySelect.value)
        const selectedSpace = taskSpaceSelect.options[taskSpaceSelect.selectedIndex];
        const newTask = createTaskObject(taskTitleInput.value, taskDateInput.value, taskPrioritySelect.value, taskDescInput.value, selectedSpace.textContent, selectedSpace.value)
        const openedSpaceId = getOpenedSpaceId();
        DOMdisplayTasks(e, openedSpaceId);
        taskForm.reset();
        taskDialog.close();
    })

    taskForm.append(taskFormLegend, taskFormRow1, taskFormRow2, taskFormRow3, taskFormRow4, taskFormRow5, taskFormBtn)
    taskFormContent.append(taskFormCloseBtn, taskForm)
    taskDialog.append(taskFormContent)
    body.append(taskDialog);


// dialog form for creating and editing spaces
const spaceDialog = document.createElement("dialog");
spaceDialog.classList.add("space-form");
    const spaceFormContent = document.createElement("div");
    spaceFormContent.classList.add("dialog-content");
    const spaceFormCloseBtn = document.createElement("button");
    spaceFormCloseBtn.classList.add("close-btn", "btn", "svg");
    spaceFormCloseBtn.title="Close dialog";
    spaceFormCloseBtn.ariaLabel="Close dialog";
    spaceFormCloseBtn.addEventListener("click", ()=> {
        spaceDialog.close();
        spaceForm.reset();
    });
    spaceDialog.addEventListener('click', ()=> spaceDialog.close());
    spaceFormContent.addEventListener('click', (event) => event.stopPropagation());

    const closeIcon = document.createElement("img");
    closeIcon.src=cancelIcon;
    spaceFormCloseBtn.append(closeIcon);
    const spaceForm = document.createElement("form");
    const spaceFormLegend = document.createElement("legend");
    spaceFormLegend.textContent = 'Create space for your tasks';

    const spaceFormRow1 = document.createElement("div");
    spaceFormRow1.classList.add("form-row");

    const spaceTitleLabel = document.createElement("label");
    spaceTitleLabel.textContent='Space title';
    spaceTitleLabel.for="space-title";
    const spaceTitleInput = document.createElement("input");
    spaceTitleInput.id="space-title";
    spaceTitleInput.name="space-title";
    spaceTitleInput.required="true";
    spaceTitleInput.type="text";
    spaceFormRow1.append(spaceTitleLabel, spaceTitleInput)

    const spaceFormRow2 = document.createElement("div");
    spaceFormRow2.classList.add("form-row");
    const spaceIconLabel = document.createElement("label");
    spaceIconLabel.textContent='Icon';
    spaceIconLabel.for="space-icon";
    const spaceIconInput = document.createElement("input");
    spaceIconInput.id="selectedEmoji";
    spaceIconInput.name="space-icon";
    spaceIconInput.type="text";
    spaceIconInput.readOnly=true;

    const emojiPicker = new Picker();
    emojiPicker.id = "emojiPicker";
    emojiPicker.hidden=true;
    emojiPicker.classList.add('light', 'hidden');

    const showPickerBtn = document.createElement("button");
    showPickerBtn.classList.add("show-picker-btn", "btn", "svg")
    showPickerBtn.ariaLabel="Choose space icon";
    showPickerBtn.title="Choose space icon";
    const showPickerIcon = document.createElement("img");
    showPickerIcon.src=emojiIcon;
    showPickerBtn.append(showPickerIcon);
    showPickerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        emojiPicker.classList.toggle('hidden');
        emojiPicker.removeAttribute("hidden");
      });

    emojiPicker.addEventListener('emoji-click', event => {
        spaceIconInput.value = event.detail.unicode;
        emojiPicker.hidden=true;
        console.log(spaceIconInput.value)
        emojiPicker.classList.add('hidden');
      });
    spaceFormRow2.append(spaceIconLabel, spaceIconInput, showPickerBtn, emojiPicker)

    const spaceFormBtn = document.createElement("button");
    spaceFormBtn.classList.add("space-form-btn")
    spaceFormBtn.textContent="Add space"
    spaceFormBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        // ADD INPUT CHECKS
        const icon = spaceIconInput.value ? spaceIconInput.value : "📄";
        const newSpace = createSpaceObject(spaceTitleInput.value, icon, true);
        updateSpaceSelectOptions();
        DOMdisplayCustomSpace(newSpace, customSpaces);
        spaceForm.reset();
        spaceDialog.close();
    })

    spaceForm.append(spaceFormLegend, spaceFormRow1, spaceFormRow2, spaceFormBtn)
    spaceFormContent.append(spaceFormCloseBtn, spaceForm)
    spaceDialog.append(spaceFormContent)
    body.append(spaceDialog);

document.addEventListener('DOMContentLoaded', (e)=>{  
const currentSpaceId = getOpenedSpaceId();
DOMdisplayTasks(e, currentSpaceId);
})

export {filteredSpaces, customSpaces, tasksContainer, taskCardElements, taskSpaceSelect}

