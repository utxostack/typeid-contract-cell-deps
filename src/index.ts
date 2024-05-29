import { Collector } from '@rgbpp-sdk/ckb';
import * as fs from 'fs';
import * as path from 'path';
import { fetchBtcTimeCellDep, fetchRgbppCellDep, fetchUniqueTestnetCellDep, fetchXudtTestnetCellDep } from './typeid';

interface CellDepsObject {
  rgbpp: {
    mainnet: CKBComponents.CellDep;
    testnet: CKBComponents.CellDep;
  };
  btcTime: {
    mainnet: CKBComponents.CellDep;
    testnet: CKBComponents.CellDep;
  };
  xudt: {
    testnet: CKBComponents.CellDep;
  };
  unique: {
    testnet: CKBComponents.CellDep;
  };
}

const fetchAndUpdateCellDeps = async () => {
  const testnetCollector = new Collector({
    ckbNodeUrl: 'https://testnet.ckb.dev/rpc',
    ckbIndexerUrl: 'https://testnet.ckb.dev/indexer',
  });
  const mainnetCollector = new Collector({
    ckbNodeUrl: 'https://mainnet.ckb.dev/rpc',
    ckbIndexerUrl: 'https://mainnet.ckb.dev/indexer',
  });

  const cellDepsObj: CellDepsObject = {
    rgbpp: {
      testnet: await fetchRgbppCellDep(testnetCollector, false),
      mainnet: await fetchRgbppCellDep(mainnetCollector, true),
    },
    btcTime: {
      testnet: await fetchBtcTimeCellDep(testnetCollector, false),
      mainnet: await fetchBtcTimeCellDep(mainnetCollector, true),
    },
    xudt: {
      testnet: await fetchXudtTestnetCellDep(testnetCollector),
    },
    unique: {
      testnet: await fetchUniqueTestnetCellDep(testnetCollector),
    },
  };

  // Convert the object to JSON string
  const jsonData = JSON.stringify(cellDepsObj, null, 2); // null and 2 for pretty formatting

  // Specify the file path
  const filePath = path.join(__dirname, '..', 'deployment/cell-deps.json');

  // Write JSON string to file
  try {
    fs.writeFileSync(filePath, jsonData);
    console.log('JSON data has been written to', filePath);
  } catch (err) {
    console.error('Error writing JSON to file:', err);
  }
};

fetchAndUpdateCellDeps();
