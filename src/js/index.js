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

  let bopLocations = [];
  let rrcLocations = [];
  let allLocations = [];

  bopLocations = mergeData(bopData, 'id', Locations, 'code');
  bopLocations = mergeData(bopLocations, 'code', OpsLevel, 'faclCode');
  bopLocations = mergeData(bopLocations, 'code', bopVaccine, 'facility');
  bopLocations = mergeData(bopLocations, 'code', bopTesting, 'facilityCode');
  // writeTable(bopLocations, dataColumns, '#area1');

  rrcLocations = mergeData(rrcData, 'contractNum', RRC, 'contractNum');
  rrcLocations = mergeData(rrcLocations, 'contractNum', facls, 'contractNum');
  rrcLocations = mergeData(rrcLocations, 'id', rrcTesting, 'facilityName');
  rrcLocations = mergeData(rrcLocations, 'facilityCode', OpsLevel, 'faclCode');
  // writeTable(rrcLocations, dataColumns);

  allLocations = [...bopLocations, ...rrcLocations];
  writeTable(allLocations, dataColumns, '#area1');

  console.log(privateData);

  // End of .then
}).catch((err) => {
  console.error('There was error', err);
});
