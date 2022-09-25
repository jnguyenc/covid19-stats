function optionEventHandler(event) {
  const targetElement = event.currentTarget;
  const targetTable = targetElement.closest('div.dataholder');
  const targetCol = targetTable.querySelector(`col.${targetElement.name}`);

  if (targetElement.checked) {
    targetCol.classList.replace('inactive', 'active');
  } else {
    targetCol.classList.replace('active', 'inactive');
  }
}

function columnEventHandler(event) {
  console.log(event.currentTarget.classList);
}

function addEventListeners(tableElement) {
  const options = tableElement.querySelectorAll('input[type="checkbox"');
  options.forEach((obj) => { obj.addEventListener('click', optionEventHandler); });

  const columns = tableElement.querySelectorAll('thead th');
  columns.forEach((obj) => { obj.addEventListener('click', columnEventHandler); });
}

export default addEventListeners;
