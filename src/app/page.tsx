import { Hero } from "@/components/hero";
import { Generator } from "@/components/generator";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FAFAFA] font-sans">
      {/* Premium Soft Aurora Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-muhi-green/10 blur-[140px] rounded-full pointer-events-none mix-blend-multiply opacity-80" />
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-muhi-blue/10 blur-[140px] rounded-full pointer-events-none mix-blend-multiply opacity-80" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-muhi-blue/5 blur-[150px] rounded-full pointer-events-none mix-blend-multiply opacity-60" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Hero />
        <Generator />
      </div>
    </main>
  );
}
