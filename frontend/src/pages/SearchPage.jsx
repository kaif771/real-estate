import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Users, DollarSign, Filter, Star, Wifi, Coffee } from 'lucide-react';
import axios from 'axios';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    minCapacity: searchParams.get('minCapacity') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    type: searchParams.get('type') || ''
  });

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const { data } = await axios.get(`http://localhost:5000/api/workspaces?${queryParams}`);
        setWorkspaces(data);
      } catch (error) {
        console.error("Error fetching workspaces", error);
        // For demo purposes, set mock data if API fails
        setWorkspaces([
          {
            _id: '1',
            title: 'Modern Glass Cabin in Tech Hub',
            location: { city: 'San Francisco', address: '123 Innovation Dr' },
            price: 50,
            capacity: 4,
            type: 'private_cabin',
            images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            amenities: ['Wi-Fi', 'Coffee', 'Whiteboard']
          },
          {
            _id: '2',
            title: 'Creative Shared Desk Space',
            location: { city: 'New York', address: '45 Art District' },
            price: 25,
            capacity: 1,
            type: 'shared_desk',
            images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            amenities: ['Wi-Fi', 'Coffee', 'Printing']
          }
        ]);
      }
      setLoading(false);
    };

    fetchWorkspaces();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="bg-light min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-6 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                name="city"
                placeholder="Where do you want to work?" 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={filters.city}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex gap-2">
              <select 
                name="type"
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <option value="">Space Type</option>
                <option value="private_cabin">Private Cabin</option>
                <option value="shared_desk">Shared Desk</option>
                <option value="meeting_room">Meeting Room</option>
              </select>
              <select 
                name="minCapacity"
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700"
                value={filters.minCapacity}
                onChange={handleFilterChange}
              >
                <option value="">Capacity</option>
                <option value="1">1 Person</option>
                <option value="2">2+ People</option>
                <option value="5">5+ People</option>
                <option value="10">10+ People</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter size={18} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Results List */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-dark mb-6">
            {workspaces.length} spaces found {filters.city && `in ${filters.city}`}
          </h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : workspaces.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <Search className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No spaces found</h3>
              <p className="text-gray-500">Try adjusting your search filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspaces.map((space) => (
                <Link to={`/workspace/${space._id}`} key={space._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={space.images[0] || "https://images.unsplash.com/photo-1497366216548-37526070297c"} 
                      alt={space.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold text-dark flex items-center gap-1 shadow-sm">
                      <Star size={14} className="text-yellow-500 fill-current" /> 4.8
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{space.type.replace('_', ' ')}</div>
                    <h3 className="text-xl font-bold text-dark mb-1 line-clamp-1">{space.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                      <MapPin size={14} /> {space.location.city}
                    </p>
                    
                    <div className="flex gap-3 mb-4">
                      {space.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                          {amenity === 'Wi-Fi' && <Wifi size={12} />}
                          {amenity === 'Coffee' && <Coffee size={12} />}
                          {amenity}
                        </span>
                      ))}
                      {space.amenities.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">+{space.amenities.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center text-gray-600 text-sm gap-1">
                        <Users size={16} /> Up to {space.capacity} pax
                      </div>
                      <div className="font-bold text-lg text-dark">
                        ${space.price}<span className="text-sm font-normal text-gray-500">/day</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Map View (Hidden on mobile) */}
        <div className="hidden lg:block w-1/3 h-[calc(100vh-140px)] sticky top-32 rounded-2xl overflow-hidden shadow-md bg-gray-200">
          {/* Mock Map Image */}
          <div className="w-full h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Map View" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-dark flex items-center gap-2">
                <MapPin className="text-primary" size={16} /> Interactive map coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
