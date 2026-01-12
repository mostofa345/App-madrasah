import EventGalleryClient from "./EventGalleryClient";

// SEO Metadata for Chonkhola Alamyia Islamia Fazil Madrasah
export const metadata = {
  title: "Event Gallery | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Explore the visual history of Chonkhola Alamyia Islamia Fazil Madrasah. Browse through our event photos, including seminars, competitions, and Islamic gatherings.",
  openGraph: {
    title: "Gallery - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Capturing the beautiful moments and memories of our Madrasah's journey.",
  },
};

// Server-side Data Fetching
async function getGalleryData() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${API_URL}/event-gallery/data`, {
      next: { revalidate: 60 }, // Data refresh every 60 seconds
    });
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

export default async function EventGalleryPage() {
  const galleryData = await getGalleryData();

  return (
    <EventGalleryClient galleryData={galleryData} />
  );
}