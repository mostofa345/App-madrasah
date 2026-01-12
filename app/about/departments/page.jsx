import AcademicClient from "./AcademicClient";

// SEO Metadata in English
export const metadata = {
  title: "Academic Departments | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Explore the various academic departments and curriculum at Chonkhola Alamyia Islamia Fazil Madrasah. A perfect blend of modern and Islamic education.",
  keywords: ["Madrasah", "Chonkhola", "Alamyia Islamia", "Fazil Madrasah", "Academic Departments", "Islamic Education"],
  openGraph: {
    title: "Academic Departments - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Choose the right department for your child's bright future.",
    type: "website",
  },
};

async function getAcademicData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    const res = await fetch(`${baseUrl}/academic`, { next: { revalidate: 3600 } }); 
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Data fetching error:", error);
    return null;
  }
}

export default async function AcademicPage() {
  const data = await getAcademicData();

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold">Data failed to load</h2>
          <p className="text-slate-400">Please try again after some time.</p>
        </div>
      </div>
    );
  }

  return <AcademicClient data={data} />;
}