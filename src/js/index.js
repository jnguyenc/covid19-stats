import '../styles/main.scss';
// import { CleanPlugin } from 'webpack';
import fetchData from './fetchData';
import { mergeData } from './dataProcess';
import dataUrls from './dataUrls';
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
  const target = writeTable(mergedData, cols);
  const col = target.querySelector('col.zipCode');
  col.classList.replace('active', 'inactive');

  const option = target.querySelector('input[name="zipCode"]');
  console.log(option.checked);
  option.checked = !option.checked;
  console.log(option.checked);

  cols = {
    code: 'Code', nameDisplay: 'Facility', city: 'City', zipCode: 'Zip Code',
  };
  writeTable(mergedData, cols, '#area4');

  console.log(RRC, facls, rrcData, privateData, rrcTesting);

  // End of .then
}).catch((err) => {
  console.error('There was error', err);
});
