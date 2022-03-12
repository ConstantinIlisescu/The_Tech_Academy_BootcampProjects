function getReceipt() {
    //This initializes the string so it can get passed from function to function, growing line by line into a full receipt.
    var text1 = "<h3>You Ordered: </h3>";
    var runningTotal = 0;
    var sizeTotal = 0;

    //check wich option was selected and hold the value + concatenate to text1 string.
    var sizeArray = document.getElementsByClassName("size");
    for (var i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            var selectedSize = sizeArray[i].value;
            text1 = text1 + selectedSize + "<br>"
        }
    }

    //assigning a price based on pizza size 
    if (selectedSize === "Personal Pizza") {
        sizeTotal = 6;
    } else if (selectedSize === "Small Pizza") {
        sizeTotal = 8;
    } else if (selectedSize === "Medium Pizza") {
        sizeTotal = 10;
    } else if (selectedSize === "Large Pizza") {
        sizeTotal = 14;
    } else if (selectedSize === "Extra Large Pizza") {
        sizeTotal = 16;
    }

    runningTotal = sizeTotal
    console.log(selectedSize + " = $" + sizeTotal + ".00");
    console.log("size text1: " + text1);
    console.log("subtotal: $" + runningTotal + ".00");
    //These variables will get passed on each function
    getTopping(runningTotal, text1);
};

function getTopping(runningTotal, text1) {
    var toppingTotal = 0;
    var selectedTopping = [];
    var toppingArray = document.getElementsByClassName("toppings");
    for (var j = 0; j < toppingArray.length; j++) {
        if (toppingArray[j].checked) {
            selectedTopping.push(toppingArray[j].value);
            console.log("selected topping item: (" + toppingArray[j].value + ")")
            text1 = text1 + toppingArray[j].value + "<br>"
        }
    }

    // 2 free toppings 
    var toppingCount = selectedTopping.length;
    if (toppingCount > 2) {
        toppingTotal = (toppingCount - 2);
    } else {
        toppingTotal = 0;
    }

    //concatenate the strings and insert the HTML elements in the cart div.
    runningTotal = (runningTotal + toppingTotal);
    console.log("total selected topping items: " + toppingCount);
    console.log(toppingCount + "topping - 1 free topping = $" + toppingTotal + ".00");
    console.log("topping text1: " + text1);
    console.log("Purchase Total: $" + runningTotal + ".00");
    document.getElementById("showText").innerHTML = text1;
    document.getElementById("totalPrice").innerHTML = "<h3> total: <strong>$" + runningTotal + ".00" + "</strong></h3>"
}