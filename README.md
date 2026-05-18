# Habit Manager 95

> Um rastreador de hábitos com a cara do Windows 95. Seus hábitos são
> **processos**, sua sequência é **uptime**, e perder a sequência derruba
> o sistema numa bela **tela azul da morte**.

Habit Manager 95 transforma o ritual de criar e manter hábitos numa
experiência nostálgica de desktop retrô: boot via BIOS/POST, Gerenciador
de Tarefas com abas, Painel de Controle, assistentes de configuração e
até backup para disquete `A:\`. Por baixo da estética, é um app de
hábitos completo — frequências, lembretes, sequências (streaks),
estatísticas e histórico — feito em Expo / React Native.

---

## A metáfora

| No app                         | No Windows 95                          |
| ------------------------------ | -------------------------------------- |
| Hábito                         | Processo (`habito.exe`)                |
| Marcar como feito              | Processo concluído                     |
| Sequência (streak)             | Uptime do processo                     |
| Sequência quebrada             | **BSOD** — erro fatal, streak perdido  |
| Lista de hábitos / estatísticas| Abas do Gerenciador de Tarefas         |
| Configurações                  | Painel de Controle + diálogos          |
| Primeira execução              | Splash de BIOS/POST + assistente       |
| Exportar dados                 | Assistente de Backup (disquete 3½)     |

## Funcionalidades

- **Gerenciador de Tarefas** com quatro abas: Processos, Aplicativos,
  Desempenho e Histórico.
- **Onboarding** estilo assistente do Windows, com modelos de hábitos
  prontos e criação de hábitos personalizados.
- **Frequências**: diária, semanal (N vezes por semana) ou
  personalizada (dias específicos da semana).
- **Lembretes** locais via `expo-notifications`, com janela de
  silêncio e prioridade por hábito.
- **Sequências e estatísticas**: streak atual, melhor streak, taxa de
  adesão (últimos 14 dias) e barra de "energia".
- **Tela azul da morte (BSOD)** disparada automaticamente quando uma
  sequência é quebrada.
- **Persistência local** com SQLite (`expo-sqlite`), com _fallback_
  automático para um store em memória quando o SQLite não está
  disponível (ex.: web).
- **Temas** fiéis à época: Classic, Plum, Hot Dog Stand e Alto
  Contraste, além de controles de brilho e profundidade de cor.
- **Internacionalização**: Português (BR) e Inglês (US), com pt-BR
  como idioma padrão.
- **Diálogos do Painel de Controle**: Notificações, Aparência, Backup,
  Data/Hora, Vídeo e Ajuda.

## Stack

- [Expo](https://expo.dev/) SDK 55 + React Native 0.83
- React 19 + TypeScript (modo `strict`)
- [React Navigation](https://reactnavigation.org/) (native stack)
- [styled-components](https://styled-components.com/) para temas
- `expo-sqlite`, `expo-notifications`, `expo-font`
- Fontes pixeladas: Pixelify Sans e VT323
- Jest + `jest-expo` + Testing Library para testes

## Pré-requisitos

- Node.js 18+ e npm
- [Expo CLI](https://docs.expo.dev/) (via `npx expo`)
- App **Expo Go** ou um emulador Android / simulador iOS

## Como rodar

```bash
# instalar dependências
npm install

# iniciar o servidor de desenvolvimento
npm start

# ou direto numa plataforma
npm run android
npm run ios
npm run web
```

Escaneie o QR code com o Expo Go ou abra num emulador.

## Scripts

| Comando              | Descrição                                  |
| -------------------- | ------------------------------------------ |
| `npm start`          | Inicia o servidor de desenvolvimento Expo  |
| `npm run android`    | Abre no Android                            |
| `npm run ios`        | Abre no iOS                                 |
| `npm run web`        | Abre no navegador                          |
| `npm test`           | Roda a suíte de testes (Jest)              |
| `npm run test:watch` | Roda os testes em modo _watch_             |
| `npm run typecheck`  | Checagem de tipos com `tsc --noEmit`       |

## Estrutura do projeto

```
.
├── App.tsx                 # Providers (tema, settings, hábitos) e boot
├── index.ts                # Entry point Expo
├── src/
│   ├── navigation/         # Stack de navegação e rotas
│   ├── features/
│   │   ├── habits/         # Telas do "Gerenciador de Tarefas"
│   │   ├── onboarding/     # Splash de BIOS + assistente
│   │   └── system/         # Diálogos do Painel de Controle, BSOD, Sobre
│   └── shared/
│       ├── components/win95 # Biblioteca de UI estilo Win95
│       ├── context/        # HabitsContext, SettingsContext
│       ├── db/             # Stores SQLite e em memória
│       ├── i18n/           # Dicionários pt-BR / en-US
│       ├── theme/          # Paletas e construção do tema
│       └── utils/          # Datas e cálculo de streaks
```

Imports usam o alias `@/` apontando para `src/` (configurado em
`tsconfig.json` e no Jest).

## Notas de arquitetura

- **Camada de dados** — `createDefaultStore()` tenta abrir o SQLite e,
  em caso de falha, cai para um store em memória, para que o app
  continue utilizável em vez de quebrar.
- **BSOD** — um observador na camada de navegação (`BsodWatcher`)
  escuta o `HabitsContext` e, ao detectar uma sequência recém-quebrada
  na tela principal, navega para a tela azul.
- **Tema** — `SettingsContext` guarda a paleta, brilho e profundidade
  de cor; `App.tsx` aplica sobreposições para simular o "botão de
  brilho" e o seletor de profundidade de cor de um monitor da época.
- **i18n** — `translate()` resolve a chave no idioma escolhido com
  _fallback_ para pt-BR e, por fim, para a própria chave.

## Testes

```bash
npm test
```

Cobrem utilitários de data e streak, stores, i18n, contextos e os
componentes da biblioteca Win95.

## Licença

Projeto privado / experimental. © 1995–2026 Habit Industries Inc.
(brincadeira — todos os direitos reservados ao autor do repositório).
