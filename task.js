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

function init(){
    console.log("Task Manager")

    // load data

    // hook events
    $("#iImportant").click(toggleImportance);
    $("#btnToggle").click(toggleVisibility);
}

window.onload = init;