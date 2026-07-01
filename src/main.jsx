import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import About from './pages/About.jsx';
import ApartmentDetails from './pages/ApartmentDetails.jsx';
import Apartments from './pages/Apartments.jsx';
import Contact from './pages/Contact.jsx';
import Customers from './pages/Customers.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ManagementOverview from './pages/ManagementOverview.jsx';
import NotFound from './pages/NotFound.jsx';
import Owners from './pages/Owners.jsx';
import Payments from './pages/Payments.jsx';
import Properties from './pages/Properties.jsx';
import Rentals from './pages/Rentals.jsx';
import Reports from './pages/Reports.jsx';
import Sales from './pages/Sales.jsx';
import Users from './pages/Users.jsx';
import './styles.css';

const adminManager = ['Admin', 'Manager'];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            <Route path="/apartments/:id" element={<ApartmentDetails />} />

            <Route path="/management" element={(
              <ProtectedRoute roles={['Admin', 'Manager', 'User']}>
                <ManagementOverview />
              </ProtectedRoute>
            )} />

            <Route path="/apartments" element={(
              <ProtectedRoute roles={['Admin', 'Manager', 'User']}>
                <Apartments />
              </ProtectedRoute>
            )} />

            <Route path="/payments" element={(
              <ProtectedRoute roles={['Admin', 'Manager', 'User']}>
                <Payments />
              </ProtectedRoute>
            )} />

            <Route path="/properties" element={<ProtectedRoute roles={adminManager}><Properties /></ProtectedRoute>} />
            <Route path="/owners" element={<ProtectedRoute roles={adminManager}><Owners /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute roles={adminManager}><Customers /></ProtectedRoute>} />
            <Route path="/rentals" element={<ProtectedRoute roles={adminManager}><Rentals /></ProtectedRoute>} />
            <Route path="/sales" element={<ProtectedRoute roles={adminManager}><Sales /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute roles={adminManager}><Reports /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute roles={['Admin']}><Users /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
