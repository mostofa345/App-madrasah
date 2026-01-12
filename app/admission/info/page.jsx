import AdmissionInfoClient from "./AdmissionInfoClient";

// SEO Metadata for Admission Info Page
export const metadata = {
  title: "Admission Information | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Get detailed information about admission requirements, deadlines, and necessary documents for Chonkhola Alamyia Islamia Fazil Madrasah. Admission is open for all departments.",
  keywords: ["Madrasah Admission Info", "Admission Requirements", "Chonkhola Alamyia", "Islamic Education Admission Details", "Admission Deadline"],
  openGraph: {
    title: "Admission Info - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Check the latest admission status and requirements for our institution.",
    type: "website",
  },
};

async function getAdmissionData() {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admission`;
  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } // Data refresh every 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Admission data fetch error:", error);
    return null;
  }
}

export default async function AdmissionInfoPage() {
  const data = await getAdmissionData();

  // Fallback if data is missing
  const admissionData = data || {
    header: { title: "ভর্তি সংক্রান্ত", highlightText: "তথ্যসমূহ", description: "বর্তমানে ভর্তির তথ্য আপডেট করা হচ্ছে।", bgImage: "" },
    departments: [],
    requirements: [],
    importantNote: "ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য সরাসরি অফিসে যোগাযোগ করুন।"
  };

  return <AdmissionInfoClient admissionData={admissionData} />;
}