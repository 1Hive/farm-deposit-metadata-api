import fetch from 'cross-fetch'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

export const xdaiFarmClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/1hive/honeyfarm-xdai',
    fetch
  }),
  cache: new InMemoryCache()
})

export const polygonFarmClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/1hive/honeyfarm-polygon',
    fetch
  }),
  cache: new InMemoryCache()
})

export const xdaiHoneyswapClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/1hive/honeyswap-xdai',
    fetch
  }),
  cache: new InMemoryCache()
})

export const polygonHoneyswapClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/1hive/honeyswap-polygon',
    fetch
  }),
  cache: new InMemoryCache()
})
