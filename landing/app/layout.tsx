import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habit Manager 95 — Hábitos como processos",
  description:
    "Um habit tracker que parece o Gerenciador de Tarefas do Windows 95. Cada hábito é um .exe. Streak quebrado retorna um BSOD. Sem cloud, sem culpa, sem mascote.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Habit Manager 95 — Hábitos como processos",
    description:
      "taskmgr para a sua vida. Cada hábito é um .exe. Streak quebrado retorna um BSOD.",
    images: ["/icon.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#008080",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
