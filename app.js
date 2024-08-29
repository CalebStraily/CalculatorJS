let calculateButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");
let numberOneInput = document.getElementById("numberOneInput");
let numberTwoInput = document.getElementById("numberTwoInput");
let operatorType = document.getElementById("operatorType");
let resultArea = document.getElementById("resultArea");
let calculatorButtons = document.querySelectorAll(".calculationButtons div");
let inputSelectors = document.querySelectorAll(".input-selectors div");

let numberOneIsEnabled = false;
let numberTwoIsEnabled = false;

for (let i = 0; i < inputSelectors.length; i++)
{
    inputSelectors[i].addEventListener("click", () =>
    {
        switch (inputSelectors[i].innerHTML)
        {
            case "Number One":
                switch (true)
                {
                    case (numberOneIsEnabled == false && numberTwoIsEnabled == false):
                        numberOneIsEnabled = true;
                        addStyling(inputSelectors[i]);
                        break;
                    case (numberOneIsEnabled == true && numberTwoIsEnabled == false):
                        numberOneIsEnabled = false;
                        removeStyling(inputSelectors[i]);
                        break;
                    case (numberOneIsEnabled == false && numberTwoIsEnabled == true):
                        numberOneIsEnabled = true;
                        numberTwoIsEnabled = false;
                        addStyling(inputSelectors[i]);
                        removeStyling(inputSelectors[1]);
                        break;
                }
                break;
            case "Number Two":
                switch (true)
                {
                    case (numberOneIsEnabled == false && numberTwoIsEnabled == false):
                        numberTwoIsEnabled = true;
                        addStyling(inputSelectors[i]);
                        break;
                    case (numberOneIsEnabled == false && numberTwoIsEnabled == true):
                        numberTwoIsEnabled = false;
                        removeStyling(inputSelectors[i]);
                        break;
                    case (numberOneIsEnabled == true && numberTwoIsEnabled == false):
                        numberOneIsEnabled = false;
                        numberTwoIsEnabled = true;
                        addStyling(inputSelectors[i]);
                        removeStyling(inputSelectors[0]);
                        break;
                }
                break;
        }

        function addStyling(element)
        {
            element.style.backgroundColor = "green";
            element.style.color = "white";
        }

        function removeStyling(element)
        {
            element.style.backgroundColor = "white";
            element.style.color = "black";
        }
    })
}

for (let i = 0; i < calculatorButtons.length; i++)
{
    calculatorButtons[i].addEventListener("click", () =>
    {
        let inputBoxSelected;

        if (numberOneIsEnabled == true)
        {
            inputBoxSelected = numberOneInput;
        }
        else if (numberTwoIsEnabled == true)
        {
            inputBoxSelected = numberTwoInput;
        }

        switch (calculatorButtons[i].innerHTML)
        {
            case "1":
                inputBoxSelected.value += "1";
                break;
            case "2":
                inputBoxSelected.value += "2";
                break;
            case "3":
                inputBoxSelected.value += "3";
                break;
            case "4":
                inputBoxSelected.value += "4";
                break;
            case "5":
                inputBoxSelected.value += "5";
                break;
            case "6":
                inputBoxSelected.value += "6";
                break;
            case "7":
                inputBoxSelected.value += "7";
                break;
            case "8":
                inputBoxSelected.value += "8";
                break;
            case "9":
                inputBoxSelected.value += "9";
                break;
            case "0":
                inputBoxSelected.value += "0";
                break;
            case ".":
                inputBoxSelected.value += ".";
                break;
            case "CE":
                inputBoxSelected.value = "";
                break;
        }
    })
}

calculateButton.addEventListener("click", () =>
{
    let calculationResult = 0;
    let numberOne = Number(numberOneInput.value);
    let numberTwo = Number(numberTwoInput.value);

    switch(operatorType.value)
    {
        case "Addition":
            calculationResult = numberOne + numberTwo;
            resultArea.innerHTML = `Result: ${calculationResult}`;
            break;
        case "Subtraction":
            calculationResult = numberOne - numberTwo;
            resultArea.innerHTML = `Result: ${calculationResult}`;
            break;
        case "Division":
            calculationResult = numberOne / numberTwo;
            resultArea.innerHTML = `Result: ${calculationResult}`;
            break;
        case "Multiplication":
            calculationResult = numberOne * numberTwo;
            resultArea.innerHTML = `Result: ${calculationResult}`;
            break;
    }
});

resetButton.addEventListener("click", () =>
{
    numberOneInput.value = "";
    numberTwoInput.value = "";
    resultArea.innerHTML = "";
    operatorType.value = "Addition";

    numberOneIsEnabled = false;
    numberTwoIsEnabled = false;

    for (let i = 0; i < inputSelectors.length; i++)
    {
        inputSelectors[i].style.backgroundColor = "white";
        inputSelectors[i].style.color = "black";
    }
})