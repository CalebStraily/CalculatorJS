//get elements/IDs from HTML
let calculatorButtons = document.querySelectorAll(".calculationButtons div");
let seamlessCalcInput = document.getElementById("seamlessCalcInput");
let seamlessCalcHistory = document.getElementById("seamlessCalcHistory");

//declare variables
let firstNumber = null;
let secondNumber;
let numberOne;
let numberTwo;
let tempOperator;
let finalCalculation;
let flippedValue;

//loops for every button on the calculator
for (let i = 0; i < calculatorButtons.length; i++)
{
    //creates an on click event listener for each calculator button
    calculatorButtons[i].addEventListener("click", () =>
    {
        for (let j = 0; j < calculatorButtons[i].innerHTML.length; j++)
        {
            switch (parseFloat(calculatorButtons[i].innerHTML))
            {
                case (j = parseFloat(calculatorButtons[i].innerHTML)):
                    resultCheck();
                    seamlessCalcInput.value += j;
                    break;
            }
        }
    
        switch (calculatorButtons[i].innerHTML)
        {
            //appends a decimal to the input area
            case ".":
                resultCheck();
                seamlessCalcInput.value += ".";
                break;
            //clears the current value stored in the input area
            case "CE":
                seamlessCalcInput.value = "";
                break;
            //clears all values stored in both input areas and resets calculation variables
            case "C":
                clearCalculator();
                break;
            //flips the number to a positive or negative
            case "±":
                flippedValue = parseFloat(seamlessCalcInput.value) * -1;
                seamlessCalcInput.value = "";

                if (firstNumber != null)
                {
                    //places the flipped value in the calculation history input based on if a temporary result exists
                    if (finalCalculation != null)
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
                    seamlessCalcHistory.value = flippedValue;
                }
                
                finalCalculation = null;
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
            let tempCalculation;

            //resets the ongoing calculation logic of the user wants to continue making changes the number stored in finalCalculation
            if (finalCalculation == seamlessCalcInput.value)
            {
                firstNumber = null;
                finalCalculation = null;
            }

            //if firstNumber is null, sends the seamlessCalcInput.value to the seamlessCalcHistory.value
            //also keeps persistent track of the firstNumber and tempOperator
            if (firstNumber == null || flippedValue != null)
            {
                firstNumber = parseFloat(seamlessCalcInput.value);
                tempOperator = operator;

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
                        tempCalculation = firstNumber + secondNumber;
                        calcHistoryResults();
                        break;
                    case "-":
                        tempCalculation = firstNumber - secondNumber;
                        calcHistoryResults();
                        break;
                    case "÷":
                        tempCalculation = firstNumber / secondNumber;
                        calcHistoryResults();
                        break;
                    case "x":
                        tempCalculation = firstNumber * secondNumber;
                        calcHistoryResults();
                        break;
                }
            }

            //assings the temporary calculation result and operator into the seamlessCalcHistory.value
            //resets a series of variables so that the code is reusable
            function calcHistoryResults()
            {
                seamlessCalcHistory.value = `${tempCalculation} ${operator}`;
                firstNumber = tempCalculation;
                tempCalculation = "";
                seamlessCalcInput.value = "";
                secondNumber = null;
                tempOperator = operator;
            }
        }

        //conducts the final calculation when the user clicks the equals button
        function calculateResult()
        {
            let calculationResult;

            //allows the user to continue using the same calculation formula, using the value in finalCalculation as number one for the formula
            //if finalCalculation is equal to the value in seamlessCalcInput
            if (finalCalculation == seamlessCalcInput.value)
            {
                numberOne = parseFloat(seamlessCalcInput.value);
            }
            //will otherwise set numberOne to the value in firstNumber and numberTwo the seamlessCalcInput.value
            else
            {
                numberOne = parseFloat(firstNumber);
                numberTwo = parseFloat(seamlessCalcInput.value);
            }

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
                        finalCalculation = seamlessCalcInput.value;
                        break;
                    case "-":
                        calculationResult = numberOne - numberTwo;
                        seamlessCalcHistory.value = `${numberOne} - ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        finalCalculation = seamlessCalcInput.value;
                        break;
                    case "x":
                        calculationResult = numberOne * numberTwo;
                        seamlessCalcHistory.value = `${numberOne} x ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        finalCalculation = seamlessCalcInput.value;
                        break;
                    case '÷':
                        calculationResult = numberOne / numberTwo;
                        seamlessCalcHistory.value = `${numberOne} ÷ ${numberTwo} =`;
                        seamlessCalcInput.value = `${calculationResult}`;
                        finalCalculation = seamlessCalcInput.value;
                        break;                                     
                }
            }
        }

        //checks if a temporary result has been made and will clear the calculator for a new calculation if true
        function resultCheck()
        {
            if (finalCalculation != null)
            {
                finalCalculation = null;
                seamlessCalcInput.value = null;
                seamlessCalcHistory.value = null;
                firstNumber = null;
                secondNumber = null;
            }
        }

        //resets all the input fields on the calculator and variables that should be null when a new calculation is made
        function clearCalculator()
        {
            seamlessCalcHistory.value = "";
            seamlessCalcInput.value = "";
            firstNumber = null;
            secondNumber = null;
            tempOperator = null;
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