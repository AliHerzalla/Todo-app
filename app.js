let input = document.getElementById("todo-input");
let tasksContainer = document.querySelector(".todo-tasks");
let checkMark = document.querySelector(".check-mark");
let task = document.querySelectorAll(".task");
let clearBtn = document.querySelector(".items-clear");
let itemsCounter = document.querySelector(".items-count");
let allData = document.querySelector(".all-data");
let activeData = document.querySelector(".active-data");
let completedData = document.querySelector(".completed-data");
let fillterBox = document.querySelectorAll(".item-fillter p");

let arrayOfData = [];
let activeArrayData = [];
let completedArrayData = [];

if (localStorage.getItem("task-data")) {
    arrayOfData = JSON.parse(localStorage.getItem("task-data"));
}

getDataFromLocalStorage();
countItemsInList();

function addItems(event) {
    event.preventDefault();

    if (input.value != "" && input.value.trim().length != 0) {
        addTaskToArray(input.value);
        input.value = "";
        countItemsInList();

        fillterBox.forEach((e) => {
            e.classList.remove("active");
        });
        allData.classList.add("active");

    }
}

tasksContainer.addEventListener("click", e => {
    if (e.target.classList.contains("check-mark")) {
        countItemsInList();
        e.target.parentElement.parentElement.classList.toggle("done");

        if (e.target.parentElement.parentElement.className == "task done") {
            e.target.lastChild.style.display = "block";
        } else {
            e.target.lastChild.style.display = "none";
        }

        toggleStatusTask(e.target.parentElement.parentElement.getAttribute("task-id"));
    }

    else if (e.target.classList.contains("task")) {
        countItemsInList();
        e.target.classList.toggle("done");

        if (e.target.className == "task done") {
            document.querySelector(".check-mark .image").style.display = "block";
        } else {
            document.querySelector(".check-mark .image").style.display = "none";
        }

        toggleStatusTask(e.target.getAttribute("task-id"));
    }

    else if (e.target.className == "image") {
        e.target.parentElement.parentElement.parentElement.classList.toggle("done");
        countItemsInList();
        if (e.target.parentElement.parentElement.parentElement.className == "task done") {
            e.target.style.display = "block";
        } else {
            e.target.style.display = "none";
        }

        toggleStatusTask(e.target.parentElement.parentElement.getAttribute("task-id"));
    }
    countItemsInList();
    addDataToTaskContainer(arrayOfData);

    fillterBox.forEach((e) => {
        e.classList.remove("active");
    });
    allData.classList.add("active");

});

function addTaskToArray(text) {
    const data = {
        id: Date.now(),
        inputValue: text,
        isCompleted: false,
    };

    arrayOfData.push(data);

    addDataToTaskContainer(arrayOfData);

    setDataToLocalStorage(arrayOfData);
}

function addDataToTaskContainer(array) {
    tasksContainer.innerHTML = "";

    array.forEach(element => {

        // create task div
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.setAttribute("task-id", element.id);

        //create check div
        let checkDiv = document.createElement("div");
        checkDiv.className = "check";
        let checkMark = document.createElement("div");
        checkMark.className = "check-mark";

        //create check-img element
        let checkImage = document.createElement("img");
        checkImage.src = "./images/icon-check.svg";
        checkImage.className = "image";

        //create text div and set it.
        let textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.textContent = element.inputValue;

        //append to task container
        taskDiv.append(checkDiv, textDiv);
        checkDiv.appendChild(checkMark);
        checkMark.appendChild(checkImage);
        tasksContainer.appendChild(taskDiv);

        if (element.isCompleted) {
            checkImage.style.display = "block";
            taskDiv.className = "task done";
        } else {
            checkImage.style.display = "none";
            taskDiv.className = "task";
        }
    });
}

clearBtn.addEventListener("click", e => {
    clearData();
});

function setDataToLocalStorage(arrayOfData) {
    localStorage.setItem("task-data", JSON.stringify(arrayOfData));
}

function getDataFromLocalStorage() {
    let data = localStorage.getItem("task-data");

    if (data) {
        addDataToTaskContainer(JSON.parse(data));
    }
}

function toggleStatusTask(taskID) {
    arrayOfData.forEach(e => {
        if (e.id == taskID) {
            e.isCompleted = !e.isCompleted;
        }
    });
    setDataToLocalStorage(arrayOfData);
}

function clearData() {
    localStorage.clear();
    arrayOfData = [];
    addDataToTaskContainer(arrayOfData);

    fillterBox.forEach((e) => {
        e.classList.remove("active");
    });
    allData.classList.add("active");

    countItemsInList();
}

function countItemsInList() {
    let counter = 0;

    arrayOfData.forEach(e => {
        if (!e.isCompleted) {
            counter += 1;
        }
    });
    itemsCounter.textContent = counter;
    addDataToTaskContainer(arrayOfData);
}

allData.addEventListener("click", e => {

    fillterBox.forEach((e) => {
        e.classList.remove("active");
    });
    e.target.classList.add("active");

    addDataToTaskContainer(arrayOfData);
});

activeData.addEventListener("click", e => {

    fillterBox.forEach((e) => {
        e.classList.remove("active");
    });
    e.target.classList.add("active");

    activeArrayData = [];
    arrayOfData.map((e) => {
        if (!e.isCompleted) {
            activeArrayData.push(e);
        }
    });
    console.log(activeArrayData);
    addDataToTaskContainer(activeArrayData);
});

completedData.addEventListener("click", e => {

    fillterBox.forEach((e) => {
        e.classList.remove("active");
    });
    e.target.classList.add("active");

    completedArrayData = [];
    arrayOfData.map((e) => {
        if (e.isCompleted) {
            completedArrayData.push(e);
        }
    });
    console.log(completedArrayData);
    addDataToTaskContainer(completedArrayData);
});

