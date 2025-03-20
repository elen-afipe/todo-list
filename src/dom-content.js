import { DOMdisplaySpace, DOMdisplayTaskRow } from "./dom-manipulation";
import { createSpaceObject } from "./spaces";
import { createTaskObject } from "./todo";
const body = document.querySelector("body");

// navigation
const nav = document.createElement("nav");
nav.classList.add("navigation");

const sideBtn = document.createElement("button");
sideBtn.classList.add("side-btn", "svg");
sideBtn.textContent="side";
sideBtn.title="Toggle sidebar";
sideBtn.ariaLabel="Toggle sidebar";

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
addTaskBtn.classList.add("add-task", "btn");
addTaskBtn.ariaLabel="Add New Task";
addTaskBtn.title = "Add New Task";
addTaskBtn.textContent="add";

todoContainer.append(headerRow, taskRow1, tasksContainer, addTaskBtn)

// sidebar
const sidebar = document.createElement("aside");
sidebar.classList.add("sidebar");

const filteredSpaces = document.createElement("div");
filteredSpaces.classList.add("space-container")
const customSpaces = document.createElement("div");
customSpaces.classList.add("space-container");

const allSpace = createSpaceObject("All", "calendar");
const todaySpace = createSpaceObject("Today", "calendar2");
const weekSpace = createSpaceObject("Week", "calendar2");
const monthSpace = createSpaceObject("Month", "calendar2");

DOMdisplaySpace(allSpace, filteredSpaces);
DOMdisplaySpace(todaySpace, filteredSpaces);
DOMdisplaySpace(weekSpace, filteredSpaces);
DOMdisplaySpace(monthSpace, filteredSpaces);

sidebar.append(filteredSpaces, customSpaces);
const task = createTaskObject("Think of project logic", "17/09/08", "1", "Just another project", false, "All")
DOMdisplayTaskRow(task, tasksContainer)
main.append(sidebar, todoContainer)
body.append(nav, main)

