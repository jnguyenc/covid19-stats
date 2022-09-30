function mergeData(dataA, propertyA, dataB, propertyB) {
  const mergedData = [...dataA];

  mergedData.forEach((elementA, index, theArr) => {
    let value = elementA[propertyA];
    if (value !== undefined) {
      value = value.toLowerCase();
    } else return;
    const elementB = dataB.find((ele) => ele[propertyB].toLowerCase() === value
                    || ele[propertyB].toLowerCase().includes(value));
    if (elementB !== undefined) {
      // console.log('Found');
      const mergedElement = { ...elementA, ...elementB };
      theArr.splice(index, 1, mergedElement);
    } else {
      // console.log('Not found', elementA.id);
    }
  });
  return mergedData;
}

function sortData(arr, sortDirection, getValue) {
  // getValue is a call-back function to locate the value in the array
  // example 1: (row) => row.querySelector(`td[data-key="${targetKey}"]`).innerHTML;
  // example 2: (ele) => ele[key];

  return arr.sort((a, b) => {
    let aValue = getValue(a);
    let bValue = getValue(b);
    let ret = 0;

    const aInt = Number.parseInt(aValue, 10);
    const bInt = Number.parseInt(bValue, 10);
    if (!Number.isNaN(aInt) && !Number.isNaN(bInt)) {
      aValue = aInt;
      bValue = bInt;
    }

    if (aValue > bValue) ret = 1;
    if (aValue < bValue) ret = -1;

    return ret * (sortDirection === 'asc' ? 1 : -1);
  });
}

export { mergeData, sortData };
