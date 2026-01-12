import UpcomingEventsClient from "./UpcomingEventsClient";

// SEO Metadata for Chonkhola Alamyia Islamia Fazil Madrasah
export const metadata = {
  title: "Upcoming Events | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Stay updated with the latest educational, religious, and cultural events at Chonkhola Alamyia Islamia Fazil Madrasah. Join our upcoming gatherings and seminars.",
  openGraph: {
    title: "Events - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Explore upcoming seminars, competitions, and Islamic events at our Madrasah.",
    images: ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"],
  },
};

// Data Fetching Function
async function getEventData() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const res = await fetch(`${API_URL}/upcoming-event/data`, {
      next: { revalidate: 60 }, // Protiti 60 second por data refresh hobe
    });
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export default async function UpcomingEventsPage() {
  const data = await getEventData();

  // Database-e data na thakle default data
  const hero = data || {
    heroTitle: "Upcoming",
    heroHighlightText: "Events",
    heroBio: "Our Madrasah's future is filled with educational activities and meaningful programs.",
    heroBgImage: { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069" },
    heroBadgeText: "Save The Dates"
  };

  const eventsList = data?.events || [];

  return (
    <UpcomingEventsClient 
      hero={hero} 
      eventsList={eventsList} 
    />
  );
}