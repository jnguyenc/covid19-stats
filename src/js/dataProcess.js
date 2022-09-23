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

function sortData() {
  console.log('sorting...');
}

export { mergeData, sortData };
