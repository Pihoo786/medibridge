import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import WhyMediBridge from "../components/landing/WhyMediBridge";
import Demo from "../components/landing/Demo";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import Security from "../components/landing/Security";
import WhatsAppCTA from "../components/landing/WhatsAppCTA";
import DoctorPortal from "../components/landing/DoctorPortal";
import Footer from "../components/landing/Footer";



function LandingPage({ onDoctorLogin }) {
  return (
    <div className="bg-[#020917] text-white">

      <Navbar onLogin={onDoctorLogin} />

      <Hero onLogin={onDoctorLogin} />

      <WhyMediBridge />

      <Demo />

      <HowItWorks />

      <Features />

      <Security />

      <WhatsAppCTA />

      <DoctorPortal onLogin={onDoctorLogin} />

      <Footer />

    </div>
  );
}

export default LandingPage;