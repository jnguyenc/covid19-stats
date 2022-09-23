const square = ((n) => n * n);
const squareAll = (...numbers) => numbers.map((n) => n * n);
const hello = (name = 'There') => `Hello ${name}`;
const tagWrapper = (string, tag = 'p') => `<${tag}>${string}</${tag}>`;
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
const capitalizeAll = (string) => string
  .split(' ')
  .map((w) => capitalize(w))
  .join(' ');

function randomString(length = 5) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function hi(name = 'Thereeeeeeeeeee') {
  return `Hi ${name}`;
}

function fun() {
  const a = [1, 2, 3];
  const [b, ...c] = a;
  console.log('b is:', b);
  console.log('c is:', c);
}

export {
  square, squareAll, hello, hi, fun, tagWrapper, capitalize, capitalizeAll, randomString,
};
