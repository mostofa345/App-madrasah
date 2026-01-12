import IntroductionClient from "./IntroductionClient";

// SEO Metadata for Chonkhola Alamyia Islamia Fazil Madrasah
export const metadata = {
  title: "About Us | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Learn about the history, vision, and mission of Chonkhola Alamyia Islamia Fazil Madrasah. We are dedicated to providing quality Islamic and general education.",
  keywords: ["About Madrasah", "Chonkhola Alamyia", "Islamic Education History", "Madrasah Vision", "Fazil Madrasah Bangladesh"],
  openGraph: {
    title: "About Our Institution - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Building a brighter future through integrated education.",
    type: "website",
  },
};

async function getIntroductionData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    const res = await fetch(`${baseUrl}/introduction`, { 
      next: { revalidate: 3600 } // Data updates every hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Introduction fetch error:", error);
    return null;
  }
}

export default async function IntroductionPage() {
  const data = await getIntroductionData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Information not found</h2>
          <p className="text-slate-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <IntroductionClient data={data} />;
}