import { BSODSection } from "@/components/BSODSection";
import { DownloadSection } from "@/components/DownloadSection";
import { Hero } from "@/components/Hero";
import { OfflineSection } from "@/components/OfflineSection";
import { PerformanceSection } from "@/components/PerformanceSection";
import { ProcessesSection } from "@/components/ProcessesSection";
import { SetupSection } from "@/components/SetupSection";
import { StackSection } from "@/components/StackSection";
import { Taskbar } from "@/components/Taskbar";

export default function HomePage() {
  return (
    <>
      <main className="page">
        <Hero />
        <ProcessesSection />
        <BSODSection />
        <PerformanceSection />
        <SetupSection />
        <OfflineSection />
        <StackSection />
        <DownloadSection />
      </main>
      <Taskbar />
    </>
  );
}
