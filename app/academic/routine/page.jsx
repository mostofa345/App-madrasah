import RoutineClient from "./RoutineClient";

// SEO Metadata for Chonkhola Alamyia Islamia Fazil Madrasah
export const metadata = {
  title: "Academic Routine | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Check the latest academic class routine for Chonkhola Alamyia Islamia Fazil Madrasah. Select your department and class to view your schedule.",
  keywords: ["Madrasah Routine", "Class Schedule", "Chonkhola Alamyia", "Academic Calendar", "Fazil Madrasah Routine"],
  openGraph: {
    title: "Class Routine - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Digital academic routine for all departments and classes.",
    type: "website",
  },
};

export default function RoutinePage() {
  return <RoutineClient />;
}