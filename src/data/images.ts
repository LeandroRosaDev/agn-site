/**
 * Fotos ilustrativas (Unsplash). Troque pelos arquivos da AGN quando existirem.
 * Para imagens locais, coloque os arquivos em /public e use caminhos como "/fotos/hero.jpg".
 */
function photo(id: string) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;
}

export const images = {
  hero: photo("photo-1542838132-92c53300491e"),
  basketBasic: photo("photo-1586201375761-83865001e31c"),
  basketComplete: photo("photo-1578916171728-46686eac8d58"),
  basketPremium: photo("photo-1506617420156-8e4536971650"),
  market: photo("photo-1488459716781-31db52582fe9"),
  warehouse: photo("photo-1553413077-190dd305871c"),
  logistics: photo("photo-1586528116311-ad8dd3c8310d"),
  shipping: photo("photo-1566576912321-d58ddd7a6088"),
} as const;
