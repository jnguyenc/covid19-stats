const square = ((n) => n * n);
const squareAll = (...numbers) => numbers.map((n) => n * n);
const hello = (name = 'There') => `Hello ${name}`;
const tagWrapper = (string, tag = 'p') => `<${tag}>${string}</${tag}>`;
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const capitalizeAll = (string) => string
  .split(' ')
  .map((w) => capitalize(w))
  .join(' ');

const randomString = (length = 8) => {
  let randomStr = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    randomStr += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomStr;
};

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
