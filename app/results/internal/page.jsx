import ResultClient from "./ResultClient";

// SEO Metadata for Result Page
export const metadata = {
  title: "Exam Results & Marksheet | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Check internal exam results and download online marksheets of Chonkhola Alamyia Islamia Fazil Madrasah. Enter your Bibag, Class, and Roll number to view academic transcripts.",
  keywords: ["Madrasah Result", "Online Marksheet", "Academic Transcript", "Chonkhola Alamyia Result", "Madrasah Exam Portal"],
  openGraph: {
    title: "Result Portal - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Search and download your academic exam results online.",
    type: "website",
  },
};

export default function ResultPage() {
  return <ResultClient />;
}