
const Tasks = [];
function Task(taskTitle, taskDueDate, taskPriority, taskDescription, taskChecked, taskSpace){
    this.title = taskTitle;
    this.dueDate = taskDueDate;
    this.priority = taskPriority;
    this.description = taskDescription;
    this.doneStatus = taskChecked;
    this.space = taskSpace;
}

function createTaskObject(taskTitle, taskDueDate, taskPriority, taskDescription, taskChecked, taskSpace){
    const newTask = new Task(taskTitle, taskDueDate, taskPriority, taskDescription, taskChecked, taskSpace);
    return newTask;
}

function addTaskToTasks(task){
    Tasks.push(task);
}

export {createTaskObject}





