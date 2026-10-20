export const differentials = [
  {
    icon: "leaf",
    title: "Qualidade conferida",
    description:
      "Itens de despensa escolhidos para o benefício mensal, com validade e quantidade conferidas antes de sair.",
  },
  {
    icon: "truck",
    title: "Logística da operação",
    description:
      "Separação, rota e janela de entrega combinadas com a empresa — sem o comprador montar a cesta item a item.",
  },
  {
    icon: "timer",
    title: "Prazo de quem é recorrente",
    description:
      "Pedidos mensais e quinzenais entram na programação. A data combinada faz parte do fornecimento.",
  },
  {
    icon: "handshake",
    title: "Atendimento B2B",
    description:
      "Um contato comercial acompanha volume, reposição e a condição de empresas, RH, revenda e órgãos públicos.",
  },
  {
    icon: "sparkles",
    title: "Cesta sob medida",
    description:
      "Além das três linhas prontas, a composição pode seguir o perfil da equipe ou o mix da revenda.",
  },
  {
    icon: "receipt",
    title: "Nota fiscal",
    description:
      "Faturamento para pessoa jurídica, com a documentação que o financeiro da empresa precisa receber.",
  },
] as const;

export type DifferentialIcon = (typeof differentials)[number]["icon"];
