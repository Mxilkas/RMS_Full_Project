import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandLogo />
          <p>One clear platform for property listings, owners, customers, rentals, sales and payments.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/management">Management</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Popular Modules</h3>
          <Link to="/apartments"><Building2 size={15} /> Apartments</Link>
          <Link to="/rentals">Rentals</Link>
          <Link to="/payments">Payments</Link>
          <Link to="/reports">Reports</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p><MapPin size={16} /> Hodan, Mogadishu</p>
          <p><Phone size={16} /> +252 61 0000000</p>
          <p><Mail size={16} /> support@rentalprorms.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} RentalPro RMS</span>
          <span>Built with React, Axios, ASP.NET Core and SQL Server.</span>
        </div>
      </div>
    </footer>
  );
}
