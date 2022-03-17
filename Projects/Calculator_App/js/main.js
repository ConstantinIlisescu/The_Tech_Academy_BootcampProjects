//Object to keep track of value
const Calculator = {
    //display 0 on the screen
    Display_Value: '0',

    //Hold the first operand for any expressions, set to null for now
    First_Operand: null,

    //Checks whether or not the seccond operand has been input
    Wait_Second_Operand: false,

    //Holds the operator
    operator: null,
}

//Modifies values each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;

    //Check if the Wait_seccond_Operand is true and set Display_Value to the key that was clicked.
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        //Adds onto it if above is false
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

//This section handles decimal points
function Input_Decimal(dot) {
    //This ensures that accidental clicking of decimal point doesn't cause bugs in the operation
    if (Calculator.Wait_Second_Operand === true) return;
    if (!Calculator.Display_Value.includes(dot)) {
        //If the Dispaly_Value does not contain a decimal point we want to add a decimal point
        Calculator.Display_Value += dot;
    }
}

//This section handles operators
function Handle_Operator(Next_Operator) {
    const { First_Operand, Display_Value, operator } = Calculator;

    //When an operator key is pressed, it converts the currnt number displayed on the screen to a number and then strores the result in Calculator.First_Operand if it doesn't exist
    const Value_of_Input = parseFloat(Display_Value);

    //Check if an operator already exists and if Wait_Second_Operand is true, then updates the operator and exits from function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }

    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    } else if (operator) {//check if an operator already exists
        const Value_New = First_Operand || 0;


        //If operator exists, property lookup is performed for the operator in the Perform_Calculation object and the function that matches theoperator is executed
        let result = Perform_Calculation[operator](Value_New, Value_of_Input);

        //add a fixed amount of numbers after the decimal
        result = (result * 1).toString()
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }

    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

//This function updates the screen with the contents of Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

//Calling the function above
Update_Display();

//this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //The target variable is an object that represents the element that was clicked.
    const { target } = event;

    //If the button clicked is not a button, exit the function
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    //AC cleares the number from the calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})