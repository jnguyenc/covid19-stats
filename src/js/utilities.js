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

function scrollTop(target = '.upToTop') {
  const upToTop = document.querySelector(target);
  upToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.onscroll = () => {
    const threshold = 400;
    const { body } = document;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const scrollY = Math.max(body.scrollTop, html.scrollTop);
    const level = Math.max((scrollY / height).toFixed(2), 0.3);

    // console.log(level);

    const t = document.querySelector(target);
    t.style.boxShadow = `0px 0px 5px 3px rgba(0, 0, 0, ${level})`;
    t.style.color = `rgba(0, 0, 0, ${level})`;

    if (scrollY > threshold) {
      t.classList.add('show');
    } else {
      t.classList.remove('show');
    }
  };
}

export {
  square, squareAll, hello, hi, fun, tagWrapper,
  capitalize, capitalizeAll, randomString, scrollTop,
};
