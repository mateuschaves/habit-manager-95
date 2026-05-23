import type { Metadata } from "next";
import Link from "next/link";
import { Win95Window } from "@/components/Window";
import { Taskbar } from "@/components/Taskbar";

type Lang = "pt" | "en";

type Dict = {
  htmlLang: string;
  pageTitle: string;
  metaDescription: string;
  windowTitle: string;
  eyebrow: string;
  heading: string;
  lead: string;
  effectiveDate: string;
  effectiveDateValue: string;
  langSwitchLabel: string;
  langPt: string;
  langEn: string;
  toIndex: string;
  sections: { id: string; title: string; body: React.ReactNode }[];
  footerNote: string;
  contact: { title: string; body: React.ReactNode };
};

const EMAIL = "mateushenriquechaves1@gmail.com";
const EFFECTIVE_DATE_ISO = "2026-05-23";

const PT: Dict = {
  htmlLang: "pt-BR",
  pageTitle: "Política de Privacidade — Habit Manager 95",
  metaDescription:
    "Política de Privacidade do Habit Manager 95. Sem cloud. Sem analytics. Tudo offline no seu dispositivo.",
  windowTitle: "privacidade.txt — Bloco de Notas",
  eyebrow: "01 / política de privacidade",
  heading: "Política de Privacidade",
  lead: "Habit Manager 95 funciona 100% offline. Não coletamos, não armazenamos e não transmitimos seus dados para servidores. Esta política descreve em detalhes o que isso significa.",
  effectiveDate: "Em vigor desde",
  effectiveDateValue: "23 de maio de 2026",
  langSwitchLabel: "Idioma:",
  langPt: "Português",
  langEn: "English",
  toIndex: "← Voltar para a página inicial",
  footerNote:
    "Este documento foi escrito para refletir exatamente o que o app faz hoje. Se o comportamento do app mudar, esta política será atualizada antes — não depois — da mudança.",
  sections: [
    {
      id: "resumo",
      title: "1. Resumo em uma frase",
      body: (
        <>
          <p>
            O Habit Manager 95 <b>não coleta dados pessoais</b>. Seus hábitos,
            histórico e configurações ficam armazenados <b>apenas no seu
            dispositivo</b>, em um banco SQLite local. Nada é enviado para a
            internet.
          </p>
        </>
      ),
    },
    {
      id: "quem-somos",
      title: "2. Quem somos",
      body: (
        <p>
          O Habit Manager 95 é um aplicativo independente desenvolvido por{" "}
          <b>Mateus Chaves</b>. Não há empresa, equipe ou terceiros
          processando seus dados. Para qualquer dúvida, contato em{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      ),
    },
    {
      id: "dados-coletados",
      title: "3. Quais dados são coletados",
      body: (
        <>
          <p>
            <b>Nenhum dado é coletado pelo desenvolvedor.</b> Em conformidade
            com a categoria do App Store{" "}
            <span className="code">Data Not Collected</span>, o aplicativo
            não envia, não transmite e não tem acesso remoto a:
          </p>
          <ul className="dotlist">
            <li><span className="mk">✗</span><span>Identificadores de dispositivo, IDFA ou IDFV</span></li>
            <li><span className="mk">✗</span><span>Endereço de e-mail, telefone, nome ou foto</span></li>
            <li><span className="mk">✗</span><span>Localização (precisa ou aproximada)</span></li>
            <li><span className="mk">✗</span><span>Dados de uso, analytics ou crash reports</span></li>
            <li><span className="mk">✗</span><span>Histórico de navegação ou interações de marketing</span></li>
            <li><span className="mk">✗</span><span>Contatos, fotos, microfone, câmera ou saúde</span></li>
          </ul>
        </>
      ),
    },
    {
      id: "armazenamento-local",
      title: "4. O que fica armazenado no seu dispositivo",
      body: (
        <>
          <p>
            Para funcionar como um habit tracker, o app precisa guardar algumas
            informações <b>localmente no seu telefone</b>. Esses dados nunca
            saem do dispositivo, exceto quando você mesmo exporta um backup
            (veja a seção 6).
          </p>
          <ul className="dotlist">
            <li><span className="mk">✓</span><span><b>Hábitos</b> — nome, ícone, frequência, horário do lembrete</span></li>
            <li><span className="mk">✓</span><span><b>Marcações de conclusão</b> — datas em que cada hábito foi concluído</span></li>
            <li><span className="mk">✓</span><span><b>Estatísticas derivadas</b> — streaks, taxa semanal, foco (calculados em tempo de execução)</span></li>
            <li><span className="mk">✓</span><span><b>Preferências</b> — paleta de cores, idioma, brilho, profundidade de cor</span></li>
          </ul>
          <p>
            Armazenamento técnico: <span className="code">expo-sqlite</span>{" "}
            para hábitos/histórico e <span className="code">AsyncStorage</span>{" "}
            para preferências. Ambos são sandboxes locais do iOS, isolados
            por aplicativo.
          </p>
        </>
      ),
    },
    {
      id: "notificacoes",
      title: "5. Notificações",
      body: (
        <p>
          Se você ativar lembretes, o app agenda{" "}
          <b>notificações locais</b> através da API{" "}
          <span className="code">expo-notifications</span> (iOS UNUserNotificationCenter).
          O agendamento e o disparo acontecem <b>inteiramente no dispositivo</b>.
          Nenhum serviço de push remoto (APNs, Firebase, OneSignal) é
          utilizado. Você pode revogar a permissão a qualquer momento em
          Ajustes → Notificações → Habit Manager 95.
        </p>
      ),
    },
    {
      id: "backup",
      title: "6. Backup e exportação",
      body: (
        <p>
          O app oferece exportação manual de backup no Painel de Controle. Ao
          tocar em <b>&ldquo;Backup&rdquo;</b>, é gerado um arquivo JSON com
          seus hábitos e configurações, entregue ao iOS via{" "}
          <span className="code">Share.share()</span> — o sheet nativo de
          compartilhamento. <b>Você</b> decide o destino: AirDrop, e-mail, iCloud
          Drive, Files, ou qualquer outro app instalado. O desenvolvedor não
          recebe cópia desse arquivo e não tem acesso a ele.
        </p>
      ),
    },
    {
      id: "terceiros",
      title: "7. Serviços de terceiros",
      body: (
        <>
          <p>
            O Habit Manager 95 <b>não integra SDKs de terceiros</b> que
            processem dados de usuário. Não usamos Google Analytics, Facebook
            SDK, Firebase, Mixpanel, Sentry, Amplitude, RevenueCat, ou
            similares.
          </p>
          <p>
            Os únicos serviços externos envolvidos são:
          </p>
          <ul className="dotlist">
            <li>
              <span className="mk">✓</span>
              <span>
                <b>Apple App Store</b> — para distribuição do app. A Apple
                pode coletar dados de download/uso conforme sua própria
                política de privacidade.
              </span>
            </li>
            <li>
              <span className="mk">✓</span>
              <span>
                <b>Google Fonts</b> (apenas em build time) — as fontes
                Pixelify Sans e VT323 são embarcadas no app durante o build.
                Em runtime, nenhuma requisição é feita para servidores do
                Google.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "rastreamento",
      title: "8. App Tracking Transparency",
      body: (
        <p>
          O aplicativo <b>não solicita</b> a permissão{" "}
          <span className="code">App Tracking Transparency</span>{" "}
          (ATT) do iOS, porque não realiza nenhum tipo de rastreamento entre
          aplicativos ou sites de terceiros.
        </p>
      ),
    },
    {
      id: "criancas",
      title: "9. Privacidade infantil",
      body: (
        <p>
          O Habit Manager 95 não é direcionado a crianças menores de 13 anos
          e não coleta intencionalmente dados de menores de idade. Como
          nenhum dado é coletado pelo desenvolvedor, o app pode ser usado por
          qualquer idade sem riscos de exposição de informações pessoais.
        </p>
      ),
    },
    {
      id: "exclusao",
      title: "10. Exclusão dos seus dados",
      body: (
        <p>
          Como tudo é armazenado localmente, você pode apagar todos os seus
          dados de duas formas:
        </p>
      ),
    },
    {
      id: "exclusao-lista",
      title: "",
      body: (
        <ul className="dotlist">
          <li>
            <span className="mk">1</span>
            <span>
              Dentro do app: <b>Painel de Controle → Reciclagem</b> ou{" "}
              <b>Restaurar config. de fábrica</b>.
            </span>
          </li>
          <li>
            <span className="mk">2</span>
            <span>
              No iOS: pressione e segure o ícone do app → <b>Remover App</b>{" "}
              → <b>Excluir App</b>. Isso apaga o banco SQLite e todas as
              preferências.
            </span>
          </li>
        </ul>
      ),
    },
    {
      id: "direitos",
      title: "11. Seus direitos (LGPD / GDPR / CCPA)",
      body: (
        <p>
          Como o desenvolvedor <b>não coleta, processa ou armazena</b>{" "}
          dados pessoais em servidores próprios, não há base de dados a ser
          acessada, retificada ou portada. O controle integral dos seus dados
          permanece com você, no seu dispositivo. Se ainda assim você
          desejar exercer um direito previsto pela LGPD, GDPR ou CCPA, entre
          em contato pelo e-mail abaixo.
        </p>
      ),
    },
    {
      id: "mudancas",
      title: "12. Alterações nesta política",
      body: (
        <p>
          Se essa política mudar — por exemplo, com a introdução de uma
          funcionalidade opcional de sincronização em nuvem em alguma versão
          futura — a alteração será comunicada nesta página, com nova{" "}
          <b>data &ldquo;Em vigor desde&rdquo;</b>, antes do recurso ser
          ativado. Mudanças que envolvam coleta de dados sempre exigirão
          consentimento explícito dentro do app.
        </p>
      ),
    },
  ],
  contact: {
    title: "13. Contato",
    body: (
      <p>
        Dúvidas, pedidos ou reclamações relacionadas a privacidade:{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    ),
  },
};

const EN: Dict = {
  htmlLang: "en-US",
  pageTitle: "Privacy Policy — Habit Manager 95",
  metaDescription:
    "Habit Manager 95 Privacy Policy. No cloud. No analytics. Everything stays offline on your device.",
  windowTitle: "privacy.txt — Notepad",
  eyebrow: "01 / privacy policy",
  heading: "Privacy Policy",
  lead: "Habit Manager 95 runs 100% offline. We do not collect, store, or transmit your data to any server. This policy describes exactly what that means.",
  effectiveDate: "Effective date",
  effectiveDateValue: "May 23, 2026",
  langSwitchLabel: "Language:",
  langPt: "Português",
  langEn: "English",
  toIndex: "← Back to the homepage",
  footerNote:
    "This document reflects exactly what the app does today. If the app's behavior changes, this policy will be updated before — not after — the change.",
  sections: [
    {
      id: "summary",
      title: "1. Summary in one sentence",
      body: (
        <p>
          Habit Manager 95 <b>does not collect personal data</b>. Your
          habits, history, and settings are stored <b>only on your device</b>
          , in a local SQLite database. Nothing is sent over the internet.
        </p>
      ),
    },
    {
      id: "who-we-are",
      title: "2. Who we are",
      body: (
        <p>
          Habit Manager 95 is an independent app developed by{" "}
          <b>Mateus Chaves</b>. There is no company, team, or third party
          processing your data. For any questions, contact{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      ),
    },
    {
      id: "data-collected",
      title: "3. What data is collected",
      body: (
        <>
          <p>
            <b>No data is collected by the developer.</b> In line with the
            App Store category{" "}
            <span className="code">Data Not Collected</span>, the app does
            not send, transmit, or remotely access:
          </p>
          <ul className="dotlist">
            <li><span className="mk">✗</span><span>Device identifiers, IDFA, or IDFV</span></li>
            <li><span className="mk">✗</span><span>Email address, phone number, name, or photo</span></li>
            <li><span className="mk">✗</span><span>Location (precise or coarse)</span></li>
            <li><span className="mk">✗</span><span>Usage data, analytics, or crash reports</span></li>
            <li><span className="mk">✗</span><span>Browsing history or marketing interactions</span></li>
            <li><span className="mk">✗</span><span>Contacts, photos, microphone, camera, or health data</span></li>
          </ul>
        </>
      ),
    },
    {
      id: "local-storage",
      title: "4. What is stored on your device",
      body: (
        <>
          <p>
            To work as a habit tracker, the app needs to store some
            information <b>locally on your phone</b>. This data never leaves
            the device, except when you explicitly export a backup (see
            section 6).
          </p>
          <ul className="dotlist">
            <li><span className="mk">✓</span><span><b>Habits</b> — name, icon, frequency, reminder time</span></li>
            <li><span className="mk">✓</span><span><b>Completion records</b> — dates each habit was marked done</span></li>
            <li><span className="mk">✓</span><span><b>Derived stats</b> — streaks, weekly rate, focus (computed at runtime)</span></li>
            <li><span className="mk">✓</span><span><b>Preferences</b> — color palette, language, brightness, color depth</span></li>
          </ul>
          <p>
            Technical storage: <span className="code">expo-sqlite</span> for
            habits/history and <span className="code">AsyncStorage</span> for
            preferences. Both are sandboxed iOS storage areas, isolated per
            app.
          </p>
        </>
      ),
    },
    {
      id: "notifications",
      title: "5. Notifications",
      body: (
        <p>
          If you enable reminders, the app schedules{" "}
          <b>local notifications</b> through the{" "}
          <span className="code">expo-notifications</span> API (iOS
          UNUserNotificationCenter). Scheduling and delivery happen{" "}
          <b>entirely on the device</b>. No remote push service (APNs,
          Firebase, OneSignal) is used. You can revoke this permission at
          any time in Settings → Notifications → Habit Manager 95.
        </p>
      ),
    },
    {
      id: "backup",
      title: "6. Backup and export",
      body: (
        <p>
          The app offers manual backup export from the Control Panel.
          Tapping <b>&ldquo;Backup&rdquo;</b> generates a JSON file with
          your habits and settings, which is handed to iOS via{" "}
          <span className="code">Share.share()</span> — the native share
          sheet. <b>You</b> choose the destination: AirDrop, email, iCloud
          Drive, Files, or any other installed app. The developer never
          receives a copy of that file and has no access to it.
        </p>
      ),
    },
    {
      id: "third-parties",
      title: "7. Third-party services",
      body: (
        <>
          <p>
            Habit Manager 95 <b>does not integrate third-party SDKs</b> that
            process user data. We do not use Google Analytics, Facebook SDK,
            Firebase, Mixpanel, Sentry, Amplitude, RevenueCat, or similar
            services.
          </p>
          <p>The only external services involved are:</p>
          <ul className="dotlist">
            <li>
              <span className="mk">✓</span>
              <span>
                <b>Apple App Store</b> — for app distribution. Apple may
                collect download/usage data under its own privacy policy.
              </span>
            </li>
            <li>
              <span className="mk">✓</span>
              <span>
                <b>Google Fonts</b> (build time only) — the Pixelify Sans
                and VT323 fonts are bundled into the app at build time. At
                runtime, no requests are made to Google servers.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "tracking",
      title: "8. App Tracking Transparency",
      body: (
        <p>
          The app <b>does not request</b> the iOS{" "}
          <span className="code">App Tracking Transparency</span> (ATT)
          permission, because it performs no cross-app or cross-site
          tracking of any kind.
        </p>
      ),
    },
    {
      id: "children",
      title: "9. Children's privacy",
      body: (
        <p>
          Habit Manager 95 is not directed at children under 13 and does not
          knowingly collect data from minors. Since no data is collected by
          the developer, the app can be used at any age without risking
          exposure of personal information.
        </p>
      ),
    },
    {
      id: "deletion",
      title: "10. Deleting your data",
      body: (
        <p>
          Because everything is stored locally, you can erase all your data
          in two ways:
        </p>
      ),
    },
    {
      id: "deletion-list",
      title: "",
      body: (
        <ul className="dotlist">
          <li>
            <span className="mk">1</span>
            <span>
              Inside the app: <b>Control Panel → Recycle Bin</b> or{" "}
              <b>Restore factory settings</b>.
            </span>
          </li>
          <li>
            <span className="mk">2</span>
            <span>
              On iOS: long-press the app icon → <b>Remove App</b> →{" "}
              <b>Delete App</b>. This wipes the SQLite database and all
              preferences.
            </span>
          </li>
        </ul>
      ),
    },
    {
      id: "rights",
      title: "11. Your rights (LGPD / GDPR / CCPA)",
      body: (
        <p>
          Because the developer <b>does not collect, process, or store</b>{" "}
          personal data on any servers, there is no database to access,
          rectify, or port. Full control of your data remains with you, on
          your device. If you still wish to exercise a right under LGPD,
          GDPR, or CCPA, please contact the email below.
        </p>
      ),
    },
    {
      id: "changes",
      title: "12. Changes to this policy",
      body: (
        <p>
          If this policy changes — for example, with the introduction of an
          optional cloud-sync feature in a future version — the change will
          be published on this page with a new <b>&ldquo;Effective date&rdquo;</b>{" "}
          before the feature is rolled out. Any change involving data
          collection will always require explicit in-app consent.
        </p>
      ),
    },
  ],
  contact: {
    title: "13. Contact",
    body: (
      <p>
        Privacy-related questions, requests, or complaints:{" "}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    ),
  },
};

function pickDict(raw: string | string[] | undefined): { dict: Dict; lang: Lang } {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const normalized = (value ?? "").toLowerCase();
  if (normalized.startsWith("en")) return { dict: EN, lang: "en" };
  return { dict: PT, lang: "pt" };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const { dict } = pickDict(params.lang);
  return {
    title: dict.pageTitle,
    description: dict.metaDescription,
    alternates: {
      languages: {
        "pt-BR": "/privacy?lang=pt",
        "en-US": "/privacy?lang=en",
      },
    },
  };
}

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const params = await searchParams;
  const { dict, lang } = pickDict(params.lang);

  return (
    <>
      <main className="page">
        <Win95Window title={dict.windowTitle} controls="full" menuBar={false}>
          <article className="privacy">
            <header className="section-head">
              <span className="idx">{dict.eyebrow}</span>
              <h2>{dict.heading}</h2>
              <p>{dict.lead}</p>
            </header>

            <div className="privacy-meta">
              <div>
                <b>{dict.effectiveDate}:</b>{" "}
                <time dateTime={EFFECTIVE_DATE_ISO}>
                  {dict.effectiveDateValue}
                </time>
              </div>
              <div className="lang-switch" aria-label={dict.langSwitchLabel}>
                <span>{dict.langSwitchLabel}</span>
                <Link
                  href="/privacy?lang=pt"
                  className={lang === "pt" ? "lang-on" : ""}
                  aria-current={lang === "pt" ? "page" : undefined}
                >
                  {dict.langPt}
                </Link>
                <span aria-hidden="true">|</span>
                <Link
                  href="/privacy?lang=en"
                  className={lang === "en" ? "lang-on" : ""}
                  aria-current={lang === "en" ? "page" : undefined}
                >
                  {dict.langEn}
                </Link>
              </div>
            </div>

            <div className="privacy-body">
              {dict.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  {section.title ? <h3>{section.title}</h3> : null}
                  {section.body}
                </section>
              ))}

              <section id="contact">
                <h3>{dict.contact.title}</h3>
                {dict.contact.body}
              </section>
            </div>

            <footer className="privacy-foot">
              <p className="caption">&gt; {dict.footerNote}</p>
              <p>
                <Link href="/">{dict.toIndex}</Link>
              </p>
            </footer>
          </article>
        </Win95Window>
      </main>
      <Taskbar />
    </>
  );
}
