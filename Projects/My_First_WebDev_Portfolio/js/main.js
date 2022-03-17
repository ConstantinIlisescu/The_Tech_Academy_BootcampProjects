//Open and close the popUp form 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
// END

//Open and close the project photo slide form 
function openSlide() {
    document.getElementById("slideShow").style.display = "block";
    document.getElementById("main").style.display = "none";

}

function closeSlide() {
    console.log("I was clicked")
    document.getElementById("slideShow").style.display = "none";
    document.getElementById("main").style.display = "block";
}

// slides the pictures once the DOM is loaded and the button hets pressed
$("#slideShow div:gt(0)").hide();

setInterval(function () {
    $('#slideShow div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#slideShow');
}, 3000);

// END



