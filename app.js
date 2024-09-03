//get elements/IDs from HTML
let clearCalculator = document.getElementById("reset");
let calculatorButtons = document.querySelectorAll(".calculationButtons div");
let seamlessCalcInput = document.getElementById("seamlessCalcInput");
let seamlessCalcHistory = document.getElementById("seamlessCalcHistory");

//declare variables
let firstNumber = null;
let secondNumber;
let numberOne;
let numberTwo;
let tempOperator;
let tempResult;
let flippedValue;

//loops for every button on the calculator
for (let i = 0; i < calculatorButtons.length; i++)
{
    //creates an on click event listener for each calculator button
    calculatorButtons[i].addEventListener("click", () =>
    {
        switch (calculatorButtons[i].innerHTML)
        {
            //cases "0 - 9" will append their correlating value to the input area of the screen
            case "1":
                resultCheck();
                seamlessCalcInput.value += "1";
                break;
            case "2":
                resultCheck();
                seamlessCalcInput.value += "2";
                break;
            case "3":
                resultCheck();
                seamlessCalcInput.value += "3";
                break;
            case "4":
                resultCheck();
                seamlessCalcInput.value += "4";
                break;
            case "5":
                resultCheck();
                seamlessCalcInput.value += "5";
                break;
            case "6":
                resultCheck();
                seamlessCalcInput.value += "6";
                break;
            case "7":
                resultCheck();
                seamlessCalcInput.value += "7";
                break;
            case "8":
                resultCheck();
                seamlessCalcInput.value += "8";
                break;
            case "9":
                resultCheck();
                seamlessCalcInput.value += "9";
                break;
            case "0":
                resultCheck();
                seamlessCalcInput.value += "0";
                break;
            //appends a decimal to the input area
            case ".":
                resultCheck();
                seamlessCalcInput.value += ".";
                break;
            //clears the current value stored in the input area
            case "CE":
                seamlessCalcInput.value = "";
                break;
            //flips the number to a positive or negative
            case "±":
                flippedValue = parseFloat(seamlessCalcInput.value) * -1;
                seamlessCalcInput.value = "";

                if (firstNumber != null)
                {
                    //places the flipped value in the calculation history input based on if a temporary result exists
                    if (tempResult != null)
                    {
                        seamlessCalcHistory.value = flippedValue;
                    }
                    //places the flipped value in the user input section otherwise
                    else
                    {
                        seamlessCalcInput.value = flippedValue;
                        flippedValue = null;
                    }
                }
                //place the flipped value in the calculation history by default
                else
                {
                    console.log("execute");
                    seamlessCalcHistory.value = flippedValue;
                }
                
                tempResult = null;
                break;
            //backspaces the input by one character
            case "Back":
                let element = seamlessCalcInput.value;
                seamlessCalcInput.value = element.slice(0, -1);
                break;
            //will convert the current stored number into a percentage as long as there is a value stored in the first number space
            case "%":
                if (firstNumber != null)
                {
                    let inputPercent;
                    inputPercent = parseFloat(seamlessCalcInput.value) / 100;
                    seamlessCalcInput.value = inputPercent;
                }
                break;
            case "=":
                calculateResult();
                break;
            case "+":
                numberLogger("+");
                break;
            case "-":
                numberLogger("-");
                break;
            case "÷":
                numberLogger("÷");
                break;
            case "x":
                numberLogger("x");
                break;
        }

        //logs the inputs and stores them in the firstNumber and secondNumber variables
        //will also conduct an ongoing calculation of the user's inputs if they have not pressed the equals button for the final calculation
        function numberLogger(operator)
        {
            let tempCalcResult;

            //resets the ongoing calculation logic of the user wants to continue making changes the number stored in tempResult
            if (tempResult == seamlessCalcInput.value)
            {
                firstNumber = null;
                tempResult = null;
            }

            console.log(firstNumber);
            console.log(flippedValue);

            //if firstNumber is null, sends the seamlessCalcInput.value to the seamlessCalcHistory.value
            //also keeps persistent track of the firstNumber and tempOperator
            if (firstNumber == null || flippedValue != null)
            {
                firstNumber = parseFloat(seamlessCalcInput.value);
                tempOperator = operator;

                console.log(tempOperator);

                //sets the firstNumber to the flippedValue if is not null
                if (flippedValue != null)
                {
                    firstNumber = flippedValue;
                    flippedValue = null;
                }

                seamlessCalcHistory.value = `${firstNumber} ${tempOperator}`;
                seamlessCalcInput.value = "";
            }
            //should execute once firstNumber has been assigned a value but the secondNumber is still null
            else if (firstNumber != null && secondNumber == null)
            {
                //sets the secondNumber to the value input by the user
                secondNumber = parseFloat(seamlessCalcInput.value);

                //when the value is not a number, this means the user wants to change the operator used for calculations
                //updates the operator stored in the seamlessCalcHistory.value
                if (isNaN(secondNumber))
                {
                    seamlessCalcHistory.value = `${firstNumber} ${operator}`;
                    secondNumber = null;
                    return;
                }

                //will keep track of a temporary result that will be output into the seamlessCalcHistory.value
                //calculates the first and second number based on the operator stored in tempOperator
                switch (tempOperator)
                {
                    case "+":
                        tempCalcResult = firstNumber + secondNumber;
                        calcHistoryResults();
                        break;
                    case "-":
                        tempCalcResult = firstNumber - secondNumber;
                        calcHistoryResults();
                        break;
                    case "÷":
                        tempCalcResult = firstNumber / secondNumber;
                        calcHistoryResults();
                        break;
                    case "x":
                        tempCalcResult = firstNumber * secondNumber;
                        calcHistoryResults();
                        break;
                }
            }

            //assings the temporary calculation result and operator into the seamlessCalcHistory.value
            //resets a series of variables so that the code is reusable
            function calcHistoryResults()
            {
                seamlessCalcHistory.value = `${tempCalcResult} ${operator}`;
                firstNumber = tempCalcResult;
                tempCalcResult = "";
                seamlessCalcInput.value = "";
                secondNumber = null;
                tempOperator = operator;

                console.log(tempOperator);
            }
        }

        //conducts the final calculation when the user clicks the equals button
        function calculateResult()
        {
            let calculationResult;

            //allows the user to continue using the same calculation formula, using the value in tempResult as number one for the formula
            //if tempResult is equal to the value in seamlessCalcInput
            if (tempResult == seamlessCalcInput.value)
            {
                numberOne = parseFloat(seamlessCalcInput.value);
            }
            //will otherwise set numberOne to the value in firstNumber and numberTwo the seamlessCalcInput.value
            else
            {
                numberOne = parseFloat(firstNumber);
                numberTwo = parseFloat(seamlessCalcInput.value);
            }

            console.log(numberOne);
            console.log(numberTwo);
            console.log(tempOperator);

            //makes sure the input in number one and two are numbers
            if (isNaN(numberTwo) || isNaN(numberOne))
            {
                confirm("Can't calculate a non number input.");
            }
            //will otherwise conduct the final calculation using whatever value is stored in numberOne and numberTwo
            else
            {
                switch (tempOperator)
                {
                    case "+":
                        calculationResult = numberOne + numberTwo;
                        seamlessCalcHistory.value = `${numberOne} + ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        tempResult = seamlessCalcInput.value;
                        break;
                    case "-":
                        calculationResult = numberOne - numberTwo;
                        seamlessCalcHistory.value = `${numberOne} - ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        tempResult = seamlessCalcInput.value;
                        break;
                    case "x":
                        calculationResult = numberOne * numberTwo;
                        seamlessCalcHistory.value = `${numberOne} x ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        tempResult = seamlessCalcInput.value;
                        break;
                    case '÷':
                        calculationResult = numberOne / numberTwo;
                        seamlessCalcHistory.value = `${numberOne} ÷ ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        tempResult = seamlessCalcInput.value;
                        break;                                     
                }
            }
        }

        //checks if a temporary result has been made and will clear the calculator for a new calculation if true
        function resultCheck()
        {
            if (tempResult != null)
            {
                tempResult = null;
                seamlessCalcInput.value = null;
                seamlessCalcHistory.value = null;
                firstNumber = null;
                secondNumber = null;
            }
        }
    })

    //series of event listeners that adds styling to buttons when the user mouse downs onto a button 
    //to visually indicate the button has been pressed
    calculatorButtons[i].addEventListener("mousedown", () =>
    {
        calculatorButtons[i].style.backgroundColor = "gray";
    })

    calculatorButtons[i].addEventListener("mouseup", () =>
    {
        calculatorButtons[i].style.backgroundColor = "white";
    })

    calculatorButtons[i].addEventListener("mouseleave", () =>
    {
        calculatorButtons[i].style.backgroundColor = "white";
    })
}

//resets all the input fields on the calculator and variables that should be null when a new calculation is made
clearCalculator.addEventListener("click", () =>
{
    seamlessCalcHistory.value = "";
    seamlessCalcInput.value = "";
    firstNumber = null;
    secondNumber = null;
    tempOperator = null;
})