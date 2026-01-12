import PhotoGalleryClient from "./PhotoGalleryClient";

// 1. SEO Metadata Setup
export const metadata = {
  title: "Official Photo Gallery | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Explore our Madrasah's visual journey, events, and memories through our official photo gallery.",
  keywords: ["Madrasah Gallery", "Islamic Events Photos", "Chonkhola Alamyia", "Madrasah Archive"],
};

// 2. Database theke data fetch (Server-side)
async function getPhotos() {
  const BASE_URL = "https://madrasah-server.onrender.com/api/v1/archive";
  try {
    const res = await fetch(`${BASE_URL}/list`, { 
      next: { revalidate: 60 } // Protik minute-e data update hobe jodi database-e change hoy
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Gallery fetch error:", err);
    return [];
  }
}

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <PhotoGalleryClient initialPhotos={photos} />
  );
}