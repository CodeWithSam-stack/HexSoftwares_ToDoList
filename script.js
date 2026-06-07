const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyState = document.getElementById("emptyState");

let tasks =
JSON.parse(localStorage.getItem("glowTasks")) || [];

document.getElementById("date").textContent =
new Date().toDateString();

function saveTasks(){
    localStorage.setItem(
        "glowTasks",
        JSON.stringify(tasks)
    );
}

function updateStats(){

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
    tasks.filter(task => task.completed).length;

    emptyState.style.display =
    tasks.length === 0
    ? "block"
    : "none";
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.className =
        task.completed
        ? "task completed"
        : "task";

        li.innerHTML = `
            <span>
                ${
                    task.completed
                    ? '<span class="tick">✓</span>'
                    : ''
                }
                ${task.text}
            </span>

            <div class="actions">
                <button class="done">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="delete">
                    Delete
                </button>
            </div>
        `;

        li.querySelector(".done")
        .addEventListener("click",()=>{

            tasks[index].completed =
            !tasks[index].completed;

            saveTasks();
            renderTasks();
        });

        li.querySelector(".delete")
        .addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask(){

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

addTaskBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    e=>{
        if(e.key === "Enter"){
            addTask();
        }
    }
);

renderTasks();