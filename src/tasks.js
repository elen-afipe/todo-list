
import {getObjectId} from "./viewer-functions.js"
const TasksObj = [];
function Task(taskTitle, taskDueDate, taskPriority, taskDescription, taskSpace){
    this.title = taskTitle;
    this.dueDate = taskDueDate;
    this.priority = taskPriority;
    this.description = taskDescription;
    this.doneStatus = false;
    this.space = taskSpace;
    this.id = generateTaskId();
}
const TaskPrioritySymbols = {
    low: "🟢",
    medium: "🟡",
    high: "🔴",
}

function getTaskPrioritySymbols(){
    return TaskPrioritySymbols;
}

function getTasksObj(){
    return TasksObj;
}

let currentTaskId = 0;
function generateTaskId(){
    currentTaskId+=1;
    return currentTaskId;
}
function createTaskObject(taskTitle, taskDueDate, taskPriority, taskDescription, taskChecked, taskSpace){
    const newTask = new Task(taskTitle, taskDueDate, taskPriority, taskDescription, taskChecked, taskSpace);
    addTaskToTasks(newTask);
    return newTask;
}

function addTaskToTasks(task){
    TasksObj.push(task);
}

function getTaskObjById(taskId){
    const id = parseInt(taskId);
    const tasks = getTasksObj();
    const index = tasks.findIndex(task => 
        task.id === id
      );
    return tasks[index];
}
function changeTaskDoneStatus(task){
    task.doneStatus = !task.doneStatus;
}

function getTaskIndex(e){
    const taskId = getObjectId(e);
    const tasks = getTasksObj();
    const index = tasks.findIndex(task => 
        Number(task.id) === Number(taskId)
      );
      if (index === -1) { // -1 means no match
        return "no match";
    }
    return index;
}


function deleteTaskObj(e){
    const taskIndex = getTaskIndex(e);
    console.log(taskIndex)
    const tasks = getTasksObj();
    console.log(tasks);
    if(taskIndex !== "no match"){
        tasks.splice(taskIndex, 1);
        console.log(tasks);
    }
}
// function getNumberOfTasks(space){

// }
export {createTaskObject, getTaskObjById, changeTaskDoneStatus, deleteTaskObj, getTaskPrioritySymbols}





