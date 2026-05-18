<div align="center">

<img src="./assets/icon.png" width="128" alt="Habit Manager 95"/>

# Habit Manager 95

**Hábitos como processos.**

Um habit tracker que parece o Gerenciador de Tarefas do Windows 95.<br/>
Cada hábito é um `.exe`. Streak quebrado retorna um BSOD.<br/>
Sem cloud, sem culpa, sem mascote.

<br/>

[![Expo](https://img.shields.io/badge/Expo-55-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.83-61dafb?style=flat-square&logo=react&logoColor=000)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tests](https://img.shields.io/badge/tests-88_passing-00ff7a?style=flat-square)](#tests)
[![License](https://img.shields.io/badge/license-MIT-c0c0c0?style=flat-square)](#licença)

<sub>`> taskmgr` para a sua vida.</sub>

</div>

---

A maioria dos habit trackers é motivacional e clean (Streaks, Habitica, Way of Life).
Esse aqui é deliberadamente **seco, irônico e visualmente nostálgico**.
Quebrar um streak num app fofinho dá culpa; receber um *"Não Está Respondendo"* dá risada — e, paradoxalmente, engaja mais porque é altamente compartilhável.
Cada screenshot é conteúdo.

---

## Sumário

- [Conheça o app — cinco telas](#conheça-o-app--cinco-telas)
- [Stack](#stack)
- [Começando](#começando)
- [Scripts](#scripts)
- [Arquitetura](#arquitetura)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Princípios de design](#princípios-de-design)
- [Roadmap](#roadmap)
- [Créditos](#créditos)
- [Licença](#licença)

---

## Conheça o app — cinco telas

> Cinco mockups, mesmas cinco mensagens do listing do App Store.

### 01 · Gerencie hábitos como processos

> Cada hábito vira um `.exe` rodando no seu sistema operacional pessoal.

```
+========================================+
|  Gerenciador de Hábitos       _ [] X  |
+========================================+
| Arquivo  Opções  Exibir  Janela  Ajuda |
+----------------------------------------+
| [Aplicativos][PROCESSOS][Desemp.][Hist]|
+----------------------------------------+
| Imagem         PID   Memória   Status  |
|----------------------------------------|
| [@] meditar.exe 1024  64 KB   Rodando  |
| [@] correr.exe  1025  32 KB   Concluído|
| [@] ler.exe     1026  16 KB   Pendente |
| [@] agua.exe    1027 128 KB   Travou   |
| [#] system.idle 0000   1 KB   Rodando  |
|----------------------------------------|
| CPU: 62%  |  Mem: 240 KB / inf  |  T:5 |
+----------------------------------------+
|   [Prioridade...] [Props.] [Encerrar]  |
+========================================+
```

<sub>**taskmgr para a sua vida.**</sub>

---

### 02 · Seu hábito não está respondendo

> Streaks quebrados retornam um BSOD. Não dá culpa — dá risada. E é altamente compartilhável.

```
########################################
##                                    ##
##  [ Habit Manager ]                  #
##                                    ##
##  Um erro fatal ocorreu em           #
##  meditar.exe. Streak de 12 dias    ##
##  foi perdido.                      ##
##                                    ##
##  A culpa é compartilhada entre o    #
##  sistema operacional (você) e o    ##
##  subprocesso (também você).        ##
##                                    ##
##  *  Verifique se o lembrete está   ##
##     agendado corretamente          ##
##  *  Reduza a meta para um valor    ##
##     sustentável                    ##
##  *  Considere habit stacking       ##
##                                    ##
##  Toque qualquer lugar da tela      ##
##  para continuar _                  ##
##                                    ##
########################################
```

<sub>**O cliente já tirou print.**</sub>

---

### 03 · Performance monitor pra sua vida

> Consistência, foco, streaks. Em verde-fósforo, sobre fundo preto.

```
+========================================+
|  grafico.exe                  _ [] X  |
+========================================+
|                                        |
|  CONSISTÊNCIA — últimas 12 semanas    |
|  X . X X . X X X . . X X               |
|  X X . X X X X . X X X .               |
|  . X X X X . X X X . X X               |
|                                        |
|  FOCO (7 dias)        .,:;|||;:.       |
|                                        |
|  Streak médio:         4 dias          |
|  Maior ativo:         12 dias          |
|  Taxa semanal:        86 %             |
|  Travamentos:          2               |
|  Hábitos ativos:       5               |
|                                        |
+========================================+
```

<sub>**`grafico.exe`** — verde-fósforo, fundo preto.</sub>

---

### 04 · Setup wizard em cinco minutos

> Escolha do catálogo, personalize cada `.exe`, agende lembretes. Sem cadastro. Sem login social.

```
+========================================+
|  Setup do Habit Manager 95      _ [] X|
+========================================+
| +--------+ +---------------------------+
| |  1.    | | Propriedades de cada     |
| |  2.    | | hábito                   |
| | >3.<   | |                          |
| |  4.    | | Nome:     meditar___ .exe |
| |        | | Ícone:    [@][#][$][&][!] |
| |        | | Freq:    (o) Diário      |
| |        | |          ( ) Semanal     |
| |        | |          ( ) Dias espec. |
| |        | | Lembrete: [ 07:00    | v]|
| |        | | [x] Avisar se atrasado   |
| +--------+ +---------------------------+
|                                        |
|  [ < Voltar ]  [ Avançar > ]   [ Sair ]|
+========================================+
```

<sub>**`A:\install.exe`** — cinco minutos do começo ao fim.</sub>

---

### 05 · Tudo offline. Tudo seu.

> Sem cloud. Sem ads. Sem mascote. Seu histórico mora em SQLite no seu telefone — e em lugar nenhum mais.

```
+========================================+
|  Painel de Controle              _ X  |
+========================================+
|                                        |
|  [B]      [G]      [F]      [C]        |
|  Notif.   Aparên.  Backup   Data/Hora  |
|                                        |
|  [M]      [E]      [T]      [H]        |
|  Tela     Add      Reciclag Ajuda      |
|           Hábito                       |
|                                        |
|  [I]                                   |
|  Sobre                                 |
|                                        |
| +-- Aparência ---------------------+   |
| | Tema:     [ Classic Win95   | v] |   |
| | Idioma:   [ Português (BR)  | v] |   |
| | [x] Avisar processos atrasados   |   |
| +----------------------------------+   |
|                                        |
| +-- Manutenção --------------------+   |
| | [ Repetir setup... ]             |   |
| | [ Restaurar config. de fábrica ] |   |
| +----------------------------------+   |
+========================================+
```

<sub>**`C:\users\voce`** — sem cloud, sem ads, sem mascote.</sub>

---

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | **Expo 55** + **React Native 0.83** |
| Linguagem | **TypeScript 5.9** |
| Estado / persistência | React Context + **expo-sqlite** (fallback `MemoryHabitStore` para web/testes) |
| Notificações | **expo-notifications** — single-source-of-truth via `syncAllHabits` |
| Styling | **styled-components/native** + tema dinâmico por paleta |
| Fontes | **Pixelify Sans** (UI) + **VT323** (monospace) via `@expo-google-fonts` |
| Navegação | **@react-navigation/native-stack** |
| Internacionalização | dicionário tipado (`pt-BR` + `en-US`) com fallback automático |
| Testes | **Jest** + `@testing-library/react-native` — 88 testes |

---

## Começando

Você vai precisar de Node 20+, [Expo CLI](https://docs.expo.dev/get-started/installation/) e Xcode/Android Studio para os simuladores.

```bash
git clone https://github.com/mateuschaves/habit-manager-05.git
cd habit-manager-05
npm install

npm start          # Metro bundler
npm run ios        # simulador iOS
npm run android    # emulador / device
npm run web        # versão web (sem SQLite — usa fallback in-memory)
```

Primeira execução roda o **Setup Wizard** (4 passos). Ele instala alguns hábitos do catálogo no seu SQLite local. Sem cadastro, sem login social, sem opt-in de analytics — porque não tem analytics.

---

## Scripts

```bash
npm start          # Expo dev server
npm run ios        # build + abre no simulador iOS
npm run android    # build + abre no emulador Android
npm run web        # versão web (fallback in-memory)
npm test           # roda os 88 testes
npm run test:watch # Jest watch mode
npm run typecheck  # tsc --noEmit
```

---

## Arquitetura

Tudo gira em torno de dois contextos e uma store.

```
+----------------+      +---------------------+
| SettingsContext| <--> | AsyncStorage         |
|  - palette     |      |  @hm95/settings      |
|  - language    |      +---------------------+
|  - brightness  |
|  - colorDepth  |
+----------------+
        v
+----------------+      +---------------------+
| HabitsContext  | <--> | HabitStore           |
|  - habits      |      |  +- SqliteHabitStore |
|  - completions |      |  +- MemoryHabitStore |  (fallback)
|  - stats       |      +---------------------+
|  - clearAll    |
+--------+-------+
         |
         v
   syncAllHabits(habits)  ->  expo-notifications
   (single-source-of-truth: cancela tudo + reagenda)
```

**Por que dois contextos.** Settings é leve e quase sempre ativo (theme, idioma). Habits faz I/O em SQLite e tem stats derivados via `useMemo`. Separar evita re-render desnecessário do app inteiro quando você muda só a paleta.

**Por que single-source-of-truth para notificações.** O `useEffect([habits, loading])` dentro do `HabitsContext` chama `syncAllHabits` cada vez que a lista muda. Isso cancela todos os reminders e re-agenda — evita orphan notifications depois de delete/edit. Caro? Não, porque hábitos são poucos. Confiável? Sim.

**Por que MemoryHabitStore como fallback.** Em web, `expo-sqlite` não funciona. Em testes, ele atrapalha. `createDefaultStore()` detecta runtime e faz o downgrade graceful — sem `if (Platform.OS === 'web')` espalhado pelo código.

---

## Estrutura de pastas

```
src/
├── features/
│   ├── habits/                # Processos, Aplicativos, Desempenho, Histórico
│   │   ├── components/
│   │   ├── context/MainTabContext/
│   │   └── screens/
│   ├── onboarding/            # Splash + Setup Wizard
│   │   ├── hooks/useOnboarding.ts
│   │   └── screens/
│   └── system/                # Painel de Controle, BSOD, Sobre
│       └── screens/
│           ├── BackupDialog/
│           ├── AppearanceDialog/
│           ├── DateTimeDialog/
│           ├── DisplayDialog/
│           ├── HelpDialog/
│           ├── NotificationsDialog/
│           ├── SettingsScreen/
│           ├── AboutScreen/
│           └── BsodScreen/
├── navigation/                # RootNavigator + types
├── shared/
│   ├── components/win95/      # Win95Window, Win95Button, Win95Select, ...
│   ├── components/icons/      # ícones pixel-art 14/16/32 px
│   ├── context/               # SettingsContext, HabitsContext
│   ├── db/                    # HabitStore + sqliteStore + memoryStore
│   ├── i18n/                  # pt-BR.ts (source of truth) + en-US.ts
│   ├── notifications/         # syncAllHabits, ensurePermissions
│   ├── theme/                 # palettes + tokens
│   ├── utils/                 # date, streak engine
│   └── hooks/                 # useTranslation
└── test/                      # renderWithProviders + fixtures
```

---

## Princípios de design

- **Paleta clássica Win95.** `#c0c0c0` como base, `#000080` como destaque, BSOD `#0000aa`. Sem gradientes suaves, sem glassmorphism, sem corner radius.
- **Bordas chanfradas 3D.** Toda superfície é `Bezel` com variant `raised`, `inset`, `pressed` ou `thinInset`. Botão pressionado **inverte** a chanfradura — não muda só a cor.
- **Tipografia bitmap.** `Pixelify Sans` para UI, `VT323` para monospace. Sem light/semibold — só regular e bold.
- **Mobile-first sem perder o vocabulário desktop.** Bottom-less, sem multi-window real, mas com title bars, menu bar e barra de tarefas. Botão Iniciar abre o Painel de Controle.
- **Mensagens de erro com humor.** O BSOD diz literalmente *"A culpa é compartilhada entre o sistema operacional (você) e o subprocesso (também você)."* — porque sim.
- **Offline-first, real.** Tudo persiste em SQLite local + AsyncStorage para settings. Backup é via `Share.share()` (JSON nativo do iOS). Zero requests para servidor.

---

## Roadmap

- **v1.0** — MVP atual: CRUD de hábitos, streaks, BSOD, Painel de Controle completo, backup via Share, i18n PT/EN
- **v1.1** — Tema "Win98" alternativo + mais paletas (NT, Plus!, BeOS)
- **v1.2** — Widget de Home Screen estilo "atalho do desktop"
- **v1.3** — Restauração de backup (DocumentPicker) — hoje só exporta
- **v2.0** — Modo paisagem com painel "Resource Monitor" expandido

---

## Tests

```bash
npm test
```

Cobre engine de streaks (determinístico, com fixtures), sync de notificações, persistência (memory + sqlite), reducers de Settings/Habits contexts, fluxo de onboarding, splash BIOS, componentes Win95 (Bezel, Button, Status), i18n. **88 testes verdes.** O typecheck (`tsc --noEmit`) também passa limpo.

---

## Créditos

- Design system + screenshots do App Store gerados via [claude.ai/design](https://claude.ai/design)
- Fontes [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) e [VT323](https://fonts.google.com/specimen/VT323) (Google Fonts)
- Componentes Win95 reimplementados do zero em RN para esse projeto — inspirados em [React95](https://github.com/React95/React95)
- Inspiração geral: Microsoft, 1995–1999

---

## Licença

[MIT](./LICENSE). Por que reservar copyright em algo que parece pirataria de 1996.
