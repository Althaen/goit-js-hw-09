form = document.querySelector('form');
delay = form.elements.delay;
step = form.elements.step;
amount = form.elements.amount;
refs = {
  form,
  delay,
  step,
  amount,
};

let timeoutID = null;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const timeoutID = setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      }

      reject(`❌ Rejected promise ${position + 1} in ${delay}ms`);
    }, delay);
  });
}

function onInput(e) {
  refs[e.target.name] = e.target.value;
  console.log(refs);
}

function createDelay(amount, delay, step) {
  data = [];
  for (let i = 0; i < amount; i += 1) {
    delay = Number(delay);
    step = Number(step);
    const total = delay + i * step;

    data.push(total);
  }
}

function onSubmit(e) {
  e.preventDefault();
  createDelay(refs.amount, refs.delay, refs.step);
  data.forEach((currentValue, index) => {
    createPromise(index, currentValue).then(onSuccess).catch(onError);
  });
  data = [];
  clearTimeout(timeoutID);
}

function onSuccess(result) {
  console.log(result);
}

function onError(error) {
  console.log(error);
}

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
