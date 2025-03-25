import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ClientHeader from '../components/ClientHeader';
import ClientBanner from '../components/ClientBanner';
import ClientFooter from '../components/ClientFooter';

const Client = () => {
  return (
    <>
      <ClientHeader />
      <ClientBanner />
      <div className=' container'>
        <Outlet />
      </div>


      <ClientFooter />
    </>


  );
};

export default Client;
