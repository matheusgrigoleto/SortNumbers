const number = document.querySelectorAll(".input-sort");
const qtNumbers = document.getElementById("number");
const firstNumber = document.getElementById("first-number");
const secondNumber = document.getElementById("secondary-number");
const checkedRepeatNumbers = document.getElementById("toggleRepeat");


document.body.addEventListener('input', event => {
  if (event.target.classList.contains('input-sort')) {
    event.target.value = event.target.value.replace(/\D/g, '');
  }
});

function randomNumber(first, second, quantity) {
  const min = Math.min(first);
  const max = Math.max(second);
  const results = new Set();

  const maxQuantity = max - min + 1;
  if (quantity > maxQuantity) {
    return null;
  }
  while (results.size < quantity) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    results.add(random);
  }

  return Array.from(results);
}

function randomNumbersWithRepetition(first, second, quantity) {
  const min = Math.min(first);
  const max = Math.max(second);
  const results = [];

  for (let i = 0; i < quantity; i++) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    results.push(random);
  }

  return results;
}

document.body.addEventListener('click', event => {
  try {
    if (event.target.closest('#btn-sorted')) {
      const firstNum = Number(firstNumber.value);
      const secondNum = Number(secondNumber.value);
      const quantity = Number(qtNumbers.value);
      const allowRepetition = checkedRepeatNumbers.checked;
      randomNumber(firstNum, secondNum, quantity);
      if (
        firstNumber.value.trim() === "" ||
        secondNumber.value.trim() === "" ||
        qtNumbers.value.trim() === "" ||
        isNaN(firstNum) ||
        isNaN(secondNum) ||
        isNaN(quantity)
      ) {
        alert("Por favor, insira dois números válidos para sortear.");
        return;
      }
      const maxQuantity = Math.abs(secondNum - firstNum) + 1;

      let result;
      if (allowRepetition) {
        result = randomNumber(firstNum, secondNum, quantity);
      } else {
        result = randomNumbersWithRepetition(firstNum, secondNum, quantity);
        if (result === null) {
          alert(`Quantidade maior que o intervalo! Máximo permitido: ${maxQuantity}.`);
          return;
        }
      }
    }
  } catch (error) {
    console.error("Erro ao sortear números:", error);
  }
})


