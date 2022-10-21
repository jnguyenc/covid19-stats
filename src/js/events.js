import { sortData } from './dataProcess';

function optionsExpandHandler(event) {
  event.stopPropagation();
  const targetElement = event.target;
  const targetDiv = targetElement.closest('div.dataholder');
  // ensure the target is the button, even when the link was clicked, no longer needed.
  // targetElement = targetDiv.querySelector('button');
  const { id } = targetDiv;
  const label = targetElement.innerHTML;
  const optionsClosed = '<i class="bi bi-chevron-double-down"></i> View Options';
  const optionsExpanded = '<i class="bi bi-chevron-double-up"></i> Hide Options';
  targetElement.innerHTML = label === optionsClosed ? optionsExpanded : optionsClosed;
  targetDiv.querySelector(`#${id} .options`).classList.toggle('removed');
}

function textSizeHandler(event) {
  const lowerLimitFontSize = 8;
  const upLimitFontSize = 25;
  const buttonClicked = event.target;
  const { change } = buttonClicked.dataset;
  const table = document.querySelector('table');
  const style = window.getComputedStyle(table, null).getPropertyValue('font-size');
  const currentFontSize = parseFloat(style);
  const newFontSize = (change === '+') ? currentFontSize + 1 : currentFontSize - 1;
  const messageElement = buttonClicked.closest('div').querySelector('.fontSizeMessage');
  if (newFontSize > lowerLimitFontSize && newFontSize < upLimitFontSize) {
    table.style.fontSize = `${newFontSize}px`;
    messageElement.innerHTML = '';
  } else {
    messageElement.innerHTML = '(limit reached)';
  }
}

function toggleColsView(targetDiv, key) {
  const selectedCol = targetDiv.querySelector(`col[data-key="${key}"]`);
  selectedCol.classList.toggle('collapsed');
  selectedCol.classList.toggle('removed');
  const selectedHeader = targetDiv.querySelector(`th[data-key="${key}"]`);
  selectedHeader.classList.toggle('removed');
  const selectedRows = targetDiv.querySelectorAll(`td[data-key="${key}"]`);
  selectedRows.forEach((row) => { row.classList.toggle('removed'); });
}

function toggleRowsView(targetDiv, key) {
  const selectedRows = targetDiv.querySelectorAll(`tr[data-location-type="${key}"]`);
  selectedRows.forEach((row) => { row.classList.toggle('removed'); });
  // const caption = targetDiv.querySelector('table caption');
  // caption.innerHTML = 'Showing...';
}

/**
 * This funciton handles all click events from the checkboxes, and then calls other helper function
 * to handles specific tasks
 * @param {} event
 */
function optionEventHandler(event) {
  const targetElement = event.currentTarget;
  const targetDiv = targetElement.closest('div.dataholder');
  const { key } = targetElement.dataset;
  if (key === 'bop' || key === 'rrc') {
    toggleRowsView(targetDiv, key);
  } else {
    toggleColsView(targetDiv, key);
  }
}

function columnEventHandler(event) {
  // console.log('The event was fired from:', event.target);
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
  const optionExpand = target.querySelector('div .btn');
  optionExpand.addEventListener('click', optionsExpandHandler);
  const textSizeBtns = target.querySelectorAll('div .textSize');
  textSizeBtns.forEach((btn) => {
    btn.addEventListener('click', textSizeHandler);
  });

  const options = target.querySelectorAll('input[type="checkbox"]');
  options.forEach((obj) => { obj.addEventListener('click', optionEventHandler); });

  const columns = target.querySelectorAll('thead th');
  columns.forEach((obj) => { obj.addEventListener('click', columnEventHandler); });
}

export default addEventListeners;
