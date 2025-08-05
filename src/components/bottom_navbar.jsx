import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';

const BottomNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white z-10">
      <nav className="border-t border-gray-200 flex justify-around py-1.5 md:py-1 w-full max-w-3xl">
        <NavItem 
          to="/" 
          icon={<AiOutlineHome className="h-5 w-5 md:h-7 md:w-7" />} 
          label="Home" 
          isActive={path === '/'} 
        />
        <NavItem 
          to="/search" 
          icon={<AiOutlineSearch className="h-5 w-5 md:h-7 md:w-7" />} 
          label="Search" 
          isActive={path === '/search'} 
        />
        <NavItem 
          to="/bookings" 
          icon={<AiOutlineCalendar className="h-5 w-5 md:h-7 md:w-7" />} 
          label="Bookings" 
          isActive={path === '/bookings'} 
        />
        <NavItem 
          to="/profile" 
          icon={<AiOutlineUser className="h-5 w-5 md:h-7 md:w-7" />} 
          label="Profile" 
          isActive={path === '/profile'} 
        />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-[10px] md:text-[9px] mt-0.5">{label}</span>
    </Link>
  );
};

export default BottomNavbar;