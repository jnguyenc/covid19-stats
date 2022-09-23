import { capitalizeAll, randomString } from './utilities';

function generateOptions(columns) {
  let options = '<legend>Show/hide colunms:</legend>';
  let option = '';

  const keys = Object.keys(columns);
  keys.forEach((key) => {
    option = `<input type="checkbox" id="${key}" name="${key}" class="option" checked/>`
            + `<label for="${key}">${(columns[key])}</label>`;
    options += `<div>${option}</div>`;
  });

  options = `<fieldset>${options}</fieldset>`;
  return options;
}

function generateTableHead(columns) {
  let head = '';
  let row = '';

  const columnsName = Object.values(columns);
  columnsName.forEach((name) => {
    row += `<th>${name}</th>`;
  });

  head = `<thead><tr>${row}</tr></thead>`;
  return head;
}

function generateTableBody(data, columns) {
  let row = '';
  let rows = '';
  let body = '';

  const columnsKeys = Object.keys(columns);
  data.forEach((element) => {
    row = '';
    columnsKeys.forEach((key) => {
      let value = element[key];
      if (value === undefined) {
        value = '...';
      }
      if (key === 'city') {
        value = capitalizeAll(value);
      }
      row += `<td>${value}</td>`;
    });

    rows += `<tr>${row}</tr>`;
  });

  body = `<tbody class="table-group-divider">${rows}</tbody>`;
  return body;
}

function generateTable(data, columns) {
  const options = generateOptions(columns);
  const head = generateTableHead(columns);
  const body = generateTableBody(data, columns);
  const table = `<table class="table table-sm table-striped">${head}${body}</table>`;

  return options + table;
}

function writeTable(data, columns, domTarget = '#noID') {
  let target = document.querySelector(domTarget);
  if (target === null) {
    target = document.createElement('div');
    const domBody = document.getElementsByTagName('body')[0];
    domBody.append(target);

    if (domTarget === '#noID') {
      target.id = randomString(8);
    } else {
      target.id = domTarget.replace('#', '');
    }
  }

  target.innerHTML = generateTable(data, columns);
  return target;
}

export { generateTable, writeTable };
