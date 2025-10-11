const { log } = require('console');
const fs = require('fs');
const filePath = "./tasks.json"

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
    log("Tasks updated successfully !");
}

const addTask = (task) => {
    const tasks = loadTasks()
    tasks.push({task})
    saveTasks(tasks)
}

const listTask = () => {
    const tasks = loadTasks()
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task}`);
    });
}

const removeTask = (taskIndex) => {
    const tasks = loadTasks()
    tasks.splice(taskIndex - 1, 1)
    log("Task removed successfully !");
    saveTasks(tasks)
}

const command = process.argv[2];
const argument = process.argv[3];


if(command === 'add'){
    addTask(argument)
}else if(command === 'list'){
    listTask()
}else if(command === 'remove'){
    removeTask(parseInt(argument))
}else{
    console.log("Command not found !");
}