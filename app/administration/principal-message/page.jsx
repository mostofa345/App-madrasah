import PrincipalClient from "./PrincipalClient";

// Chonkhola Alamyia Islamia Fazil Madrasah এর জন্য SEO মেটাডেটা
export const metadata = {
  title: "Principal's Message | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Read the inspiring message from the Principal of Chonkhola Alamyia Islamia Fazil Madrasah. Learn about our vision, values, and commitment to excellence in education.",
  keywords: ["Principal Message", "Madrasah Head", "Chonkhola Alamyia Islamia", "Fazil Madrasah Principal", "Educational Vision"],
  openGraph: {
    title: "Principal's Message - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Building a brighter future for our students with spiritual and academic excellence.",
    type: "website",
  },
};

async function getPrincipalData() {
  // আপনার ব্যাকেন্ড এপিআই ইউআরএল
  const API_URL = "https://madrasah-server.onrender.com/api/v1/principal/view";
  try {
    const res = await fetch(API_URL, { 
      next: { revalidate: 3600 } // প্রতি ১ ঘণ্টায় ডাটা আপডেট হবে
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Principal data fetch error:", error);
    return null;
  }
}

export default async function PrincipalMessagePage() {
  const data = await getPrincipalData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Message not found</h2>
          <p className="text-slate-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <PrincipalClient data={data} />;
}