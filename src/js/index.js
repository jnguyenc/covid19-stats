import '../styles/main.scss';
import fetchData from './fetchData';
import { mergeData } from './dataProcess';
import dataUrls from './dataUrls';
import dataColumns from './dataColumns';
import { generateTable, writeTable } from './htmlGenerators';

fetchData(dataUrls).then((allJson) => {
  const { RRC } = allJson[0];
  const { Locations } = allJson[1];
  const { facls } = allJson[2];
  const { bopData, rrcData, privateData } = allJson[3];
  const { bopTesting, rrcTesting } = allJson[4];
  const { bopVaccine } = allJson[5];
  const { OpsLevel } = allJson[6];

  let mergedData = [];
  mergedData = mergeData(Locations, 'code', OpsLevel, 'faclCode');
  mergedData = mergeData(mergedData, 'code', bopVaccine, 'facility');
  mergedData = mergeData(mergedData, 'code', bopTesting, 'facilityCode');
  mergedData = mergeData(mergedData, 'code', bopData, 'id');

  writeTable(mergedData, dataColumns, '#area1');

  // document.querySelector('#area2').innerHTML = generateTable(mergedData, { code: 'Code', city: 'City', zipCode: 'Zip Code' });

  let cols = { nameDisplay: 'Facility', city: 'City', zipCode: 'Zip Code' };
  writeTable(mergedData, cols);

  cols = {
    code: 'Code', nameDisplay: 'Facility', city: 'City', zipCode: 'Zip Code',
  };
  writeTable(mergedData, cols, '#area4');

  // End of .then
}).catch((err) => {
  console.error('There was error', err);
});
