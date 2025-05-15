import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { EventProvider } from '../../context/EventContext';
import { PartnerProvider } from '../../context/PartnerContext';
import { BookingProvider } from '../../context/BookingContext';

const Layout: React.FC = () => {
  return (
    <EventProvider>
      <PartnerProvider>
        <BookingProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
              <Outlet />
            </main>
            <Footer />
          </div>
        </BookingProvider>
      </PartnerProvider>
    </EventProvider>
  );
};

export default Layout;