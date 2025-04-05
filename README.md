# todo-list
FIX BUG WITH SPACE ID
HANDLE UPDATE SELECT - IS BROKEN
events to save: edit space and tasks (2 places)

see if adding how many tasks to storage really needed

Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!


Add form check or default options 
Add space title before tasks counter???
Add sidebar hiding
prevent buttons from shrinking

 saveToLocalStorage("spaces", spaces, true);
    
    saveToLocalStorage("tasks", tasks, true);

    saveToLocalStorage("tasks-num", numberOfTasks, false);

    saveToLocalStorage("space-id", openedSpaceId, false);

    about tasks id: firstly 3 tasks are created and given id. secondly no tasks are created so no given id