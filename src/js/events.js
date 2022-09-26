import { sortData } from './dataProcess';

function optionEventHandler(event) {
  const targetElement = event.currentTarget;
  const targetTable = targetElement.closest('div.dataholder');
  const targetCol = targetTable.querySelector(`col[data-key="${targetElement.name}"]`);

  if (targetElement.checked) {
    targetCol.classList.replace('inactive', 'active');
  } else {
    targetCol.classList.replace('active', 'inactive');
  }
}

function columnEventHandler(event) {
  const targetElement = event.currentTarget;
  const targetKey = targetElement.dataset.key;
  const targetTable = targetElement.closest('table');
  const tbody = targetTable.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const sortDirection = targetElement.dataset.sortDirection || 'desc';
  const newSortDirection = (sortDirection === 'desc') ? 'asc' : 'desc';

  // remove sort from all columns
  const cols = targetTable.querySelectorAll('thead th');
  // eslint-disable-next-line no-return-assign, no-param-reassign
  cols.forEach((col) => col.dataset.sortDirection = '');

  targetElement.dataset.sortDirection = newSortDirection;

  const sortedData = sortData(rows, newSortDirection, (row) => row.querySelector(`td[data-key="${targetKey}"]`).innerHTML);
  const frag = document.createDocumentFragment();

  sortedData.forEach((r) => {
    frag.appendChild(r);
  });

  tbody.appendChild(frag);
}

function addEventListeners(tableElement) {
  const options = tableElement.querySelectorAll('input[type="checkbox"');
  options.forEach((obj) => { obj.addEventListener('click', optionEventHandler); });

  const columns = tableElement.querySelectorAll('thead th');
  columns.forEach((obj) => { obj.addEventListener('click', columnEventHandler); });
}

export default addEventListeners;
