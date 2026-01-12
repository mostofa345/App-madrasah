import "./globals.css";
import Footer from "./../components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NoticeBar from "@/components/NoticeBar";
import ThemeProvider from "@/components/ThemeProvider";

// --- Database theke SEO data fetch korar function ---
async function getSeoData() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://madrasah-server.onrender.com/api";
  try {
    // Tomar backend route '/api/seo/get-settings'
    const res = await fetch(`${API_URL}/seo/get-settings`, {
      next: { revalidate: 3600 }, // Protiti 1 ghonta por data refresh hobe
    });
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("SEO Data fetch error:", error);
    return null;
  }
}

// --- Dynamic Metadata Generation ---
export async function generateMetadata() {
  const seo = await getSeoData();

  // Database-e data na thakle default data use hobe
  return {
    title: seo?.metaTitle || "Chonkhola Alamyia Islamia Fazil Madrasah",
    description: seo?.metaDescription || "Quality Islamic & General Education",
    keywords: seo?.metaKeywords || "Madrasah, Education, Islam",
    verification: {
      google: seo?.googleVerification || "", // Google Console Verification
    },
    icons: {
      icon: seo?.favicon || "/favicon.ico", // Database-er favicon url
    },
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      images: [
        {
          url: seo?.ogImage || "/og-image.jpg", // Social media share image
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    // Robots.txt theke index kora ba na korar logic
    robots: {
      index: seo?.autoIndex ?? true,
      follow: seo?.autoIndex ?? true,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <NoticeBar />
          

            <Navbar />
   

          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
