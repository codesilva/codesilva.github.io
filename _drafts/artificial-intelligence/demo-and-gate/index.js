const INPUTS = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const AND_targets = [
  0,
  0,
  0,
  1
];

const OR_targets = [
  0,
  1,
  1,
  1
];

// w1 * x2 + w2 * x2 + b
const getRandom = () => .1 * (Math.random() - .5);

function decision(xi, w1, w2, b) {
  const [x1, x2] = xi;
  const result = w1 * x1 + w2 * x2 + b;
  if (result > 0) return 1;
  return 0;
}

function train(inputs, targets, epochs = 1000) {
  let w1 = 0, w2 = 0, b = 0;
  // let w1 = getRandom();
  // let w2 = getRandom();
  // let b = getRandom();
  let c = 0;
  console.log(`Training with ${epochs} epochs`);
  while (c++ < epochs) {
    for (let i = 0; i < inputs.length; ++i) {
      const xi = inputs[i];
      const yi = targets[i];
      const d = decision(xi, w1, w2, b);

      if (d === yi) continue;
      if (yi === 1 && d === 0) {
        b += 1;
        w1 += xi[0];
        w2 += xi[1];
      } else {
        b -= 1;
        w1 -= xi[0];
        w2 -= xi[1];
      }
    }
  }

  // console.log('Final Parameters');
  // console.table({ w1, w2, b })

  function test(xi) {
    return decision(xi, w1, w2, b);
  };

  test.params = {w1, w2, b};
  return test;
}

const andGate = train(INPUTS, AND_targets, 6)
console.log(andGate.params)
console.log('0 AND 0 = ', andGate([0, 0]))
console.log('0 AND 1 = ', andGate([0, 1]))
console.log('1 AND 0 = ', andGate([1, 0]))
console.log('1 AND 1 = ', andGate([1, 1]))

console.log();

const orGate = train(INPUTS, OR_targets, 6)
console.log(orGate.params)
console.log('0 OR 0 = ', orGate([0, 0]))
console.log('0 OR 1 = ', orGate([0, 1]))
console.log('1 OR 0 = ', orGate([1, 0]))
console.log('1 OR 1 = ', orGate([1, 1]))
