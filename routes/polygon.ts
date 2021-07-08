import { Router } from 'express'
const router = Router()

import { polygonFarmClient, polygonHoneyswapClient } from '../apollo/client'
import { DEPOSIT_QUERY, PAIR_QUERY } from '../apollo/queries'

// @route   GET api/metadata/polygon/:id
// @desc    Get metadata information for specific deposit
// @access  Public
router.get('/:id', async (req, res) => {
  const depositId = req.params.id

  try {
    const depositResult = await polygonFarmClient.query({ 
      query: DEPOSIT_QUERY, 
      variables: { depositId } 
    })

    if (!depositResult.data.deposit) 
      return res.status(404).json({ msg: 'Deposit not found' })

    const { id, amount, pool: { id: poolId }, unlockTime, status } = depositResult.data.deposit
    const locked = +unlockTime * 1000 > Date.now()

    const pairResult = await polygonHoneyswapClient.query({
      query: PAIR_QUERY,
      variables: { pair: poolId }
    })

    const { reserveUSD, totalSupply, token0, token1 } = pairResult.data.pair
    const amountUSD = (amount / 1e18) * (reserveUSD / totalSupply)

    res.json({
      id: +id,
      description: 'Deposit', // TO-DO
      amountLpTokens: +amount / 1e18,
      amountUSD,
      pool: {
        id: poolId,
        tokens: `${token0.symbol}-${token1.symbol}`,
        url: `https://info.honeyswap.org/#/pair/${poolId}?chainId=137`
      },
      status,
      locked,
      unlockTime: locked ? +unlockTime : null
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
