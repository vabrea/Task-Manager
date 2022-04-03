var importantIcon = "fas fa-star";
var nonImportantIcon = "far fa-star";
var isImportant = true;
var isPaneVisible = true;

function toggleImportance(){
    if(isImportant){
        $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
        isImportant = false;
    }
    else{
        $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
        isImportant = true;
    }
}

function toggleVisibility(){

    if(isPaneVisible){
        $("#sect-form").hide();
        isPaneVisible = false;
    } else {
        $("#sect-form").show();
        isPaneVisible = true;
    }
}
function createTask(){
    console.log("Task Saved");

    var title = $("#txtTitle").val();
    var desc = $("#txtDescription").val();
    var category = $("#selCategory").val();
    var startDate = $("#selStartDate").val();
    var dueDate = $("#selDueDate").val();
    var color = $("#selColor").val();

    let task = new Task(isImportant, title, desc, category, startDate, dueDate, color)
    console.log(task);

    //send task to server

    //display the task
    displayTask(task);
}

function displayTask(task){
    let syntax = `
    <div class="task">
        <div class="info">
            <h4>${task.title}</h4>
            <label>Category: ${task.category}</label>
            <label>${task.description}</label>
        </div>
        <div class="dates">
        <label>Start Date: ${task.startDate}</label>
        <label>Due Date: ${task.dueDate}</label>
        <button id="deleteBtn">Completed</button>
        </div>
    </div>
    <br>
    `

        $("#task-container").append(syntax);
}

function init(){
    console.log("Task Manager change")

    // load data

    // hook events
    $("#iImportant").click(toggleImportance);
    $("#btnToggle").click(toggleVisibility);
    $("#btnSave").click(createTask);
}

function test(){
    $.ajax({
        type: "GET",
        url:"https://restclass.azurewebsites.net/api/test",
        success: function(response){
            console.log("Server says", response)
        },
        error: function(errorDetails){
            console.log(errorDetails);
        }  
    });
}


window.onload = init;