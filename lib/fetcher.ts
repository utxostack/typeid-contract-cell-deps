import { Collector } from '@rgbpp-sdk/ckb';
import {
  fetchBtcTimeCellDep,
  fetchCompatibleXudtCellDeps,
  fetchRgbppCellDep,
  fetchTokenMetadataCellDeps,
  fetchUniqueTestnetCellDep,
  fetchUtxoAirdropBadgeCellDeps,
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
  tokenMetadata: {
    testnet: CKBComponents.CellDep;
  };
  utxoAirdropBadge: {
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

  const [
    rgbppMainnet,
    rgbppTestnet,
    rgbppSignet,
    btcTimeMainnet,
    btcTimeTestnet,
    btcTimeSignet,
    xudtTestnet,
    uniqueTestnet,
    metadataTestnet,
    utxoAirdropBadgeTestnet,
    compatibleXudt,
  ] = await Promise.all([
    fetchRgbppCellDep(mainnetCollector, 'Mainnet'),
    fetchRgbppCellDep(testnetCollector, 'Testnet3'),
    fetchRgbppCellDep(testnetCollector, 'Signet'),
    fetchBtcTimeCellDep(mainnetCollector, 'Mainnet'),
    fetchBtcTimeCellDep(testnetCollector, 'Testnet3'),
    fetchBtcTimeCellDep(testnetCollector, 'Signet'),
    fetchXudtTestnetCellDep(testnetCollector),
    fetchUniqueTestnetCellDep(testnetCollector),
    fetchTokenMetadataCellDeps(testnetCollector, false),
    fetchUtxoAirdropBadgeCellDeps(testnetCollector, false),
    fetchCompatibleXudtCellDeps(testnetCollector, mainnetCollector),
  ]);
  const cellDepsObj: CellDepsObject = {
    rgbpp: {
      mainnet: rgbppMainnet,
      testnet: rgbppTestnet,
      signet: rgbppSignet,
    },
    btcTime: {
      mainnet: btcTimeMainnet,
      testnet: btcTimeTestnet,
      signet: btcTimeSignet,
    },
    xudt: {
      testnet: xudtTestnet,
    },
    unique: {
      testnet: uniqueTestnet,
    },
    tokenMetadata: {
      testnet: metadataTestnet,
    },
    utxoAirdropBadge: {
      testnet: utxoAirdropBadgeTestnet,
    },
    compatibleXudt,
  };

  // Convert the object to JSON string
  return JSON.stringify(cellDepsObj, null, 2); // null and 2 for pretty formatting
};
