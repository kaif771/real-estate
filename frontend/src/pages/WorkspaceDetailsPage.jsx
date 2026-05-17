import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Users, Wifi, Coffee, Printer, Monitor, CheckCircle, Shield, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';

const WorkspaceDetailsPage = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDates, setBookingDates] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/workspaces/${id}`);
        setWorkspace(data);
      } catch (error) {
        console.error("Error fetching workspace", error);
        // Mock data fallback
        setWorkspace({
          _id: id,
          title: 'Premium Glass Cabin at Tech Park',
          description: 'A beautifully designed premium glass cabin perfect for focused work or small team collaboration. Features ergonomic chairs, a large whiteboard, and high-speed enterprise Wi-Fi. Access to common areas including a cafeteria and relaxation zones.',
          location: { city: 'San Francisco', address: '123 Innovation Drive, Floor 4, Suite 400' },
          price: 150,
          capacity: 4,
          areaSize: 200,
          type: 'private_cabin',
          images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
          ],
          amenities: ['Enterprise Wi-Fi', 'Artisan Coffee', 'Whiteboard', 'Dual Monitors', 'Printing/Scanning', '24/7 Access', 'Air Conditioning'],
          owner: { name: 'FlexoTech Spaces' }
        });
      }
      setLoading(false);
    };

    fetchWorkspace();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to request a booking.');
      return;
    }

    try {
      await api.post('/bookings', {
        workspaceId: workspace._id,
        startDate: bookingDates.start,
        endDate: bookingDates.end,
        guests: 1 // hardcoded for now, could be dynamic
      });
      alert('Booking request sent successfully!');
      setBookingDates({ start: '', end: '' });
    } catch (error) {
      alert('Failed to send booking request: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (!workspace) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Workspace not found</div>;
  }

  return (
    <div className="bg-light min-h-screen pb-20">
      {/* Header Image Gallery */}
      <div className="bg-dark h-[50vh] min-h-[400px] relative">
        <Link to="/search" className="absolute top-6 left-6 z-10 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex h-full gap-2 p-2">
          <div className="w-2/3 h-full rounded-2xl overflow-hidden relative group cursor-pointer">
            <img src={workspace.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <div className="h-1/2 rounded-2xl overflow-hidden relative group cursor-pointer">
              <img src={workspace.images[1] || workspace.images[0]} alt="Side 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="h-1/2 rounded-2xl overflow-hidden relative group cursor-pointer">
              <img src={workspace.images[2] || workspace.images[0]} alt="Side 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-dark/40 flex items-center justify-center">
                <span className="text-white font-medium text-lg border border-white/50 px-4 py-2 rounded-lg backdrop-blur-sm">View all photos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">{workspace.type.replace('_', ' ')}</div>
              <h1 className="text-4xl font-bold text-dark mb-4">{workspace.title}</h1>
              <p className="text-gray-600 flex items-center gap-2 text-lg">
                <MapPin className="text-gray-400" /> {workspace.location.address}, {workspace.location.city}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500 mb-1">Managed by</p>
              <p className="font-semibold">{workspace.owner.name || 'Owner'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200 mb-8">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <Users className="mx-auto text-primary mb-2" size={24} />
              <p className="text-sm text-gray-500">Capacity</p>
              <p className="font-bold">{workspace.capacity} People</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <MapPin className="mx-auto text-primary mb-2" size={24} />
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-bold">{workspace.areaSize} sq.ft</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <Shield className="mx-auto text-primary mb-2" size={24} />
              <p className="text-sm text-gray-500">Access</p>
              <p className="font-bold">Verified</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <CheckCircle className="mx-auto text-secondary mb-2" size={24} />
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-bold text-secondary">Available Now</p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-dark mb-4">About this space</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{workspace.description}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-dark mb-6">Amenities included</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
              {workspace.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 bg-gray-100 rounded-lg text-primary">
                    {amenity.includes('Wi-Fi') ? <Wifi size={20} /> :
                     amenity.includes('Coffee') ? <Coffee size={20} /> :
                     amenity.includes('Print') ? <Printer size={20} /> :
                     amenity.includes('Monitor') ? <Monitor size={20} /> :
                     <CheckCircle size={20} />}
                  </div>
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Booking Card */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
            <div className="mb-6 pb-6 border-b border-gray-100 flex items-end gap-2">
              <span className="text-3xl font-bold text-dark">${workspace.price}</span>
              <span className="text-gray-500 pb-1">/ day</span>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={bookingDates.start}
                    onChange={(e) => setBookingDates({...bookingDates, start: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={bookingDates.end}
                    onChange={(e) => setBookingDates({...bookingDates, end: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-6">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>${workspace.price} x 1 days</span>
                  <span>${workspace.price}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-4">
                  <span>Service fee</span>
                  <span>$15</span>
                </div>
                <div className="flex justify-between text-dark font-bold text-lg pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>${workspace.price + 15}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 mt-6"
              >
                Request to Book
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetailsPage;
