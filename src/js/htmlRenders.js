import { capitalizeAll, randomString } from './utilities';
import addEventListeners from './events';

function renderOptions(columns) {
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

function renderTableCols(columns) {
  let cols = '';

  const columnsKeys = Object.keys(columns);
  columnsKeys.forEach((key) => { cols += `<col class="${key} active" />`; });

  cols = `<colgroup>${cols}</colgroup>`;
  return cols;
}

function renderTableHead(columns) {
  let head = '';
  let row = '';

  // const columnsName = Object.values(columns);
  // columnsName.forEach((name) => {  });
  const columnsKeys = Object.keys(columns);
  columnsKeys.forEach((key) => {
    row += `<th class="${key}">${columns[key]}</th>`;
  });

  head = `<thead class="thead-dark"><tr>${row}</tr></thead>`;
  return head;
}

function renderTableBody(data, columns) {
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

function renderTable(data, columns) {
  const options = renderOptions(columns);
  const cols = renderTableCols(columns);
  const head = renderTableHead(columns);
  const body = renderTableBody(data, columns);
  const table = `<table class="table table-sm table-striped">${cols}${head}${body}</table>`;

  return options + table;
}

function writeTable(data, columns, domTarget = '#noID') {
  let target = document.querySelector(domTarget);
  if (target === null) {
    target = document.createElement('div');
    target.classList.add('dataholder');
    const domBody = document.getElementsByTagName('body')[0];
    domBody.append(target);

    if (domTarget === '#noID') {
      target.id = randomString(8);
    } else {
      target.id = domTarget.replace('#', '');
    }
  }

  target.innerHTML = renderTable(data, columns);
  addEventListeners(target);

  return target;
}

export { renderTable, writeTable };
