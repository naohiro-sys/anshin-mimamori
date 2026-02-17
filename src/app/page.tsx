import Header from "@/components/Header";
import VitalInput from "@/components/VitalInput";
import InfoTabs from "@/components/InfoTabs";
import EmergencyButton from "@/components/EmergencyButton";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-between">
      <Header />
      <VitalInput />
      <InfoTabs />
      <EmergencyButton />
    </main>
  );
}
