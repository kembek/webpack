// CommonJs modules
// ****************ww
// Default exports
function someFunction() {
  return "Hello! I`m someFunction()";
}

module.exports = someFunction;

// Named exports
const PI = 3.14;
function pow(x, n) {
  let result = 1;

  for (let i = 1; i <= n; ++n) {
    result *= x;
  }

  return result;
}

exports.PI = PI;
exports.pow = pow;
