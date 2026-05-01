export const AFFILIATE_CONFIG = {
  AMAZON_ID: 'hp0d-22',
  RAKUTEN_ID: '52c51375.8b8ac17b.52c51376.24d340e2',
};

export const getAmazonSearchUrl = (keyword: string) => {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AFFILIATE_CONFIG.AMAZON_ID}`;
};

export const getRakutenSearchUrl = (keyword: string) => {
  return `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_CONFIG.RAKUTEN_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${encodeURIComponent(keyword)}%2F`;
};
