# typeid-contract-cell-deps
The `typeid-contract-cell-deps` repository contains the cell deps of the CKB contracts deployed by TypeID.

## Cell Deps APIs

You can fetch all supported cell deps using the following HTTP GET request:

```bash
curl -X GET "https://typeid-contract-cell-deps.vercel.app/api/cell-deps"
```

To filter specific cell deps, append query parameters to the URL:

```bash
curl -X GET "https://typeid-contract-cell-deps.vercel.app/api/filter-cell-deps?xudt=false&compatibleUdtCodeHashes=0x1142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a,0x26a33e0815888a4a0614a0b7d09fa951e0993ff21e55905510104a0b1312032b"
```

### Query Parameters

- **rgbpp**: boolean, `true` means included, `false` means not included
- **btcTime**: boolean, `true` means included, `false` means not included
- **xudt**: boolean, `true` means included, `false` means not included
- **unique**: boolean, `true` means included, `false` means not included
- **tokenMetadata**: boolean, `true` means included, `false` means not included
- **utxoAirdropBadge**: boolean, `true` means included, `false` means not included
- **compatibleUdtCodeHashes**: string, a comma-separated string representing code hash array

All cell deps are cached for 30 to 60 seconds. Cache details can be found [here](./api/cell-deps.ts).

## Compatible xUDT TypeId Deployment Information

A fungible token fully compatible with xUDT can submit deployment information for the mainnet and testnet in the [compatible-udt.json](./compatible-udt.json) file. The API response will return the cell dep of the asset.

**Anyone can create a GitHub Pull Request to add their fully-compatible-xUDT TypeId deployment information.**

**Feel free to submit your token information.**

The fully-compatible-xUDT JSON format is as follows:

```json
{
  "_description": "RUSD testnet code hash and deployment type script args",
  "_udt_link": "https://testnet.explorer.nervos.org/xudt/0x45b32a2bc4285d0a09678eb11960ddc8707bc2779887a09d482e9bfe9a2cdf52",
  "_deployment_link": "https://testnet.explorer.nervos.org/transaction/0xed7d65b9ad3d99657e37c4285d585fea8a5fcaf58165d54dacf90243f911548b#0",
  "network": "testnet",
  "codeHash": "0x1142755a044bf2ee358cba9f2da187ce928c91cd4dc8692ded0337efa677d21a",
  "deploymentTypeArgs": "0x97d30b723c0b2c66e9cb8d4d0df4ab5d7222cbb00d4a9a2055ce2e5d7f0d8b0f"
}
```

### Annotative Optional Fields

- **_description**: The compatible-xUDT token description
- **_udt_link**: The compatible-xUDT token detail link on the CKB Explorer
- **_deployment_link**: The compatible-xUDT token deployment transaction detail link on the CKB Explorer

### Required Fields

- **network**: `testnet` or `mainnet` for Nervos CKB
- **codeHash**: The compatible-xUDT token code hash
- **deploymentTypeArgs**: The compatible-xUDT token deployment transaction output type script args
