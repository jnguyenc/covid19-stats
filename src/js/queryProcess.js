import dataColumns from './dataColumns';
import locationType from './dataLocations';
import { toggleColsView, toggleRowsView } from './events';

function queryProcess() {
  // Get query parameters
  const params = new URLSearchParams(window.location.search);
  const paramCols = params.getAll('c');
  const paramLocations = params.getAll('l');

  // Process only when paramater "c" exists in the query, othervise do nothing
  if (paramCols.length > 0) {
    const showList = paramCols.map((i) => Number.parseInt(i, 10));
    const keys = Object.keys(dataColumns);
    const targetDiv = document.querySelector('div.dataholder');
    const checkboxes = targetDiv.querySelectorAll('.options fieldset:nth-child(1) input');

    keys.forEach((key, index) => {
      // adjust the i from base 1 to base 0 (i-1);
      if (showList.find((i) => i - 1 === index) !== undefined) {
      // Leave at default if found - do nothing
      // console.log('found');
      } else {
        // Hide the column if not found
        toggleColsView(targetDiv, key);
        // Uncheck the option
        checkboxes[index].checked = false;
      }
    });
  }

  // Process only when paramater "l" exists in the query, othervise do nothing
  if (paramLocations.length > 0) {
    const showList = paramLocations.map((i) => Number.parseInt(i, 10));
    const keys = Object.keys(locationType);
    const targetDiv = document.querySelector('div.dataholder');
    const checkboxes = targetDiv.querySelectorAll('.options fieldset:nth-child(2) input');

    keys.forEach((key, index) => {
      if (showList.find((i) => i - 1 === index) !== undefined) {
      // Leave at default if found - do nothing
      // console.log('found');
      } else {
        // Hide the row if not found
        toggleRowsView(targetDiv, key);
        // Uncheck the option
        checkboxes[index].checked = false;
      }
    });
  }
}
export default queryProcess;
