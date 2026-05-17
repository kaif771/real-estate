import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Share2, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-2xl text-white">FlexoSpaces</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover and book the perfect co-working space that matches your team's vibe, budget, and location requirements instantly.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/search" className="hover:text-primary transition-colors text-sm">Find Workspace</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/enterprise" className="hover:text-primary transition-colors text-sm">Enterprise Solutions</Link></li>
              <li><Link to="/list-space" className="hover:text-primary transition-colors text-sm">List Your Space</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors text-sm">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors text-sm">Trust & Safety</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="text-primary flex-shrink-0 mt-0.5" size={18} />
                <span>123 Innovation Drive, Tech Park, San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <span>hello@flexospaces.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FlexoSpaces. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a href="#" className="hover:text-white transition-colors">English (US)</a>
            <a href="#" className="hover:text-white transition-colors">$ USD</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
