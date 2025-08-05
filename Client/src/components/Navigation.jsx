import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-primary">Nayana Hospital</Link>
        <nav className="flex space-x-4">
          <Link 
            to="/dashboard" 
            className={`${path === '/dashboard' ? 'text-secondary' : 'text-gray-500'} hover:text-primary`}
          >
            Dashboard
          </Link>
          <Link 
            to="/dashboard/patients" 
            className={`${path === '/dashboard/patients' ? 'text-secondary' : 'text-gray-500'} hover:text-primary`}
          >
            Patients
          </Link>
          <Link 
            to="/dashboard/doctors" 
            className={`${path === '/dashboard/doctors' ? 'text-secondary' : 'text-gray-500'} hover:text-primary`}
          >
            Doctors
          </Link>
          <Link 
            to="/dashboard/appointments" 
            className={`${path === '/dashboard/appointments' ? 'text-secondary' : 'text-gray-500'} hover:text-primary`}
          >
            Appointments
          </Link>
          <Link 
            to="/dashboard/settings" 
            className={`${path === '/dashboard/settings' ? 'text-secondary' : 'text-gray-500'} hover:text-primary`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
