import LatestNewsClient from "./LatestNewsClient";

// 1. SEO Metadata Setup: Google search-e news rank korate sahajyo korbe
export const metadata = {
  title: "Latest News & Events | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Stay updated with the latest news, announcements, and upcoming events of our Madrasah.",
  keywords: ["Madrasah News", "Notice Board", "Chonkhola Alamyia Events", "Islamic Education Updates"],
  openGraph: {
    title: "Live Madrasah Updates - Latest News",
    description: "Madrasah-r protyekti khobor ekhon ekebare apnar hater muthoy.",
    type: "website",
  },
};

// 2. Database Fetch Logic (Server Side)
async function getNews() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    const res = await fetch(`${API_URL}/news`, { 
      next: { revalidate: 60 } // Protik minute-e server data refresh korbe
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("News fetch error:", err);
    return [];
  }
}

export default async function LatestNewsPage() {
  const initialNews = await getNews();

  return <LatestNewsClient initialNews={initialNews} />;
}