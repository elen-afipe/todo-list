import "./style.css";
// create initial DOM content
import "./dom-content.js"
import {filteredSpaces, customSpaces, tasksContainer} from "./dom-content.js";
import { DOMdisplayCustomSpace, DOMdisplayDefaultSpace, DOMdisplayTaskRow } from "./dom-manipulation";
import { createSpaceObject } from "./spaces";
import { createTaskObject } from "./tasks";
const allSpace = createSpaceObject("All", "calendar");
const todaySpace = createSpaceObject("Today", "calendar2");
const weekSpace = createSpaceObject("Week", "calendar2");
const monthSpace = createSpaceObject("Month", "calendar2");

const mySpace = createSpaceObject("My project", "calendar2");

DOMdisplayDefaultSpace(allSpace, filteredSpaces);
DOMdisplayDefaultSpace(todaySpace, filteredSpaces);
DOMdisplayDefaultSpace(weekSpace, filteredSpaces);
DOMdisplayDefaultSpace(monthSpace, filteredSpaces);

DOMdisplayCustomSpace(mySpace, customSpaces);

const task1 = createTaskObject("Think of project logic", "17/09/08", "1", "Just another project", false, "My project")
DOMdisplayTaskRow(task1, tasksContainer)
const task2 = createTaskObject("Gather assets", "18/09/08", "2", "Just another task", false, "My project")
DOMdisplayTaskRow(task2, tasksContainer)