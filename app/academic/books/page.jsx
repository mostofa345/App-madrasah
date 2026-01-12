import BookHero from "@/components/books/BookHero";
import BookListWrapper from "./BookListWrapper"; // নতুন ক্লায়েন্ট র‍্যাপার

// SEO Metadata for Library/Books
export const metadata = {
  title: "Library & Resources | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Explore our vast collection of Islamic and academic books at Chonkhola Alamyia Islamia Fazil Madrasah library. Access resources for spiritual and intellectual growth.",
  keywords: ["Madrasah Library", "Islamic Books", "Academic Resources", "Chonkhola Madrasah Books", "Online Library"],
  openGraph: {
    title: "Our Library - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Digital access to our academic and spiritual book collection.",
    type: "website",
  },
};

export default function BookListPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
      <BookHero />
      {/* ইন্টারঅ্যাক্টিভ অংশটুকু আলাদা ক্লায়েন্ট কম্পোনেন্টে পাঠানো হয়েছে */}
      <BookListWrapper />
    </main>
  );
}