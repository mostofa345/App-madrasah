import TeacherProfilesClient from "./TeacherProfilesClient";

// SEO Metadata: Eta Google search-e rank korte sahajyo korbe
export const metadata = {
  title: "Honorable Faculty | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Meet our dedicated teachers and Islamic scholars. Explore profiles of our faculty members across various departments including Nurani, Dakhil, and Fazil.",
  keywords: ["Madrasah Teachers", "Islamic Scholars", "Chonkhola Alamyia Faculty", "Madrasah Education", "Expert Teachers"],
  openGraph: {
    title: "Our Faculty - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Profiles of our experienced and dedicated educational staff.",
    type: "website",
  },
};

async function getTeachers() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    const res = await fetch(`${API_URL}/teachers`, { 
      next: { revalidate: 3600 } // Data protik ghontay auto-refresh hobe
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Teacher fetch error:", error);
    return [];
  }
}

export default async function TeacherProfilesPage() {
  const teachers = await getTeachers();

  return <TeacherProfilesClient initialTeachers={teachers} />;
}