import Departments from "@/components/Departments";
import Features from "@/components/Features";
import HeroSlider from "@/components/HeroSlider";
import ImportantLinks from "@/components/ImportantLinks";
import PhotoGallery from "@/components/PhotoGallery";
import PrincipalMessage from "@/components/PrincipalMessage";
import StatsCounter from "@/components/StatsCounter";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-500">
      {/* ১ নম্বর কম্পোনেন্ট: হিরো স্লাইডার */}
      <HeroSlider />

      {/* এখানে অন্যান্য কম্পোনেন্টগুলো (Statistics, Principal Message) নিচে আসবে */}
      <div className="max-w-7xl mx-auto py-20 px-4">
        <StatsCounter />
        <PrincipalMessage />
        <Features />
        <Departments />
        <PhotoGallery />
       
        <ImportantLinks />
          {/* পরবর্তী কাজগুলো এখানে হবে */}
      </div>
    </main>
  );
}