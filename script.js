document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){

const input=document.getElementById("taskInput");
const taskText=input.value;

if(taskText==="") return;

createTask(taskText,false);

saveTask(taskText,false);

input.value="";

updateCounter();
}

function createTask(text,done){

const li=document.createElement("li");

if(done){
li.classList.add("completed");
}

const span=document.createElement("span");
span.textContent=text;

span.onclick=function(){
li.classList.toggle("completed");
updateStorage();
};

const del=document.createElement("button");
del.textContent="X";

del.onclick=function(){
li.remove();
updateStorage();
updateCounter();
};

li.appendChild(span);
li.appendChild(del);

document.getElementById("taskList").appendChild(li);
}

function saveTask(text,done){

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.push({text:text,done:done});

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.forEach(task=>{
createTask(task.text,task.done);
});

updateCounter();
}

function updateStorage(){

let tasks=[];

document.querySelectorAll("#taskList li").forEach(li=>{
tasks.push({
text:li.innerText.replace("X","").trim(),
done:li.classList.contains("completed")
});
});

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateCounter(){

const count=document.querySelectorAll("#taskList li").length;

document.getElementById("taskCounter").textContent=count+" tasks";
}