import VideoGalleryClient from "./VideoGalleryClient";

// SEO Metadata for Video Gallery Page
export const metadata = {
  title: "Video Gallery | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Watch the latest videos of events, educational programs, and campus activities at Chonkhola Alamyia Islamia Fazil Madrasah. Experience our institution through visual media.",
  keywords: ["Madrasah Video Gallery", "Chonkhola Alamyia Videos", "Islamic Education Videos", "Madrasah Events Video"],
  openGraph: {
    title: "Video Gallery - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Experience our campus life through our official video library.",
    type: "website",
  },
};

async function getVideoData() {
  const BASE_URL = "https://madrasah-server.onrender.com/api/v1/video-library";
  try {
    const res = await fetch(`${BASE_URL}/list`, { 
      next: { revalidate: 3600 } // Data updates every hour
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Video fetch error:", error);
    return [];
  }
}

export default async function VideoGalleryPage() {
  const videos = await getVideoData();

  return <VideoGalleryClient initialVideos={videos} />;
}