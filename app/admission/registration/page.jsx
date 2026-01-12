import ExamRegistrationClient from "./ExamRegistrationClient";

// SEO Metadata for Exam & Registration Page
export const metadata = {
  title: "Exam Registration & Routine | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Get the latest exam routines, registration details, and board exam form fill-up information for Chonkhola Alamyia Islamia Fazil Madrasah. Download routines and pay fees online.",
  keywords: ["Madrasah Exam Routine", "Registration Fee", "Board Exam Form Fill-up", "Chonkhola Alamyia Exam", "Online Fee Payment"],
  openGraph: {
    title: "Exam & Registration - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Stay updated with the latest examination schedules and registration notices.",
    type: "website",
  },
};

async function getExamData() {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/exam-admin/config`;
  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } // Protik ghontay data refresh hobe
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Exam data fetch error:", error);
    return null;
  }
}

export default async function ExamPage() {
  const data = await getExamData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Data not found</h2>
          <p className="text-slate-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <ExamRegistrationClient examData={data} />;
}