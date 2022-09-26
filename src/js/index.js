import '../styles/main.scss';
import fetchData from './fetchData';
import dataUrls from './dataUrls';
import { mergeData } from './dataProcess';
import dataColumns from './dataColumns';
import { writeTable } from './htmlRenders';

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

  let cols = { nameDisplay: 'Facility', city: 'City', zipCode: 'Zip Code' };
  writeTable(mergedData, cols);

  cols = {
    code: 'Code', nameDisplay: 'Facility', city: 'City', zipCode: 'Zip Code',
  };
  writeTable(mergedData, cols, '#area4');

  console.log(RRC, facls, rrcData, privateData, rrcTesting);

  // End of .then
}).catch((err) => {
  console.error('There was error', err);
});
