import type { IconName } from "./icons";

export type ProcessStatus = "running" | "pending" | "crashed" | "paused" | "done";

export type Process = {
  ic: IconName;
  col: string;
  n: string;
  pid: number;
  mem: string;
  up: string;
  st: ProcessStatus;
};

export const STATUS: Record<ProcessStatus, { c: string; d: string; t: string }> = {
  running: { c: "#008000", d: "#00ff00", t: "Rodando" },
  pending: { c: "#a07000", d: "#ffc000", t: "Pendente" },
  crashed: { c: "#800000", d: "#ff0000", t: "Não responde" },
  paused: { c: "#404040", d: "#a0a0a0", t: "Suspenso" },
  done: { c: "#000080", d: "#0080ff", t: "Concluído" },
};

export const PROCESSES: Process[] = [
  { ic: "water", col: "#0000c0", n: "hidratar.exe", pid: 1025, mem: " 64 KB", up: "47d", st: "running" },
  { ic: "run", col: "#800000", n: "correr.exe", pid: 1024, mem: " 14 KB", up: "12d", st: "done" },
  { ic: "food", col: "#008000", n: "comer-bem.exe", pid: 1031, mem: " 32 KB", up: "30d", st: "done" },
  { ic: "book", col: "#000080", n: "ler.exe", pid: 1026, mem: " 32 KB", up: "3d", st: "pending" },
  { ic: "sleep", col: "#404080", n: "dormir.exe", pid: 1028, mem: " 64 KB", up: "21d", st: "pending" },
  { ic: "exercise", col: "#806000", n: "malhar.exe", pid: 1029, mem: "128 KB", up: "8d", st: "pending" },
  { ic: "meditate", col: "#800080", n: "meditar.exe", pid: 1027, mem: " 16 KB", up: "0d", st: "crashed" },
  { ic: "study", col: "#006080", n: "estudar.exe", pid: 1030, mem: "256 KB", up: "5d", st: "paused" },
  { ic: "exe", col: "#404040", n: "system.idle", pid: 0, mem: "  1 KB", up: "219d", st: "running" },
];
