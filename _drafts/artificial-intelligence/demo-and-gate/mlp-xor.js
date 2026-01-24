const INPUTS = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const XOR_targets = [
  0,
  1,
  1,
  0,
];

// tanh activation function

function tanh(x) {
  return 2 / (1 + Math.exp(-2 * x)) - 1;
}

function tanhDerivative(y) {
  return 4 * (1 - y * y);
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(y) {
  return y * (1 - y);
}

function computePerceptron(xi, [w1, w2, b]) {
  const [x1, x2] = xi;
  return w1 * x1 + w2 * x2 + b;
}

function getRandom() {
  return (Math.random() - 0.5) * 2;
}

function relu(x) {
  return x > 0 ? x : 0.01 * x;
}

function reluDerivative(x) {
  return x > 0 ? 1 : 0.01;
}

function train(inputs, targets, epochs = 10, learningRate = 0.1) {
  // w1, w2, b1
  let p1 = [getRandom(), getRandom(), getRandom()];
  // w3, w4, b2
  let p2 = [getRandom(), getRandom(), getRandom()];
  // v1, v2, b3
  let p3 = [getRandom(), getRandom(), getRandom()];

  const indices = [0, 1, 2, 3];

  // the final decision is on top of the third perceptrion, the one which gives the output
  let c = 0;
  while (c++ < epochs) {
    // shuffle indices 
    for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[indices[i], indices[j]] = [indices[j], indices[i]]; }

    let totalLoss = 0;
    for (const i of indices) {
      const xi = inputs[i];
      const t = targets[i];

      // forward pass
      const z = computePerceptron(xi, p1);
      const h1 = relu(z);

      const k = computePerceptron(xi, p2);
      const h2 = relu(k);

      const o = computePerceptron([h1, h2], p3);
      const y = sigmoid(o);

      totalLoss += Math.pow(y - t, 2) / 2;

      // backward pass
      const dL_dy = y - t;
      const dy_do = sigmoidDerivative(y);
      const do_dh1 = p3[0]; // v1
      const do_dh2 = p3[1]; // v2
      const do_db3 = 1; // b3
      const do_dv1 = h1;
      const do_dv2 = h2;
      
      const dh1_dz = reluDerivative(z);
      const dz_w1 = xi[0];
      const dz_w2 = xi[1];
      const dz_b1 = 1;

      const dh2_dk = reluDerivative(k);
      const dk_w3 = xi[0];
      const dk_w4 = xi[1];
      const dk_b2 = 1;

      const v1_grad = dL_dy * dy_do * do_dv1;
      const v2_grad = dL_dy * dy_do * do_dv2;
      const b3_grad = dL_dy * dy_do * do_db3;

      const w1_grad = dL_dy * dy_do * do_dh1 * dh1_dz * dz_w1;
      const w2_grad = dL_dy * dy_do * do_dh1 * dh1_dz * dz_w2;
      const b1_grad = dL_dy * dy_do * do_dh1 * dh1_dz * dz_b1;

      const w3_grad = dL_dy * dy_do * do_dh2 * dh2_dk * dk_w3;
      const w4_grad = dL_dy * dy_do * do_dh2 * dh2_dk * dk_w4;
      const b2_grad = dL_dy * dy_do * do_dh2 * dh2_dk * dk_b2;

      // update parameters
      p1[0] -= learningRate * w1_grad;
      p1[1] -= learningRate * w2_grad;
      p1[2] -= learningRate * b1_grad;

      p2[0] -= learningRate * w3_grad;
      p2[1] -= learningRate * w4_grad;
      p2[2] -= learningRate * b2_grad;

      p3[0] -= learningRate * v1_grad;
      p3[1] -= learningRate * v2_grad;
      p3[2] -= learningRate * b3_grad;
    }

    if (c % 5000 === 0) {
      console.log(`Epoch ${c} - Loss: ${(totalLoss / inputs.length).toFixed(6)}`);
    }
  }

  console.log('\nFinal Results:');
  const predict = (x1, x2) => {
    const h1 = relu(computePerceptron([x1, x2], p1));
    const h2 = relu(computePerceptron([x1, x2], p2));
    const y = sigmoid(computePerceptron([h1, h2], p3));
    return y;
  };

  for (let i = 0; i < inputs.length; i++) {
    const xi = inputs[i];
    const y = predict(xi[0], xi[1]);
    console.log(`Input: [${xi}] -> Target: ${targets[i]} -> Output: ${y.toFixed(4)}`);
  }

  return predict;
}

const xor = train(INPUTS, XOR_targets, 100000, 0.5);

console.log('\nIndividual Test:');
console.log(`xor(0, 0) => ${xor(0, 0).toFixed(4)}`);
console.log(`xor(0, 1) => ${xor(0, 1).toFixed(4)}`);
console.log(`xor(1, 0) => ${xor(1, 0).toFixed(4)}`);
console.log(`xor(1, 1) => ${xor(1, 1).toFixed(4)}`);


