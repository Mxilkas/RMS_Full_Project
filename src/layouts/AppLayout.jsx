import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

export default function AppLayout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
