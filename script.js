// Array zum Speichern der Aufgaben
let tasks = [];

// Funktion zum Laden der Aufgaben aus dem Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks = storedTasks;
    }
}

// Funktion zum Speichern der Aufgaben im Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funktion zum Hinzufügen einer Aufgabe
function addTask() {
    // Input-Feld abfragen
    let newTaskInput = document.getElementById("new-task");
    let newTask = newTaskInput.value.trim();



    // Neue Aufgabe zum Array hinzufügen
    if (newTask) {
        tasks.push(newTask);
        newTaskInput.value = "";
        saveTasks(); // Aktualisierte Aufgaben im Local Storage speichern
        renderTasks();
    }

}

// Beim Laden der Seite Aufgaben aus dem Local Storage laden
loadTasks();
renderTasks();

// Funktion zum Überprüfen des Accesscodes
function checkAccess(code) {
    const storedCode = localStorage.getItem('accessCode');
    return code === storedCode;
}

// Funktion zum Setzen des Passworts
function setAccessCode() {
    let code = prompt("Bitte geben Sie ein Zugangspasswort für diese Seite ein.");
    localStorage.setItem('accessCode', code);
    alert("Das Passwort wurde erfolgreich gesetzt.");
}

// Überprüfen, ob das Passwort bereits gesetzt wurde
if (!localStorage.getItem('accessCode')) {
    setAccessCode();
}

// Event-Listener für das Hinzufügen von Aufgaben
document.getElementById("add-task").addEventListener("click", function(event) {
    // Überprüfen, ob der Benutzer zugriffsberechtigt ist
    let code = prompt("Bitte geben Sie den Zugangscode ein, um eine neue Aufgabe zu erstellen.");
    if (checkAccess(code)) {
        addTask();
    } else {
        alert("Falsches Passwort. Sie haben keine Zugriffsberechtigung für diese Seite.");
    }
});

function renderTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";


    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        // Checkbox erstellen und dem Listen-Element hinzufügen
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.appendChild(checkbox);

        // Text der Aufgabe erstellen und dem Listen-Element hinzufügen
        let taskText = document.createElement("span");
        taskText.innerText = task;
        li.appendChild(taskText);

        // Mülleimer-Bild erstellen und dem Listen-Element hinzufügen
        let trash = document.createElement("img");
        trash.src = "https://cdn-icons-png.flaticon.com/512/4231/4231212.png";
        li.appendChild(trash);

        checkbox.addEventListener("change", function(event) {
            if (checkbox.checked) {
                taskText.classList.add("completed");
            } else {
                taskText.classList.remove("completed");
            }
        });

        // Event-Listener für das Klicken auf das Mülleimer-Bild hinzufügen
        trash.addEventListener("click", function(event) {
            // Überprüfen, ob der Benutzer zugriffsberechtigt ist
            let code = prompt("Bitte geben Sie den Zugangscode ein, um diese Aufgabe zu löschen.");
            if (checkAccess(code)) {
                // Aufgabe aus dem Array entfernen
                tasks.splice(index, 1);
                saveTasks(); // Aktualisierte Aufgaben im Local Storage speichern
                renderTasks();
            } else {
                alert("Falsches Passwort. Sie haben keine Zugriffsberechtigung für diese Seite.");
            }
        });

        taskList.appendChild(li);
    });

}