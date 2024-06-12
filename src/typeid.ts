import { Collector } from '@rgbpp-sdk/ckb';

export type BTCNetworkType = 'Mainnet' | 'Testnet3' | 'Signet'

const TYPEID_DEPLOYMENT_TYPE_SCRIPT: CKBComponents.Script = {
  codeHash: '0x00000000000000000000000000000000000000000000000000545950455f4944',
  hashType: 'type',
  args: '0x',
};

const rgbppDeploymentTypeScript = (btcNetworkType: BTCNetworkType): CKBComponents.Script => {
  // Get the mainnet type script of the output(https://explorer.nervos.org/transaction/0x04c5c3e69f1aa6ee27fb9de3d15a81704e387ab3b453965adbe0b6ca343c6f41#0)
  let args = '0x68ad3d9e0bb9ea841a5d1fcd600137bd3f45401e759e353121f26cd0d981452f'
  if (btcNetworkType === 'Testnet3') {
    // Get the testnet type script of the output(https://pudge.explorer.nervos.org/transaction/0xa3bc8441df149def76cfe15fec7b1e51d949548bc27fb7a75e9d4b3ef1c12c7f#0)
    args = '0xa3bc8441df149def76cfe15fec7b1e51d949548bc27fb7a75e9d4b3ef1c12c7f'
  } else if (btcNetworkType === 'Signet') {
    args = '0xb69fe766ce3b7014a2a78ad1fe688d82f1679325805371d2856c3b8d18ebfa5a'
  }
  return {
    ...TYPEID_DEPLOYMENT_TYPE_SCRIPT,
    args
  };
};

const btcTimeDeploymentTypeScript = (btcNetworkType: BTCNetworkType): CKBComponents.Script => {
  // Get the mainnet type script of the output(https://explorer.nervos.org/transaction/0x6257bf4297ee75fcebe2654d8c5f8d93bc9fc1b3dc62b8cef54ffe166162e996#0)
  let args = '0x44b8253ae18e913a2845b0d548eaf6b3ba1099ed26835888932a754194028a8a'
  if (btcNetworkType === 'Testnet3') {
    // Get the testnet type script of the output(https://pudge.explorer.nervos.org/transaction/0xde0f87878a97500f549418e5d46d2f7704c565a262aa17036c9c1c13ad638529#0)
    args = '0xc9828585e6dd2afacb9e6e8ca7deb0975121aabee5c7983178a45509ffaec984'
  } else if (btcNetworkType === 'Signet') {
    args = '0x32fc8c70a6451a1439fd91e214bba093f9cdd9276bc4ab223430dab5940aff92'
  }
  return {
    ...TYPEID_DEPLOYMENT_TYPE_SCRIPT,
    args
  };
};

const uniqueTestnetDeploymentTypeScript = (): CKBComponents.Script => {
  return {
    ...TYPEID_DEPLOYMENT_TYPE_SCRIPT,
    // Get the testnet type script of the output(https://pudge.explorer.nervos.org/transaction/0xff91b063c78ed06f10a1ed436122bd7d671f9a72ef5f5fa28d05252c17cf4cef#0)
    args: '0xe04976b67600fd25ac50305f77b33aee2c12e3c18e63ece9119e5b32117884b5',
  };
};

const xudtTestnetDeploymentTypeScript = (): CKBComponents.Script => {
  return {
    ...TYPEID_DEPLOYMENT_TYPE_SCRIPT,
    // Get the testnet type script of the output(https://pudge.explorer.nervos.org/transaction/0xbf6fb538763efec2a70a6a3dcb7242787087e1030c4e7d86585bc63a9d337f5f#0)
    args: '0x44ec8b96663e06cc94c8c468a4d46d7d9af69eaf418f6390c9f11bb763dda0ae',
  };
};

export const fetchRgbppCellDep = async (collector: Collector, btcNetworkType: BTCNetworkType): Promise<CKBComponents.CellDep> => {
  const [cell] = await collector.getCells({ type: rgbppDeploymentTypeScript(btcNetworkType) });
  if (!cell) {
    throw new Error('No rgbpp lock deployment live cell found');
  }
  const rgbppLockDep: CKBComponents.CellDep = {
    outPoint: cell.outPoint,
    depType: 'code',
  };
  return rgbppLockDep;
};

export const fetchBtcTimeCellDep = async (collector: Collector, btcNetworkType: BTCNetworkType): Promise<CKBComponents.CellDep> => {
  const [cell] = await collector.getCells({ type: btcTimeDeploymentTypeScript(btcNetworkType) });
  if (!cell) {
    throw new Error('No BTC time lock deployment live cell found');
  }
  const btcTimeLockDep: CKBComponents.CellDep = {
    outPoint: cell.outPoint,
    depType: 'code',
  };
  return btcTimeLockDep;
};

export const fetchXudtTestnetCellDep = async (collector: Collector): Promise<CKBComponents.CellDep> => {
  const [cell] = await collector.getCells({ type: xudtTestnetDeploymentTypeScript() });
  if (!cell) {
    throw new Error('No xudt type deployment live cell found');
  }
  return {
    outPoint: cell.outPoint,
    depType: 'code',
  };
};

export const fetchUniqueTestnetCellDep = async (collector: Collector): Promise<CKBComponents.CellDep> => {
  const [cell] = await collector.getCells({ type: uniqueTestnetDeploymentTypeScript() });
  if (!cell) {
    throw new Error('No unique type deployment live cell found');
  }
  return {
    outPoint: cell.outPoint,
    depType: 'code',
  };
};
