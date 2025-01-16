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
  rgbpp?: {
    mainnet?: CKBComponents.CellDep;
    testnet?: CKBComponents.CellDep;
    signet?: CKBComponents.CellDep;
  };
  btcTime?: {
    mainnet?: CKBComponents.CellDep;
    testnet?: CKBComponents.CellDep;
    signet?: CKBComponents.CellDep;
  };
  xudt?: {
    testnet?: CKBComponents.CellDep;
  };
  unique?: {
    testnet?: CKBComponents.CellDep;
  };
  tokenMetadata?: {
    testnet?: CKBComponents.CellDep;
  };
  utxoAirdropBadge?: {
    testnet?: CKBComponents.CellDep;
  };
  compatibleXudt?: {
    [codeHash: string]: CKBComponents.CellDep;
  };
}

export interface CellDepsRequest {
  rgbpp?: 'true' | 'false';
  btcTime?: 'true' | 'false';
  xudt?: 'true' | 'false';
  unique?: 'true' | 'false';
  tokenMetadata?: 'true' | 'false';
  utxoAirdropBadge?: 'true' | 'false';
  compatibleUdtCodeHashes?: string;
}

export const fetchCellDeps = async (req?: CellDepsRequest) => {
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
    !req || req.rgbpp === 'true' ? fetchRgbppCellDep(mainnetCollector, 'Mainnet') : undefined,
    !req || req.rgbpp === 'true' ? fetchRgbppCellDep(testnetCollector, 'Testnet3') : undefined,
    !req || req.rgbpp === 'true' ? fetchRgbppCellDep(testnetCollector, 'Signet') : undefined,
    !req || req.btcTime === 'true' ? fetchBtcTimeCellDep(mainnetCollector, 'Mainnet') : undefined,
    !req || req.btcTime === 'true' ? fetchBtcTimeCellDep(testnetCollector, 'Testnet3') : undefined,
    !req || req.btcTime === 'true' ? fetchBtcTimeCellDep(testnetCollector, 'Signet') : undefined,
    !req || req.xudt === 'true' ? fetchXudtTestnetCellDep(testnetCollector) : undefined,
    !req || req.unique === 'true' ? fetchUniqueTestnetCellDep(testnetCollector) : undefined,
    !req || req.tokenMetadata === 'true' ? fetchTokenMetadataCellDeps(testnetCollector, false) : undefined,
    !req || req.utxoAirdropBadge === 'true' ? fetchUtxoAirdropBadgeCellDeps(testnetCollector, false) : undefined,
    fetchCompatibleXudtCellDeps(testnetCollector, mainnetCollector, req?.compatibleUdtCodeHashes),
  ]);
  const cellDepsObj: CellDepsObject = {
    rgbpp: rgbppTestnet
      ? {
          mainnet: rgbppMainnet,
          testnet: rgbppTestnet,
          signet: rgbppSignet,
        }
      : undefined,
    btcTime: btcTimeTestnet
      ? {
          mainnet: btcTimeMainnet,
          testnet: btcTimeTestnet,
          signet: btcTimeSignet,
        }
      : undefined,
    xudt: xudtTestnet
      ? {
          testnet: xudtTestnet,
        }
      : undefined,
    unique: uniqueTestnet
      ? {
          testnet: uniqueTestnet,
        }
      : undefined,
    tokenMetadata: metadataTestnet
      ? {
          testnet: metadataTestnet,
        }
      : undefined,
    utxoAirdropBadge: utxoAirdropBadgeTestnet
      ? {
          testnet: utxoAirdropBadgeTestnet,
        }
      : undefined,
    compatibleXudt,
  };

  // Convert the object to JSON string
  return JSON.stringify(cellDepsObj, null, 2); // null and 2 for pretty formatting
};
