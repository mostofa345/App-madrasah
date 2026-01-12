import AuthClient from "./AuthClient";

// SEO Metadata for Login/Auth Page
export const metadata = {
  title: "Login & Registration | Chonkhola Alamyia Islamia Fazil Madrasah",
  description: "Access the student, teacher, and parent dashboard of Chonkhola Alamyia Islamia Fazil Madrasah. Secure login and registration portal for our academic community.",
  keywords: ["Madrasah Login", "Student Portal", "Teacher Dashboard", "Parent Login", "Chonkhola Alamyia Auth"],
  openGraph: {
    title: "User Portal - Chonkhola Alamyia Islamia Fazil Madrasah",
    description: "Login to access your personalized academic dashboard.",
    type: "website",
  },
};

export default function AuthPage() {
  return <AuthClient />;
}