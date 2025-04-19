const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let expression = "";

const isOperator = (char) => ['+', '-', '*', '/', '%'].includes(char);
const endsWithOperator = (expr) => isOperator(expr.slice(-1));

// Function to handle button clicks
const handleButtonClick = (value) => {
  if (value === 'AC') {
    expression = "";
    input.value = expression;
  }
  else if (value === 'DEL') {
    expression = expression.slice(0, -1);
    input.value = expression;
  }
  else if (value === '=') {
    try {
      // Prevent eval on invalid ending
      if (expression === "" || endsWithOperator(expression)) {
        input.value = "Error";
        expression = "";
      } else {
        const result = eval(expression);
        if (result === Infinity || isNaN(result)) {
          throw new Error("Invalid");
        }
        expression = result.toString();
        input.value = expression;
      }
    } catch {
      input.value = "Error";
      expression = "";
    }
  }
  else if (value === '.') {
    // Prevent multiple decimals in the same number block
    const parts = expression.split(/[\+\-\*\/\%]/);
    const last = parts[parts.length - 1];
    if (!last.includes('.')) {
      expression += value;
      input.value = expression;
    }
  }
  else if (isOperator(value)) {
    // Prevent two operators in a row
    if (expression !== "" && !endsWithOperator(expression)) {
      expression += value;
      input.value = expression;
    }
  }
  else {
    // Handle leading zeros
    if (expression === "0" && value === "0") return;
    expression += value;
    input.value = expression;
  }
};

// Add event listener for all buttons
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerText;
    handleButtonClick(value);
  });
});

// Handle keyboard input (key press events)
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Handle number and operator keys
  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%'].includes(key)) {
    handleButtonClick(key);
  }
  // Handle Enter key for equals
  else if (key === 'Enter' || key === '=') {
    handleButtonClick('=');
  }
  // Handle backspace for delete
  else if (key === 'Backspace') {
    handleButtonClick('DEL');
  }
  // Handle '.' key
  else if (key === '.') {
    handleButtonClick('.');
  }
  // Handle 'Escape' for AC
  else if (key === 'Escape') {
    handleButtonClick('AC');
  }
});
