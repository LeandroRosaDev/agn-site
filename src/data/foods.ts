export type FoodGroup = "fresco" | "cesta" | "congelado";

export type Food = {
  id: string;
  src: string;
  alt: string;
  label: string;
  group: FoodGroup;
  width: number;
  height: number;
  /** Posição inicial no palco, em porcentagem. */
  start: { x: number; y: number };
  rotate: number;
  /** Entra na versão reduzida do celular. */
  mobile: boolean;
};

/**
 * Alimentos da cena de rolagem. Troque o arquivo em /public/alimentos
 * mantendo o mesmo nome para atualizar a imagem sem mexer no código.
 */
export const foods: Food[] = [
  {
    id: "maca",
    src: "/alimentos/maca.webp",
    alt: "Maçã",
    label: "Maçã",
    group: "fresco",
    width: 428,
    height: 480,
    start: { x: 12, y: 22 },
    rotate: -14,
    mobile: true,
  },
  {
    id: "banana",
    src: "/alimentos/banana.webp",
    alt: "Banana",
    label: "Banana",
    group: "fresco",
    width: 447,
    height: 480,
    start: { x: 78, y: 24 },
    rotate: 16,
    mobile: true,
  },
  {
    id: "laranja",
    src: "/alimentos/laranja.webp",
    alt: "Laranja",
    label: "Laranja",
    group: "fresco",
    width: 439,
    height: 480,
    start: { x: 34, y: 16 },
    rotate: 8,
    mobile: false,
  },
  {
    id: "tomate",
    src: "/alimentos/tomate.webp",
    alt: "Tomate",
    label: "Tomate",
    group: "fresco",
    width: 457,
    height: 480,
    start: { x: 88, y: 42 },
    rotate: -10,
    mobile: true,
  },
  {
    id: "cenoura",
    src: "/alimentos/cenoura.webp",
    alt: "Cenoura",
    label: "Cenoura",
    group: "fresco",
    width: 254,
    height: 480,
    start: { x: 6, y: 48 },
    rotate: 22,
    mobile: false,
  },
  {
    id: "arroz",
    src: "/alimentos/arroz.webp",
    alt: "Arroz",
    label: "Arroz",
    group: "cesta",
    width: 315,
    height: 480,
    start: { x: 66, y: 30 },
    rotate: -6,
    mobile: true,
  },
  {
    id: "feijao",
    src: "/alimentos/feijao.webp",
    alt: "Feijão",
    label: "Feijão",
    group: "cesta",
    width: 335,
    height: 480,
    start: { x: 18, y: 36 },
    rotate: 11,
    mobile: true,
  },
  {
    id: "oleo",
    src: "/alimentos/oleo.webp",
    alt: "Óleo",
    label: "Óleo",
    group: "cesta",
    width: 144,
    height: 480,
    start: { x: 84, y: 58 },
    rotate: -18,
    mobile: false,
  },
  {
    id: "cafe",
    src: "/alimentos/cafe.webp",
    alt: "Café",
    label: "Café",
    group: "cesta",
    width: 269,
    height: 480,
    start: { x: 22, y: 60 },
    rotate: 7,
    mobile: true,
  },
  {
    id: "frango",
    src: "/alimentos/frango-inteiro.webp",
    alt: "Frango inteiro congelado",
    label: "Congelado",
    group: "congelado",
    width: 427,
    height: 480,
    start: { x: 54, y: 18 },
    rotate: -12,
    mobile: false,
  },
];

export function foodById(id: string) {
  const food = foods.find((item) => item.id === id);
  if (!food) throw new Error(`Alimento não encontrado: ${id}`);
  return food;
}
