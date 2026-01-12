import SyllabusClient from "./SyllabusClient";

// SEO Metadata for Syllabus Page
export const metadata = {
  title: "Academic Syllabus | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Access the official academic syllabus and curriculum for Chonkhola Alamyia Islamia Fazil Madrasah. View subject-wise study plans for all classes and departments.",
  keywords: ["Madrasah Syllabus", "Academic Curriculum", "Chonkhola Alamyia", "Islamic Studies Syllabus", "Fazil Madrasah Curriculum"],
  openGraph: {
    title: "Official Syllabus - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Detailed study plans and curriculum for our students.",
    type: "website",
  },
};

export default function SyllabusPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-12">
      <SyllabusClient />
    </main>
  );
}