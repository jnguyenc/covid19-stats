import { capitalizeAll, randomString } from './utilities';
import addEventListeners from './events';

function renderOptions(columns, targetId) {
  let options = '<legend>Show/hide colunms:</legend>';
  let option = '';

  const keys = Object.keys(columns);
  keys.forEach((key) => {
    option = `<input type="checkbox" id="${key}_${targetId}" name="${key}" data-key="${key}" checked/>`
            + `<label for="${key}_${targetId}">${(columns[key])}</label>`;
    options += `<div>${option}</div>`;
  });

  options = `<fieldset>${options}</fieldset>`;
  return options;
}

function renderShowColumnButtons(columns) {
  let showButtons = '';
  const columnsKeys = Object.keys(columns);
  columnsKeys.forEach((key) => { showButtons += `<div class="hide" data-key="${key}"/><i class="bi bi-eye"></i><span>${columns[key]}</span></div>`; });
  return `<div class="showColumns">${showButtons}</div>`;
}

function renderTableCols(columns) {
  let cols = '';

  const columnsKeys = Object.keys(columns);
  columnsKeys.forEach((key) => { cols += `<col data-key="${key}"/>`; });

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
    row += `<th title="Click to sort" data-key="${key}"><i data-role="show" class="bi bi-eye-slash"></i>`
        + `<span>${columns[key]}</span><i data-role="sort"></i></th>`;
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
      let title = '';
      if (value === undefined || value === null) {
        value = '...';
        title = 'title="Information Not Available"';
      }
      if (key === 'city') {
        value = capitalizeAll(value);
      }
      row += `<td ${title} data-key="${key}">${value}</td>`;
    });

    rows += `<tr>${row}</tr>`;
  });

  body = `<tbody class="table-group-divider">${rows}</tbody>`;
  return body;
}

function renderTable(data, columns, targetId) {
  const options = renderOptions(columns, targetId);
  const showColumnButtons = renderShowColumnButtons(columns);
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
      // html id atrribute does not have the #, so remove it
      target.id = domTarget.replace('#', '');
    }
  }

  target.innerHTML = renderTable(data, columns, target.id);
  addEventListeners(target);

  return target;
}

export { renderTable, writeTable };
