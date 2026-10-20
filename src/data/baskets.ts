import { images } from "@/data/images";

export type Basket = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  items: string[];
  weight: string;
  minOrder: number;
  image: string;
  imageAlt: string;
  highlight?: boolean;
};

export const baskets: Basket[] = [
  {
    slug: "basica",
    name: "Cesta Básica",
    tagline: "O essencial do mês",
    description:
      "Os itens de despensa que sustentam o benefício mensal da equipe, com composição estável para pedido recorrente.",
    weight: "cerca de 12 kg",
    minOrder: 20,
    image: images.basketBasic,
    imageAlt: "Arroz e grãos, base da cesta básica",
    items: [
      "Arroz tipo 1 — 5 kg",
      "Feijão carioca — 1 kg",
      "Açúcar refinado — 1 kg",
      "Café torrado e moído — 500 g",
      "Óleo de soja — 900 ml",
      "Macarrão espaguete — 500 g",
      "Farinha de trigo — 1 kg",
      "Farinha de mandioca — 500 g",
      "Sal refinado — 1 kg",
      "Molho de tomate — 340 g",
      "Biscoito cream cracker — 400 g",
      "Sardinha em lata — 125 g",
    ],
  },
  {
    slug: "completa",
    name: "Cesta Completa",
    tagline: "A mais pedida",
    description:
      "A linha básica somada a leite, enlatados e higiene. É o modelo que a maioria das empresas usa como benefício.",
    weight: "cerca de 16 kg",
    minOrder: 15,
    highlight: true,
    image: images.basketComplete,
    imageAlt: "Corredor de supermercado com alimentos variados",
    items: [
      "Tudo o que entra na Cesta Básica",
      "Leite integral — 1 L",
      "Achocolatado — 400 g",
      "Biscoito recheado — 140 g",
      "Milho verde — 170 g",
      "Ervilha — 170 g",
      "Extrato de tomate — 340 g",
      "Papel higiênico — 4 rolos",
      "Sabonete — 90 g",
    ],
  },
  {
    slug: "premium",
    name: "Cesta Premium",
    tagline: "Presença e cuidado",
    description:
      "Uma cesta mais farta, para datas especiais, cestas de fim de ano ou empresas que querem ir além do básico.",
    weight: "cerca de 20 kg",
    minOrder: 10,
    image: images.basketPremium,
    imageAlt: "Carrinho de compras abastecido com mantimentos",
    items: [
      "Tudo o que entra na Cesta Completa",
      "Azeite — 250 ml",
      "Atum em lata — 170 g",
      "Granola — 250 g",
      "Suco integral — 1 L",
      "Chocolate — 80 g",
      "Creme de leite — 200 g",
      "Papel higiênico extra — 12 rolos",
      "Sabão em pó — 500 g",
    ],
  },
];

export function getBasket(slug: string) {
  return baskets.find((basket) => basket.slug === slug);
}
