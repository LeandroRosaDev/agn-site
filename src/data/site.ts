/**
 * Dados institucionais da AGN.
 * E-mail, fotos, números da operação e nomes de clientes ainda são exemplos.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  name: "AGN",
  legalName: "Agn Atacadista e Distribuidora de Alimentos Ltda",
  tagline: "Cestas básicas para empresas",
  description:
    "A AGN vende e distribui cestas básicas para empresas, departamentos de RH e o atacado. Escolha o modelo, informe o volume e envie o pedido ao comercial.",
  cnpj: "48.784.695/0001-76",
  phone: "(22) 99701-4517",
  phoneHref: "tel:+5522997014517",
  whatsapp: "5522997014517",
  whatsappDisplay: "(22) 99701-4517",
  whatsappMessage:
    "Olá! Quero falar sobre cestas básicas para a minha empresa.",
  email: "comercial@agn.com.br",
  hours: "Segunda a sexta, das 8h às 18h",
  copyrightYear: 2026,
  address: {
    street: "Rua Eduardo Shalders, 897",
    district: "Vila Capri",
    city: "Araruama",
    state: "RJ",
    zip: "28981-705",
  },
  socials: {
    instagram: "https://www.instagram.com/agn.atacadista/",
    facebook:
      "https://www.facebook.com/p/Agn-Cesta-B%C3%A1sica-Congelados-61565658494774/",
    instagramHandle: "@agn.atacadista",
    facebookHandle: "Agn Cesta Básica Congelados",
  },
} as const;

export function whatsappHref(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatAddress() {
  const { street, district, city, state, zip } = site.address;
  return {
    line1: street,
    line2: `${district} — ${city}/${state}`,
    line3: zip,
  };
}

export function fullAddress() {
  const { street, district, city, state, zip } = site.address;
  return `${street}, ${district}, ${city} - ${state}, ${zip}`;
}

export function mapsSearchHref() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`;
}

export function mapsDirectionsHref() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress())}`;
}

export function mapsEmbedSrc() {
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`;
}
