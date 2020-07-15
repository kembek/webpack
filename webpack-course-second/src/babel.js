export async function fetchGreeting() {
  return await Promise.resolve('Hello from promise world!');
}

fetchGreeting().then(console.log);

const age = 22;

class Util {
  static id = Date.now();
}

console.log('Util ', Util.id);
console.log('Age: ', age);
