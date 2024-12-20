import { StatusMonitorElement } from "@/components/monitor";

export default async function Home() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-dvh">
      <StatusMonitorElement />
    </div>
  );
}
