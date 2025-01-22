import { apiClient } from '../api-client';
import { useInfiniteQuery } from '@tanstack/react-query';

const getTickersFn = async ({ pageParam = '' }) => {
  const response = await apiClient.get(`?cursor=${pageParam}`);
  const tickerSymbols = response.data?.data.map(ticker => ticker.ticker)
  const pricePerTickers = await Promise.all(tickerSymbols.map(async name=>{
    const response = await apiClient.get(`/${name}/price`)
    return {
        data: response.data.data,
        symbol: name
    }
  } ))

  return {
    data: response.data?.data.map(ticker => {
    const tick = pricePerTickers.find(tick => tick.symbol === ticker.ticker)
    return {
        symbol: ticker.ticker,
        name: ticker.name,
        icon: `https://assets.parqet.com/logos/symbol/${ticker.ticker}?format=svg&size=300`,
        price: tick?.data?.price,
        change: tick?.data?.priceChange,
        percent: tick?.data?.pricePercentage,
    }
  }),
  nextCursor: response.data.next
}
};

export function useTickers() {
  return useInfiniteQuery({
    queryKey: ['tickers'],
    queryFn: getTickersFn,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor
    }
  });
}