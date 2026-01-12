import ApplyOnlineClient from "./ApplyOnlineClient";

// SEO Metadata for Admission Page
export const metadata = {
  title: "Online Admission | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Apply online for admission at Chonkhola Alamyia Islamia Fazil Madrasah. Follow our simple steps to submit your application for Nurani, Evtedayee, Dhakhil, Alim, and Fazil departments.",
  keywords: ["Online Admission", "Madrasah Admission 2024", "Chonkhola Alamyia", "Admission Form", "Islamic Education Admission"],
  openGraph: {
    title: "Apply Online - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Start your journey of spiritual and academic excellence with us.",
    type: "website",
  },
};

export default function AdmissionPage() {
  return <ApplyOnlineClient />;
}