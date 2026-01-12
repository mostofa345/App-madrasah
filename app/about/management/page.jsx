import ManagementClient from "./ManagementClient";

// SEO Metadata for Management Page
export const metadata = {
  title: "Management Board | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Meet the dedicated Board of Trustees and Executive Committee of Chonkhola Alamyia Islamia Fazil Madrasah. Our leadership ensures quality education and spiritual growth.",
  keywords: ["Madrasah Management", "Board of Trustees", "Chonkhola Alamyia", "Madrasah Committee", "Islamic Institution Leadership"],
  openGraph: {
    title: "Our Management - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "The visionary leaders behind our educational excellence.",
    type: "website",
  },
};

async function getManagementData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    const res = await fetch(`${baseUrl}/management`, { 
      next: { revalidate: 3600 } // Data updates every hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Management data fetch error:", error);
    return null;
  }
}

export default async function ManagementPage() {
  const data = await getManagementData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Management information not found</h2>
          <p className="text-slate-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <ManagementClient data={data} />;
}