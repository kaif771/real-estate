import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, User, Search, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-dark">FlexoSpaces</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/search" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1 font-medium">
              <Search size={18} /> Find Workspace
            </Link>
            <Link to="/enterprise" className="text-gray-600 hover:text-primary transition-colors font-medium">For Enterprise</Link>
            <div className="h-6 w-px bg-gray-200"></div>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-dark font-semibold">Hi, {user.name.split(' ')[0]}</span>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors font-medium flex items-center gap-1">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition-colors font-medium flex items-center gap-1 ml-2">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors font-medium flex items-center gap-2">
                  <User size={18} /> Log In
                </Link>
                <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-primary focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
