function mergeData(dataA, propertyA, dataB, propertyB, consoleOut = false) {
    if (consoleOut) {
        console.log('Merging', propertyA, propertyB);
    }

    const mergedData = [...dataA];

    mergedData.forEach((elementA, index, theArr) => {
        let value = elementA[propertyA];
        if (value !== undefined && value !== '') {
            value = value.toLowerCase();
        } else {
            if (consoleOut) {
                console.log(propertyA, 'is undefined or empty', elementA);
            }
            return;
        }
        if (consoleOut) {
            console.log(propertyA, 'is', value);
        }

        const elementB = dataB.find(
            (ele) => ele[propertyB].toLowerCase() === value || ele[propertyB].toLowerCase().includes(value)
        );
        if (elementB !== undefined) {
            if (consoleOut) {
                console.log('Found match', elementA, elementB);
            }
            const mergedElement = { ...elementA, ...elementB };
            theArr.splice(index, 1, mergedElement);
        } else {
            if (consoleOut) {
                console.log('No match', value, elementA);
            }
        }
    });
    return mergedData;
}

/**
 * @param {Array} arr
 * @param {String} sortDirection
 * @param {Function Object} getValue
 * @returns {Array}
 * getValue is a call-back function. It locates the value in the array
 * example 1: (row) => row.querySelector(`td[data-key="${targetKey}"]`).innerHTML;
 * example 2: (ele) => ele[key];
 */

function sortData(arr, sortDirection, getValue) {
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
