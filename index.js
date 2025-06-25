// index.js for SimpleCalc

const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const calcWrapper = document.querySelector('.calculator-wrapper');
let expressions = [];
let fresh = false;

// Handle button presses
function onBtn(val) {
  // Auto-clear if starting a new number after result
  if (fresh && /[0-9.]/.test(val)) {
    display.value = '';
    fresh = false;
  }
  display.value += val;
}

// Clear display completely
function clearDisplay() {
  display.value = '';
}

// Remove last character
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Evaluate expression and update history
function calculate() {
  try {
    const exp = display.value;
    const res = eval(exp);
    display.value = res;
    fresh = true;

    // Store to history
    expressions.unshift(`${exp} = ${res}`);
    if (expressions.length > 5) {
      expressions.pop();
    }
    renderHistory();
  } catch {
    display.value = 'Error';
    fresh = true;
  }
}

// Render the history side panel
function renderHistory() {
  historyEl.innerHTML = expressions.map(e => `<div>${e}</div>`).join('');
}

// Toggle dark mode on body
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Toggle scientific buttons
function toggleScientificMode() {
  calcWrapper.classList.toggle('scientific');
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/^[0-9.+\-*/]$/.test(key)) {
    onBtn(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
