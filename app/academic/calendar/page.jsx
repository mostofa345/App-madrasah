import CalendarHero from "@/components/calendar/CalendarHero";
import EventTimeline from "@/components/calendar/EventTimeline";
import HolidayGrid from "@/components/calendar/HolidayGrid";

// SEO Metadata for Academic Calendar
export const metadata = {
  title: "Academic Calendar 2024-25 | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "View the official academic calendar of Chonkhola Alamyia Islamia Fazil Madrasah. Stay updated on exam schedules, holidays, and important events.",
  keywords: ["Academic Calendar", "Madrasah Holidays", "Exam Schedule", "Chonkhola Madrasah Events", "Fazil Madrasah Calendar"],
  openGraph: {
    title: "Academic Calendar - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Plan your academic year with our official schedule and holiday list.",
    type: "website",
  },
};

export default function AcademicCalendarPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 pb-20">
      <CalendarHero />
      <EventTimeline />
      <HolidayGrid />
    </main>
  );
}