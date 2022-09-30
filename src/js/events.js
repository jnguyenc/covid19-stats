import { sortData } from './dataProcess';

function optionEventHandler(event) {
  const targetElement = event.currentTarget;
  const targetDiv = targetElement.closest('div.dataholder');
  const targetCol = targetDiv.querySelector(`col[data-key="${targetElement.name}"]`);

  // if (targetElement.checked) {
  //   targetCol.classList.replace('hide', 'show');
  // } else {
  //   targetCol.classList.replace('show', 'hide');
  // }
  targetCol.classList.toggle('hide');
}

function columnEyeEventHandler(event) {
  event.stopPropagation();
  const targetElement = event.target;
  console.log(event.target);
  const targetDiv = targetElement.closest('div.dataholder');
  const targetCol = targetDiv.querySelector(`col[data-key="${targetElement.parentElement.dataset.key}"]`);
  targetCol.classList.replace('show', 'hide');

  const reShow = targetDiv.querySelector(`div.showColumns div[data-key="${targetElement.parentElement.dataset.key}"`);
  reShow.classList.replace('hide', 'show');
}

function columnEventHandler(event) {
  console.log('The event was fired from:', event.target);
  // set to currentTarget instead of target to handle events from children elements
  const targetElement = event.currentTarget;
  const targetKey = targetElement.dataset.key;
  const targetTable = targetElement.closest('table');
  const tbody = targetTable.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  const sortDirection = targetElement.dataset.sortDirection || 'desc';
  const newSortDirection = (sortDirection === 'desc') ? 'asc' : 'desc';

  // remove sort from all columns
  const cols = targetTable.querySelectorAll('thead th');
  cols.forEach((col) => {
    // _eslint-disable-next-line no-return-assign, no-param-reassign
    // col.dataset.sortDirection = '';
    // rewriten so eslint does not complain
    const currentCol = col;
    currentCol.dataset.sortDirection = '';
    const sortVisual = col.querySelector('i[data-role="sort"]');
    sortVisual.classList.remove(...sortVisual.classList);
  });

  // save sort direction to data attribute
  targetElement.dataset.sortDirection = newSortDirection;

  // set up the visual sort icon
  const sortVisual = targetElement.querySelector('i[data-role="sort"]');
  const visualClass = (newSortDirection === 'asc') ? 'bi-sort-down-alt' : 'bi-sort-down';
  sortVisual.classList.add('bi', visualClass);

  // sort the data
  const sortedData = sortData(rows, newSortDirection, (row) => row.querySelector(`td[data-key="${targetKey}"]`).innerHTML);

  // prepared the sorted rows
  const frag = document.createDocumentFragment();
  sortedData.forEach((r) => {
    frag.appendChild(r);
  });

  // update the table with sorted rows
  tbody.appendChild(frag);
}

function addEventListeners(target) {
  const options = target.querySelectorAll('input[type="checkbox"]');
  options.forEach((obj) => { obj.addEventListener('click', optionEventHandler); });

  const columns = target.querySelectorAll('thead th');
  columns.forEach((obj) => { obj.addEventListener('click', columnEventHandler); });

  const columnsEye = target.querySelectorAll('thead th i[data-role="show"]');
  columnsEye.forEach((obj) => { obj.addEventListener('click', columnEyeEventHandler); });
}

export default addEventListeners;
