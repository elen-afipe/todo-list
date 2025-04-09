import editIcon from "./icons/edit.svg";
import cancelIcon from "./icons/cancel.svg";
import deleteIcon from "./icons/delete.svg"
import sidebarIcon from "./icons/sidebar.svg"
import addIcon from "./icons/add.svg";
import emojiIcon from "./icons/emoji.svg";
import logoIcon from "./icons/code.svg";
import { Picker } from 'emoji-picker-element';
import { format, addDays, addWeeks, addMonths } from 'date-fns';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
polyfillCountryFlagEmojis('Twemoji Mozilla');
import {getOpenedSpaceId, getInfoMode, storageAvailable, saveToLocalStorage, getFromLocalStorage} from "./viewer-functions.js"
import { DOMdisplayCustomSpace, DOMdisplayDefaultSpace, deleteTask, updateSpaceSelectOptions, DOMdisplayTasksInfo, openAddSpaceForm, DOMdisplayCustomSpaces, openAddTaskForm, openEditTaskForm, toggleSidebar} from "./dom-manipulation";
import { createSpaceObject, editSpaceObj, getSpacesObj, addSpaceToSpaces, getCurrentSpaceId, initializeSpaceId} from "./spaces";
import { createTaskObject, editTaskObj, getTasksObj, addTaskToTasks, initializeTaskId} from "./tasks";
import {getTaskPrioritySymbols} from "./tasks.js"

initializeTaskId();

let openedSpaceId = getOpenedSpaceId();
const body = document.querySelector("body");

// localStorage.clear();
// navigation
const nav = document.createElement("nav");
nav.classList.add("navigation");

const sideBtn = document.createElement("button");
sideBtn.classList.add("side-btn", "btn", "svg");
sideBtn.title="Toggle sidebar";
sideBtn.ariaLabel="Toggle sidebar";
sideBtn.onclick = toggleSidebar;
const sideIcon = document.createElement("img");
sideIcon.src=sidebarIcon;
sideBtn.append(sideIcon)

const logoContainer = document.createElement("header");
logoContainer.classList.add("logo-container");

const logoImg = document.createElement("img");
logoImg.classList.add("logo-img", "svg")
logoImg.src = logoIcon

const logoText = document.createElement("div");
logoText.classList.add("logo-text");
logoText.textContent="{ToDoCode}";

logoContainer.append(logoText, logoImg);
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
addTaskBtn.onclick=openAddTaskForm;
todoContainer.append(headerRow, taskRow1, tasksContainer, addTaskBtn)

// sidebar
const sidebar = document.createElement("aside");
sidebar.classList.add("sidebar", "open");

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
addSpaceBtn.onclick=openAddSpaceForm;
sidebar.append(filteredSpaces, addSpaceBtn, customSpaces);
main.append(sidebar, todoContainer)
body.append(nav, main)

const allSpace = createSpaceObject("All", "📖", true, false, 1);
const todaySpace = createSpaceObject("Today", "📝", false, false, 2);
const weekSpace = createSpaceObject("Week", "📑", false, false, 3);
const monthSpace = createSpaceObject("Month", "📆", false, false, 4);
const doneSpace = createSpaceObject("Done", "😎", false, false, 5);
DOMdisplayDefaultSpace(allSpace, filteredSpaces);
DOMdisplayDefaultSpace(todaySpace, filteredSpaces);
DOMdisplayDefaultSpace(weekSpace, filteredSpaces);
DOMdisplayDefaultSpace(monthSpace, filteredSpaces);
DOMdisplayDefaultSpace(doneSpace, filteredSpaces);
//initialize minimal id after creating filters with permanent id
initializeSpaceId();

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
    editTaskBtn.ariaLabel="Edit task";
    editTaskBtn.title = "Edit task";
    editTaskBtn.addEventListener("click", (e)=> {
        openEditTaskForm(e);
        taskCard.close();
    });
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
        const tasks = getTasksObj();
        saveToLocalStorage("tasks", tasks, true);
        DOMdisplayTasksInfo(e);
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
    
    leftSide.append(taskDueDate, taskPriority)
    
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
    taskTitleLabel.textContent='Title';
    taskTitleLabel.htmlFor="task-title";
    const taskTitleInput = document.createElement("input");
    taskTitleInput.id="task-title";
    taskTitleInput.name="task-title";
    taskTitleInput.required="true";
    taskTitleInput.maxLength = 75;
    taskTitleInput.type="text";
    taskFormRow1.append(taskTitleLabel, taskTitleInput)

    const taskFormRow2 = document.createElement("div");
    taskFormRow2.classList.add("form-row");

    const taskDateLabel = document.createElement("label");
    taskDateLabel.textContent='Due to';
    taskDateLabel.htmlFor="task-date";
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
    taskPriorityLabel.htmlFor="task-date";
    const taskPrioritySelect = document.createElement("select");
    taskPrioritySelect.name="task-date"
    taskPrioritySelect.id="task-date"
    const taskPriorityDefault = document.createElement("option");
    taskPriorityDefault.textContent="Select priority";
    taskPriorityDefault.value="";
    taskPriorityDefault.disabled=true;
    taskPriorityDefault.setAttribute("selected", "");
    taskPriority.classList.add("select-option");
    const taskPriorityLow = document.createElement("option");
    taskPriorityLow.textContent=`${taskPrioritySymbols.low} I'll get to it when I'm bored`;
    taskPriorityLow.value="low";
    taskPriorityLow.classList.add("select-option")
    const taskPriorityMed = document.createElement("option");
    taskPriorityMed.textContent=`${taskPrioritySymbols.medium} I should probably do this`;
    taskPriorityMed.value="medium";
    taskPriorityMed.classList.add("select-option");
    const taskPriorityMax = document.createElement("option");
    taskPriorityMax.textContent=`${taskPrioritySymbols.high} Why wasn't this done yesterday?!`;
    taskPriorityMax.value="high";
    taskPriorityMax.classList.add("select-option");
    taskPrioritySelect.append(taskPriorityDefault, taskPriorityLow, taskPriorityMed, taskPriorityMax)
    taskFormRow3.append(taskPriorityLabel, taskPrioritySelect)

    const taskFormRow4 = document.createElement("div");
    taskFormRow4.classList.add("form-row");

    const taskDescLabel = document.createElement("label");
    taskDescLabel.textContent='Notes';
    taskDescLabel.classList.add("notes-label");
    taskDescLabel.htmlFor="task-description";
    const taskDescInput = document.createElement("textarea");
    taskDescInput.id="task-description";
    taskDescInput.name="task-description";
    taskFormRow4.append(taskDescLabel, taskDescInput)

    const taskFormRow5 = document.createElement("div");
    taskFormRow5.classList.add("form-row");

    const taskSpaceLabel = document.createElement("label");
    taskSpaceLabel.textContent='Space';
    taskSpaceLabel.htmlFor="task-space";
    const taskSpaceSelect = document.createElement("select");
    taskSpaceSelect.name="task-space"
    taskSpaceSelect.id="task-space"
    const taskSpaceDefault = document.createElement("option");
    taskSpaceDefault.textContent="Select space";
    taskSpaceDefault.value="";
    taskSpaceDefault.disabled=true;
    taskSpaceDefault.setAttribute("selected", "");
    taskSpaceDefault.classList.add("select-option");
    taskSpaceSelect.append(taskSpaceDefault)
    taskFormRow5.append(taskSpaceLabel, taskSpaceSelect)
    updateSpaceSelectOptions();

    const taskFormBtn = document.createElement("button");
    taskFormBtn.classList.add("task-form-btn");
    taskFormBtn.textContent="Add task";
    taskFormBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        const infoMode = getInfoMode();
        const taskTitle = taskTitleInput.value ? taskTitleInput.value : "New task"
        const selectedSpace = taskSpaceSelect.options[taskSpaceSelect.selectedIndex];
        const selectedSpaceId = (selectedSpace.value === "") ? allSpace.id : selectedSpace.value;
        const selectedSpaceName = (selectedSpace.value === "" | "Select space") ? `${allSpace.icon} ${allSpace.title}` : selectedSpace.textContent;
        if (infoMode === "add"){
            createTaskObject(taskTitle, taskDateInput.value, taskPrioritySelect.value, taskDescInput.value, selectedSpaceName, selectedSpaceId)
        } else{
            editTaskObj(e, taskTitleInput.value, taskDateInput.value, taskPrioritySelect.value, taskDescInput.value, selectedSpace.textContent, selectedSpace.value)
        }
        const openedSpaceId = getOpenedSpaceId();
        DOMdisplayTasksInfo(e, openedSpaceId);
        const tasks = getTasksObj();
        saveToLocalStorage("tasks", tasks, true);
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
    spaceTitleLabel.textContent='Title';
    spaceTitleLabel.htmlFor="space-title";
    const spaceTitleInput = document.createElement("input");
    spaceTitleInput.id="space-title";
    spaceTitleInput.maxLength = 50;
    spaceTitleInput.name="space-title";
    spaceTitleInput.required="true";
    spaceTitleInput.type="text";
    spaceFormRow1.append(spaceTitleLabel, spaceTitleInput)

    const spaceFormRow2 = document.createElement("div");
    spaceFormRow2.classList.add("form-row", "emoji-row");
    const emojiInputDiv = document.createElement("div");
    const spaceIconLabel = document.createElement("label");
    spaceIconLabel.textContent='Icon';
    spaceIconLabel.htmlFor="selectedEmoji";
    const spaceIconInput = document.createElement("input");
    spaceIconInput.id="selectedEmoji";
    spaceIconInput.name="space-icon";
    spaceIconInput.type="text";
    spaceIconInput.readOnly=true;
    const emojiPickerDiv = document.createElement("div");
    const emojiPicker = new Picker();
    emojiPicker.id = "emojiPicker";
    emojiPicker.hidden=true;
    emojiPicker.classList.add('light', 'hidden');
    emojiPickerDiv.append(emojiPicker);
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
        emojiPicker.classList.add('hidden');
      });
    emojiInputDiv.append(spaceIconLabel, spaceIconInput, showPickerBtn)
    spaceFormRow2.append(emojiInputDiv, emojiPickerDiv)

    const spaceFormBtn = document.createElement("button");
    spaceFormBtn.classList.add("space-form-btn")
    spaceFormBtn.textContent="Add space"
    spaceFormBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        e.preventDefault();
        const infoMode = getInfoMode();
        const icon = spaceIconInput.value ? spaceIconInput.value : "📄";
        const title = spaceTitleInput.value ? spaceTitleInput.value : "My space";
        if (infoMode === "add"){
            createSpaceObject(title, icon, true, true);
        } else{
            editSpaceObj(e, spaceTitleInput.value, spaceIconInput.value)
        }
        
        DOMdisplayCustomSpaces();
        updateSpaceSelectOptions();
        const spaces = getSpacesObj();
        saveToLocalStorage("spaces", spaces, true);
        spaceForm.reset();
        spaceDialog.close();
    })

    spaceForm.append(spaceFormLegend, spaceFormRow1, spaceFormRow2, spaceFormBtn)
    spaceFormContent.append(spaceFormCloseBtn, spaceForm)
    spaceDialog.append(spaceFormContent)
    body.append(spaceDialog);


    // show content
    if(storageAvailable("localStorage")){
        const spacesObj = getSpacesObj();
        const tasksObj = getTasksObj();
        const savedSpaces = getFromLocalStorage("spaces", true);
        const savedTasks = getFromLocalStorage("tasks", true);
        const savedOpenedSpaceId = getFromLocalStorage("current-space", false);
        const savedCurrentSpaceId = getFromLocalStorage("space-id", false);

        const currentSpaceId = savedCurrentSpaceId;
        if (savedSpaces !== null && savedTasks !== null && savedOpenedSpaceId !== null ){
            Object.values(savedSpaces).forEach(space => {
                if (space.isCustom){
                    addSpaceToSpaces(space)
                    DOMdisplayCustomSpace(space, customSpaces)
                }
              });
              Object.values(savedTasks).forEach(task => {
                addTaskToTasks(task)
              });
              openedSpaceId = savedOpenedSpaceId;
              updateSpaceSelectOptions();

              const sidebarClasslist = getFromLocalStorage("sidebar-state", false)
              if (sidebarClasslist.includes("open")){
                sidebar.classList.add("open")
              }else{
                sidebar.classList.remove("open")
              }

        } else {
    // create default ones, save them and display
        const mySpace = createSpaceObject("My project", "👾", true, true);
        DOMdisplayCustomSpace(mySpace, customSpaces);
          const today = new Date();
        const todayFormatted = format(today, 'yyyy-MM-dd');
        const tomorrow = addDays(today, 1);
        const tomorrowFormatted = format(tomorrow, 'yyyy-MM-dd');
        const nextWeek = addWeeks(today, 1);
        const nextWeekFormatted = format(nextWeek, 'yyyy-MM-dd');
        const nextMonth = addMonths(today, 1);
        const nextMonthFormatted = format(nextMonth, 'yyyy-MM-dd');
            createTaskObject("Think of project logic", todayFormatted, "high", "Stare at blank wall with no idea where to start. Drink coffee. Draw boxes and arrows that make no sense. Write first line of pseudocode.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
            createTaskObject("Gather assets", todayFormatted, "medium", "Download 200 stock photos of people pointing at screens with impossibly bright smiles. Bonus: Find that one icon that's slightly different from all the others to torment future-me.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
            createTaskObject("Set up webpack", todayFormatted, "high", "Copy config from last project. Add random plugins until errors change from red to yellow. Declare victory when terminal shows any color besides red.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
            createTaskObject("Copy-paste Stack Overflow solutions", tomorrowFormatted, "high", "Find at least 5 different approaches to the same problem and try them all until something magically works.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)

                createTaskObject("Create project folder structure", tomorrowFormatted, "medium", "Make it look professional with lots of empty folders for things I think I might need later but won't.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)

                createTaskObject("Install 37 npm packages", tomorrowFormatted, "medium", "Need one tiny utility function? Better install a 15MB package with 200 dependencies!", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)

                createTaskObject("Make first git commit", nextWeekFormatted, "low", "Commit message: 'Initial commit' after already writing 2000 lines of code. What could go wrong?", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)

                createTaskObject("Create responsive design", nextWeekFormatted, "high", "Make it look perfect on desktop. Panic when checking mobile. Add 'max-width: 100%' everywhere.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)

                createTaskObject("Debug CSS issues", nextMonthFormatted, "high", "Try random combinations of display, position, and flex until it either works or I give up and use grid.", `${mySpace.icon} ${mySpace.title}`, `${mySpace.id}`)
                            

        const spaces = getSpacesObj();
        saveToLocalStorage("spaces", spaces, true);
        
        const tasks = getTasksObj();
        saveToLocalStorage("tasks", tasks, true);
    
        const openedSpaceId = getOpenedSpaceId();
        saveToLocalStorage("current-space", openedSpaceId, false);
        saveToLocalStorage("sidebar-state", sidebar.classList, false)
        updateSpaceSelectOptions();
        }
    }

document.addEventListener('DOMContentLoaded', (e)=>{  
DOMdisplayTasksInfo(e, openedSpaceId);
})

export {filteredSpaces, customSpaces, tasksContainer, taskCardElements, taskSpaceSelect, spaceDialog, spaceFormLegend, spaceFormBtn, spaceTitleInput, spaceIconInput, spaceForm, taskDialog, taskForm, taskFormLegend, taskFormBtn, taskTitleInput, taskDateInput, taskPrioritySelect, taskDescInput, tasksCounterContainer, sidebar, spaceIcon, spaceHeader}
