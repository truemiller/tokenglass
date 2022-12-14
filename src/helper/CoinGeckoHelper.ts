export const getCoingeckoPrice = async (ids: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );
  return await response.json();
};
