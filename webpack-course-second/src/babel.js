export async function fetchGreeting() {
  return await Promise.resolve('Hello from promise world!');
}

fetchGreeting().then(console.log);

class Util {
  static id = Date.now();
}

console.log('Util ', Util.id);
