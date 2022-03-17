


//var myVar = ["dog", { dog: "ham", name: "Mofot", age: 33 }, 105]

// **** JSON.stringify() method converts the JS object into a JSON string  ****/
//JSONobject = JSON.stringify(myVar)
// document.getElementById("todos").innerHTML = JSONfile;

// **** JSON.parse() method converts the JSON stirng into a JS object ****/
//JSobject = JSON.parse(JSONobject)
// document.getElementById("todos").innerHTML = JSobject[1].name;

// **** localStorage.setItem() and localStorage.getItem() methods****/
//set the data to e stored locally in the browser
//localStorage.setItem("name", "mofot");

//use the key to return the value
//document.getElementById("todos").innerHTML = localStorage.getItem("name");


// **** TODO App add and display values ****//

//displays the inputed task when the 'Add Item' button is clicked//
document.getElementById('add').addEventListener('click', add);

//Adds the inputed task to the get_totos function array//
function add() {

    //takes the inputed task and creates a value of it
    var task = document.getElementById('task').value;

    var todos = get_todos();

    //adds the new task to the end of the array
    todos.push(task)

    //converts the task input to a JSON string
    localStorage.setItem('webSavedTodolist', JSON.stringify(todos));

    //clears the input screen
    document.getElementById('task').value = "";

    // call show() function
    show();
}


//Gets the task from input//
function get_todos() {
    //creates an array of task that are inputed
    var todos = new Array;

    //pulls the task that was saved in the web browser memory
    var todos_str = localStorage.getItem('webSavedTodolist');

    //if input not null, JSON.parse will comunicate with the browser memory to make the task a JS object
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }

    //console.log(todos)

    return todos;
}

//keeps the tasks permanently displayed on the screen//
function show() {
    //sets the task that was retrieved as a variable
    var todos = get_todos();


    //this sets up each task as an unordered list HTML element
    var html = '<ul>';

    //loops through the task and displays each task in the order that was inputed
    for (var i = 0; i < todos.length; i++) {
        html += '<li><button onclick="remove(' + i + ')" class="remove" id = "' + i + '">x</button>' + todos[i] + '</li>';
    };
    html += '</ul>'

    //dispaly the task as a list
    document.getElementById('todos').innerHTML = html;


}


// **** TODO App delete values ****//


function remove(id) {

    // assigns the curent task array to tools
    var todos = get_todos();

    //removes the item form the array at index 'id'
    todos.splice(id, 1);
    localStorage.setItem('webSavedTodolist', JSON.stringify(todos));


    show();

    return false;

}


// **** End of TODO App delete values ****//



//this keeps the inputs displayed permanently//
show();

// **** End of TODO App add and display values ****//





