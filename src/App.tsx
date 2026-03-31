import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ExitIntent from "@/components/ExitIntent";
import HoneyJarProgress from "@/components/HoneyJarProgress";
import CursorTrail from "@/components/CursorTrail";
import HeroBee from "@/components/HeroBee";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CursorTrail />
        <Nav />
        <HeroBee />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <StickyCTA />
        <WhatsAppWidget />
        <ExitIntent />
        <HoneyJarProgress />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
