// Calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Clear the output display of calculator
    clear() {
        this.currentOperand = ''
        this.operation = undefined
        this.previousOperand = ''
    }

    // Delete/remove the last entered number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // Display entered number completely 
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Display behaviour of selected operation
    chooseOperation(operation) {
        // If no current operand, don't do anything.
        if (this.currentOperand === '') return

        // If previous operand exist then do the computation on operation button click.
        if (this.previousOperand !== '') {
            this.compute()
        }

        // After selecting a mathematical operation
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Calculations
    compute() {
        // If no operation selected, don't return anything
        if(this.operation === '') return

        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch(this.operation) {
            case '+':
                computation = prev + current
                break;

            case '-':
                computation = prev - current
                break;
            
            case '*':
                computation = prev * current
                break;
            
            case '÷':
                computation = prev / current
                break;
            default:
                return        
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // Update the display
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}



// Selecting set of buttons and categorizing them
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]') 


// Calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// show whole number on the display by appending it.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// show the selected operation on the display
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Show the answer on the display
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

// Clear entire output display
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

// Delete single number.
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

