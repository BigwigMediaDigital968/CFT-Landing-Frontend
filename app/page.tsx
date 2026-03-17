import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import LeadForm from "./Component/Leadform";
import Footer from "./Component/Footer";
import ImageSlider from "./Component/ImageSlider";
import WhyTrustUs from "./Component/WhyTrustUs";

export default function Home() {
  return (
    <>
      <main className="min-h-screen" style={{ background: "#0b0b0f" }}>
        <Navbar />
        <Hero />
        <LeadForm />
        <ImageSlider />
        <WhyTrustUs />
        <Footer />
      </main>
    </>
  );
}
