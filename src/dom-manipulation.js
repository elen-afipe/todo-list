import editIcon from "./icons/edit.svg";
import infoIcon from "./icons/info.svg";
import deleteIcon from "./icons/delete.svg"
import {getObjectId, setInfoMode, updateOpenedSpaceId, getOpenedSpaceId, setNumberOfTasks, saveToLocalStorage} from "./viewer-functions.js"
import {getTasksObj, getTaskObjById, changeTaskDoneStatus, deleteTaskObj, getTaskPrioritySymbols, getTaskIndex, getTaskByIndex} from "./tasks.js"
import { getSpacesObj, deleteSpaceObj, getSpaceByIndex, getSpaceIndex, getSpaceById} from "./spaces.js";
import {taskCardElements, taskSpaceSelect, tasksContainer, spaceDialog, spaceFormLegend, spaceFormBtn, spaceTitleInput, spaceIconInput, spaceForm, customSpaces, taskDialog, taskForm, taskFormLegend, taskFormBtn, taskTitleInput, taskDateInput, taskPrioritySelect, taskDescInput, tasksCounterContainer, sidebar, spaceIcon, spaceHeader} from "./dom-content.js"
import {format, startOfWeek, endOfWeek, eachDayOfInterval} from "date-fns"
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
    spaceRow.addEventListener("click", (e)=>{
        updateOpenedSpaceId(e);
        updateOpenedSpaceStyle();
        DOMdisplayTasksInfo(e);
    }
  )
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
    editSpaceBtn.ariaLabel="Edit space";
    editSpaceBtn.title = "Edit space";
    const editSpaceIcon = document.createElement("img");
    editSpaceIcon.src= editIcon;
    editSpaceBtn.append(editSpaceIcon);
    editSpaceBtn.onclick=openEditSpaceForm;
    const deleteSpaceBtn = document.createElement("button");
    deleteSpaceBtn.classList.add("delete-space", "btn", "svg");
    deleteSpaceBtn.ariaLabel="Delete Space";
    deleteSpaceBtn.title = "Delete Space";
    deleteSpaceBtn.addEventListener("click", (e)=>{
        deleteSpace(e); 
        const spaces = getSpacesObj();
        deleteObjTasksFromSpace(e);
        DOMdisplayTasksInfo(e, 1);
        updateOpenedSpaceId(e, 1);
        updateOpenedSpaceStyle();
        const tasks = getTasksObj();
        saveToLocalStorage("spaces", spaces, true);
        saveToLocalStorage("tasks", tasks, true);
    })
    const deleteSpaceIcon = document.createElement("img");
    deleteSpaceIcon.src= deleteIcon;
    deleteSpaceBtn.append(deleteSpaceIcon);

    spaceBtns.append(editSpaceBtn, deleteSpaceBtn)
    spaceLogo.append(spaceIcon, spaceTitle)
    spaceRow.append(spaceLogo, spaceBtns)
    spaceRow.dataset.id = spaceObj.id;
    spaceRow.addEventListener("click", (e)=>{
        e.stopPropagation();
        updateOpenedSpaceId(e);
        updateOpenedSpaceStyle();
        DOMdisplayTasksInfo(e);
    }
  )
    spacesContainer.append(spaceRow);
}

function DOMdisplayCustomSpaces(){
    customSpaces.innerHTML="";
    const spaces = getSpacesObj();
    spaces.forEach(space => {
        if (space.isCustom){
            DOMdisplayCustomSpace(space, customSpaces)
        }
    })
}

function DOMdisplayTaskInfo(e){
    e.stopPropagation();
   const taskId =  getObjectId(e);
   const thisTask = getTaskObjById(taskId);
   taskCardElements.spaceTitle.textContent = thisTask.spaceTitle;
   taskCardElements.taskTitle.textContent = thisTask.title;
   crossOutTaskTitle(thisTask, taskCardElements.taskTitle)
   taskCardElements.taskPriority.textContent = getPriorityEmoji(thisTask);
   taskCardElements.taskDueDate.textContent = styleDueDate(thisTask.dueDate);
   taskCardElements.taskDescription.textContent = thisTask.description;
   taskCardElements.taskCard.dataset.id = thisTask.id;
   taskCardElements.doneBtn.textContent = (thisTask.doneStatus === false) ? " " : "✓";
   taskCardElements.doneBtn.addEventListener("click", ()=>{
    crossOutTaskTitle(thisTask, taskCardElements.taskTitle)
   })
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
    leftContainer.classList.add("task-title")
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.textContent = (newTask.doneStatus === true) ? "✓" : " ";
    doneBtn.addEventListener("click", (e)=>{
        handleTaskDoneClick(e)
        DOMdisplayTasksInfo(e);
    })
    doneBtn.onmouseenter = () => {doneBtn.textContent = " " ? "✓": " "};
    doneBtn.onmouseleave = () => {doneBtn.textContent = (newTask.doneStatus !== true) ? " ": "✓"};
    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent= newTask.title;
    crossOutTaskTitle(newTask, taskName);
    leftContainer.append(doneBtn, taskName);

    const rightContainer = document.createElement("div");

    const dueDate = document.createElement("div");
    dueDate.textContent = styleDueDate(newTask.dueDate);
    dueDate.classList.add("task-date");

    const priority = document.createElement("div");
    priority.textContent = getPriorityEmoji(newTask);
    priority.classList.add("task-priority", "emoji");

    
    const taskBtns = document.createElement("div");
    taskBtns.classList.add("task-btns")
    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("edit-task", "svg","btn");
    editTaskBtn.ariaLabel="Edit task";
    editTaskBtn.title = "Edit task";
    editTaskBtn.onclick=openEditTaskForm;
    const editTaskIcon = document.createElement("img");
    editTaskIcon.src= editIcon;
    editTaskBtn.append(editTaskIcon);

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task","svg","btn");
    deleteTaskBtn.ariaLabel="Delete Task";
    deleteTaskBtn.title = "Delete Task";
    deleteTaskBtn.addEventListener("click", (e)=>{
                deleteTask(e);
                const tasks = getTasksObj();
                saveToLocalStorage("tasks", tasks, true);
                DOMdisplayTasksInfo(e);
    })
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

function crossOutTaskTitle(task, titleElement){
    const taskIsDone = task.doneStatus;
    if (taskIsDone){
        titleElement.style.textDecoration = 'line-through';
    } else{
        titleElement.style.textDecoration = 'none';
    }   
}

function findRowTickContainer(tickContainer, taskId){
    const isInTaskRow = tickContainer.closest('.task-row') !== null;
    if(isInTaskRow){
        return false;
    }else{
       const rowTickContainer = document.querySelector(`.task-row[data-id="${taskId}"] .done-btn`);
        return rowTickContainer;
    }

}

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
      doneBtn.addEventListener("click", (e)=>{
        handleTaskDoneClick(e)
        DOMdisplayTasksInfo(e);
    })
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


function deleteObjTasksFromSpace(e) {
    const spaceId = getObjectId(e);
    const tasks = getTasksObj();
    for (let i = tasks.length - 1; i >= 0; i--) {
        if (Number(tasks[i].spaceId) === Number(spaceId)) {
            tasks.splice(i, 1);
        }
    }
}


function updateSpaceSelectOptions(){
    const spaces = getSpacesObj();
    const defaultOption = taskSpaceSelect.querySelector('option[disabled]');
    taskSpaceSelect.innerHTML = '';
    taskSpaceSelect.appendChild(defaultOption);
        spaces.forEach(space => {
            if (space.isSelectLabel === true){
                const taskSpace = document.createElement("option");
                taskSpace.classList.add("select-option");
                taskSpace.textContent= `${space.icon} ${space.title}`;
                taskSpace.value = space.id;
                taskSpaceSelect.append(taskSpace);
            }
            })
}

function DOMdisplayTasksInfo(e, spaceId = false){
    e.stopPropagation();
    if(spaceId === false){
        spaceId = getOpenedSpaceId();
    }
    const openedSpace = getSpaceById(spaceId);
    tasksContainer.innerHTML="";
    let numberOfTasks = 0;
    const tasks = getTasksObj();
    const today = new Date();
    const todayFormatted = format(today, 'yyyy-MM-dd')
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // 1 = Monday
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({
        start: weekStart,
        end: weekEnd
      }).map(day => format(day, 'yyyy-MM-dd'));
    if(Number(spaceId) === 1){
        tasks.forEach(task => {DOMdisplayTaskRow(task, tasksContainer)})
        numberOfTasks = tasks.length;
        setNumberOfTasks(numberOfTasks);
    }
    else if(Number(spaceId) === 2){
        tasks.forEach(task => {
            if (String(task.dueDate) === String(todayFormatted)){
                numberOfTasks+=1;
                DOMdisplayTaskRow(task, tasksContainer)
                }
            })
            setNumberOfTasks(numberOfTasks);
    }
    else if(Number(spaceId) === 3){
        tasks.forEach(task => {
            if (weekDays.includes(String(task.dueDate))){
                numberOfTasks+=1;
                DOMdisplayTaskRow(task, tasksContainer)
                setNumberOfTasks(numberOfTasks);
                }
            })
    }
    else if(Number(spaceId) === 4){
        tasks.forEach(task => {
            if (String(task.dueDate).substring(5,7) === String(todayFormatted).substring(5,7)){
                numberOfTasks+=1;
                DOMdisplayTaskRow(task, tasksContainer)
                }
            })
            setNumberOfTasks(numberOfTasks);
    }
    else if(Number(spaceId) === 5){
        tasks.forEach(task => {
            if (Number(task.doneStatus === true)){
                DOMdisplayTaskRow(task, tasksContainer)
                numberOfTasks+=1;
                }
            })
        setNumberOfTasks(numberOfTasks);
    }   
    else{
        tasks.forEach(task => {
            if (Number(task.spaceId) === Number(spaceId)){
                DOMdisplayTaskRow(task, tasksContainer)
                numberOfTasks+=1;
                }
            })
        setNumberOfTasks(numberOfTasks);
    }    
    setNumberOfTasks(numberOfTasks);
    DOMdisplayTaskNumber(numberOfTasks);
    spaceIcon.textContent= openedSpace.icon;
    spaceHeader.textContent= openedSpace.title;
}

function styleDueDate(date){
    if (date === ""){
        return " ";
    }
    else{
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10)
    return `${day}.${month}.${year}`
    }
}

function preloadSpaceInputs(e){
    const spaceIndex = getSpaceIndex(e);
    const thisSpace = getSpaceByIndex(spaceIndex);
    spaceTitleInput.value = thisSpace.title;
    spaceIconInput.value = thisSpace.icon;
}

function openEditSpaceForm(e){
    setInfoMode("edit");
    spaceFormLegend.textContent="Up for a change?"; 
    spaceFormBtn.textContent="Save changes";
    const spaceId = getObjectId(e);
    spaceDialog.dataset.id = spaceId;
    preloadSpaceInputs(e);
    spaceDialog.showModal();
}

function openAddSpaceForm(){
    setInfoMode("add");
    spaceForm.reset();
    spaceFormLegend.textContent="Create space for your tasks"; 
    spaceFormBtn.textContent="Add space";
    spaceDialog.showModal();
}


function preloadTaskInputs(e){
    const taskIndex = getTaskIndex(e);
    const thisTask = getTaskByIndex(taskIndex);
    taskTitleInput.value = thisTask.title;
    taskDateInput.value = thisTask.dueDate;
    taskPrioritySelect.value = thisTask.priority;
    taskDescInput.value = thisTask.description
    taskSpaceSelect.value = Number(thisTask.spaceId);
}

function openEditTaskForm(e){
    e.stopPropagation();
    setInfoMode("edit");
    taskFormLegend.textContent="Up for a change?"; 
    taskFormBtn.textContent="Save changes";
    const taskId = getObjectId(e);
    taskDialog.dataset.id = taskId;
    preloadTaskInputs(e);
    taskDialog.showModal();
}

function openAddTaskForm(){
    setInfoMode("add");
    taskForm.reset();
    taskFormLegend.textContent="Create task"; 
    taskFormBtn.textContent="Add task";
    taskDialog.showModal();
}

function DOMdisplayTaskNumber(taskNumber){
    if(taskNumber === 0){
        tasksCounterContainer.textContent="Yay! No tasks"
    } else if (taskNumber === 1){
        tasksCounterContainer.textContent="1 task left:"
    } else {
        tasksCounterContainer.textContent=`${taskNumber} tasks left:`
    }
}

function toggleSidebar(){
    sidebar.classList.toggle("open");
    saveToLocalStorage("sidebar-state", sidebar.classList, false)
}

function updateOpenedSpaceStyle(){
    const spaceRows = document.querySelectorAll(".space-row");
    const openedSpaceId = getOpenedSpaceId();
    console.log(openedSpaceId)
    spaceRows.forEach(spaceRow => {
        spaceRow.classList.remove("active");
        if (Number(spaceRow.dataset.id) === Number(openedSpaceId)){
            spaceRow.classList.add("active");
        }
    }
    )
}

export {DOMdisplayDefaultSpace, DOMdisplayCustomSpace, DOMdisplayTaskRow, DOMdisplayTaskInfo, handleTaskDoneClick, deleteTask, deleteSpace, updateSpaceSelectOptions, DOMdisplayTasksInfo, deleteObjTasksFromSpace, openAddSpaceForm, DOMdisplayCustomSpaces, openAddTaskForm, openEditTaskForm, toggleSidebar, updateOpenedSpaceStyle}

