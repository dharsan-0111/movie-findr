import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <div>
      <div className="bg-background text-foreground sticky top-0 z-50 m-auto w-3/4 p-4">
        <h3 className="font-bold text-2xl text-primary">Movie Roulette</h3>
      </div>
      <LandingPage />
    </div>
  );
}
