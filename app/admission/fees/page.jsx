import AdmissionFeesClient from "./AdmissionFeesClient";

// Chonkhola Alamyia Islamia Fazil Madrasah এর জন্য SEO মেটাডেটা
export const metadata = {
  title: "Admission Fees & Charges | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "View the detailed admission fee structure for different departments at Chonkhola Alamyia Islamia Fazil Madrasah. Transparent information about academic charges and payment methods.",
  keywords: ["Madrasah Admission Fees", "Fee Structure", "Chonkhola Alamyia Fees", "Fazil Madrasah Charges", "Online Payment Madrasah"],
  openGraph: {
    title: "Admission Fee Structure - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Get clear information about admission and academic fees.",
    type: "website",
  },
};

async function getFeesData() {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/fees`;
  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } // প্রতি ১ ঘণ্টায় ডাটা রিফ্রেশ হবে
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fees data fetch error:", error);
    return null;
  }
}

export default async function AdmissionFeesPage() {
  const data = await getFeesData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Fee information not available</h2>
          <p className="text-slate-500">Please try again later or contact the office.</p>
        </div>
      </div>
    );
  }

  return <AdmissionFeesClient feeInfo={data} />;
}