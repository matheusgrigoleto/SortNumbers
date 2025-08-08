const number = document.querySelectorAll(".input-sort");
const qtNumbers = document.getElementById("number");
const firstNumber = document.getElementById("first-number");
const secondNumber = document.getElementById("secondary-number");
const checkedRepeatNumbers = document.getElementById("toggleRepeat");
const divSort = document.querySelector('.aside-container');
const divResult = document.querySelector('.result-container');



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
      const noRepetition = checkedRepeatNumbers.checked;

      if (secondNum < firstNum) {
        alert("o número (ATÉ) tem que ser maior que o (DE).");
        return;
      }

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

      if (
        (!checkedRepeatNumbers.checked && quantity > maxQuantity) ||
        (checkedRepeatNumbers.checked && maxQuantity === 1 && quantity > 1)
      ) {
        alert(`Oops! Você pediu ${quantity} números, mas só há ${maxQuantity} disponíveis no intervalo.`);
        return;
      }

      let result;
      if (noRepetition) {
        result = randomNumber(firstNum, secondNum, quantity);
      } else {
        result = randomNumbersWithRepetition(firstNum, secondNum, quantity);
        if (result === null) {
          alert(`Quantidade maior que o intervalo! Máximo permitido: ${maxQuantity}.`);
          return;
        }
      }
      console.log("Números sorteados:", result);
      divSort.style.display = 'none';
      divResult.style.display = 'flex';

      const container = document.querySelector('.numbers-result');
      container.innerHTML = "";
      const animationDuration = 3000;

      result.forEach((num, index) => {
        const span = document.createElement('span');
        span.classList.add('number-box');
        if ((index + 1) % 2 === 0) {
          span.classList.add('animate-par');
        } else {
          span.classList.add('animate-impar');
        }

        span.style.animationDelay = `${animationDuration * index}ms`;
        span.textContent = "";

        container.appendChild(span);

        if (index === 0) {
          setTimeout(() => {
            span.textContent = num;
            span.style.opacity = 1;
          }, 0);
        } else {
          setTimeout(() => {
            span.textContent = num;
            span.style.opacity = 1;
          }, animationDuration * index);
        }
      })
    }
  } catch (error) {
    console.error("Erro ao sortear números:", error);
  }
})

document.body.addEventListener('click', event => {
  try {
    if (event.target.closest('#btn-result')) {
      divSort.style.display = 'flex';
      divResult.style.display = 'none';
      firstNumber.value = "";
      secondNumber.value = "";
      qtNumbers.value = "";
    }
  } catch (error) {
    console.error("Erro ao sortear números:", error);
  }
})


