import allCorrections from './dataCorrections';

function editDistance(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i += 1) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j += 1) {
      if (i === 0) { costs[j] = j; } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(
            Math.min(newValue, lastValue),
            costs[j],
          ) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) { costs[s2.length] = lastValue; }
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function fixField(data, key = 'id', threshold = 0.75) {
  const corrections = allCorrections[key];

  corrections.forEach((correction) => {
    data.forEach((r) => {
      const alike = similarity(correction, r[key]);
      if (alike > threshold) {
        console.log(correction, 'vs.', r[key], ':', alike);
        // eslint-disable-next-line no-param-reassign
        r[key] = correction;
      }
    });
  });
}

function copyField(data, from = 'code', to = 'facilityCode') {
  data.forEach((d) => {
    if (d[to] === undefined && d[from] !== undefined) {
      // eslint-disable-next-line no-param-reassign
      d[to] = d[from];
      console.log('copied', d[from]);
    }
  });
}

export { fixField, copyField };
