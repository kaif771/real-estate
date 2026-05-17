import { Users, Globe, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dark text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Team collaborating" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Redefining the <span className="text-primary">Workspace</span> Experience.
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              We started with a simple idea: professionals need flexible, inspiring places to work without the commitment of long-term leases. Today, FlexoSpaces connects thousands of remote workers, startups, and enterprises with their perfect workspace.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-20 -mt-10 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-dark mb-2">50+</p>
              <p className="text-gray-500 font-medium">Cities Globally</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
              <p className="text-gray-500 font-medium">Workspaces</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-dark mb-2">2M+</p>
              <p className="text-gray-500 font-medium">Bookings Made</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-secondary mb-2">99%</p>
              <p className="text-gray-500 font-medium">Host Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything we do is driven by our commitment to empowering the future of work.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Globe className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600 leading-relaxed">Work from anywhere. We aim to provide premium spaces in every major neighborhood globally.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-secondary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">It's not just a desk. It's about connecting with like-minded professionals and growing together.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Standards</h3>
              <p className="text-gray-600 leading-relaxed">Every listed space goes through a strict vetting process to ensure premium amenities and safety.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexibility</h3>
              <p className="text-gray-600 leading-relaxed">No complex leases. Book by the hour, day, or month—scaling exactly as your business needs dictate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Join the revolution.</h2>
          <p className="text-xl text-gray-400 mb-10">Whether you're looking for your next office or have a space to share, we're here to help.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/search" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
              Find a Workspace
            </Link>
            <Link to="/list-space" className="bg-white text-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              List Your Space
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
