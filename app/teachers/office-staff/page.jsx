import OfficeStaffClient from "./OfficeStaffClient";

// SEO Metadata: Eta Google search-e office staff ebong administration rank korte sahajyo korbe
export const metadata = {
  title: "Administrative Staff | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Meet our dedicated office support team and administrative staff. We ensure professional management and secure record-keeping for our Madrasah.",
  keywords: ["Madrasah Office Staff", "Administrative Team", "Chonkhola Alamyia Support", "Madrasah Management", "Office Administration"],
  openGraph: {
    title: "Office Support Team - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "The administrative backbone of our institution.",
    type: "website",
  },
};

async function getStaffs() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    // Server-side fetch with revalidation
    const res = await fetch(`${API_URL}/staffs`, { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Staff data fetch error:", error);
    return [];
  }
}

export default async function OfficeStaffPage() {
  const staffs = await getStaffs();

  return <OfficeStaffClient initialStaffs={staffs} />;
}