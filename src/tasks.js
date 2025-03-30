
import {getObjectId} from "./viewer-functions.js"
const TasksObj = [];
function Task(taskTitle, taskDueDate, taskPriority, taskDescription, taskChecked, taskSpace){
    this.title = taskTitle;
    this.dueDate = taskDueDate;
    this.priority = taskPriority;
    this.description = taskDescription;
    this.doneStatus = taskChecked;
    this.space = taskSpace;
    this.id = generateTaskId();
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
    return tasks.findIndex(task => 
        task.id === taskId
      );
}

function deleteTaskObj(e){
    const taskIndex = getTaskIndex(e)
    const tasks = getTasksObj();
    tasks.splice(taskIndex, 1);
}
// function getNumberOfTasks(space){

// }
export {createTaskObject, getTaskObjById, changeTaskDoneStatus, deleteTaskObj}





