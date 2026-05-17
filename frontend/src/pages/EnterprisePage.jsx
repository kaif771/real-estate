import { CheckCircle, Building, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnterprisePage = () => {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark text-white pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary/20 text-primary font-bold rounded-full mb-6 text-sm tracking-wider uppercase">
            FlexoSpaces Enterprise
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Scale your real estate, <br/>not your overhead.
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Customized workspace solutions for teams of 50 to 5,000+. Give your employees the flexibility they demand with the control and security you require.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
            Contact Sales <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Building className="text-primary" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Dedicated Offices</h3>
              <p className="text-gray-600 leading-relaxed">
                Fully branded, private suites for your enterprise. We handle the build-out, IT infrastructure, and daily operations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Users className="text-secondary" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Distributed Teams</h3>
              <p className="text-gray-600 leading-relaxed">
                Provide your remote employees with an all-access pass to 5,000+ premium workspaces globally under one unified invoice.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <ShieldCheck className="text-blue-600" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Enterprise Security</h3>
              <p className="text-gray-600 leading-relaxed">
                ISO certified spaces, dedicated VLANs, encrypted access controls, and strict compliance standards.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-500 mb-10">Trusted by fast-growing companies</h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock logos text */}
            <div className="text-3xl font-black font-serif tracking-tighter">AcmeCorp</div>
            <div className="text-3xl font-black italic tracking-widest">GLOBAL</div>
            <div className="text-3xl font-black uppercase">TechFlow</div>
            <div className="text-3xl font-black tracking-tight">Nexus</div>
          </div>
        </div>
      </section>

      {/* Comparison / List */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-16">The FlexoSpaces Advantage</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-light rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-xl font-bold text-dark mb-2">Zero Capital Expenditure</h4>
                <p className="text-gray-600">Avoid the massive upfront costs of office build-outs. Pay a predictable monthly rate that scales with your headcount.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-light rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-xl font-bold text-dark mb-2">Centralized Management</h4>
                <p className="text-gray-600">Track usage, manage access, and review consolidated billing for thousands of employees from a single dashboard.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-light rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-xl font-bold text-dark mb-2">Agile Contracts</h4>
                <p className="text-gray-600">Say goodbye to 5-year lock-ins. Our enterprise agreements offer unmatched flexibility to expand or contract as needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterprisePage;
