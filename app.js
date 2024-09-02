let calculateButton = document.getElementById("submit");
let clearCalculator = document.getElementById("reset");
let calculatorButtons = document.querySelectorAll(".calculationButtons div");
let seamlessCalcInput = document.getElementById("seamlessCalcInput");
let seamlessCalcHistory = document.getElementById("seamlessCalcHistory");

let firstNumber;
let secondNumber;
let tempOperator;
let tempResult;

for (let i = 0; i < calculatorButtons.length; i++)
{
    calculatorButtons[i].addEventListener("click", () =>
    {
        switch (calculatorButtons[i].innerHTML)
        {
            case "1":
                seamlessCalcInput.value += "1";
                break;
            case "2":
                seamlessCalcInput.value += "2";
                break;
            case "3":
                seamlessCalcInput.value += "3";
                break;
            case "4":
                seamlessCalcInput.value += "4";
                break;
            case "5":
                seamlessCalcInput.value += "5";
                break;
            case "6":
                seamlessCalcInput.value += "6";
                break;
            case "7":
                seamlessCalcInput.value += "7";
                break;
            case "8":
                seamlessCalcInput.value += "8";
                break;
            case "9":
                seamlessCalcInput.value += "9";
                break;
            case "0":
                seamlessCalcInput.value += "0";
                break;
            case ".":
                seamlessCalcInput.value += ".";
                break;
            case "CE":
                seamlessCalcInput.value = "";
                break;
            case "±":
                let flippedValue = parseFloat(seamlessCalcInput.value) * -1;
                seamlessCalcInput.value = flippedValue;
                break;
            case "Back":
                let element = seamlessCalcInput.value;
                seamlessCalcInput.value = element.slice(0, -1);
                break;
            case "%":
                if (firstNumber != null)
                {
                    let inputPercent;
                    inputPercent = parseFloat(seamlessCalcInput.value) / 100;
                    seamlessCalcInput.value = inputPercent;
                }
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

        function numberLogger(operator)
        {
            let tempCalcResult;

            if (firstNumber == null)
            {
                firstNumber = parseFloat(seamlessCalcInput.value);
                tempOperator = operator;
                seamlessCalcHistory.value = `${firstNumber} ${tempOperator}`;
                seamlessCalcInput.value = "";
            }
            else if (firstNumber != null && secondNumber == null)
            {
                secondNumber = parseFloat(seamlessCalcInput.value);

                if (isNaN(secondNumber))
                {
                    let element = seamlessCalcHistory.value;
                    seamlessCalcHistory.value = element.slice(0, -1);
                    seamlessCalcHistory.value += `${operator}`;
                    secondNumber = null;
                    return;
                }

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

            function calcHistoryResults()
            {
                seamlessCalcHistory.value = `${tempCalcResult} ${operator}`;
                firstNumber = tempCalcResult;
                tempCalcResult = "";
                seamlessCalcInput.value = "";
                secondNumber = null;
                tempOperator = operator;
            }
        }
    })

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

calculateButton.addEventListener("click", () =>
{
    let calculationResult;
    let numberOne = parseFloat(firstNumber);
    let numberTwo = parseFloat(seamlessCalcInput.value);

    if (isNaN(numberTwo) || isNaN(numberOne))
    {
        confirm("Can't calculate a non number input.");
    }
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
})

clearCalculator.addEventListener("click", () =>
{
    seamlessCalcHistory.value = "";
    seamlessCalcInput.value = "";
    firstNumber = null;
    secondNumber = null;
    tempOperator = null;
})