// ES module syntax
// ****************
// Default export
function greeting() {
  return "Hello world!";
}

export default greeting;

// Named export

// 1. Path
export const a = 1;
export const b = 2;
export const c = 3;
// 2. Path
const d = 4;
const e = 5;
const f = 6;

export { d, e, f };
