import { Collector } from '@rgbpp-sdk/ckb';
import {
  fetchBtcTimeCellDep,
  fetchCompatibleXudtCellDeps,
  fetchRgbppCellDep,
  fetchUniqueTestnetCellDep,
  fetchXudtTestnetCellDep,
} from './typeid.js';

interface CellDepsObject {
  rgbpp: {
    mainnet: CKBComponents.CellDep;
    testnet: CKBComponents.CellDep;
    signet: CKBComponents.CellDep;
  };
  btcTime: {
    mainnet: CKBComponents.CellDep;
    testnet: CKBComponents.CellDep;
    signet: CKBComponents.CellDep;
  };
  xudt: {
    testnet: CKBComponents.CellDep;
  };
  unique: {
    testnet: CKBComponents.CellDep;
  };
  compatibleXudt: {
    [codeHash: string]: CKBComponents.CellDep;
  };
}

export const fetchCellDeps = async () => {
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
      mainnet: await fetchRgbppCellDep(mainnetCollector, 'Mainnet'),
      testnet: await fetchRgbppCellDep(testnetCollector, 'Testnet3'),
      signet: await fetchRgbppCellDep(testnetCollector, 'Signet'),
    },
    btcTime: {
      mainnet: await fetchBtcTimeCellDep(mainnetCollector, 'Mainnet'),
      testnet: await fetchBtcTimeCellDep(testnetCollector, 'Testnet3'),
      signet: await fetchBtcTimeCellDep(testnetCollector, 'Signet'),
    },
    xudt: {
      testnet: await fetchXudtTestnetCellDep(testnetCollector),
    },
    unique: {
      testnet: await fetchUniqueTestnetCellDep(testnetCollector),
    },
    compatibleXudt: await fetchCompatibleXudtCellDeps(testnetCollector, mainnetCollector),
  };

  // Convert the object to JSON string
  return JSON.stringify(cellDepsObj, null, 2); // null and 2 for pretty formatting
};
