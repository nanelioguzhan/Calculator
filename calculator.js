const buttons = document.querySelector(".buttons");
const panel = document.querySelector(".panel")
const calculator = document.querySelector(".calculator")

buttons.addEventListener("click", event => {

    const clickedButton = event.target
    const buttonValue = clickedButton.textContent
    if(!event.target.closest("button")) return false //eliminate grip gap detection
    const panelValue = panel.textContent;
    const  { type } = clickedButton.dataset
    const { previousKeyType } = calculator.dataset

    calculator.dataset.previousKeyType = type

    if(type === "number") {
        if(panelValue === '0') {
        panel.textContent = buttonValue;
    }
        else if(previousKeyType === 'operator') {
        panel.textContent = buttonValue
    }
         else {
        panel.textContent = panelValue + buttonValue
    }
    
    }
    if(type === "operator") {
        clickedButton.dataset.state = "chosen"
        const activeOperator = calculator.querySelector('[data-state="chosen"]')
        if(activeOperator) {
            activeOperator.dataset.state = ""
        }

        calculator.dataset.firstNumber = panelValue;
        calculator.dataset.operator = clickedButton.dataset.process;
    }

    if(type === "equal") {
        let secondNumber = parseFloat(panelValue) 
        let firstNumber = parseFloat(calculator.dataset.firstNumber)
        let operator = calculator.dataset.operator;

        let result;
        if(operator === "add") {
            result = firstNumber + secondNumber
        }

        if(operator === "minus") {
            result = firstNumber - secondNumber
        }

        if(operator === "divide") {
            result = firstNumber / secondNumber
        }

        if(operator === "multiply") {
            result = firstNumber * secondNumber
        }

        panel.textContent = result
    }

    if(type == "clean") {
        panel.textContent = "0"
    }
})