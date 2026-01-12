import FacilitiesClient from "./FacilitiesClient";

// SEO Metadata for Chonkhola Alamyia Islamia Fazil Madrasah
export const metadata = {
  title: "Campus Facilities | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Discover the modern campus facilities, high-end security, and spiritual environment at Chonkhola Alamyia Islamia Fazil Madrasah.",
  keywords: ["Madrasah Facilities", "Chonkhola Madrasah", "Islamic Education Campus", "Safe Campus"],
  openGraph: {
    title: "Our Campus Facilities - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Providing a serene and modern environment for quality education.",
    type: "website",
  },
};

async function getFacilitiesData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    const res = await fetch(`${baseUrl}/facilities`, { 
      next: { revalidate: 3600 } // Data updates every hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Facilities fetch error:", error);
    return null;
  }
}

export default async function FacilitiesPage() {
  const data = await getFacilitiesData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold">Facilities data not found</h2>
          <p className="text-slate-400">Please check back later.</p>
        </div>
      </div>
    );
  }

  return <FacilitiesClient data={data} />;
}