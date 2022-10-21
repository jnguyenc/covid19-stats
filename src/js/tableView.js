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

export { toggleColsView, toggleRowsView };
