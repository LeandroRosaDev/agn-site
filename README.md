# AGN — Cestas básicas

Site institucional e comercial da AGN, feito em Next.js (App Router), TypeScript e Tailwind CSS. O visual é claro, com laranja e preto. O público é B2B: empresas, RH, atacado e órgãos públicos.

O envio de pedido e de contato já passa por rotas internas que validam os dados e devolvem um protocolo. A confirmação de preço, pagamento e nota fiscal continua com o comercial até a integração com o sistema.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

Copie `.env.example` para `.env.local` se quiser definir a URL pública ou a API futura.

## Páginas

| Rota | Função |
| --- | --- |
| `/` | Home: hero, cena de rolagem, clientes, diferenciais, catálogo, CTA "não tem nada de básico", números, FAQ, redes e CTA final |
| `/sobre` | História, missão, valores, linha do tempo e operação |
| `/contato` | Formulário para empresas de atacado e demais interessados |
| `/pedido` | Pedido em 3 passos: cestas, dados da empresa e resumo |

`/pedido?cesta=basica` (também `completa` ou `premium`) já deixa a cesta selecionada no pedido mínimo.

## O que trocar antes de publicar

Tudo que é institucional está concentrado para não espalhar texto e telefone pelo layout.

| Arquivo | O que editar |
| --- | --- |
| `src/data/site.ts` | Nome, CNPJ, telefone, WhatsApp, e-mail, endereço, horário e redes |
| `src/data/baskets.ts` | Modelos, itens, peso, pedido mínimo e fotos |
| `src/data/images.ts` | URLs das fotos. Para arquivos locais, use `/public` e caminhos como `/fotos/hero.jpg` |
| `src/data/clients.ts` | Nomes (ou, no componente, logos) dos clientes |
| `src/data/stats.ts` | Números da seção de contadores |
| `src/data/faq.ts` | Perguntas frequentes |
| `src/data/about.ts` | Textos da página Sobre |
| `public/logotipo.webp` | Logotipo original. Se chegar um SVG, gere de novo os arquivos abaixo |
| `public/logo/agn.webp` e `public/logo/agn.png` | Logotipo recortado usado no header, no rodapé e na imagem de compartilhamento |
| `src/app/icon.png` e `src/app/apple-icon.png` | Marca do carrinho no favicon e no ícone da Apple |
| `public/alimentos/` | Fotos dos alimentos da cena de rolagem. Mantenha o nome do arquivo (`maca.webp`, `banana.webp`, `laranja.webp`, `tomate.webp`, `cenoura.webp`, `arroz.webp`, `feijao.webp`, `oleo.webp`, `cafe.webp`, `frango-inteiro.webp`) |
| `src/data/foods.ts` | Posição, rotação e legenda de cada alimento da cena |

CNPJ, telefone, WhatsApp, endereço e redes sociais já são os dados reais da AGN. Continuam de exemplo o e-mail `comercial@agn.com.br`, as fotos de ambiente (Unsplash), os números da operação e os nomes da faixa de clientes.

O logotipo oficial está em `public/logotipo.webp`. O header, o rodapé (sobre um cartão branco) e a imagem de compartilhamento usam o recorte em `public/logo/`. O favicon usa só a marca do carrinho. Se chegar um SVG ou um PDF, substitua o WebP e gere de novo esses recortes.

A home tem duas seções próprias. `FreshToHome` prende a tela por cerca de três rolagens: os alimentos vão para a cesta e a cesta segue até a casa. `NotSoBasic` desmonta a palavra "básica" e liga cada item a um momento na casa do colaborador. As imagens dessa cena ficam em `public/alimentos/`.

## Contrato dos formulários

Os dois envios saem de `src/lib/api.ts`:

- `submitPedido()` → `POST /api/pedidos`
- `submitContato()` → `POST /api/contato`

A validação (Zod) está em `src/lib/validations.ts` e é a mesma no navegador e nas rotas. Os tipos `Pedido` e `Contato` saem desses schemas.

Exemplo de pedido:

```json
{
  "itens": [{ "slug": "basica", "nome": "Cesta Básica", "quantidade": 20 }],
  "empresa": {
    "razaoSocial": "Empresa Exemplo Ltda",
    "cnpj": "12.345.678/0001-90",
    "responsavel": "Maria Souza",
    "email": "maria@empresa.com",
    "telefone": "11999999999",
    "endereco": "Rua A, 100",
    "cidade": "São Paulo",
    "uf": "SP",
    "frequencia": "mensal",
    "observacoes": ""
  }
}
```

`frequencia`: `unica`, `quinzenal` ou `mensal`.

Exemplo de contato:

```json
{
  "empresa": "Atacado Exemplo",
  "cnpj": "12.345.678/0001-90",
  "responsavel": "João Lima",
  "email": "joao@atacado.com",
  "telefone": "1130000000",
  "interesse": "atacado",
  "mensagem": "Precisamos de 200 cestas por mês."
}
```

`interesse`: `atacado`, `revenda`, `rh`, `parceria` ou `outro`.

Resposta de sucesso:

```json
{ "ok": true, "protocolo": "AGN-PED-..." }
```

Resposta de erro:

```json
{ "ok": false, "message": "Informe o CNPJ", "errors": { "cnpj": ["CNPJ inválido. Use 00.000.000/0001-00"] } }
```

As rotas em `src/app/api` **não gravam** o pedido. Elas só validam e geram o protocolo, para o front já ter um destino estável.

## Integrar o sistema

1. Publique a API do sistema aceitando o JSON acima (ou adapte `src/lib/validations.ts` e os formulários juntos).
2. Defina `NEXT_PUBLIC_API_URL` com a base, sem barra no final. Exemplo: `https://sistema.agn.com.br`.
3. Os envios passam a ir para `https://sistema.agn.com.br/api/pedidos` e `https://sistema.agn.com.br/api/contato`.
4. Se os caminhos forem outros, altere só as strings em `submitPedido` e `submitContato` dentro de `src/lib/api.ts`.
5. Variáveis `NEXT_PUBLIC_*` entram no build. No Docker, passe `--build-arg`.

Enquanto `NEXT_PUBLIC_API_URL` estiver vazio, o site usa as rotas mock locais.

## Docker

O `next.config.ts` usa `output: "standalone"`.

```bash
docker build -t agn --build-arg NEXT_PUBLIC_SITE_URL=https://www.agn.com.br .
docker run --rm -p 3000:3000 agn
```

O processo escuta em `0.0.0.0:3000`.
# agn-site
