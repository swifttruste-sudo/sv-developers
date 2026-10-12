import { Component, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/common/CustomCursor";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import BackToTop from "@/components/layout/BackToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Team from "@/pages/Team";
import WhyChooseUs from "@/pages/WhyChooseUs";
import BuyerFirst from "@/pages/BuyerFirst";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Disclaimer from "@/pages/Disclaimer";
import NotFound from "@/pages/NotFound";
import Admin from "@/pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center">
          <p className="font-display text-3xl font-bold text-white">Something went wrong</p>
          <p className="mt-3 max-w-md text-sm text-white/70">
            An unexpected error occurred while rendering this page.
          </p>
          <button
            data-testid="error-reload-button"
            onClick={() => window.location.reload()}
            className="btn-gold mt-8"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SiteChrome({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <div className="App min-h-screen bg-white">
      <ErrorBoundary>
        <BrowserRouter>
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <ScrollToTop />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route
              path="*"
              element={
                <SiteChrome>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/why-choose-us" element={<WhyChooseUs />} />
                    <Route path="/buyer-first" element={<BuyerFirst />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </SiteChrome>
              }
            />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}
