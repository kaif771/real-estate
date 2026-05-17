import { DollarSign, BarChart, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ListSpacePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, maybe redirect them or let them stay?
    // Letting them stay is fine, but the CTA should say "Go to Dashboard"
  }, []);

  const userToken = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark text-white pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Turn your empty desks into <span className="text-secondary">consistent revenue.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of property managers and office managers who list their underutilized spaces on FlexoSpaces. Reach millions of professionals looking for a place to work.
          </p>
          
          {userToken && user?.role === 'space_owner' ? (
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/30">
              Go to Dashboard <ArrowRight size={20} />
            </Link>
          ) : (
            <Link to="/register" className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/30">
              Start Earning Today <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Why host with FlexoSpaces?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We make monetizing your real estate effortless, secure, and highly profitable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-light p-8 rounded-2xl border border-gray-100 hover:border-secondary/30 transition-colors">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="text-secondary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Maximize Yield</h3>
              <p className="text-gray-600 leading-relaxed">Fill empty capacity during off-peak hours or rent out entire floors to enterprise clients.</p>
            </div>
            
            <div className="bg-light p-8 rounded-2xl border border-gray-100 hover:border-secondary/30 transition-colors">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Powerful Insights</h3>
              <p className="text-gray-600 leading-relaxed">Our dashboard provides deep analytics on occupancy rates, revenue projections, and user feedback.</p>
            </div>
            
            <div className="bg-light p-8 rounded-2xl border border-gray-100 hover:border-secondary/30 transition-colors">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Guests</h3>
              <p className="text-gray-600 leading-relaxed">Every user undergoes identity verification. Plus, we offer liability protection on all bookings.</p>
            </div>
            
            <div className="bg-light p-8 rounded-2xl border border-gray-100 hover:border-secondary/30 transition-colors">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Total Control</h3>
              <p className="text-gray-600 leading-relaxed">Set your own pricing, availability, and house rules. Accept or decline requests instantly.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-dark text-center mb-16">How it works</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold text-dark mb-2">Create your listing</h4>
                <p className="text-gray-600 text-sm">Sign up as a Space Owner, upload beautiful photos, set your pricing, and define your amenities.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold text-dark mb-2">Welcome professionals</h4>
                <p className="text-gray-600 text-sm">Guests book your space through our platform. You receive instant notifications and can communicate with them before arrival.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-secondary text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold text-dark mb-2">Get paid securely</h4>
                <p className="text-gray-600 text-sm">Payments are processed automatically. We transfer your earnings directly to your bank account every week.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ListSpacePage;
