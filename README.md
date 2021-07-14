# Farm deposit metadata API

An API to get information from deposits on the farms

### To get started

- Install the dependencies `npm install`
- Run the server `npm start` or `npm run dev`

You can get farming deposits metadata for xDai as well as Polygon by making GET requests to `/api/metadata/xdai/:id` or `/api/metadata/polygon/:id`

### Example response

```JSON
{
    "id": 40,
    "description": "Honeyswap farming position on Polygon. $0.15343422955530484 deposited on pair WETH-AAVE",
    "status": "Open",
    "locked": true,
    "unlockTime": 1635510564,
    "depositLpTokens": 0.000094018442493348,
    "depositUSD": 0.15343422955530484,
    "pool": {
        "id": "0x0c787944946d22922c9f41c477cc539700d35bb2",
        "tokens": "WETH-AAVE",
        "url": "https://info.honeyswap.org/#/pair/0x0c787944946d22922c9f41c477cc539700d35bb2?chainId=137"
    }
}
```
