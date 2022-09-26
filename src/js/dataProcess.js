function mergeData(dataA, propertyA, dataB, propertyB) {
  const mergedData = [...dataA];

  mergedData.forEach((elementA, index, theArr) => {
    const value = elementA[propertyA];
    const elementB = dataB.find((ele) => ele[propertyB] === value);
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
  return arr.sort((a, b) => {
    let aValue = getValue(a);
    let bValue = getValue(b);

    const aInt = Number.parseInt(aValue, 10);
    const bInt = Number.parseInt(bValue, 10);
    if (!Number.isNaN(aInt) && !Number.isNaN(bInt)) {
      aValue = aInt;
      bValue = bInt;
    }

    // TODO: rewrite this nested ternary to regular if else to sastify eslint
    return (
      (aValue === bValue ? 0 : aValue > bValue ? 1 : -1)
      * (sortDirection === 'asc' ? 1 : -1)
    );
  });
}

export { mergeData, sortData };
