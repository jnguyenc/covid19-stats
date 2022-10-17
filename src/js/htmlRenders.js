import { capitalizeAll, randomString } from './utilities';
import addEventListeners from './events';
import locationType from './dataLocations';

function renderFieldset(obj, targetId) {
  let items = '';
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const item = `<input type="checkbox" id="${key}_${targetId}" name="${key}" data-key="${key}" checked/>`
            + `<label for="${key}_${targetId}">${(obj[key])}</label>`;
    items += `<div>${item}</div>`;
  });

  return `<div>${items}</div>`;
}

function renderOptions(columns, targetId) {
  const optionsHeader = '<div>'
        + '<button type="button" class="btn btn-outline-secondary btn-sm">View Options</button>'
        + '<button type="button" class="btn btn-outline-secondary btn-sm" onclick="window.print()">Print</button>'
        + '<div><span>Text Size:</span> <button type="button" class="btn btn-outline-secondary btn-sm textSize" data-change="-"> - </button> '
        + '<button type="button" class="btn btn-outline-secondary btn-sm textSize" data-change="+"> + </button></div>'
        + '</div>';
  const legend1 = '<legend>Show Data</legend>';
  const field1 = `<fieldset>${legend1}${renderFieldset(columns, targetId)}</fieldset>`;
  const legend2 = '<legend>Show Locations</legend>';
  const field2 = `<fieldset>${legend2}${renderFieldset(locationType, targetId)}</fieldset>`;
  const optionWrapper = `<div class="options removed">${field1}${field2}</div>`;

  return `<div class="optionsArea">${optionsHeader}${optionWrapper}</div>`;
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
  const columnsKeys = Object.keys(columns);
  columnsKeys.forEach((key) => {
    row += `<th title="Click to sort" data-key="${key}">`
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

    const dataLocationType = `data-location-type="${(element.contractNum !== undefined) ? 'rrc' : 'bop'}"`;

    rows += `<tr ${dataLocationType}>${row}</tr>`;
  });
  body = `<tbody class="table-group-divider">${rows}</tbody>`;

  return body;
}

function renderTable(data, columns, targetId) {
  const options = renderOptions(columns, targetId);
  // const showColumnButtons = renderShowColumnButtons(columns);
  const cols = renderTableCols(columns);
  const head = renderTableHead(columns);
  const caption = '<caption></caption>';
  const body = renderTableBody(data, columns);
  const table = `<table class="table table-sm table-striped">${caption}${cols}${head}${body}</table>`;
  const tableResponsive = `<div class="x-srcoll">${table}</div>`;

  return options + tableResponsive;
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
