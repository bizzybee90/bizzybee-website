import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => (
  <a
    href="https://wa.me/447400123456"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-primary-foreground shadow-lg hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={24} fill="currentColor" />
  </a>
);

export default WhatsAppWidget;
