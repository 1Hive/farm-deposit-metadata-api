import { Router } from 'express'
const router = Router()

import { xdaiFarmClient, xdaiHoneyswapClient } from '../apollo/client'
import { DEPOSIT_QUERY, PAIR_QUERY } from '../apollo/queries'

// @route   GET api/metadata/xdai/:id
// @desc    Get metadata information for specific deposit
// @access  Public
router.get('/:id', async (req, res) => {
  const depositId = req.params.id

  try {
    const depositResult = await xdaiFarmClient.query({ 
      query: DEPOSIT_QUERY, 
      variables: { depositId } 
    })

    if (!depositResult.data.deposit) 
      return res.status(404).json({ msg: 'Deposit not found' })

    const { id, amount, pool: { id: poolId }, unlockTime, status } = depositResult.data.deposit
    const locked = +unlockTime * 1000 > Date.now()

    const pairResult = await xdaiHoneyswapClient.query({
      query: PAIR_QUERY,
      variables: { pair: poolId }
    })

    const { reserveUSD, totalSupply, token0, token1 } = pairResult.data.pair
    const pairSymbols = `${token0.symbol}-${token1.symbol}`,
          amountUSD = (amount / 1e18) * (reserveUSD / totalSupply)

    res.json({
      id: +id,
      description: `Honeyswap farming position on xDAI. $${amountUSD} deposited on pair ${pairSymbols}`,
      status,
      locked,
      unlockTime: locked ? +unlockTime : null,
      depositLpTokens: +amount / 1e18,
      depositUSD: amountUSD,
      pool: {
        id: poolId,
        tokens: pairSymbols,
        url: `https://info.honeyswap.org/#/pair/${poolId}?chainId=100`
      }
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
