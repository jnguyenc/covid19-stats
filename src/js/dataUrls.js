// This is for production
const dataUrlsProd = [
  'data/rrc.json',
  'data/locations.json',
  'data/additional.json',
  '/coronavirus/json/final.json',
  '/coronavirus/json/inmateTestInfo.json',
  '/coronavirus/json/vaccineInfo.json',
  '/PublicInfo/execute/opslevel?todo=query&output=json',
];

// This is for development
const dataUrlsDev = [
  'data/rrc.json',
  'data/locations.json',
  'data/additional.json',
  'data/final.json',
  'data/inmateTestInfo.json',
  'data/vaccineInfo.json',
  'data/opslevel.json',
];

// Comment out one of the next two lines depend on building for production or development
const dataUrls = dataUrlsDev;
// const dataUrls = dataUrlsProd;

export default dataUrls;
