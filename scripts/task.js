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

    var title = $("#txtTitle").val();
    var desc = $("#txtDescription").val();
    var category = $("#selCategory").val();
    var startDate = $("#selStartDate").val();
    var dueDate = $("#selDueDate").val();
    var color = $("#selColor").val();

    // data validation
    if(title.length < 5){
        $("#alertError").removeClass("hide");
        setTimeout(function(){
            $("#alertError").addClass("hide");},
        5000);
        return; //stops function
    }

    let task = new Task(isImportant, title, desc, category, startDate, dueDate, color)
    console.log(task);

    //send task to server

    //display the task
    
    saveTask(task);
}

function displayTask(task){
    let syntax = `
    <div class="task" style = "border-left: 6px solid ${task.color}">
        <div class="info">
            <h4>${task.title}</h4>
            <label>Category: ${task.category}</label>
            <label>${task.description}</label>
        </div>
        <div class="dates">
        <label>Start Date: ${task.startDate}</label>
        <label>Due Date: ${task.dueDate}</label>
        
        </div>
    </div>
    <br>
    `

        $("#task-container").append(syntax);
        
}

function saveTask(task){

    let jsonData = JSON.stringify(task);

    $.ajax({
        type:"POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: jsonData,
        contentType:"application/json",

        success: function(data){
            displayTask(task);
            clearForm();
        },
        error: function(errorDetails){
            console.log(errorDetails);
        },
    });
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#selCategory").val("");
    $("#selStartDate").val("");
    $("#selDueDate").val("");
    $("#selColor").val("#000000");
}

function loadTasks(){
    $.ajax({
        type:"GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(jsonData){

            let data = JSON.parse(jsonData);

            for(let i=0;i<data.length;i++){
                let task = data[i];
                if(task.owner == "Von"){
                displayTask(task);
                };
            }
        },
        error: function(errorDetails){
            console.error(errorDetails);
        }
    });
}

function init(){
    console.log("Task Manager change")

    // load data
    loadTasks();
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