const inputBox = document.getElementById("input-box");
const deadlineBox = document.getElementById("deadline-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    const deadline = deadlineBox.value;

    if (taskText === '') {
        alert("You must write something!");
        return;
    }

    // Create li
    const li = document.createElement("li");

    // Wrapper for task + deadline
    const contentWrapper = document.createElement("div");
    contentWrapper.style.display = "flex";
    contentWrapper.style.justifyContent = "space-between";
    contentWrapper.style.alignItems = "center";
    contentWrapper.style.width = "100%";

    // Task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    contentWrapper.appendChild(taskSpan);

    // Deadline
    if (deadline) {
        const deadlineSpan = document.createElement("span");
        deadlineSpan.className = "deadline";
        deadlineSpan.textContent = `Due: ${deadline}`;
        contentWrapper.appendChild(deadlineSpan);
    }

    li.appendChild(contentWrapper);

    // Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "\u00d7";
    li.appendChild(deleteBtn);

    // Add to list
    listContainer.appendChild(li);

    // Clear input
    inputBox.value = "";
    deadlineBox.value = "";

    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();