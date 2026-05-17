import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Building, ShieldCheck, Zap } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    capacity: '',
    type: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.city) params.append('city', searchParams.city);
    if (searchParams.capacity) params.append('minCapacity', searchParams.capacity);
    if (searchParams.type) params.append('type', searchParams.type);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-dark text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Co-working Space" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Find your <span className="text-primary">perfect</span> workspace anywhere.
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Discover, compare, and book premium co-working spaces, private offices, and meeting rooms tailored to your team's needs.
            </p>
            
            {/* Search Box */}
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <MapPin className="text-gray-400 mr-3" size={20} />
                  <input 
                    type="text" 
                    placeholder="City or Neighborhood" 
                    className="bg-transparent w-full focus:outline-none text-dark"
                    value={searchParams.city}
                    onChange={(e) => setSearchParams({...searchParams, city: e.target.value})}
                  />
                </div>
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <Users className="text-gray-400 mr-3" size={20} />
                  <select 
                    className="bg-transparent w-full focus:outline-none text-dark appearance-none"
                    value={searchParams.capacity}
                    onChange={(e) => setSearchParams({...searchParams, capacity: e.target.value})}
                  >
                    <option value="" disabled>Team Size</option>
                    <option value="1">1 Person</option>
                    <option value="2">2-5 People</option>
                    <option value="6">6-10 People</option>
                    <option value="11">11+ People</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={20} /> Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Why choose FlexoSpaces?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide a seamless experience to find the workspace that matches your exact vibe and requirements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
              <p className="text-gray-600">Our algorithm finds spaces that exactly match your team size, budget, and desired amenities.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-secondary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Availability</h3>
              <p className="text-gray-600">No more back-and-forth emails. See what's available instantly and book with a single click.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Listings</h3>
              <p className="text-gray-600">Every space on our platform is physically verified for quality, safety, and promised amenities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-2">Explore Popular Cities</h2>
              <p className="text-gray-600">Find workspaces in top business hubs.</p>
            </div>
            <button className="text-primary font-medium hover:underline hidden md:block">View all cities</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* City Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 shadow-md">
              <img src="https://images.unsplash.com/photo-1522083111817-913217b1841e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="New York" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">New York</h3>
                <p className="text-sm opacity-80">120+ Spaces</p>
              </div>
            </div>
            
            {/* City Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 shadow-md">
              <img src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="San Francisco" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">San Francisco</h3>
                <p className="text-sm opacity-80">85+ Spaces</p>
              </div>
            </div>
            
            {/* City Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 shadow-md">
              <img src="https://images.unsplash.com/photo-1502602898657-3e90760020c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="London" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">London</h3>
                <p className="text-sm opacity-80">150+ Spaces</p>
              </div>
            </div>
            
            {/* City Card 4 */}
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-64 shadow-md">
              <img src="https://images.unsplash.com/photo-1542314831-c6a4d1421044?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Austin" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Austin</h3>
                <p className="text-sm opacity-80">60+ Spaces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-6">Have a space to share?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">Join thousands of space owners earning passive income by listing their underutilized offices.</p>
        <button className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
          List Your Space Today
        </button>
      </section>
    </div>
  );
};

export default HomePage;
