function DOMdisplaySpace(spaceObj, container){
    const spacesContainer = container;
    const newSpace = spaceObj;
    const spaceRow = document.createElement("div");
    spaceRow.classList.add("space-row");

    const spaceLogo = document.createElement("div");
    const spaceIcon = document.createElement("img");
    spaceIcon.classList.add("space-icon", "svg");
    // spaceIcon.src = newSpace.icon;
    const spaceName = document.createElement("div");
    spaceName.classList.add("space-name");
    spaceName.textContent= newSpace.name;

    const spaceBtns = document.createElement("div");
    
    const editSpaceBtn = document.createElement("button");
    editSpaceBtn.classList.add("edit-space", "btn");
    editSpaceBtn.ariaLabel="Edit Space";
    editSpaceBtn.title = "Edit Space";
    editSpaceBtn.textContent="ed";

    const deleteSpaceBtn = document.createElement("button");
    deleteSpaceBtn.classList.add("delete-space", "btn");
    deleteSpaceBtn.ariaLabel="Delete Space";
    deleteSpaceBtn.title = "Delete Space";
    deleteSpaceBtn.textContent="del";

    spaceBtns.append(editSpaceBtn, deleteSpaceBtn)
    spaceLogo.append(spaceIcon, spaceName)
    spaceRow.append(spaceLogo, spaceBtns)
    spacesContainer.append(spaceRow);
}

function DOMdisplayTaskRow(taskObj, container){
    const tasksContainer = container;
    const newTask = taskObj;
    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");

    const leftContainer = document.createElement("div");
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.textContent= newTask.title;
    leftContainer.append(doneBtn, taskName);

    const rightContainer = document.createElement("div");

    const dueDate = document.createElement("div");
    dueDate.classList.add("task-date");

    const priority = document.createElement("img");
    priority.classList.add("task-priority");

    
    const taskBtns = document.createElement("div");
    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("edit-task", "btn");
    editTaskBtn.ariaLabel="Edit Task";
    editTaskBtn.title = "Edit Task";
    editTaskBtn.textContent="ed";

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-task", "btn");
    deleteTaskBtn.ariaLabel="Delete Task";
    deleteTaskBtn.title = "Delete Task";
    deleteTaskBtn.textContent="del";

    const infoTaskBtn = document.createElement("button");
    infoTaskBtn.classList.add("info-task", "btn");
    infoTaskBtn.ariaLabel="Show Task Details";
    infoTaskBtn.title = "Show Task Details";
    infoTaskBtn.textContent="del";

    taskBtns.append(infoTaskBtn, editTaskBtn, deleteTaskBtn)
    rightContainer.append(dueDate, priority, taskBtns)
    taskRow.append(leftContainer, rightContainer)
    tasksContainer.append(taskRow);
}

function DOMdisplayTaskInfo(task){
const thisTask = task;
const taskCard = document.createElement("dialog");
taskCard.classList.add("task-card");
const taskContent = document.createElement("div");
taskContent.classList.add("dialog-content");

const taskHeader = document.createElement("header");
const spaceTitle = document.createElement("h1");
spaceTitle.textContent = thisTask.space;
const taskBtns = document.createElement("div");
const editTaskBtn = document.createElement("button");
editTaskBtn.classList.add("edit-task", "btn");
editTaskBtn.ariaLabel="Edit Task";
editTaskBtn.title = "Edit Task";
editTaskBtn.textContent="ed";

const deleteTaskBtn = document.createElement("button");
deleteTaskBtn.classList.add("delete-task", "btn");
deleteTaskBtn.ariaLabel="Delete Task";
deleteTaskBtn.title = "Delete Task";
deleteTaskBtn.textContent="del";

const closeTaskInfoBtn = document.createElement("button");
closeTaskInfoBtn.classList.add("close-info", "btn");
closeTaskInfoBtn.ariaLabel="Hide Task Details";
closeTaskInfoBtn.title = "Hide Task Details";
closeTaskInfoBtn.textContent="cl";

taskBtns.append(editTaskBtn, deleteTaskBtn, closeTaskInfoBtn)
taskHeader.append(spaceTitle, taskBtns)

const taskMain = document.createElement("main");
const taskHeadline = document.createElement("div");
const rightSide = document.createElement("div");
const doneBtn = document.createElement("button");
doneBtn.classList.add("done-btn");
const taskTitle = document.createElement("h1");
rightSide.append(doneBtn, taskTitle);

const leftSide = document.createElement("div");
const taskPriority = document.createElement("div");
taskPriority.textContent = thisTask.priority;
const taskDueDate = document.createElement("div");
taskDueDate.textContent = thisTask.dueDate;
leftSide.append(taskPriority, taskDueDate)

const taskDescription = document.createElement("div");
taskDescription.textContent = thisTask.description;
taskHeadline.append(rightSide, leftSide)
taskMain.append(taskHeadline, taskDescription)
taskContent.append(taskHeader, taskMain)
taskCard.append(taskContent)
}

export {DOMdisplaySpace, DOMdisplayTaskRow, DOMdisplayTaskInfo}