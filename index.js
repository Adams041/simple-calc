 let display = document.getElementById('display');
    let history = document.getElementById('history');
    let expressions = [];

    function append(char) {
      display.value += char;
    }

    function clearDisplay() {
      display.value = '';
    }

    function calculate() {
      try {
        const expression = display.value;
        const result = eval(expression);
        display.value = result;
        expressions.unshift(`${expression} = ${result}`);
        if (expressions.length > 5) expressions.pop();
        updateHistory();
      } catch (e) {
        display.value = 'Error';
      }
    }

    function updateHistory() {
      history.innerHTML = expressions.map(exp => `<div>${exp}</div>`).join('');
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark');
    }

    // Keyboard support
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      if ((/\d|\.|\+|\-|\*|\/|%/).test(key)) {
        append(key);
      } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
      } else if (key.toLowerCase() === 'c') {
        clearDisplay();
      }
    });
