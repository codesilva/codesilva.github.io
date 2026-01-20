const INPUTS = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const XOR_targets = [
  -1, //0
  1,
  1,
  -1, // 0
];

function tanhDerivative(x) {
  return 1 - x * x;
}

function computePerceptron(xi, [w1, w2, b]) {
  const [x1, x2] = xi;
  return w1 * x1 + w2 * x2 + b;
}

function getRandom() {
  return .1 * (Math.random() - .5);
}

function train(inputs, targets, epochs = 10, learningRate = 0.1) {
  // w1, w2, b1
  let p1 = [getRandom(), getRandom(), getRandom()];
  // w3, w4, b2
  let p2 = [getRandom(), getRandom(), getRandom()];
  // v1, v2, b3
  let p3 = [getRandom(), getRandom(), getRandom()];

  // the final decision is on top of the third perceptrion, the one which gives the output
  let c = 0;
  while (c++ < epochs) {
    let L;
    for (let i = 0; i < inputs.length; ++i) {
      const xi = inputs[i];
      const t = targets[i];

      // forward pass
      const z = computePerceptron(xi, p1);
      const h1 = Math.tanh(z);

      const k = computePerceptron(xi, p2);
      const h2 = Math.tanh(k);

      const o = computePerceptron([h1, h2], p3);
      const y = Math.tanh(o);

      L = Math.pow(y - t, 2) / 2;

      // backward pass
      // we are looking for: dL/dw1, dL/dw2, dL/db1, dL/dw3, dL/dw4, dL/db2, dL/dv1, dL/dv2, dL/db3
      // using chain rule
      const dL_dy = y - t;
      const dy_do = tanhDerivative(y);
      const do_dh1 = p3[0]; // v1
      const do_dh2 = p3[1]; // v2
      const do_db3 = 1; // b3
      const do_dv1 = h1;
      const do_dv2 = h2;
      const dh1_dz = tanhDerivative(h1);
      const dz_w1 = xi[0];
      const dz_w2 = xi[1];
      const dz_b1 = 1;
      const dh2_dk = tanhDerivative(h2);
      const dk_w3 = xi[0];
      const dk_w4 = xi[1];
      const dk_b2 = 1;

      // dL/v1, dL/v2, dL/b3
      const v1_grad = dL_dy * dy_do * do_dv1;
      const v2_grad = dL_dy * dy_do * do_dv2;
      const b3_grad = dL_dy * dy_do * do_db3;
      // console.log('v1 grad ', v1_grad)
      // console.log('v2 grad ', v2_grad)
      // console.log('b3 grad ', b3_grad)

      // console.log()

      // dL/w1, dL/w2, dL/b1
      const w1_grad = dL_dy * dy_do * do_dh1 * dh1_dz * dz_w1;
      const w2_grad = dL_dy * dy_do * do_dh1 * dh1_dz * dz_w2;
      const b1_grad = dL_dy * dy_do * do_dh1 * dh1_dz * dz_b1;
      // console.log('w1 grad ', w1_grad)
      // console.log('w2 grad ', w2_grad)
      // console.log('b1 grad ', b1_grad)

      // console.log()

      // dL/w3, dL/w4, dL/b2
      const w3_grad = dL_dy * dy_do * do_dh2 * dh2_dk * dk_w3;
      const w4_grad = dL_dy * dy_do * do_dh2 * dh2_dk * dk_w4;
      const b2_grad = dL_dy * dy_do * do_dh2 * dh2_dk * dk_b2;
      // console.log('w3 grad ', w3_grad)
      // console.log('w4 grad ', w4_grad)
      // console.log('b2 grad ', b2_grad)

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

    console.log('Loss: ', L)
  }
}

train(INPUTS, XOR_targets, 100, .001)
