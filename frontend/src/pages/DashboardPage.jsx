import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Building, Calendar, Users, Plus, MapPin } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [mySpaces, setMySpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Workspace Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSpace, setNewSpace] = useState({
    title: '', description: '', city: '', address: '',
    type: 'shared_desk', capacity: 1, areaSize: 100, price: 50,
    amenities: '', images: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetchDashboardData(parsedUser);
  }, [navigate]);

  const fetchDashboardData = async (currentUser) => {
    setLoading(true);
    try {
      if (currentUser.role === 'user') {
        const { data } = await api.get('/bookings/my-bookings');
        setBookings(data);
      } else if (currentUser.role === 'space_owner') {
        const { data } = await api.get('/workspaces');
        // Filter by owner locally for now (or backend could have a /my-workspaces route)
        const myWorkspaces = data.filter(w => w.owner._id === currentUser._id || w.owner === currentUser._id);
        setMySpaces(myWorkspaces);
        
        // Fetch bookings for these spaces (simulated or if backend supports it)
        // const bookingsData = await api.get('/bookings/my-spaces'); 
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
    setLoading(false);
  };

  const handleAddWorkspace = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newSpace,
        location: { city: newSpace.city, address: newSpace.address },
        amenities: newSpace.amenities.split(',').map(a => a.trim()),
        images: newSpace.images.split(',').map(img => img.trim()),
      };
      
      const { data } = await api.post('/workspaces', payload);
      setMySpaces([...mySpaces, data]);
      setShowAddForm(false);
      // Reset form
      setNewSpace({
        title: '', description: '', city: '', address: '', type: 'shared_desk', capacity: 1, areaSize: 100, price: 50, amenities: '', images: ''
      });
      alert('Workspace added successfully!');
    } catch (error) {
      alert('Failed to add workspace: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center pt-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="bg-light min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark">Welcome, {user.name}</h1>
            <p className="text-gray-600 capitalize">Role: {user.role.replace('_', ' ')}</p>
          </div>
          {user.role === 'space_owner' && (
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md flex items-center gap-2 w-fit"
            >
              <Plus size={20} /> {showAddForm ? 'Cancel' : 'List New Space'}
            </button>
          )}
        </div>

        {/* Space Owner View */}
        {user.role === 'space_owner' && (
          <div>
            {showAddForm && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold mb-4">Add a New Workspace</h2>
                <form onSubmit={handleAddWorkspace} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" required value={newSpace.title} onChange={e => setNewSpace({...newSpace, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea required value={newSpace.description} onChange={e => setNewSpace({...newSpace, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" rows="3"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" required value={newSpace.city} onChange={e => setNewSpace({...newSpace, city: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" required value={newSpace.address} onChange={e => setNewSpace({...newSpace, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select value={newSpace.type} onChange={e => setNewSpace({...newSpace, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white">
                      <option value="shared_desk">Shared Desk</option>
                      <option value="private_cabin">Private Cabin</option>
                      <option value="meeting_room">Meeting Room</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per day ($)</label>
                    <input type="number" required value={newSpace.price} onChange={e => setNewSpace({...newSpace, price: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Pax)</label>
                    <input type="number" required value={newSpace.capacity} onChange={e => setNewSpace({...newSpace, capacity: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area Size (sq.ft)</label>
                    <input type="number" required value={newSpace.areaSize} onChange={e => setNewSpace({...newSpace, areaSize: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
                    <input type="text" placeholder="Wi-Fi, Coffee, Whiteboard" required value={newSpace.amenities} onChange={e => setNewSpace({...newSpace, amenities: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
                    <input type="text" placeholder="https://unsplash.com/..., https://..." required value={newSpace.images} onChange={e => setNewSpace({...newSpace, images: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button type="submit" className="w-full bg-dark text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">Publish Workspace</button>
                  </div>
                </form>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Building size={24} className="text-primary"/> My Listed Spaces</h2>
            
            {mySpaces.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-gray-100">
                <Building className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500">You haven't listed any spaces yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mySpaces.map(space => (
                  <div key={space._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={space.images[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c'} alt={space.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="text-xs font-bold text-primary mb-1 uppercase">{space.type.replace('_', ' ')}</div>
                      <h3 className="font-bold text-lg mb-1 truncate">{space.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1"><MapPin size={14}/> {space.location.city}</p>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="font-bold text-dark">${space.price}/day</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${space.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {space.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User View */}
        {user.role === 'user' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Calendar size={24} className="text-primary"/> My Bookings</h2>
            
            {bookings.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center border border-gray-100">
                <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 text-lg mb-4">You have no active bookings.</p>
                <button onClick={() => navigate('/search')} className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">Find a Space</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map(booking => (
                  <div key={booking._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-5 relative">
                    <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg text-white ${booking.status === 'pending' ? 'bg-yellow-500' : booking.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {booking.status.toUpperCase()}
                    </div>
                    <div className="flex gap-4 items-center mb-4 pt-2">
                      <img src={booking.workspace?.images?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c'} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-bold text-dark">{booking.workspace?.title || 'Unknown Space'}</h3>
                        <p className="text-xs text-gray-500">{booking.workspace?.location?.city}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium text-dark">{new Date(booking.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium text-dark">{new Date(booking.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-medium text-dark">{booking.guests}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Total Paid</span>
                      <span className="font-bold text-lg text-primary">${booking.totalPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;
