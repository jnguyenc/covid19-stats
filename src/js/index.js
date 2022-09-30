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

  let data = [];

  data = mergeData(bopData, 'id', Locations, 'code');
  data = mergeData(data, 'code', OpsLevel, 'faclCode');
  data = mergeData(data, 'code', bopVaccine, 'facility');
  data = mergeData(data, 'code', bopTesting, 'facilityCode');
  writeTable(data, dataColumns, '#area1');

  data = mergeData(rrcData, 'contractNum', RRC, 'contractNum');
  data = mergeData(data, 'contractNum', facls, 'contractNum');
  data = mergeData(data, 'id', rrcTesting, 'facilityName');
  data = mergeData(data, 'facilityCode', OpsLevel, 'faclCode');
  writeTable(data, dataColumns);

  console.log(privateData);

  // End of .then
}).catch((err) => {
  console.error('There was error', err);
});
