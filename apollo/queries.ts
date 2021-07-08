import gql from 'graphql-tag'

export const DEPOSIT_QUERY = gql`
  query FetchDepositData($depositId: String!) {
    deposit (id: $depositId) {
      id
      amount
      pool {
        id
      }
      unlockTime
      status
    }
  }
`

export const PAIR_QUERY = gql`
  query PairQuery($pair: ID!) {
    pair (id: $pair) {
      reserveUSD
      totalSupply
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
`
